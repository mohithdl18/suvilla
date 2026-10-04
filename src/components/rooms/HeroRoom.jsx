import { House } from "lucide-react";
import Link from "next/link";

export default function HeroRoom() {
  return (
    <section className="relative h-[110vh] w-full overflow-hidden bg-primary">

      {/* Hero Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/images/rooms/room-hero.jpeg"
          alt="Rooms at SU Villa"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      <Link
        href="/"
        className="absolute left-6 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground transition-opacity duration-300 hover:opacity-70 md:left-12 md:top-6 lg:left-8"
        aria-label="Home"
      >
        <House
          size={20}
          strokeWidth={1.5}
        />
      </Link>

      {/* Bottom Left Content */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="mb-66 ml-8 text-left text-primary md:mb-20 md:ml-16 lg:mb-50 lg:ml-20">

          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary/80 md:text-base">
            SU VILLA
          </p>

          <h1 className="font-body text-5xl font-medium tracking-wide md:text-7xl lg:text-9xl">
            ROOMS
          </h1>

          <p className="mt-2 font-body text-3xl text-accent md:text-4xl lg:text-5xl">
            stay awhile
          </p>

          <p className="mt-6 max-w-md font-body text-sm uppercase tracking-[0.25em] text-primary/80 md:text-base">
            Spaces made for slowing down
          </p>

        </div>
      </div>

    </section>
  );
}