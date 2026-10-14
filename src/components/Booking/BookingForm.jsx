
"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import BookingStepHeader from "@/components/Booking/BookingStepHeader";
import Checkout from "@/components/Booking/Checkout";

const emptyCustomer = {
  name: "",
  email: "",
  phone: "",
};

const emptyBilling = {
  address: "",
  city: "",
  pincode: "",
};

function getRemainingSeconds(deadline) {
  if (!deadline) return 0;

  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function BookingForm() {
  const [form, setForm] = useState(null);
  const [quote, setQuote] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    function handleBookingSelection(event) {
      const selection = event.detail;

      setForm({
        ...selection,
        customer: { ...emptyCustomer },
        billing: { ...emptyBilling },
        special_request: "",
      });

      setQuote(null);
      setCheckoutOpen(false);
      setBooking(null);
      setError("");
      setTimeLeft(getRemainingSeconds(selection.expiresAt));
    }

    function handleBookingExpired() {
      setForm(null);
      setQuote(null);
      setCheckoutOpen(false);
      setTimeLeft(300);
      setError(
        "Your five-minute booking session has expired. Please select a room again."
      );
    }

    function handleBookingCancelled() {
      setForm(null);
      setQuote(null);
      setCheckoutOpen(false);
      setTimeLeft(300);
    }

    window.addEventListener(
      "suvilla:booking-selection",
      handleBookingSelection
    );

    window.addEventListener(
      "suvilla:booking-expired",
      handleBookingExpired
    );

    window.addEventListener(
      "suvilla:booking-cancelled",
      handleBookingCancelled
    );

    return () => {
      window.removeEventListener(
        "suvilla:booking-selection",
        handleBookingSelection
      );

      window.removeEventListener(
        "suvilla:booking-expired",
        handleBookingExpired
      );

      window.removeEventListener(
        "suvilla:booking-cancelled",
        handleBookingCancelled
      );
    };
  }, []);

  // Keep the same deadline throughout the booking process.
  useEffect(() => {
    if (!form?.expiresAt) return;

    const updateTimer = () => {
      const remaining = getRemainingSeconds(form.expiresAt);
      setTimeLeft(remaining);

      if (remaining === 0) {
        window.dispatchEvent(
          new CustomEvent("suvilla:booking-expired")
        );
      }
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 250);

    return () => window.clearInterval(interval);
  }, [form?.expiresAt]);

  function updateCustomer(key, value) {
    setForm((current) => ({
      ...current,
      customer: {
        ...current.customer,
        [key]: value,
      },
    }));
  }

  function updateBilling(key, value) {
    setForm((current) => ({
      ...current,
      billing: {
        ...current.billing,
        [key]: value,
      },
    }));
  }

  function closeDetails() {
    setForm(null);
    setQuote(null);
    setCheckoutOpen(false);

    window.dispatchEvent(
      new CustomEvent("suvilla:booking-cancelled")
    );
  }

  async function handleConfirmAndBook(event) {
    event.preventDefault();

    if (!form) return;

    if (Date.now() >= form.expiresAt) {
      window.dispatchEvent(
        new CustomEvent("suvilla:booking-expired")
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const freshQuote = await apiRequest("/pricing/quote", {
        method: "POST",
        body: JSON.stringify({
          room_id: form.room_id,
          check_in: form.check_in,
          check_out: form.check_out,
          extra_adults: Number(form.extra_adults || 0),
          children: Number(form.children || 0),
          breakfasts: Number(form.breakfasts || 0),
          lunches: Number(form.lunches || 0),
          dinners: Number(form.dinners || 0),
          driver: Boolean(form.driver),
        }),
      });

      if (Date.now() >= form.expiresAt) {
        window.dispatchEvent(
          new CustomEvent("suvilla:booking-expired")
        );
        return;
      }

      setQuote(freshQuote);
      setCheckoutOpen(true);
    } catch (err) {
      setError(err.message || "Could not prepare checkout.");
    } finally {
      setLoading(false);
    }
  }

  // Final booking submission.
  async function handleBook() {
    if (!form || !quote || loading) return;

    if (Date.now() >= form.expiresAt) {
      window.dispatchEvent(
        new CustomEvent("suvilla:booking-expired")
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify({
          customer: {
            ...form.customer,
            billing: form.billing,
            special_request: form.special_request,
          },
          room_id: form.room_id,
          check_in: form.check_in,
          check_out: form.check_out,
          extra_adults: Number(form.extra_adults || 0),
          children: Number(form.children || 0),
          breakfasts: Number(form.breakfasts || 0),
          lunches: Number(form.lunches || 0),
          dinners: Number(form.dinners || 0),
          driver: Boolean(form.driver),
        }),
      });

      setBooking(result);
      setForm(null);
      setQuote(null);
      setCheckoutOpen(false);

      window.dispatchEvent(
        new CustomEvent("suvilla:booking-completed")
      );
    } catch (err) {
      setError(
        `${err.message || "Booking failed."} Please check availability and try again.`
      );
    } finally {
      setLoading(false);
    }
  }

  // Booking success screen.
  if (booking) {
    return (
      <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/60 p-4">
        <section
          role="dialog"
          aria-modal="true"
          className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            ✓
          </div>

          <h2 className="text-center text-2xl font-bold text-slate-900">
            Booking confirmed
          </h2>

          <p className="text-center text-sm text-slate-600">
            Your booking has been submitted successfully.
          </p>

          <div className="space-y-2 rounded-xl border p-4 text-sm">
            <p>
              <strong>Booking ID:</strong> {booking.booking_id}
            </p>

            <p>
              <strong>Room:</strong>{" "}
              {booking.room_name || "Selected room"}
            </p>

            <p>
              <strong>Check-in:</strong> {booking.check_in}
            </p>

            <p>
              <strong>Check-out:</strong> {booking.check_out}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              {money(booking.price_breakdown?.total)}
            </p>

            <p>
              <strong>Payment status:</strong>{" "}
              {booking.payment_status || "Not paid"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBooking(null)}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Done
          </button>
        </section>
      </div>
    );
  }

  // Nothing is shown until the customer selects a room.
  if (!form) {
    return error ? (
      <p
        role="alert"
        className="mx-auto my-4 max-w-xl rounded-lg bg-red-50 p-3 text-sm text-red-700"
      >
        {error}
      </p>
    ) : null;
  }

  return (
    <>
      {/* Step 3: Customer details */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-3 sm:p-5">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-details-title"
          className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <BookingStepHeader step={3} timeLeft={timeLeft} />

          <header className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                SU VILLA
              </p>

              <h2
                id="customer-details-title"
                className="mt-1 text-xl font-bold text-slate-900"
              >
                Your details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your information before checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={closeDetails}
              disabled={loading}
              aria-label="Close customer details"
              className="rounded-full px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100 disabled:opacity-50"
            >
              ×
            </button>
          </header>

          <form
            onSubmit={handleConfirmAndBook}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <section className="space-y-3">
                <h3 className="font-semibold text-slate-900">
                  Contact information
                </h3>

                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={form.customer.name}
                    onChange={(event) =>
                      updateCustomer("name", event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="mt-1 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    value={form.customer.email}
                    onChange={(event) =>
                      updateCustomer("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <input
                    required
                    type="tel"
                    minLength={7}
                    maxLength={20}
                    autoComplete="tel"
                    value={form.customer.phone}
                    onChange={(event) =>
                      updateCustomer("phone", event.target.value)
                    }
                    placeholder="Enter phone number"
                    className="mt-1 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </section>

              <section className="space-y-3">
                <h3 className="font-semibold text-slate-900">
                  Billing information
                </h3>

                <label className="block text-sm font-medium text-slate-700">
                  Address
                  <textarea
                    required
                    maxLength={300}
                    autoComplete="street-address"
                    rows={2}
                    value={form.billing.address}
                    onChange={(event) =>
                      updateBilling("address", event.target.value)
                    }
                    placeholder="House number, street, locality"
                    className="mt-1 w-full resize-y rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    City
                    <input
                      required
                      maxLength={100}
                      autoComplete="address-level2"
                      value={form.billing.city}
                      onChange={(event) =>
                        updateBilling("city", event.target.value)
                      }
                      placeholder="City"
                      className="mt-1 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Pincode
                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      autoComplete="postal-code"
                      value={form.billing.pincode}
                      onChange={(event) =>
                        updateBilling(
                          "pincode",
                          event.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      placeholder="6-digit pincode"
                      className="mt-1 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
              </section>

              <section>
                <label className="block text-sm font-medium text-slate-700">
                  Special requests (optional)
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={form.special_request}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        special_request: event.target.value,
                      }))
                    }
                    placeholder="Any special requests for your stay?"
                    className="mt-1 w-full resize-y rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </section>

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
                disabled={loading}
                onClick={closeDetails}
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || timeLeft <= 0}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Preparing checkout..." : "Confirm and Book"}
              </button>
            </footer>
          </form>
        </section>
      </div>

      {/* Final checkout modal */}
      {checkoutOpen && quote && (
        <Checkout
          form={form}
          quote={quote}
          timeLeft={timeLeft}
          loading={loading}
          error={error}
          onBack={() => setCheckoutOpen(false)}
          onBook={handleBook}
          onClose={() => {
            if (!loading) setCheckoutOpen(false);
          }}
        />
      )}
    </>
  );
}
