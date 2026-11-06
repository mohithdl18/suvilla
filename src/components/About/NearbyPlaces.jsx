
import places from "./NearbyPlaces.json";

export default function NearbyPlaces() {
  return (
    <section className="bg-primary px-6 py-24 md:px-12 md:py-32 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Heading */}
        <div className="flex items-center justify-center">
          <h2 className="text-center font-body text-3xl font-light uppercase tracking-wide text-foreground md:text-5xl">
            Explore Nearby
          </h2>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center font-body text-sm leading-7 text-foreground/70 md:text-base">
          From scenic viewpoints and refreshing waterfalls to historic
          landmarks, discover the experiences waiting around SU VILLA.
        </p>

        {/* Places Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
          {places.map((place) => (
            <article
  key={place.id}
  className="flex min-w-0 items-stretch overflow-hidden rounded-2xl border border-foreground/15 bg-[#E3ECC0]"
>
  {/* Left: 4:3 Image */}
  <div className="relative aspect-[4/3] w-[38%] shrink-0 self-stretch sm:w-[40%]">
    <img
      src={place.image}
      alt={place.alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>

  {/* Right: Content fills the image height */}
  <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-6 lg:p-7">
    <div>
      <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/55 sm:text-xs">
        {place.distance}
      </p>

      <h3 className="mt-2 font-body text-lg font-medium uppercase leading-tight text-foreground sm:text-xl lg:text-2xl">
        {place.name}
      </h3>

      <p className="mt-3 font-body text-xs leading-6 text-foreground/75 sm:text-sm sm:leading-7">
        {place.description}
      </p>
    </div>

    {/* Travel Tip */}
    <div className="mt-4 border-t border-foreground/15 pt-3 sm:mt-5 sm:pt-4">
      <p className="font-body text-[10px] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs">
        Travel Tip
      </p>

      <p className="mt-1 font-body text-xs leading-5 text-foreground/65 sm:text-sm sm:leading-6">
        {place.tip}
      </p>
    </div>
  </div>
</article>
          ))}
        </div>
      </div>
    </section>
  );
}
