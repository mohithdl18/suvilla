export default function Main() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center bg-primary px-6 py-24 text-foreground md:px-12 lg:px-20">
      
      <div className="mx-auto max-w-5xl text-center">

        {/* Small Heading */}
        <p className="mb-5 font-body text-xs uppercase tracking-[0.35em] text-accent">
          Welcome to SU Villa
        </p>

        {/* Main Heading */}
        <h2 className="font-body text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Where nature slows you down,
          <br />
          <span className="font-light">
            and every stay feels like home.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl font-body text-sm leading-7 text-foreground/70 md:text-base md:leading-8">
          Tucked away in the lush landscapes of Sakleshpur, SU Villa is a
          peaceful escape where the beauty of the Western Ghats meets
          thoughtful comfort. Wake up to the sound of the creek, breathe in
          the fresh mountain air, and let the quiet become part of your stay.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <a
                        href="/about"
                        className=" inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-all duration-200 hover-bg-accent hover-text-foreground"
                    >
                        Discover Our Story
                        <span>→</span>
                    </a>
        </div>

      </div>
    </section>
  );
}
