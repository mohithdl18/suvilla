
"use client";

import { useCallback, useEffect, useState } from "react";
import rooms from "@/data/rooms.json";
import { calculateNights } from "@/logic/pricing";
import RoomCard from "./RoomCard";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

export default function RoomAvailability({
    checkIn,
    checkOut,
    adults = 2,
    children = 0,
    onSelectRoom,
    searchKey = 0,
}) {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadAvailability = useCallback(
        async (signal) => {
            if (!checkIn || !checkOut || checkOut <= checkIn) {
                setAvailability([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const params = new URLSearchParams({
                    checkIn,
                    checkOut,
                });

                const response = await fetch(
                    `/api/availability?${params.toString()}`,
                    { signal }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                            "Unable to load room availability."
                    );
                }

                setAvailability(result.rooms || []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Availability request failed:", err);
                    setError(
                        "We couldn't load room availability. Please try again."
                    );
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        },
        [checkIn, checkOut]
    );

    useEffect(() => {
        const controller = new AbortController();

        loadAvailability(controller.signal);

        return () => controller.abort();
    }, [loadAvailability, searchKey]);

    const nights =
        checkIn && checkOut && checkOut > checkIn
            ? calculateNights(checkIn, checkOut)
            : 0;

    if (!checkIn || !checkOut || checkOut <= checkIn) {
        return (
            <div
                className="rounded-2xl border p-8 text-center"
                style={{
                    backgroundColor: COLORS.background,
                    borderColor: `${COLORS.foreground}20`,
                    color: COLORS.foreground,
                }}
            >
                <p className="text-sm opacity-70">
                    Select your check-in and checkout dates, then search
                    to view available rooms.
                </p>
            </div>
        );
    }

    return (
        <section className="w-full">
            {loading && (
                <div
                    className="rounded-xl border p-6 text-center text-sm"
                    style={{
                        borderColor: `${COLORS.foreground}20`,
                        color: COLORS.foreground,
                    }}
                    role="status"
                >
                    Checking room availability...
                </div>
            )}

            {error && !loading && (
                <div
                    className="rounded-xl border border-red-200 bg-red-50 p-5"
                    role="alert"
                >
                    <p className="text-sm text-red-800">{error}</p>

                    <button
                        type="button"
                        onClick={() => {
                            const controller = new AbortController();
                            loadAvailability(controller.signal);
                        }}
                        className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold"
                        style={{
                            backgroundColor: COLORS.accent,
                            color: COLORS.foreground,
                        }}
                    >
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="space-y-5">
                    {rooms.map((room) => {
                        const roomStatus = availability.find(
                            (item) => item.roomId === room.id
                        );

                        const available = roomStatus?.available === true;

                        return (
                            <RoomCard
                                key={room.id}
                                room={room}
                                checkIn={checkIn}
                                checkOut={checkOut}
                                nights={nights}
                                adults={adults}
                                children={children}
                                available={available}
                                onSelectRoom={onSelectRoom}
                            />
                        );
                    })}

                    {availability.length === 0 && (
                        <p
                            className="rounded-xl border p-5 text-center text-sm"
                            style={{
                                borderColor: `${COLORS.foreground}20`,
                                color: COLORS.foreground,
                            }}
                        >
                            No availability information was returned.
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
