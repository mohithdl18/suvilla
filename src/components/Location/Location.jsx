export default function Location() {
  return (
    <section 
    id="location"
    className="w-full bg-primary pt-20 text-foreground lg:pt-28">

      {/* Section Heading */}
      {/* <div className="mb-12 px-8 md:px-12 lg:px-20">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-accent">
          Location
        </p>

        <h2 className="mt-3 max-w-4xl font-body text-5xl leading-tight md:text-6xl lg:text-7xl">
          Find your way to us
        </h2>
      </div> */}

      {/* Full Width Map */}
      <div className="relative w-full overflow-hidden border-y border-foreground-40">

        <div className="h-[400px] w-full md:h-[500px]">
          <iframe
            src="https://www.google.com/maps?q=Mysuru%20Palace%2C%20Mysuru%2C%20Karnataka&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Soft White Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/20" />

      </div>

    </section>
  );
}