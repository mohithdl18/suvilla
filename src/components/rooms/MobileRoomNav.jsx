"use client";

export default function RoomNav({ rooms, activeRoom, onSelect }) {
  return (
<section className="sticky top-0 z-40 border-b border-foreground/10 bg-white/60 backdrop-blur-sm md:hidden">      <div className="mx-auto flex w-full max-w-[1600px] px-3 md:overflow-x-auto md:px-20">
        {rooms.map((room) => {
          const isActive = activeRoom === room.id;

          return (
            <button
              key={room.id}
              onClick={() => onSelect(room.id)}
              className={`group relative min-w-0 flex-1 px-2 py-4 text-center transition-all duration-300 sm:px-4 md:min-w-[180px] md:px-5 md:py-5 md:text-left lg:px-6 lg:py-6 ${
                isActive
                  ? "bg-accent text-primary"
                  : "bg-transparent text-foreground hover:bg-foreground/5"
              }`}
            >
              {/* Mobile */}
              <span
                className={`block text-xs tracking-[0.15em] md:hidden ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/50 group-hover:text-foreground"
                }`}
              >
                #{room.number}
              </span>

              {/* Desktop */}
              <span
                className={`hidden text-right text-[12px] tracking-[0.18em] transition-colors duration-300 md:block md:text-xs ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/40 group-hover:text-foreground"
                }`}
              >
                {room.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}