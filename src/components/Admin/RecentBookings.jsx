
"use client";

function formatDisplayDate(value) {
  if (!value) return "—";

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
  if (value == null) return "—";

  const amount = Number(value);

  if (!Number.isFinite(amount)) return "—";

  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function RecentBookings({
  bookings = [],
  loading = false,
  cancellingBookingId = null,
  onRefresh,
  onCancel,
  onSelectBooking,
}) {
  return (
    <section className="rounded-xl border bg-white p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Recent Bookings</h2>

          <p className="mt-1 text-sm text-gray-500">
            All booking records, newest first. Select a booking to view
            its details or cancel it.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p className="py-6 text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="py-6 text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="px-3 py-3 font-medium">Booking ID</th>
                <th className="px-3 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Room</th>
                <th className="px-3 py-3 font-medium">Check-in</th>
                <th className="px-3 py-3 font-medium">Check-out</th>
                <th className="px-3 py-3 font-medium">Total</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => {
                const bookingId = booking.booking_id;
                const isCancelling = cancellingBookingId === bookingId;

                return (
                  <tr
                    key={bookingId}
                    onClick={() => onSelectBooking(booking)}
                    onKeyDown={(event) => {
                      if (
                        event.target === event.currentTarget &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        onSelectBooking(booking);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View booking ${bookingId}`}
                    className="cursor-pointer border-b transition-colors last:border-0 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                  >
                    <td className="px-3 py-4 font-medium text-blue-700">
                      {bookingId || "—"}
                    </td>

                    <td className="px-3 py-4">
                      {booking.customer?.name || "—"}
                    </td>

                    <td className="px-3 py-4">
                      {booking.room_name || booking.room_id || "—"}
                    </td>

                    <td className="px-3 py-4">
                      {formatDisplayDate(booking.check_in)}
                    </td>

                    <td className="px-3 py-4">
                      {formatDisplayDate(booking.check_out)}
                    </td>

                    <td className="px-3 py-4">
                      {formatMoney(booking.price_breakdown?.total)}
                    </td>

                    <td className="px-3 py-4">
                      <span className="inline-block whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                        {booking.booking_status || "—"}
                      </span>
                    </td>

                    <td
                      className="px-3 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={isCancelling}
                        onClick={() => onCancel(booking)}
                        className="whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isCancelling ? "Cancelling..." : "Cancel Booking"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
