
"use client";

const STEPS = [
  { label: "Availability", number: 1 },
  { label: "Add-ons", number: 2 },
  { label: "Confirmation", number: 3 },
];

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export default function BookingStepHeader({ step, timeLeft }) {
  return (
    <div className="border-t-4 border-red-800 bg-slate-100">
      <div className="flex items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-1 sm:gap-3">
          {STEPS.map((item, index) => {
            const completed = step > item.number;
            const active = step === item.number;

            return (
              <div
                key={item.number}
                className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold sm:h-10 sm:w-10 ${
                    completed || active
                      ? "bg-neutral-800 text-white"
                      : "bg-neutral-400 text-white"
                  }`}
                >
                  {completed ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : (
                    item.number
                  )}
                </div>

                <span
                  className={`hidden truncate text-sm sm:inline sm:text-base ${
                    active || completed
                      ? "text-slate-900"
                      : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>

                {index < STEPS.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-auto h-5 w-5 shrink-0 text-slate-700 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div
          role="timer"
          aria-label={`Time remaining ${formatTime(timeLeft)}`}
          className={`shrink-0 rounded-lg px-2 py-2 text-sm font-bold tabular-nums sm:px-3 sm:text-base ${
            timeLeft <= 60
              ? "bg-red-100 text-red-700"
              : "bg-white text-slate-800"
          }`}
        >
          <span className="mr-1 hidden sm:inline">Time left</span>
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}
