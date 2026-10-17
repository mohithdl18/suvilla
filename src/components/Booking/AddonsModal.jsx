"use client";

import { useMemo, useState } from "react";
import pricing from "@/data/pricing.json";

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

function Counter({
    label,
    value,
    min,
    max,
    onChange,
    disabled = false,
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-2">
            <span className="text-sm font-medium">{label}</span>

            <div className="flex w-[150px] shrink-0 items-center justify-between">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={disabled || value <= min}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-lg transition disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                        borderColor: COLORS.foreground,
                        color: COLORS.foreground,
                    }}
                >
                    −
                </button>

                <span className="w-6 text-center text-sm font-semibold">
                    {value}
                </span>

                <button
                    type="button"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={disabled || value >= max}
                    aria-label={`Increase ${label.toLowerCase()}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-lg transition disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                        borderColor: COLORS.accent,
                        backgroundColor: COLORS.accent,
                        color: COLORS.foreground,
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default function AddonsModal({
    room,
    checkIn,
    checkOut,
    nights = 1,
    adults = 2,
    children = 0,
    onContinue,
    onClose,
}) {
    const [driver, setDriver] = useState(false);

    const initialExtraAdults = Math.max(
        0,
        adults - pricing.includedGuests
    );

    const [extraAdults, setExtraAdults] = useState(initialExtraAdults);
    const [childCount, setChildCount] = useState(children);

    const totalGuests = pricing.includedGuests + extraAdults + childCount;

    const mealOptions = [
        {
            id: "lunch",
            label: "Lunch",
            description: "Lunch for your selected guests.",
            price: pricing.meals.lunch,
        },
        {
            id: "dinner",
            label: "Dinner",
            description: "Dinner for your selected guests.",
            price: pricing.meals.dinner,
        },
        {
            id: "lunchAndDinner",
            label: "Lunch + Dinner",
            description: "Both meals for your selected guests.",
            price: pricing.meals.lunchAndDinner,
        },
    ];

    const [mealSelections, setMealSelections] = useState({});

    // Keep every selected meal synchronized with the guest count.
    // This also handles decreasing the number of guests.
    function updateGuestCount(type, value) {
        const nextExtraAdults =
            type === "adults" ? value : extraAdults;

        const nextChildren =
            type === "children" ? value : childCount;

        const nextTotalGuests =
            pricing.includedGuests +
            nextExtraAdults +
            nextChildren;

        if (type === "adults") {
            setExtraAdults(value);
        } else {
            setChildCount(value);
        }

        setMealSelections((current) => {
            const updated = { ...current };

            for (const option of mealOptions) {
                const selection = updated[option.id];

                if (selection?.selected) {
                    updated[option.id] = {
                        ...selection,
                        people: nextTotalGuests,
                    };
                }
            }

            return updated;
        });
    }

    const selectedMealIds = mealOptions
        .filter((option) => mealSelections[option.id]?.selected)
        .map((option) => option.id);

    function toggleMeal(mealId) {
        setMealSelections((current) => {
            const existing = current[mealId];

            if (existing?.selected) {
                return {
                    ...current,
                    [mealId]: {
                        ...existing,
                        selected: false,
                    },
                };
            }

            return {
                ...current,
                [mealId]: {
                    selected: true,
                    people: totalGuests,
                },
            };
        });
    }

    function updateMealPeople(mealId, people) {
        setMealSelections((current) => ({
            ...current,
            [mealId]: {
                ...current[mealId],
                people: Math.max(
                    1,
                    Math.min(totalGuests, people)
                ),
            },
        }));
    }

    const addonSummary = useMemo(() => {
        const items = [];

        if (extraAdults > 0) {
            items.push({
                id: "extraAdults",
                label: `${extraAdults} extra ${
                    extraAdults === 1 ? "adult" : "adults"
                }`,
                amount:
                    extraAdults *
                    pricing.extraAdult.price *
                    nights,
            });
        }

        if (childCount > 0) {
            items.push({
                id: "children",
                label: `${childCount} ${
                    childCount === 1 ? "child" : "children"
                }`,
                amount:
                    childCount *
                    pricing.child.price *
                    nights,
            });
        }

        for (const option of mealOptions) {
            const selection = mealSelections[option.id];

            if (!selection?.selected) continue;

            items.push({
                id: option.id,
                label: `${option.label} (${selection.people} ${
                    selection.people === 1 ? "person" : "people"
                })`,
                amount:
                    option.price *
                    selection.people *
                    nights,
            });
        }

        if (driver) {
            items.push({
                id: "driver",
                label: "Driver accommodation",
                amount: pricing.driver.price * nights,
            });
        }

        return items;
    }, [
        extraAdults,
        childCount,
        mealSelections,
        driver,
        nights,
    ]);

    const addonsTotal = addonSummary.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    function handleContinue() {
        const meals = {};

        for (const option of mealOptions) {
            const selection = mealSelections[option.id];

            if (selection?.selected) {
                meals[option.id] = {
                    selected: true,
                    people: selection.people,
                    pricePerPersonPerNight: option.price,
                    total:
                        option.price *
                        selection.people *
                        nights,
                };
            }
        }

        onContinue?.({
            adults: pricing.includedGuests + extraAdults,
            extraAdults,
            children: childCount,
            totalGuests,
            mealPlan: selectedMealIds,
            meals,
            driver,
            items: addonSummary,
            total: addonsTotal,
        });
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="addons-title"
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl p-5 shadow-2xl sm:rounded-2xl sm:p-7"
                style={{
                    backgroundColor: COLORS.background,
                    color: COLORS.foreground,
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                            Booking · Step 1 of 3
                        </p>

                        <h2
                            id="addons-title"
                            className="mt-2 text-2xl font-semibold"
                        >
                            Customize your stay
                        </h2>

                        <p className="mt-1 text-sm opacity-70">
                            {room?.name || "Selected room"} · {nights}{" "}
                            {nights === 1 ? "night" : "nights"}
                        </p>

                        {checkIn && checkOut && (
                            <p className="mt-1 text-xs opacity-60">
                                {checkIn} to {checkOut}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close add-ons"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-black/5"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                </div>

                {/* Guests */}
                <section className="mt-7">
                    <h3 className="font-semibold">Guests</h3>

                    <div className="mt-3 space-y-3 rounded-xl border border-black/10 bg-white/50 p-4">
                        <Counter
                            label="Included guests"
                            value={pricing.includedGuests}
                            min={pricing.includedGuests}
                            max={pricing.includedGuests}
                            onChange={() => {}}
                            disabled
                        />

                        <Counter
                            label="Extra adults"
                            value={extraAdults}
                            min={0}
                            max={18}
                            onChange={(value) =>
                                updateGuestCount("adults", value)
                            }
                        />

                        <Counter
                            label="Children"
                            value={childCount}
                            min={0}
                            max={20}
                            onChange={(value) =>
                                updateGuestCount("children", value)
                            }
                        />

                        <p className="text-xs opacity-60">
                            Extra adult: {formatINR(pricing.extraAdult.price)}{" "}
                            per person per night. Child rates are based on
                            the configured child pricing.
                        </p>

                        <div className="border-t border-black/10 pt-3 text-sm font-semibold">
                            Total guests: {totalGuests}
                        </div>
                    </div>
                </section>

                {/* Meals */}
                <section className="mt-7">
                    <h3 className="font-semibold">Meals</h3>

                    <p className="mt-1 text-xs opacity-60">
                        Select any combination of meals. Meal quantities
                        automatically follow your guest count.
                    </p>

                    <div className="mt-3 space-y-2">
                        {mealOptions.map((option) => {
                            const selection = mealSelections[option.id];
                            const selected = Boolean(selection?.selected);

                            return (
                                <div
                                    key={option.id}
                                    className="overflow-hidden rounded-xl border transition"
                                    style={{
                                        borderColor: selected
                                            ? COLORS.accent
                                            : `${COLORS.foreground}20`,
                                        backgroundColor: selected
                                            ? `${COLORS.accent}20`
                                            : "transparent",
                                    }}
                                >
                                    <label className="flex cursor-pointer items-start gap-3 p-3">
                                        <input
                                            type="checkbox"
                                            checked={selected}
                                            onChange={() =>
                                                toggleMeal(option.id)
                                            }
                                            className="mt-1 h-4 w-4 accent-[#e4b441]"
                                        />

                                        <span className="flex-1">
                                            <span className="block text-sm font-semibold">
                                                {option.label}
                                            </span>

                                            <span className="mt-1 block text-xs opacity-65">
                                                {option.description}
                                            </span>
                                        </span>

                                        <span className="text-sm font-semibold">
                                            {formatINR(option.price)} / person
                                            / night
                                        </span>
                                    </label>

                                    {selected && (
                                        <div
                                            className="border-t px-3 py-3"
                                            style={{
                                                borderColor: `${COLORS.foreground}15`,
                                            }}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Number of people
                                                    </p>

                                                    <p className="mt-1 text-xs opacity-60">
                                                        {formatINR(
                                                            option.price *
                                                                selection.people *
                                                                nights
                                                        )}{" "}
                                                        total for {nights}{" "}
                                                        {nights === 1
                                                            ? "night"
                                                            : "nights"}
                                                    </p>
                                                </div>

                                                <Counter
                                                    label={`${option.label} people`}
                                                    value={selection.people}
                                                    min={1}
                                                    max={totalGuests}
                                                    onChange={(value) =>
                                                        updateMealPeople(
                                                            option.id,
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Driver */}
                <section className="mt-7">
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-black/10 p-4">
                        <span>
                            <span className="block font-semibold">
                                Driver accommodation
                            </span>

                            <span className="mt-1 block text-xs opacity-60">
                                {formatINR(pricing.driver.price)} per night
                            </span>
                        </span>

                        <input
                            type="checkbox"
                            checked={driver}
                            onChange={(event) =>
                                setDriver(event.target.checked)
                            }
                            className="h-4 w-4 accent-[#e4b441]"
                        />
                    </label>
                </section>

                {/* Add-on summary */}
                <section className="mt-7 rounded-xl border border-black/10 p-4">
                    <h3 className="font-semibold">Add-ons summary</h3>

                    {addonSummary.length === 0 ? (
                        <p className="mt-3 text-sm opacity-60">
                            No additional charges selected.
                        </p>
                    ) : (
                        <div className="mt-3 space-y-2">
                            {addonSummary.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between gap-4 text-sm"
                                >
                                    <span>{item.label}</span>

                                    <span className="font-medium">
                                        {formatINR(item.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 flex justify-between border-t border-black/10 pt-3">
                        <span className="font-semibold">Add-ons total</span>

                        <span className="text-lg font-bold">
                            {formatINR(addonsTotal)}
                        </span>
                    </div>

                    <p className="mt-2 text-xs opacity-60">
                        Final tax and platform fee will be calculated at
                        checkout.
                    </p>
                </section>

                {/* Actions */}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-black/15 px-5 py-3 text-sm font-semibold transition hover:bg-black/5"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleContinue}
                        className="rounded-xl px-6 py-3 text-sm font-bold transition hover:brightness-95"
                        style={{
                            backgroundColor: COLORS.accent,
                            color: COLORS.foreground,
                        }}
                    >
                        Continue to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}