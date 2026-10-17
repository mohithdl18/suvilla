import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import clientPromise, { getDatabase } from "@/lib/mongodb";
import pricingConfig from "@/data/pricing.json";

import {
    validateBookingDates,
    getStayDates,
    validateRoom,
} from "@/logic/booking";

import {
    calculateRoomPrice,
    calculateCheckoutFees,
} from "@/logic/pricing";

const MAX_NIGHTS = 60;

const VALID_MEAL_PLANS = [
    "lunch",
    "dinner",
    "lunchAndDinner",
];

function validCustomer(customer) {
    if (!customer || typeof customer !== "object") {
        return false;
    }

    return (
        typeof customer.name === "string" &&
        customer.name.trim().length >= 2 &&
        customer.name.trim().length <= 100 &&
        typeof customer.phone === "string" &&
        /^[+0-9\s()-]{7,20}$/.test(customer.phone.trim()) &&
        typeof customer.email === "string" &&
        customer.email.trim().length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
    );
}

function validGuests(guests) {
    return (
        guests !== null &&
        typeof guests === "object" &&
        Number.isInteger(guests.adults) &&
        guests.adults >= 2 &&
        guests.adults <= 20 &&
        Number.isInteger(guests.children) &&
        guests.children >= 0 &&
        guests.children <= 20
    );
}

function validAddons(addons) {
    return (
        addons !== null &&
        typeof addons === "object" &&
        !Array.isArray(addons)
    );
}

function calculateAddons(addons, guests, nights) {
    const extraAdults = Math.max(
        0,
        guests.adults - pricingConfig.includedGuests
    );

    const children = guests.children;

    const extraAdultTotal =
        extraAdults * pricingConfig.extraAdult.price * nights;

    const childTotal =
        children * pricingConfig.child.price * nights;

    const driver = addons.driver === true;

    // Driver accommodation is charged per night.
    const driverTotal = driver
        ? pricingConfig.driver.price * nights
        : 0;

    /*
     * New frontend format:
     * mealPlan: ["lunch", "dinner"]
     * meals: {
     *   lunch: { selected: true, people: 3 },
     *   dinner: { selected: true, people: 3 }
     * }
     *
     * The server uses its own configured prices, never client prices.
     */
    let selectedMealIds = [];
    let submittedMeals = {};

    if (Array.isArray(addons.mealPlan)) {
        selectedMealIds = addons.mealPlan;
        submittedMeals = addons.meals ?? {};
    } else if (
        typeof addons.mealPlan === "string" &&
        addons.mealPlan !== "none"
    ) {
        // Support the previous single-meal format during migration.
        selectedMealIds = [addons.mealPlan];

        if (addons.mealPlan === "lunchAndDinner") {
            submittedMeals = {
                lunchAndDinner: {
                    selected: true,
                    people: guests.adults + guests.children,
                },
            };
        } else {
            submittedMeals = {
                [addons.mealPlan]: {
                    selected: true,
                    people: guests.adults + guests.children,
                },
            };
        }
    }

    if (
        !Array.isArray(selectedMealIds) ||
        selectedMealIds.length > VALID_MEAL_PLANS.length ||
        selectedMealIds.some(
            (id) => !VALID_MEAL_PLANS.includes(id)
        ) ||
        new Set(selectedMealIds).size !== selectedMealIds.length
    ) {
        throw new Error("Invalid meal plan selected.");
    }

    if (
        !submittedMeals ||
        typeof submittedMeals !== "object" ||
        Array.isArray(submittedMeals)
    ) {
        throw new Error("Invalid meal selection.");
    }

    const configuredMealPrices = {
        lunch: pricingConfig.meals.lunch,
        dinner: pricingConfig.meals.dinner,
        lunchAndDinner: pricingConfig.meals.lunchAndDinner,
    };

    const meals = {};
    const items = [];

    let mealTotal = 0;

    for (const mealId of selectedMealIds) {
        const selection = submittedMeals[mealId];

        if (
            !selection ||
            selection.selected !== true ||
            !Number.isInteger(selection.people) ||
            selection.people < 1 ||
            selection.people > guests.adults + guests.children
        ) {
            throw new Error("Invalid meal selection.");
        }

        const pricePerPersonPerNight =
            configuredMealPrices[mealId];

        const total =
            pricePerPersonPerNight *
            selection.people *
            nights;

        meals[mealId] = {
            selected: true,
            people: selection.people,
            pricePerPersonPerNight,
            total,
        };

        mealTotal += total;

        const mealLabels = {
            lunch: "Lunch",
            dinner: "Dinner",
            lunchAndDinner: "Lunch + Dinner",
        };

        items.push({
            name: mealLabels[mealId],
            quantity: selection.people,
            price: pricePerPersonPerNight,
            total,
        });
    }

    // Preserve existing extra-breakfast support if sent by an older client.
    const extraBreakfast = addons.extraBreakfast === true;

    const breakfastTotal = extraBreakfast
        ? (pricingConfig.meals.extraBreakfast ?? 0) * nights
        : 0;

    items.unshift(
        {
            name: "Extra adults",
            quantity: extraAdults,
            price: pricingConfig.extraAdult.price,
            total: extraAdultTotal,
        },
        {
            name: "Children",
            quantity: children,
            price: pricingConfig.child.price,
            total: childTotal,
        }
    );

    if (breakfastTotal > 0) {
        items.push({
            name: "Extra breakfast",
            selected: true,
            total: breakfastTotal,
        });
    }

    if (driver) {
        items.push({
            name: "Driver accommodation",
            selected: true,
            price: pricingConfig.driver.price,
            total: driverTotal,
        });
    }

    return {
        extraAdults,
        children,
        mealPlan: selectedMealIds,
        meals,
        extraBreakfast,
        driver,
        items,
        extraAdultTotal,
        childTotal,
        mealTotal,
        breakfastTotal,
        driverTotal,
        total:
            extraAdultTotal +
            childTotal +
            mealTotal +
            breakfastTotal +
            driverTotal,
    };
}

export async function POST(request) {
    let session;

    try {
        const body = await request.json();

        const {
            roomId,
            checkIn,
            checkOut,
            customer,
            guests,
            addons = {},
        } = body;

        if (!validateRoom(roomId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid room selected.",
                },
                { status: 400 }
            );
        }

        if (!validateBookingDates(checkIn, checkOut)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid check-in or checkout dates.",
                },
                { status: 400 }
            );
        }

        const today = new Date();

        const todayString = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0"),
        ].join("-");

        if (checkIn < todayString) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Check-in cannot be in the past.",
                },
                { status: 400 }
            );
        }

        const stayDates = getStayDates(checkIn, checkOut);

        if (
            stayDates.length === 0 ||
            stayDates.length > MAX_NIGHTS
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: `A booking must be between 1 and ${MAX_NIGHTS} nights.`,
                },
                { status: 400 }
            );
        }

        if (!validCustomer(customer)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Enter a valid name, phone number and email.",
                },
                { status: 400 }
            );
        }

        if (!validGuests(guests)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid adult or child count.",
                },
                { status: 400 }
            );
        }

        if (!validAddons(addons)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid add-on selection.",
                },
                { status: 400 }
            );
        }

        const roomPricing = calculateRoomPrice(
            checkIn,
            checkOut
        );

        const addonPricing = calculateAddons(
            addons,
            guests,
            roomPricing.nights
        );

        const subtotal =
            roomPricing.roomTotal + addonPricing.total;

        const fees = calculateCheckoutFees(subtotal);

        const bookingId = `SV-${randomUUID()
            .replace(/-/g, "")
            .slice(0, 12)
            .toUpperCase()}`;

        const booking = {
            bookingId,
            roomId,
            checkIn,
            checkOut,
            nights: roomPricing.nights,

            customer: {
                name: customer.name.trim(),
                phone: customer.phone.trim(),
                email: customer.email.trim().toLowerCase(),
                address: customer.address?.trim() ?? "",
                city: customer.city?.trim() ?? "",
                pinCode: customer.pinCode?.trim() ?? "",
                specialRequest:
                    customer.specialRequest?.trim() ?? "",
            },

            guests: {
                adults: guests.adults,
                children: guests.children,
            },

            addons: addonPricing,

            pricing: {
                nightlyBreakdown: roomPricing.nightlyBreakdown,
                roomTotal: roomPricing.roomTotal,
                addonTotal: addonPricing.total,
                subtotal: fees.subtotal,
                tax: fees.tax,
                platformFee: fees.platformFee,
                total: fees.total,
            },

            status: "confirmed",
            paymentStatus: "not_required",
            createdAt: new Date(),
        };

        const client = await clientPromise;
        const db = await getDatabase();

        const availabilityCollection =
            db.collection("availability");

        const bookingsCollection =
            db.collection("bookings");

        await availabilityCollection.createIndex(
            { date: 1 },
            { unique: true }
        );

        await bookingsCollection.createIndex(
            { bookingId: 1 },
            { unique: true }
        );

        session = client.startSession();

        await session.withTransaction(async () => {
            for (const date of stayDates) {
                // Check availability inside the transaction.
                const existing =
                    await availabilityCollection.findOne(
                        { date },
                        { session }
                    );

                if (
                    existing?.booked_rooms?.includes(roomId)
                ) {
                    throw new Error("ROOM_UNAVAILABLE");
                }

                await availabilityCollection.updateOne(
                    { date },
                    {
                        $setOnInsert: { date },
                        $addToSet: { booked_rooms: roomId },
                    },
                    {
                        upsert: true,
                        session,
                    }
                );
            }

            await bookingsCollection.insertOne(booking, {
                session,
            });
        });

        return NextResponse.json(
            {
                success: true,
                message: "Booking confirmed successfully.",
                booking,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Booking creation failed:", error);

        if (error.message === "ROOM_UNAVAILABLE") {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This room is no longer available for those dates. Please search again.",
                },
                { status: 409 }
            );
        }

        if (
            error.message === "Invalid meal plan selected." ||
            error.message === "Invalid meal selection."
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                { status: 400 }
            );
        }

        if (
            error.code === 11000 ||
            error.code === 112 ||
            error.codeName === "WriteConflict"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This room is no longer available for those dates. Please search again.",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to create the booking. Please try again.",
            },
            { status: 500 }
        );
    } finally {
        if (session) {
            await session.endSession();
        }
    }
}