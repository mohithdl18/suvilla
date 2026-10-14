
"use client";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminCalendar({
  selectedDate,
  onSelectDate,
  currentMonth,
  onChangeMonth,
  bookingCounts = {},
}) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <section className="rounded-xl border bg-white p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {currentMonth.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => onChangeMonth(-1)}
            className="rounded-lg border px-3 py-2 transition hover:bg-gray-100"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next month"
            onClick={() => onChangeMonth(1)}
            className="rounded-lg border px-3 py-2 transition hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center sm:gap-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-xs font-semibold text-gray-500 sm:text-sm"
          >
            {day}
          </div>
        ))}

        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const dateString = formatDate(
            new Date(year, month, day)
          );

          const isSelected = selectedDate === dateString;

          const bookedCount = Math.min(
            4,
            Math.max(0, Number(bookingCounts[dateString]) || 0)
          );

          return (
            <button
              type="button"
              key={dateString}
              onClick={() => onSelectDate(dateString)}
              aria-pressed={isSelected}
              aria-label={`${dateString}, ${bookedCount} rooms booked or blocked`}
              className={`relative flex aspect-square min-w-0 items-center justify-center rounded-lg border-2 text-sm font-medium transition sm:text-base ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-blue-200 bg-white text-gray-800 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <span>{day}</span>

              <span
                className={`absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 px-1 text-[10px] font-bold leading-none shadow-sm ${
                  isSelected
                    ? "border-white bg-white text-blue-700"
                    : bookedCount > 0
                      ? "border-white bg-blue-600 text-white"
                      : "border-blue-200 bg-white text-gray-500"
                }`}
              >
                {bookedCount}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-xs text-gray-600 sm:text-sm">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border-2 border-blue-300" />
          Date
        </span>

        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-blue-600" />
          Selected date
        </span>

        <span className="flex items-center gap-2">
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
            2
          </span>
          Rooms booked or blocked
        </span>
      </div>
    </section>
  );
}
