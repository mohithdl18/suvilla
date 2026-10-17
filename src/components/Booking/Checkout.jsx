"use client";

import { useState } from "react";
import { calculateRoomPrice } from "@/logic/pricing";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
}

function formatDate(dateString) {
    if (!dateString) return "—";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function Checkout({
    room,
    checkIn,
    checkOut,
    nights = 1,
    adults = 2,
    children = 0,
    addons = {},
    customer = {},
    onBack,
    onConfirm,
    loading = false,
}) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const roomName =
        room?.name || room?.title || room?.id || "Selected room";

    // calculateRoomPrice returns an object:
    // { nights, roomTotal, nightlyBreakdown }
    const roomPricing =
        checkIn && checkOut
            ? calculateRoomPrice(checkIn, checkOut)
            : null;

    // Get the actual room total from the pricing function.
    const roomTotal =
        Number(
            addons?.roomTotal ??
                room?.roomTotal ??
                roomPricing?.roomTotal ??
                (Number(room?.price) || 0) * nights
        ) || 0;

    const addonTotal = Number(addons?.total) || 0;

    // Room price + add-ons
    const subtotal = roomTotal + addonTotal;

    // Calculate checkout fees
    const tax = Math.round(subtotal * 0.18);
    const platformFee = Math.round(subtotal * 0.02);
    const total = subtotal + tax + platformFee;

    function handleSubmit(event) {
        event.preventDefault();

        if (!acceptedTerms || loading) return;

        onConfirm?.({
            customer,
            pricing: {
                roomTotal,
                addonTotal,
                subtotal,
                tax,
                platformFee,
                total,
            },
        });
    }

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto p-4"
            style={{ backgroundColor: "rgba(5,42,80,0.65)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
        >
            <div
                className="my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-2xl"
                style={{
                    backgroundColor: COLORS.background,
                    color: COLORS.foreground,
                }}
            >
                {/* Header */}
                <div
                    className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-6 py-5"
                    style={{
                        backgroundColor: COLORS.background,
                        borderColor: `${COLORS.foreground}20`,
                    }}
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
                            SU VILLA
                        </p>

                        <h2
                            id="checkout-title"
                            className="mt-1 text-2xl font-semibold"
                        >
                            Review your booking
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onBack}
                        disabled={loading}
                        className="rounded-full border px-4 py-2 text-sm font-medium disabled:opacity-50"
                        style={{
                            borderColor: `${COLORS.foreground}30`,
                        }}
                    >
                        Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {/* Booking summary */}
                    <section>
                        <h3 className="font-semibold">Your stay</h3>

                        <div className="mt-3 rounded-xl border border-black/10 bg-white/50 p-4">
                            <p className="text-lg font-semibold">
                                {roomName}
                            </p>

                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="opacity-60">Check-in</p>
                                    <p className="mt-1 font-medium">
                                        {formatDate(checkIn)}
                                    </p>
                                </div>

                                <div>
                                    <p className="opacity-60">Check-out</p>
                                    <p className="mt-1 font-medium">
                                        {formatDate(checkOut)}
                                    </p>
                                </div>

                                <div>
                                    <p className="opacity-60">Duration</p>
                                    <p className="mt-1 font-medium">
                                        {nights}{" "}
                                        {nights === 1 ? "night" : "nights"}
                                    </p>
                                </div>

                                <div>
                                    <p className="opacity-60">Guests</p>
                                    <p className="mt-1 font-medium">
                                        {adults} adults, {children} children
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Price breakdown */}
                    <section>
                        <h3 className="font-semibold">Price breakdown</h3>

                        <div className="mt-3 space-y-3 rounded-xl border border-black/10 bg-white/50 p-4 text-sm">
                            <PriceRow
                                label={`Room (${nights} ${
                                    nights === 1 ? "night" : "nights"
                                })`}
                                amount={roomTotal}
                            />

                            <PriceRow
                                label="Selected add-ons"
                                amount={addonTotal}
                            />

                            <div className="border-t border-black/10 pt-3">
                                <PriceRow
                                    label="Subtotal"
                                    amount={subtotal}
                                    bold
                                />
                            </div>

                            <PriceRow
                                label="Tax (18%)"
                                amount={tax}
                            />

                            <PriceRow
                                label="Platform fee (2%)"
                                amount={platformFee}
                            />

                            <div className="border-t border-black/10 pt-3">
                                <PriceRow
                                    label="Total"
                                    amount={total}
                                    bold
                                />
                            </div>
                        </div>

                        <p className="mt-2 text-xs opacity-60">
                            Final pricing must be verified by the booking server.
                        </p>
                    </section>

                    {/* Terms */}
                    <label className="flex items-start gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(event) =>
                                setAcceptedTerms(event.target.checked)
                            }
                            className="mt-1 h-4 w-4 accent-[#e4b441]"
                            required
                        />

                        <span>
                            I agree to the booking terms and cancellation
                            policy. Read our{" "}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold underline"
                            >
                                terms and conditions
                            </a>
                            .
                        </span>
                    </label>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={loading}
                            className="rounded-xl border px-5 py-3 font-semibold disabled:opacity-50 sm:w-1/3"
                            style={{
                                borderColor: `${COLORS.foreground}30`,
                            }}
                        >
                            Back to details
                        </button>

                        <button
                            type="submit"
                            disabled={!acceptedTerms || loading}
                            className="flex-1 rounded-xl px-5 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                                backgroundColor: COLORS.accent,
                                color: COLORS.foreground,
                            }}
                        >
                            {loading
                                ? "Confirming booking..."
                                : "Confirm Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function PriceRow({ label, amount, bold = false }) {
    return (
        <div
            className={`flex items-center justify-between gap-4 ${
                bold ? "text-base font-bold" : ""
            }`}
        >
            <span>{label}</span>
            <span>{formatINR(amount)}</span>
        </div>
    );
}