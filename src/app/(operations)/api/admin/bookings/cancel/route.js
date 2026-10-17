import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

import clientPromise, { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/requireAdmin";
import { getStayDates } from "@/logic/booking";

function pinMatches(providedPin, expectedPin) {
    if (
        typeof providedPin !== "string" ||
        typeof expectedPin !== "string" ||
        !providedPin ||
        !expectedPin
    ) {
        return false;
    }

    const provided = Buffer.from(providedPin, "utf8");
    const expected = Buffer.from(expectedPin, "utf8");

    if (provided.length !== expected.length) {
        return false;
    }

    return timingSafeEqual(provided, expected);
}

export async function POST(request) {
    const auth = await requireAdmin();

    if (!auth.authorized) {
        return auth.response;
    }

    const expectedPin = process.env.ADMIN_CANCEL_PIN;

    if (!expectedPin) {
        console.error("ADMIN_CANCEL_PIN is not configured.");

        return NextResponse.json(
            {
                success: false,
                message: "Cancellation is not configured on the server.",
            },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { bookingId, pin } = body;

        if (
            typeof bookingId !== "string" ||
            !bookingId.trim() ||
            typeof pin !== "string" ||
            !pin
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Booking ID and cancellation PIN are required.",
                },
                { status: 400 }
            );
        }

        if (!pinMatches(pin, expectedPin)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Incorrect cancellation PIN.",
                },
                { status: 403 }
            );
        }

        const client = await clientPromise;
        const db = await getDatabase();

        const bookingsCollection = db.collection("bookings");
        const availabilityCollection = db.collection("availability");

        let bookingNotFound = false;

        // Delete the booking and release its room in one transaction.
        const session = client.startSession();

        try {
            await session.withTransaction(async () => {
                const booking = await bookingsCollection.findOne(
                    { bookingId: bookingId.trim() },
                    { session }
                );

                if (!booking) {
                    bookingNotFound = true;
                    return;
                }

                if (
                    !booking.roomId ||
                    !booking.checkIn ||
                    !booking.checkOut
                ) {
                    throw new Error(
                        "Booking is missing room or date information."
                    );
                }

                const stayDates = getStayDates(
                    booking.checkIn,
                    booking.checkOut
                );

                // Remove this room from customer-booked availability.
                // Admin-blocked rooms are stored separately and are preserved.
                for (const date of stayDates) {
                    await availabilityCollection.updateOne(
                        { date },
                        {
                            $pull: {
                                booked_rooms: booking.roomId,
                            },
                        },
                        { session }
                    );
                }

                await bookingsCollection.deleteOne(
                    { _id: booking._id },
                    { session }
                );
            });
        } finally {
            await session.endSession();
        }

        if (bookingNotFound) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Booking not found. It may already be deleted.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Booking cancelled and deleted successfully.",
            bookingId: bookingId.trim(),
        });
    } catch (error) {
        console.error("Cancel booking API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to cancel the booking.",
            },
            { status: 500 }
        );
    }
}