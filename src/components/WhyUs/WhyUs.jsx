const amenities = [
  {
    name: "Creekside Location",
    description: "A peaceful stay surrounded by the sound of flowing water.",
    icon: "◈",
  },
  {
    name: "Nature Retreat",
    description: "Lush surroundings designed for a slower, quieter escape.",
    icon: "✦",
  },
  {
    name: "Private Spaces",
    description: "Thoughtfully designed spaces offering comfort and privacy.",
    icon: "⌂",
  },
  {
    name: "Premium Hospitality",
    description: "Warm, attentive service throughout your stay.",
    icon: "✧",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full bg-primary px-8 py-20 text-foreground md:px-12 lg:px-20 lg:py-28">

      {/* Section Heading */}
      <div className="mb-16">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-accent">
          Why Us
        </p>

        <h2 className="mt-3 max-w-4xl font-body text-5xl leading-tight md:text-6xl lg:text-7xl">
          Not just trips — experiences that nurture body and soul
        </h2>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="aspect-[3/4] w-full max-w-[520px] overflow-hidden">
            <img
              src="/images/property.jpg"
              alt="SU Villa property"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">

          {/* Property Description */}
          <div className="max-w-xl">
            <p className="font-body text-base leading-8 text-foreground-80 md:text-lg">
              Tucked away beside the creek, SU Villa offers a quiet escape
              from the pace of everyday life. Surrounded by nature and
              thoughtfully designed for comfort, the property brings together
              peaceful landscapes, intimate spaces and warm hospitality.
            </p>

            <p className="mt-6 font-body text-base leading-8 text-foreground-80 md:text-lg">
              Whether you come to slow down, reconnect with loved ones or
              simply spend time surrounded by nature, every detail is designed
              to make your stay feel unhurried and memorable.
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-12 border-t border-foreground-30">

            {amenities.map((amenity) => (
              <div
                key={amenity.name}
                className="flex items-center gap-5 border-b border-foreground-30 py-6"
              >

                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent text-xl text-accent">
                  {amenity.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-body text-sm font-medium uppercase tracking-[0.12em] text-foreground">
                    {amenity.name}
                  </h3>

                  <p className="mt-1 font-body text-sm leading-6 text-foreground-60">
                    {amenity.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}