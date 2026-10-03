"use client";


import { motion } from "framer-motion";



export default function RoomDisplay({ room }) {
  return (
    <motion.section
      key={room.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-primary text-foreground"
    >
      {/* =========================================================
          ROOM INTRODUCTION
      ========================================================= */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 md:px-20 md:py-28 lg:grid-cols-2 lg:gap-24">

        {/* Room Description */}
        <div>
          <p className="text-xs tracking-[0.3em] text-foreground/40">
            ROOM {room.number}
          </p>

          <h2 className="mt-5 text-4xl font-light tracking-tight md:text-6xl">
            {room.name}
          </h2>

          <p className="mt-6 text-xl font-light leading-relaxed text-foreground/60 md:text-2xl">
            {room.tagline}
          </p>

          <p className="mt-8 max-w-xl text-sm leading-7 text-foreground/60">
            {room.description}
          </p>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 self-end border-t border-foreground/10">
          {room.details.map((detail, index) => (
            <div
              key={`${room.id}-detail-${index}`}
              className="border-b border-foreground/10 py-5"
            >
              <p className="text-[10px] tracking-[0.2em] text-foreground/40">
                {detail.label}
              </p>

              <p className="mt-2 text-sm">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          MAIN ROOM IMAGE
      ========================================================= */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <img
            src={room.heroImage}
            alt={room.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* =========================================================
          FEATURES + GENERAL GALLERY
      ========================================================= */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 md:px-20 md:py-20 lg:grid-cols-3 lg:gap-16">

        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}
        <div className="lg:col-span-1">

          {/* Room Features */}
          <div>
            <p className="text-xs tracking-[0.3em] text-foreground/40">
              Room Features & Facilities
            </p>

            <div className="mt-6 space-y-4">
              {room.features.map((feature, index) => (
                <div
                  key={`${room.id}-feature-${index}`}
                  className="flex items-center gap-4 border-b border-foreground/10 pb-4"
                >
                  <span className="text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bathroom */}
          <div className="mt-10">
            <p className="text-xs tracking-[0.3em] text-foreground/40">
              Bathroom & Comfort
            </p>

            <div className="mt-6 space-y-4">
              {room.bathroom.map((bathroom, index) => (
                <div
                  key={`${room.id}-bathroom-${index}`}
                  className="flex items-center gap-4 border-b border-foreground/10 pb-4"
                >
                  <span className="text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm">
                    {bathroom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div className="mt-10">
            <p className="text-xs tracking-[0.3em] text-foreground/40">
              Technology & Connectivity
            </p>

            <div className="mt-6 space-y-4">
              {room.tech.map((tech, index) => (
                <div
                  key={`${room.id}-tech-${index}`}
                  className="flex items-center gap-4 border-b border-foreground/10 pb-4"
                >
                  <span className="text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* =====================================================
            RIGHT — GENERAL IMAGE GALLERY
        ===================================================== */}
        <div className="lg:col-span-2">
  <div className="grid grid-cols-2 gap-4">
    {room.images.map((image, index) => (
      <div
        key={`${room.id}-image-${index}`}
        className={`relative overflow-hidden rounded-xl ${
          room.number === "04"
            ? index === 0
              ? "col-span-2 aspect-[16/7]"
              : "aspect-[3/4]"
            : "aspect-[3/4]"
        }`}
      >
        <img
          src={image}
          alt={`${room.name} image ${index + 1}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    ))}
  </div>
</div>
        {/* <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {room.images.map((image, index) => (
              <div
                key={`${room.id}-image-${index}`}
                className={`relative overflow-hidden rounded-xl ${index === 0 || index === 3
                    ? "col-span-2 aspect-[16/7]"
                    : "aspect-[4/3]"
                  }`}
              >
                <img
                  src={image}
                  alt={`${room.name} image ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </motion.section>
  );
}