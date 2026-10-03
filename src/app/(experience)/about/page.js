import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { House } from "lucide-react";

const destinations = [
  {
    title: "Manjarabad Fort",
    image: "/images/manjarabad.webp",
    alt: "Manjarabad Fort near Sakleshpura",
    description:
      "A historic star-shaped fort surrounded by the green hills of Sakleshpura. A peaceful place to wander, take in the views and experience a little of the region's history and charm.",
    distance: "16 Kms",
    drive: "20 mins",
  },
  {
    title: "Bisle Ghat",
    image: "/images/bisle-ghat.webp",
    alt: "Bisle Ghat near Sakleshpura",
    description:
      "A breathtaking stretch of the Western Ghats where dense forests, rolling hills and scenic viewpoints come together. A destination for those seeking to explore deeper into nature.",
    distance: "60 Kms",
    drive: "1 hr 20 mins",
  },
  {
    title: "Kaginahare Viewpoint",
    image: "/images/destination3.jpg",
    alt: "Kaginahare Viewpoint near Sakleshpura",
    description:
      "A scenic viewpoint surrounded by the green hills of Sakleshpura. A peaceful place to pause, take in the views and experience the beauty of the Western Ghats for a slower moment.",
    distance: "54 Kms",
    drive: "1 hr 20 mins",
  },
  {
    title: "Magajahalli Abbi Falls",
    image: "/images/destination4.jpg",
    alt: "Magajahalli Abbi Falls near Sakleshpura",
    description:
      "A refreshing waterfall surrounded by the lush forests of Sakleshpura. A peaceful place to unwind, enjoy the scenery and experience the beauty of nature around you in the valley.",
    distance: "34 Kms",
    drive: "50 mins",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-primary text-foreground">

      {/* ================= HERO ================= */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/AboutHero.jpg"
            alt="SU VILLA by the Creek"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Home Button */}
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

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-end px-8 pb-36 md:px-16 md:pb-24 lg:px-20 lg:pb-28 xl:px-24">

          <div className="max-w-4xl text-primary">

            {/* Label */}
            <p className="mb-5 font-body text-sm uppercase tracking-[0.3em] text-primary/80 md:text-base">
              About SU Villa
            </p>

            {/* Main Heading */}
            <h1 className="font-body text-5xl font-normal leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              A little closer to{" "}
              <span className="text-accent">nature.</span>
              <br />
              A little closer to{" "}
              <span className="text-accent">each other.</span>
            </h1>

          </div>

        </div>

      </section>


      {/* ================= INTRO ================= */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">

          {/* Heading */}
          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-accent md:text-sm">
              Our Story
            </p>

            <h2 className="mt-4 max-w-md text-3xl leading-tight md:text-5xl">
              A place designed for togetherness.
            </h2>

          </div>


          {/* Description */}
          <div className="max-w-2xl text-base leading-8 text-foreground/75 md:text-lg">

            <p>
              At SU VILLA by the Creek, we’re creating space for the moments
              that bring people together: an unhurried morning, a family
              gathering, a conversation that carries into the evening.
            </p>

            <p className="mt-7">
              Opening in October 2026, our luxury retreat in Sakleshpura is
              surrounded by coffee plantations and forest. Six accommodation
              units keep the setting intimate, with thoughtfully designed
              interiors, considered architecture and room for both connection
              and quiet.
            </p>

            <p className="mt-7">
              From family suites made for staying together to a separate pond-view cottage, each choice offers a different way to settle in. Our purpose is simple: to make family time, celebrations and slower days in nature feel special.
            </p>

          </div>

        </div>

      </section>


      {/* ================= IMAGE + STORY ================= */}
      {/* <section className="px-6 pb-24 md:px-12 lg:px-20 lg:pb-32">

        <div className="mx-auto grid max-w-7xl overflow-hidden border border-foreground/10 lg:grid-cols-2">

          
          <div className="h-[450px] lg:h-[650px]">

            <img
              src="/images/AboutNature.jpeg"
              alt="Nature surrounding SU VILLA"
              className="h-full w-full object-cover"
            />

          </div>


          
          <div className="flex flex-col justify-center bg-foreground px-8 py-16 text-primary md:px-14 lg:px-20">

            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Stay Your Way
            </p>

            <h2 className="mt-5 text-3xl leading-tight md:text-4xl">
              Space to connect.
              <br />
              Space to slow down.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-primary/70 md:text-base">
              From family suites made for staying together to a separate
              pond-view cottage, each choice offers a different way to settle
              in. Our purpose is simple: to make family time, celebrations and
              slower days in nature feel special.
            </p>

            <div className="mt-10 h-px w-16 bg-accent" />

          </div>

        </div>

      </section> */}


      {/* ================= AROUND SAKLESHPURA ================= */}
      <section className="bg-primary px-6 py-24 md:px-12 md:py-32 lg:px-10">

        <div className="mx-auto max-w-8xl">

          {/* Section Heading */}
          <div className="flex items-center gap-6">

            <div className="hidden h-px flex-1 bg-foreground/30 md:block" />

            <h2 className="shrink-0 text-center font-body text-3xl font-light uppercase tracking-wide text-foreground md:text-5xl">
              Around Sakleshpura
            </h2>

            <div className="hidden h-px flex-1 bg-foreground/30 md:block" />

          </div>


          {/* Intro */}
          <div className="mx-auto mt-14 max-w-5xl text-center">

            <p className="font-body text-lg leading-8 text-foreground/75 md:text-xl md:leading-9">
              Beyond SU VILLA lies the quiet beauty of Sakleshpura — lush
              coffee plantations, mist-covered hills, historic landmarks and
              winding trails waiting to be explored.
            </p>

          </div>

          {/* ================= DESTINATION CARDS ================= */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {destinations.map((destination) => (
    <article
      key={destination.title}
      className="overflow-hidden rounded-2xl border border-foreground/15 bg-[#E3ECC0]"
    >
      {/* Image - 4:3 */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.alt}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="whitespace-nowrap font-body text-2xl font-light uppercase leading-tight tracking-tight text-foreground">
          {destination.title}
        </h3>

        <p className="mt-4 font-body text-sm leading-7 text-foreground/70">
          {destination.description}
        </p>

        {/* Info */}
        <div className="mt-6 grid grid-cols-2 border-t border-foreground/15 pt-5">
          <div>
            <p className="text-lg text-accent">
              {destination.distance}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-foreground/55">
              Distance
            </p>
          </div>

          <div>
            <p className="text-lg text-accent">
              {destination.drive}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-foreground/55">
              Drive
            </p>
          </div>
        </div>
      </div>
    </article>
  ))}
</div>




        </div>

      </section>


      {/* ================= CLOSING ================= */}
      <section className="px-6 py-28 text-center md:px-12 md:py-40 lg:px-20">

        <div className="mx-auto max-w-3xl">

          <p className="text-xs uppercase tracking-[0.35em] text-accent">
            Come Away With Us
          </p>

          <h2 className="mt-6 text-4xl leading-tight md:text-6xl">
            Come, find your pace with us.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-foreground/65 md:text-base">
            Leave the rush behind and make room for the moments that stay
            with you long after the journey home.
          </p>

          <Link
            href="/bookings"
            className="mt-10 inline-flex items-center border border-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground hover:text-primary"
          >
            Plan Your Stay
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <Footer />

    </main>
  );
}