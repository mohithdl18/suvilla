export default function HeroMobile() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-primary">

      {/* Hero Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/images/Hero2.jpeg"
          alt="SU Villa by the Creek"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Bottom Left Content */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="mb-30 ml-7 text-left text-primary">

          <h1 className="font-body text-5xl font-medium tracking-wide">
            SU VILLA
          </h1>

          <p className="mt-2 font-body text-2xl uppercase text-accent">
            by the creek
          </p>

          <p className="mt-5 max-w-[320px] font-body text-xs uppercase tracking-[0.22em] text-foreground-90">
            Where nature meets serenity
          </p>

           <button
            className="mt-7 border border-primary px-7 py-3 font-body text-xs uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-foreground"
          >
            Book Now
          </button>

        </div>
      </div>

    </section>
  );
}