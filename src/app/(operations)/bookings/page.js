"use client";

import { useCallback, useState } from "react";

import UtilBar from "@/components/Booking/UtilBar";
import RoomAvailability from "@/components/Booking/RoomAvailability";
import AddonsModal from "@/components/Booking/AddonsModal";
import BookingDetailsModal from "@/components/Booking/BookingDetailsModal";
import Checkout from "@/components/Booking/Checkout";
import BookingConfirmation from "@/components/Booking/BookingConfirmation";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

function getDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return {
        checkIn: formatDate(today),
        checkOut: formatDate(tomorrow),
    };
}

function formatDate(dateString) {
    if (!dateString) return "—";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function BookingPage() {
    const [dates, setDates] = useState(getDefaultDates);
    const [guests, setGuests] = useState({
        adults: 2,
        children: 0,
    });

    const [searchKey, setSearchKey] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [addons, setAddons] = useState(null);
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pinCode: "",
        specialRequest: "",
    });

    const [currentStep, setCurrentStep] = useState(null);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = useCallback((search) => {
        setDates({
            checkIn: search.checkIn,
            checkOut: search.checkOut,
        });

        setGuests({
            adults: search.adults,
            children: search.children,
        });

        setSelectedRoom(null);
        setAddons(null);
        setCurrentStep(null);
        setBooking(null);
        setError("");
        setSearchKey((previous) => previous + 1);
    }, []);

    const handleSelectRoom = useCallback((room) => {
        setSelectedRoom(room);
        setAddons(null);
        setCurrentStep("addons");
        setError("");
    }, []);

    const handleContinueToDetails = useCallback((selectedAddons) => {
        setAddons(selectedAddons);

        setCustomer({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            pinCode: "",
            specialRequest: "",
        });

        setError("");
        setCurrentStep("details");
    }, []);

    const handleContinueToCheckout = useCallback((customerDetails) => {
        setCustomer(customerDetails);
        setError("");
        setCurrentStep("checkout");
    }, []);

    const handleConfirmBooking = useCallback(async () => {
        if (!selectedRoom || !addons || !customer.name?.trim()) {
            setError("Please complete the booking details before continuing.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomId: selectedRoom.id || selectedRoom.roomId,
                    checkIn: dates.checkIn,
                    checkOut: dates.checkOut,
                    customer,
                    guests: {
                        adults: addons.adults ?? guests.adults,
                        children: addons.children ?? guests.children,
                    },
                    addons,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Unable to create your booking."
                );
            }

            setBooking({
                ...result.booking,
                roomName:
                    selectedRoom.name ||
                    selectedRoom.title ||
                    selectedRoom.id,
                guests: {
                    adults: addons.adults ?? guests.adults,
                    children: addons.children ?? guests.children,
                },
                customer,
            });

            setSelectedRoom(null);
            setAddons(null);
            setCurrentStep(null);
        } catch (err) {
            setError(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [selectedRoom, addons, customer, dates, guests]);

    const closeBookingFlow = useCallback(() => {
        setSelectedRoom(null);
        setAddons(null);
        setCurrentStep(null);
        setError("");
    }, []);

    const startNewBooking = useCallback(() => {
        setBooking(null);
        setSelectedRoom(null);
        setAddons(null);
        setCurrentStep(null);
        setError("");
        setSearchKey((previous) => previous + 1);
    }, []);

    const nights = Math.max(
        1,
        Math.round(
            (new Date(`${dates.checkOut}T00:00:00Z`).getTime() -
                new Date(`${dates.checkIn}T00:00:00Z`).getTime()) /
                86400000
        )
    );

    return (
        <main
            className="min-h-screen"
            style={{
                backgroundColor: COLORS.background,
                color: COLORS.foreground,
            }}
        >
            <section className="px-4 pb-16 pt-10 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8 text-center">
                        <p
                            className="text-xs font-semibold uppercase tracking-[0.25em]"
                            style={{ color: COLORS.accent }}
                        >
                            SU VILLA
                        </p>

                        <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
                            Find Your Perfect Stay
                        </h1>

                        <p className="mx-auto mt-3 max-w-2xl text-sm opacity-70 sm:text-base">
                            Choose your dates, explore our rooms, and plan
                            your stay at SU VILLA.
                        </p>
                    </header>

                    <div className="mx-auto max-w-6xl">
                        <UtilBar
                            onSearch={handleSearch}
                            initialCheckIn={dates.checkIn}
                            initialCheckOut={dates.checkOut}
                            initialAdults={guests.adults}
                            initialChildren={guests.children}
                        />

                        <div className="mx-2 mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg bg-[#052a50]/[0.045] px-3 py-2 text-xs text-[#052a50]/65 sm:justify-start sm:px-5">
                            <span>
                                {formatDate(dates.checkIn)} –{" "}
                                {formatDate(dates.checkOut)}
                            </span>

                            <span className="hidden text-[#052a50]/25 sm:inline">
                                |
                            </span>

                            <span>
                                {nights} {nights === 1 ? "night" : "nights"}
                            </span>

                            <span className="hidden text-[#052a50]/25 sm:inline">
                                |
                            </span>

                            <span>
                                {guests.adults}{" "}
                                {guests.adults === 1 ? "adult" : "adults"},{" "}
                                {guests.children}{" "}
                                {guests.children === 1 ? "child" : "children"}
                            </span>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-7xl">
                        <RoomAvailability
                            key={searchKey}
                            checkIn={dates.checkIn}
                            checkOut={dates.checkOut}
                            adults={guests.adults}
                            children={guests.children}
                            onSelectRoom={handleSelectRoom}
                            searchKey={searchKey}
                        />
                    </div>

                    {error && !selectedRoom && (
                        <div
                            className="mx-auto mt-6 max-w-7xl rounded-xl border p-4 text-sm"
                            style={{
                                borderColor: "#b91c1c55",
                                color: "#b91c1c",
                                backgroundColor: "#b91c1c0a",
                            }}
                            role="alert"
                        >
                            {error}
                        </div>
                    )}
                </div>
            </section>

            {/* Step 1: Add-ons */}
            {selectedRoom && currentStep === "addons" && (
                <AddonsModal
                    room={selectedRoom}
                    checkIn={dates.checkIn}
                    checkOut={dates.checkOut}
                    nights={nights}
                    adults={guests.adults}
                    children={guests.children}
                    onContinue={handleContinueToDetails}
                    onClose={closeBookingFlow}
                />
            )}

            {/* Step 2: Guest and billing details */}
            {selectedRoom && currentStep === "details" && (
                <BookingDetailsModal
                    room={selectedRoom}
                    checkIn={dates.checkIn}
                    checkOut={dates.checkOut}
                    adults={addons?.adults ?? guests.adults}
                    children={addons?.children ?? guests.children}
                    customer={customer}
                    onContinue={handleContinueToCheckout}
                    onBack={() => setCurrentStep("addons")}
                    onClose={closeBookingFlow}
                />
            )}

            {/* Step 3: Price breakdown and confirmation */}
            {selectedRoom && currentStep === "checkout" && !booking && (
                <Checkout
                    room={selectedRoom}
                    checkIn={dates.checkIn}
                    checkOut={dates.checkOut}
                    nights={nights}
                    adults={addons?.adults ?? guests.adults}
                    children={addons?.children ?? guests.children}
                    addons={addons}
                    customer={customer}
                    onBack={() => setCurrentStep("details")}
                    onConfirm={handleConfirmBooking}
                    loading={loading}
                />
            )}

            {error && selectedRoom && currentStep && (
                <div
                    className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-xl rounded-xl border p-4 text-sm shadow-lg"
                    style={{
                        borderColor: "#b91c1c55",
                        color: "#b91c1c",
                        backgroundColor: "#fff5f5",
                    }}
                    role="alert"
                >
                    {error}
                </div>
            )}

            {booking && (
                <BookingConfirmation
                    booking={booking}
                    onClose={startNewBooking}
                    onNewBooking={startNewBooking}
                />
            )}
        </main>
    );
}