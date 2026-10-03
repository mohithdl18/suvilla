"use client";

export default function RoomNav({ rooms, activeRoom, onSelect }) {
  return (
<section className="sticky top-0 z-40 hidden border-b border-foreground/10 bg-primary/60 backdrop-blur-sm md:block">      <div className="mx-auto flex w-full max-w-[1600px] overflow-x-auto px-6 md:px-20">
        {rooms.map((room) => {
          const isActive = activeRoom === room.id;

          return (
            <button
              key={room.id}
              onClick={() => onSelect(room.id)}
              className={`group relative min-w-[180px] flex-1 px-5 py-5 text-left transition-all duration-300 md:px-6 md:py-6 ${
                isActive
                  ? "bg-accent text-primary"
                  : "bg-transparent text-foreground hover:bg-foreground/5"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                {/* Number */}
                {/* <span
                  className={`text-xs transition-colors duration-300 ${
                    isActive
                      ? "text-primary/70"
                      : "text-foreground/30 group-hover:text-foreground/60"
                  }`}
                >
                  {room.number}
                </span> */}

                {/* Room Name */}
                <span
                  className={`text-right text-[12px] tracking-[0.18em] transition-colors duration-300 md:text-xs ${
                    isActive
                      ? "text-foreground"
                      : "text-foreground/40 group-hover:text-foreground"
                  }`}
                >
                  {room.shortName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}