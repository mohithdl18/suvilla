"use client";

import { useState } from "react";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

function formatDate(dateString) {
    if (!dateString) return "—";

    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function BookingDetailsModal({
    room,
    checkIn,
    checkOut,
    adults = 2,
    children = 0,
    customer = {},
    onContinue,
    onBack,
    onClose,
}) {
    const [form, setForm] = useState({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        city: customer.city || "",
        pinCode: customer.pinCode || "",
        specialRequest: customer.specialRequest || "",
    });

    const [error, setError] = useState("");

    const totalGuests = adults + children;
    const roomName = room?.name || room?.title || room?.id || "Selected room";

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (error) setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        const customerDetails = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            pinCode: form.pinCode.trim(),
            specialRequest: form.specialRequest.trim(),
        };

        if (
            !customerDetails.name ||
            !customerDetails.email ||
            !customerDetails.phone ||
            !customerDetails.address ||
            !customerDetails.city ||
            !customerDetails.pinCode
        ) {
            setError("Please complete all required fields.");
            return;
        }

        if (!/^[+0-9 ()-]{7,20}$/.test(customerDetails.phone)) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (!/^\d{6}$/.test(customerDetails.pinCode)) {
            setError("Please enter a valid 6-digit PIN code.");
            return;
        }

        setError("");
        onContinue?.(customerDetails);
    }

    const inputClass =
        "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2";

    const inputStyle = {
        borderColor: `${COLORS.foreground}25`,
        "--tw-ring-color": COLORS.accent,
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-details-title"
                className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl p-5 shadow-2xl sm:rounded-2xl sm:p-7"
                style={{
                    backgroundColor: COLORS.background,
                    color: COLORS.foreground,
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                            Booking · Step 2 of 3
                        </p>

                        <h2
                            id="booking-details-title"
                            className="mt-2 text-2xl font-semibold"
                        >
                            Guest details
                        </h2>

                        <p className="mt-1 text-sm opacity-70">
                            Tell us who will be staying at SU VILLA.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close guest details"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                </div>

                {/* Booking summary */}
                <section className="mt-6 rounded-xl border p-4"
                    style={{
                        borderColor: `${COLORS.foreground}20`,
                        backgroundColor: "#FFFFFF80",
                    }}
                >
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                        Your reservation
                    </p>

                    <h3 className="mt-2 text-lg font-semibold">
                        {roomName}
                    </h3>

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

                        <div className="col-span-2 border-t pt-3"
                            style={{ borderColor: `${COLORS.foreground}15` }}
                        >
                            <p className="opacity-60">Total guests</p>
                            <p className="mt-1 font-medium">
                                {totalGuests}{" "}
                                {totalGuests === 1 ? "guest" : "guests"}
                                {" · "}
                                {adults} {adults === 1 ? "adult" : "adults"}
                                {children > 0 &&
                                    ` · ${children} ${
                                        children === 1 ? "child" : "children"
                                    }`}
                            </p>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Contact information */}
                    <section>
                        <h3 className="font-semibold">Contact information</h3>

                        <div className="mt-3 space-y-4">
                            <div>
                                <label
                                    htmlFor="booking-guest-name"
                                    className="block text-sm font-medium"
                                >
                                    Full name *
                                </label>

                                <input
                                    id="booking-guest-name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    minLength={2}
                                    maxLength={100}
                                    value={form.name}
                                    onChange={(event) =>
                                        updateField("name", event.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="booking-guest-email"
                                    className="block text-sm font-medium"
                                >
                                    Email address *
                                </label>

                                <input
                                    id="booking-guest-email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    maxLength={254}
                                    value={form.email}
                                    onChange={(event) =>
                                        updateField("email", event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="booking-guest-phone"
                                    className="block text-sm font-medium"
                                >
                                    Phone number *
                                </label>

                                <input
                                    id="booking-guest-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    minLength={7}
                                    maxLength={20}
                                    pattern="[+0-9 ()-]{7,20}"
                                    value={form.phone}
                                    onChange={(event) =>
                                        updateField("phone", event.target.value)
                                    }
                                    placeholder="Enter your phone number"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Billing address */}
                    <section>
                        <h3 className="font-semibold">Billing address</h3>

                        <div className="mt-3 space-y-4">
                            <div>
                                <label
                                    htmlFor="booking-address"
                                    className="block text-sm font-medium"
                                >
                                    Address *
                                </label>

                                <textarea
                                    id="booking-address"
                                    autoComplete="street-address"
                                    required
                                    maxLength={300}
                                    rows={2}
                                    value={form.address}
                                    onChange={(event) =>
                                        updateField("address", event.target.value)
                                    }
                                    placeholder="House number, street and area"
                                    className={inputClass}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="booking-city"
                                        className="block text-sm font-medium"
                                    >
                                        City *
                                    </label>

                                    <input
                                        id="booking-city"
                                        type="text"
                                        autoComplete="address-level2"
                                        required
                                        maxLength={100}
                                        value={form.city}
                                        onChange={(event) =>
                                            updateField("city", event.target.value)
                                        }
                                        placeholder="Enter your city"
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="booking-pin"
                                        className="block text-sm font-medium"
                                    >
                                        PIN code *
                                    </label>

                                    <input
                                        id="booking-pin"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="postal-code"
                                        required
                                        maxLength={6}
                                        pattern="[0-9]{6}"
                                        value={form.pinCode}
                                        onChange={(event) =>
                                            updateField(
                                                "pinCode",
                                                event.target.value.replace(/\D/g, "").slice(0, 6)
                                            )
                                        }
                                        placeholder="6-digit PIN code"
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Special request */}
                    <section>
                        <label
                            htmlFor="booking-special-request"
                            className="block font-semibold"
                        >
                            Special requests
                            <span className="ml-2 text-xs font-normal opacity-60">
                                Optional
                            </span>
                        </label>

                        <textarea
                            id="booking-special-request"
                            rows={3}
                            maxLength={1000}
                            value={form.specialRequest}
                            onChange={(event) =>
                                updateField(
                                    "specialRequest",
                                    event.target.value
                                )
                            }
                            placeholder="Any preferences or requests for your stay?"
                            className={inputClass}
                            style={inputStyle}
                        />

                        <p className="mt-1 text-xs opacity-60">
                            Requests are subject to availability and confirmation.
                        </p>
                    </section>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                        >
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-between"
                        style={{ borderColor: `${COLORS.foreground}15` }}
                    >
                        <button
                            type="button"
                            onClick={onBack}
                            className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
                            style={{
                                borderColor: `${COLORS.foreground}30`,
                            }}
                        >
                            Back to add-ons
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl px-6 py-3 text-sm font-bold transition hover:brightness-95"
                            style={{
                                backgroundColor: COLORS.accent,
                                color: COLORS.foreground,
                            }}
                        >
                            Continue to Checkout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}