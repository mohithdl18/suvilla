
"use client";

export default function RoomCard({ room, quote, loading, guests, onSelect }) {
  const price = quote?.subtotal ?? null;
  const amenities = room.amenities || [];

  return (
    <article className="overflow-hidden rounded-xl border border-slate-300 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr_3fr]">
        <div className="min-w-0 p-4 md:p-5">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
            {room.image ? (
              <img
                src={room.image}
                alt={room.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                Room image
              </div>
            )}
          </div>

          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            {room.name}
          </h2>

          <p
            className={`mt-1 text-sm font-medium ${
              room.available ? "text-green-700" : "text-red-600"
            }`}
          >
            {room.available ? "Available" : "Unavailable"}
          </p>

          {!room.available && room.unavailable_dates?.length > 0 && (
            <p className="mt-1 break-words text-xs text-slate-500">
              Unavailable on: {room.unavailable_dates.join(", ")}
            </p>
          )}
        </div>

        <div className="min-w-0 border-t border-slate-200 p-4 md:border-l md:border-t-0 md:p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
            Amenities
          </h3>

          {amenities.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {amenities.map((amenity, index) => (
                <li
                  key={`${room.id}-${amenity}-${index}`}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-700"
                    aria-hidden="true"
                  >
                    <path
                      d="m4 10 4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="break-words">{amenity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Amenity details coming soon.
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-4 border-t border-slate-200 bg-slate-50 p-4 md:border-l md:border-t-0 md:p-5">
          <div>
            <p className="text-sm text-slate-500">Total stay price</p>

            {loading ? (
              <p className="mt-1 text-sm text-slate-500">
                Calculating price...
              </p>
            ) : price !== null ? (
              <>
                <p className="mt-1 break-words text-2xl font-bold text-slate-900">
                  ₹{Number(price).toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  For {quote.nights} night(s), excluding tax
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                Price unavailable
              </p>
            )}

            <p className="mt-1 text-xs text-slate-500">
              For {guests.adults + guests.children} guests
            </p>
          </div>

          <button
            type="button"
            disabled={!room.available || loading || !quote}
            onClick={() => onSelect(room)}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select Room
          </button>
        </div>
      </div>
    </article>
  );
}
