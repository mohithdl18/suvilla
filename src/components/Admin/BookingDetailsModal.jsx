
"use client";

import { useEffect } from "react";

function formatLabel(value) {
  return String(value)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value) {
  if (!value || typeof value !== "string") return value ?? "—";

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return value;

  const [, year, month, day] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return String(value ?? "—");

  return `₹${amount.toLocaleString("en-IN")}`;
}

function DetailCard({ label, value, field = "" }) {
  const normalizedField = field.toLowerCase();

  if (value === undefined || value === null || value === "") {
    value = "—";
  }

  let displayValue = value;

  if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  } else if (
    typeof value === "number" &&
    /(price|amount|total|tax|subtotal|cost|charge|revenue)/i.test(
      normalizedField
    )
  ) {
    displayValue = formatMoney(value);
  } else if (
    typeof value === "string" &&
    /(check_in|check_out|created_at|updated_at|booking_date)/i.test(
      normalizedField
    )
  ) {
    displayValue = formatDate(value);
  } else if (Array.isArray(value)) {
    displayValue = value.length ? value.join(", ") : "—";
  } else if (typeof value === "object") {
    displayValue = JSON.stringify(value);
  }

  return (
    <div className="min-w-0 rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p className="text-xs font-medium text-gray-500">{label}</p>

      <p className="mt-1 break-words text-sm font-medium text-gray-900">
        {String(displayValue)}
      </p>
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="border-b border-gray-100 py-5 last:border-b-0">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
        {title}
      </h3>

      {children}
    </section>
  );
}

function DetailGrid({ details }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {details.map(([key, value]) => (
        <DetailCard
          key={key}
          label={formatLabel(key)}
          field={key}
          value={value}
        />
      ))}
    </div>
  );
}

export default function BookingDetailsModal({ booking, onClose }) {
  useEffect(() => {
    if (!booking) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [booking, onClose]);

  if (!booking) return null;

  const customer = booking.customer || {};
  const guests = booking.guests || {};
  const meals = booking.meals || {};
  const prices = booking.price_breakdown || {};

  const additionalDetails = Object.fromEntries(
    Object.entries(booking).filter(
      ([key]) =>
        ![
          "_id",
          "booking_id",
          "customer",
          "room_id",
          "room_name",
          "check_in",
          "check_out",
          "nights",
          "guests",
          "meals",
          "driver",
          "price_breakdown",
          "booking_status",
          "payment_status",
        ].includes(key)
    )
  );

  const guestDetails = {
    included_adults: guests.included_adults ?? 2,
    extra_adults: guests.extra_adults ?? booking.extra_adults ?? 0,
    children: guests.children ?? booking.children ?? 0,
  };

  const mealDetails = {
    breakfasts: meals.breakfasts ?? booking.breakfasts ?? 0,
    lunches: meals.lunches ?? booking.lunches ?? 0,
    dinners: meals.dinners ?? booking.dinners ?? 0,
  };

  const total = prices.total;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              SU VILLA · Booking Details
            </p>

            <h2
              id="booking-modal-title"
              className="mt-2 break-words text-xl font-bold text-gray-900 sm:text-2xl"
            >
              {booking.booking_id || "Booking Details"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {booking.room_name || booking.room_id || "Room not specified"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            ×
          </button>
        </div>

        {/* Scrollable details */}
        <div className="overflow-y-auto px-5 sm:px-6">
          <DetailSection title="Booking Information">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailCard
                label="Booking ID"
                value={booking.booking_id}
              />

              <DetailCard
                label="Room"
                value={booking.room_name || booking.room_id}
              />

              <DetailCard
                label="Check-in"
                field="check_in"
                value={booking.check_in}
              />

              <DetailCard
                label="Check-out"
                field="check_out"
                value={booking.check_out}
              />

              <DetailCard
                label="Number of Nights"
                value={booking.nights}
              />

              <DetailCard
                label="Booking Status"
                value={booking.booking_status}
              />

              <DetailCard
                label="Payment Status"
                value={booking.payment_status}
              />
            </div>
          </DetailSection>

          <DetailSection title="Customer Details">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailCard
                label="Full Name"
                value={customer.name}
              />

              <DetailCard
                label="Phone Number"
                value={customer.phone}
              />

              <DetailCard
                label="Email Address"
                value={customer.email}
              />
            </div>
          </DetailSection>

          <DetailSection title="Guest Details">
            <DetailGrid details={Object.entries(guestDetails)} />
          </DetailSection>

          <DetailSection title="Meals and Extras">
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailCard
                label="Breakfast Quantity"
                value={mealDetails.breakfasts}
              />

              <DetailCard
                label="Lunch Quantity"
                value={mealDetails.lunches}
              />

              <DetailCard
                label="Dinner Quantity"
                value={mealDetails.dinners}
              />

              <DetailCard
                label="Driver Included"
                value={booking.driver}
              />
            </div>
          </DetailSection>

          <DetailSection title="Complete Price Breakdown">
            {Object.keys(prices).length > 0 ? (
              <DetailGrid details={Object.entries(prices)} />
            ) : (
              <p className="text-sm text-gray-500">
                No price breakdown is stored for this booking.
              </p>
            )}

            {total !== undefined && total !== null && (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-gray-900 p-4 text-white">
                <span className="text-sm font-medium">Grand Total</span>

                <span className="text-xl font-bold">
                  {formatMoney(total)}
                </span>
              </div>
            )}
          </DetailSection>

          {Object.keys(additionalDetails).length > 0 && (
            <DetailSection title="Additional Booking Information">
              <DetailGrid details={Object.entries(additionalDetails)} />
            </DetailSection>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end border-t border-gray-200 bg-gray-50 p-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
