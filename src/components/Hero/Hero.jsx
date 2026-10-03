export default function Hero() {
  return (
    <section className="relative h-[110vh] w-full overflow-hidden bg-primary">

      {/* Hero Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/images/Hero2.jpeg"
          alt="SU Villa by the Creek"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Bottom Left Content */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="mb-16 ml-8 text-left text-primary md:mb-20 md:ml-16 lg:mb-50 lg:ml-20">

          <h1 className="font-body text-5xl font-medium tracking-wide md:text-7xl lg:text-9xl">
            SU VILLA
          </h1>

          <p className="mt-2 font-body uppercase text-3xl text-accent md:text-4xl lg:text-5xl">
            by the creek
          </p>

          <p className="mt-6 max-w-md font-body text-sm uppercase tracking-[0.25em] text-foreground-90 md:text-base">
            Where nature meets serenity
          </p>

        </div>
      </div>

    </section>
  );
}