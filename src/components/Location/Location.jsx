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

        <div className="h-[200px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.433130117671!2d75.8513083!3d12.9441131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba52544c66373f7%3A0x98fa84abf8b03681!2sSU%20VILLA!5e0!3m2!1sen!2sin!4v1794238553859!5m2!1sen!2sin"
            title="SU VILLA by the Creek on Google Maps"
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