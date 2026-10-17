
"use client";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

function Counter({ label, description, value, min, max, onChange }) {
    return (
        <div className="flex items-center justify-between gap-6 py-3">
            <div>
                <p
                    className="text-sm font-semibold"
                    style={{ color: COLORS.foreground }}
                >
                    {label}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                    {description}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-lg transition disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                        borderColor: COLORS.foreground,
                        color: COLORS.foreground,
                    }}
                >
                    −
                </button>

                <span
                    className="w-5 text-center text-sm font-semibold"
                    style={{ color: COLORS.foreground }}
                >
                    {value}
                </span>

                <button
                    type="button"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
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

export default function GuestSelector({
    adults = 2,
    children = 0,
    onChange,
    onClose,
}) {
    function updateAdults(value) {
        onChange?.({
            adults: value,
            children,
        });
    }

    function updateChildren(value) {
        onChange?.({
            adults,
            children: value,
        });
    }

    return (
        <div
            className="w-full rounded-2xl border p-4 shadow-xl"
            style={{
                backgroundColor: COLORS.background,
                borderColor: `${COLORS.foreground}20`,
            }}
        >
            <div className="mb-2">
                <h3
                    className="text-base font-semibold"
                    style={{ color: COLORS.foreground }}
                >
                    Guests
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                    Select the number of guests for your stay.
                </p>
            </div>

            <div className="divide-y divide-gray-200">
                <Counter
                    label="Adults"
                    description="Minimum 2 adults"
                    value={adults}
                    min={2}
                    max={20}
                    onChange={updateAdults}
                />

                <Counter
                    label="Children"
                    description="Ages and applicable charges can be confirmed later"
                    value={children}
                    min={0}
                    max={20}
                    onChange={updateChildren}
                />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <p
                    className="text-sm font-medium"
                    style={{ color: COLORS.foreground }}
                >
                    {adults + children} guests
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-5 py-2 text-sm font-semibold transition hover:brightness-95"
                    style={{
                        backgroundColor: COLORS.accent,
                        color: COLORS.foreground,
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
