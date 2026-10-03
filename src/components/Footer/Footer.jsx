export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-white text-foreground">

      {/* =====================================================
          MAIN FOOTER CONTENT
      ====================================================== */}
      <div className="px-8 pt-14 pb-10 md:px-12 lg:px-16 xl:px-20">

        {/* =================================================
            BRAND + NAVIGATION
        ================================================== */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto] lg:gap-16">

          {/* =================================================
              BRAND
          ================================================== */}
          <div className="flex flex-col">

            {/* Logo + Brand Name */}
            <div className="flex items-center gap-5">

              <a href="/" className="shrink-0">
                <img
                  src="/images/logo.png"
                  alt="SU Villa"
                  className="h-auto w-32 object-contain"
                />
              </a>

              <div className="flex flex-col">
                <p className="font-body text-4xl font-medium tracking-tight">
                  SU VILLA
                </p>

                <p className="mt-1 font-body text-lg text-center text-black/50">
                  by the creek
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="mt-6 max-w-sm font-body text-[15px] leading-6 text-black/65">
              A peaceful retreat surrounded by nature, designed for slow days,
              quiet moments, and memorable stays.
            </p>



            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-6">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/suvilla__/"
                aria-label="Instagram"
                className="text-black/65 transition-colors duration-300 hover:text-[var(--accent)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-black/65 transition-colors duration-300 hover:text-[var(--accent)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.67.33-1 1-1Z" />
                </svg>
              </a>

            </div>

          </div>


          {/* =================================================
              NAVIGATION GROUP
          ================================================== */}
          <div className="grid grid-cols-3 gap-8 lg:min-w-[600px] lg:gap-10">

            {/* =================================================
                EXPLORE
            ================================================== */}
            <div>

              <p className="mb-7 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-black/45">
                Explore
              </p>

              <div className="flex flex-col gap-5">

                <a
                  href="/"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Home
                </a>

                <a
                  href="/admin"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Admin
                </a>

                <a
                  href="/rooms"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Rooms
                </a>

                <a
                  href="/gallery"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Gallery
                </a>

              </div>

            </div>


            {/* =================================================
                COMPANY
            ================================================== */}
            <div>

              <p className="mb-7 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-black/45">
                Company
              </p>

              <div className="flex flex-col gap-5">

                <a
                  href="/about"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  About
                </a>

                <a
                  href="/#location"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Location
                </a>

                <a
                  href="/#FeaturedAmenities"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Amenities
                </a>

                <a
                  href="/blogs"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Blogs
                </a>

              </div>

            </div>


            {/* =================================================
                LEGAL
            ================================================== */}
            <div>

              <p className="mb-7 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-black/45">
                Legal
              </p>

              <div className="flex flex-col gap-5">

                <a
                  href="/privacy-policy"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Privacy Policy
                </a>

                <a
                  href="/terms-and-conditions"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  Terms & Conditions
                </a>

                <a
                  href="tel:+919976124365"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  +91 99761 24365
                </a>

                <a
                  href="mailto:info@suvilla.in"
                  className="w-fit font-body text-[15px] font-medium transition-colors duration-300 hover:text-[var(--accent)]"
                >
                  info@suvilla.in
                </a>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* Left */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-black/50">

            <span>
              © {new Date().getFullYear()} SU Villa.
            </span>

            <span>
              Crafted with
            </span>

            <span className="text-[#9bdcc3]">
              ♥
            </span>

            <span>
              by SU Villa
            </span>

          </div>


          {/* Right */}
          {/* <div className="flex items-center gap-7">

            <a
              href="/contact"
              className="font-body text-xs font-medium text-black/60 transition-colors duration-300 hover:text-[var(--accent)]"
            >
              Contact us
            </a>

            <a
              href="/stay"
              className="font-body text-xs font-medium text-black transition-colors duration-300 hover:text-[var(--accent)]"
            >
              Book your stay →
            </a>

          </div> */}

        </div>

      </div>


      {/* =====================================================
          LANDSCAPE IMAGE
      ====================================================== */}
      <div className="relative -mt-7 w-full md:-mt-9 lg:-mt-11">

        <div className="relative h-[230px] w-full md:h-[290px] lg:h-[330px]">

          {/* Image */}
          <img
            src="/images/Footer.jpg"
            alt="SU Villa landscape"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Smooth White Fade */}
          <div
            className="
              pointer-events-none
              absolute inset-x-0 top-0
              h-[45%]
              bg-gradient-to-b
              from-white
              via-white/90
              via-30%
              via-white/40
              via-65%
              to-transparent
            "
          />

        </div>

      </div>

    </footer>
  );
}