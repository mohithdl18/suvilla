
"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import BookingStepHeader from "@/components/Booking/BookingStepHeader";

const ADDONS = [
  {
    key: "extra_adults",
    label: "Extra adults",
    price: 4000,
    unit: "per adult / night",
    max: 10,
  },
  {
    key: "children",
    label: "Children",
    price: 2000,
    unit: "per child / night",
    max: 10,
  },
  {
    key: "breakfasts",
    label: "Additional breakfast",
    price: 450,
    unit: "per serving",
    max: 50,
  },
  {
    key: "lunches",
    label: "Lunch",
    price: 550,
    unit: "per serving",
    max: 50,
  },
  {
    key: "dinners",
    label: "Dinner",
    price: 650,
    unit: "per serving",
    max: 50,
  },
];

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function AddonsModal({
  room,
  checkIn,
  checkOut,
  guests,
  expiresAt,
  timeLeft,
  onClose,
  onContinue,
}) {
  const [addons, setAddons] = useState({
    extra_adults: Math.max(0, guests.adults - 2),
    children: guests.children,
    breakfasts: 0,
    lunches: 0,
    dinners: 0,
    driver: false,
  });

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function calculateQuote() {
      setLoading(true);
      setError("");

      try {
        const data = await apiRequest("/pricing/quote", {
          method: "POST",
          body: JSON.stringify({
            room_id: room.id,
            check_in: checkIn,
            check_out: checkOut,
            extra_adults: addons.extra_adults,
            children: addons.children,
            breakfasts: addons.breakfasts,
            lunches: addons.lunches,
            dinners: addons.dinners,
            driver: addons.driver,
          }),
        });

        if (!cancelled) setQuote(data);
      } catch (err) {
        if (!cancelled) {
          setQuote(null);
          setError(err.message || "Unable to calculate the price.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (Date.now() < expiresAt) {
      calculateQuote();
    } else {
      setQuote(null);
      setError("Your booking session has expired. Select a room again.");
    }

    return () => {
      cancelled = true;
    };
  }, [room.id, checkIn, checkOut, addons, expiresAt]);

  useEffect(() => {
    function handleExpiry() {
      setError("Your booking session has expired. Select a room again.");
    }

    window.addEventListener("suvilla:booking-expired", handleExpiry);

    return () => {
      window.removeEventListener("suvilla:booking-expired", handleExpiry);
    };
  }, []);

  function changeQuantity(key, amount, maximum) {
    setAddons((current) => ({
      ...current,
      [key]: Math.max(0, Math.min(maximum, current[key] + amount)),
    }));
  }

  function continueToDetails() {
    if (Date.now() >= expiresAt) {
      window.dispatchEvent(new CustomEvent("suvilla:booking-expired"));
      return;
    }

    if (!quote || loading) return;

    onContinue({
      room_id: room.id,
      room_name: room.name,
      check_in: checkIn,
      check_out: checkOut,
      ...addons,
      quote,
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="addons-title"
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <BookingStepHeader step={2} timeLeft={timeLeft} />

        <header className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <div>
            <h2 id="addons-title" className="text-xl font-bold text-slate-900">
              Add-ons
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {room.name} · {checkIn} to {checkOut}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close add-ons"
            className="rounded-full px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </header>

        <div className="flex-1 space-y-1 overflow-y-auto px-5 py-4 sm:px-6">
          <p className="mb-2 text-xs text-slate-500">
            Add-on prices shown exclude tax.
          </p>

          {ADDONS.map((addon) => (
            <div
              key={addon.key}
              className="flex items-center justify-between gap-3 border-b border-slate-100 py-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{addon.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {money(addon.price)} {addon.unit}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  aria-label={`Remove ${addon.label}`}
                  disabled={addons[addon.key] === 0}
                  onClick={() => changeQuantity(addon.key, -1, addon.max)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                >
                  −
                </button>

                <span className="w-5 text-center text-sm font-semibold">
                  {addons[addon.key]}
                </span>

                <button
                  type="button"
                  aria-label={`Add ${addon.label}`}
                  disabled={addons[addon.key] >= addon.max}
                  onClick={() => changeQuantity(addon.key, 1, addon.max)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between gap-3 py-4">
            <div>
              <p className="font-semibold text-slate-900">
                Driver accommodation
              </p>
              <p className="mt-1 text-xs text-slate-500">
                ₹1,500 per stay · breakfast included
              </p>
            </div>

            <input
              type="checkbox"
              checked={addons.driver}
              onChange={(event) =>
                setAddons((current) => ({
                  ...current,
                  driver: event.target.checked,
                }))
              }
              aria-label="Include driver accommodation"
              className="h-5 w-5 accent-blue-600"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
        </div>

        <footer className="border-t bg-slate-50 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm text-slate-600">
                Estimated total
              </span>
              <p className="text-xs text-slate-500">Excluding 12% tax</p>
            </div>

            <span className="text-xl font-bold text-slate-900">
              {quote
                ? money(quote.subtotal)
                : loading
                  ? "Calculating..."
                  : "—"}
            </span>
          </div>

          <button
            type="button"
            disabled={!quote || loading || timeLeft <= 0}
            onClick={continueToDetails}
            className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Details
          </button>
        </footer>
      </section>
    </div>
  );
}
