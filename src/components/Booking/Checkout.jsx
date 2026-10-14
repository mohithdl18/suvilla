
"use client";

import { useState } from "react";
import BookingStepHeader from "@/components/Booking/BookingStepHeader";

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-900">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function Checkout({
  form,
  quote,
  timeLeft,
  loading,
  error,
  onBack,
  onBook,
  onClose,
}) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!form || !quote) return null;

  const roomName = form.room_name || form.room_id;

  const priceItems = [
    ["Room", quote.room_cost],
    ["Extra adults", quote.extra_adult_cost],
    ["Children", quote.child_cost],
    ["Additional breakfast", quote.breakfast_cost],
    ["Lunch + Dinner combo", quote.combined_meal_cost],
    ["Lunch", quote.lunch_cost],
    ["Dinner", quote.dinner_cost],
    ["Driver accommodation", quote.driver_cost],
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-3 sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <BookingStepHeader step={3} timeLeft={timeLeft} />

        <header className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              SU VILLA
            </p>
            <h2
              id="checkout-title"
              className="mt-1 text-xl font-bold text-slate-900"
            >
              Review your booking
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close checkout"
            className="rounded-full px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            ×
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          <section>
            <h3 className="mb-2 font-semibold text-slate-900">
              Stay and add-ons
            </h3>

            <div className="rounded-xl border border-slate-200 p-4">
              <Detail label="Room" value={roomName} />
              <Detail label="Check-in" value={form.check_in} />
              <Detail label="Check-out" value={form.check_out} />
              <Detail label="Nights" value={`${quote.nights} night(s)`} />
              <Detail label="Extra adults" value={form.extra_adults} />
              <Detail label="Children" value={form.children} />
              <Detail label="Breakfast servings" value={form.breakfasts} />
              <Detail label="Lunch servings" value={form.lunches} />
              <Detail label="Dinner servings" value={form.dinners} />
              <Detail
                label="Driver accommodation"
                value={form.driver ? "Yes" : "No"}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-slate-900">
              Customer details
            </h3>

            <div className="rounded-xl border border-slate-200 p-4">
              <Detail label="Name" value={form.customer?.name} />
              <Detail label="Email" value={form.customer?.email} />
              <Detail label="Phone" value={form.customer?.phone} />
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-slate-900">
              Billing details
            </h3>

            <div className="rounded-xl border border-slate-200 p-4">
              <Detail label="Address" value={form.billing?.address} />
              <Detail label="City" value={form.billing?.city} />
              <Detail label="Pincode" value={form.billing?.pincode} />
            </div>
          </section>

          {form.special_request?.trim() && (
            <section>
              <h3 className="mb-2 font-semibold text-slate-900">
                Special request
              </h3>

              <p className="whitespace-pre-wrap rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
                {form.special_request}
              </p>
            </section>
          )}

          <section>
            <h3 className="mb-2 font-semibold text-slate-900">
              Price breakdown
            </h3>

            <div className="rounded-xl border border-slate-200 p-4">
              {priceItems
                .filter(([, amount]) => Number(amount || 0) !== 0)
                .map(([label, amount]) => (
                  <Detail
                    key={label}
                    label={label}
                    value={money(amount)}
                  />
                ))}

              <div className="mt-3 border-t pt-3">
                <Detail label="Subtotal" value={money(quote.subtotal)} />
                <Detail label="Tax (12%)" value={money(quote.tax)} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 border-t pt-4 text-lg font-bold">
                <span>Total including tax</span>
                <span>{money(quote.total)}</span>
              </div>
            </div>
          </section>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
            />

            <span className="text-sm leading-6 text-slate-700">
              I have read and agree to the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                Terms and Conditions
              </a>
              .
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t bg-slate-50 px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-50"
          >
            Back to details
          </button>

          <button
            type="button"
            onClick={onBook}
            disabled={!acceptedTerms || loading || timeLeft <= 0}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loading ? "Processing..." : "Book"}
          </button>
        </footer>
      </section>
    </div>
  );
}
