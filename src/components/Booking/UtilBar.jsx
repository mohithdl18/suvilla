
"use client";

import { useState } from "react";

export default function UtilBar({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  guests,
  setGuests,
  onCheckRooms,
  loading,
}) {
  const [guestsOpen, setGuestsOpen] = useState(false);

  const totalGuests = guests.adults + guests.children;
  const maxGuests = totalGuests > 3 ? 6 : 6;

  function updateGuest(key, amount, minimum, maximum) {
    setGuests((current) => {
      const nextValue = Math.max(
        minimum,
        Math.min(maximum, current[key] + amount)
      );

      const next = { ...current, [key]: nextValue };

      // At least 2 adults, with a combined maximum of 6 guests.
      if (next.adults + next.children > 6) return current;

      return next;
    });
  }

  return (
    <form
      onSubmit={onCheckRooms}
      className="rounded-xl border border-slate-300 bg-white p-4 sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">
            Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            min={new Date().toLocaleDateString("en-CA")}
            required
            onChange={(event) => {
              const nextCheckIn = event.target.value;
              setCheckIn(nextCheckIn);

              if (checkOut <= nextCheckIn) {
                const tomorrow = new Date(`${nextCheckIn}T00:00:00`);
                tomorrow.setDate(tomorrow.getDate() + 1);

                setCheckOut(
                  [
                    tomorrow.getFullYear(),
                    String(tomorrow.getMonth() + 1).padStart(2, "0"),
                    String(tomorrow.getDate()).padStart(2, "0"),
                  ].join("-")
                );
              }
            }}
            className="h-12 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">
            Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            required
            onChange={(event) => setCheckOut(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="relative">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Guests
          </span>

          <button
            type="button"
            aria-expanded={guestsOpen}
            onClick={() => setGuestsOpen((open) => !open)}
            className="flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-slate-300 px-3 text-left outline-none hover:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            
<span className="min-w-0">
  <span className="block truncate text-sm font-medium text-slate-900">
    1 Room · {totalGuests} Guests
  </span>
  <span className="block truncate text-xs text-slate-500">
    {guests.adults} Adults · {guests.children} Children
  </span>
</span>


            <svg
              className={`h-4 w-4 shrink-0 transition-transform ${
                guestsOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {guestsOpen && (
            <>
              <button
                type="button"
                aria-label="Close guest options"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setGuestsOpen(false)}
              />

              <div className="absolute right-0 top-full z-20 mt-2 w-full min-w-[280px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:w-80">
                {/* Adults */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Adults
                    </p>
                    <p className="text-xs text-slate-500">
                      Minimum 2
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove adult"
                      disabled={guests.adults <= 2}
                      onClick={() =>
                        updateGuest("adults", -1, 2, 6)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {guests.adults}
                    </span>

                    <button
                      type="button"
                      aria-label="Add adult"
                      disabled={totalGuests >= 6}
                      onClick={() =>
                        updateGuest("adults", 1, 2, 6)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Children
                    </p>
                    <p className="text-xs text-slate-500">
                      Maximum 6 guests total
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove child"
                      disabled={guests.children <= 0}
                      onClick={() =>
                        updateGuest("children", -1, 0, 4)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {guests.children}
                    </span>

                    <button
                      type="button"
                      aria-label="Add child"
                      disabled={totalGuests >= 6}
                      onClick={() =>
                        updateGuest("children", 1, 0, 4)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-lg disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Maximum capacity: 6 guests for family suites; 3 for other rooms.
                </p>

                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="mt-3 h-10 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 md:min-w-[150px]"
        >
          {loading ? "Checking..." : "Check Rooms"}
        </button>
      </div>
    </form>
  );
}
