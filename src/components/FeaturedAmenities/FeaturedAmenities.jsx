"use client";

export default function FeaturedAmenities() {
    const amenities = [
        {
            title: "Pool",
            description: "Relax by the water",
            icon: "🏊",
            color: "bg-[#B9E5F6]",
        },
        {
            title: "Banquet Hall",
            description: "Celebrate special moments",
            icon: "🏛️",
            color: "bg-[#F7C6CE]",
        },
        {
            title: "Luxury Rooms",
            description: "Rest in refined comfort",
            icon: "🛏️",
            color: "bg-[#C7E8B5]",
        },
        {
            title: "Mini Bar",
            description: "Sip and unwind",
            icon: "🍹",
            color: "bg-[#D8CCF4]",
        },
        {
            title: "Lift",
            description: "Easy access everywhere",
            icon: "🛗",
            color: "bg-[#F5D6A6]",
        },
        {
            title: "Parking",
            description: "Convenient and secure space",
            icon: "🚗",
            color: "bg-[#BFE3DE]",
        },
        {
            title: "Campfire",
            description: "Warm nights under stars",
            icon: "🔥",
            color: "bg-[#F5B9A8]",
        },
        {
            title: "Rain Dance",
            description: "Dance in the rain",
            icon: "🌧️",
            color: "bg-[#BFD4F5]",
        },
        {
            title: "Plantation Walk",
            description: "Explore lush plantation trails",
            icon: "🌿",
            color: "bg-[#C8E5B8]",
        },
        {
            title: "Family Gathering",
            description: "Moments together, always",
            icon: "👨‍👩‍👧‍👦",
            color: "bg-[#F4D3B8]",
        },
        {
            title: "Indoor Games",
            description: "Play and have fun",
            icon: "🎲",
            color: "bg-[#D8C4EA]",
        },
        {
            title: "EV Charging",
            description: "Charge up with ease",
            icon: "⚡",
            color: "bg-[#D5E8F7]",
        },
    ];

    // Duplicate the cards to create a seamless loop
    const marqueeItems = [...amenities, ...amenities];

    return (
        <section
            id="FeaturedAmenities"
            className="w-full overflow-hidden bg-primary py-20 md:py-24"
        >

            {/* ================= HEADING ================= */}
            <div className="px-8 md:px-12 lg:px-20">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

                    <div>
                        <p className="font-body text-xs uppercase tracking-[0.3em] text-accent">
                            Amenities
                        </p>

                        <h2 className="mt-3 max-w-8xl font-body text-4xl leading-tight md:text-5xl lg:text-6xl">
                        Everything you need for a slower stay
                        {/* <br /> */}

                    </h2>
                    </div>

                    

                    {/* <a
                        href="/amenities"
                        className="inline-flex w-fit border border-accent px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-accent hover:text-primary"
                    >
                        Explore Amenities
                    </a> */}

                </div>
            </div>

            {/* ================= AMENITIES MARQUEE ================= */}
            <div className="amenities-marquee relative mt-16 w-full overflow-hidden">

                <div className="amenities-marquee-track flex w-max gap-5">

                    {marqueeItems.map((amenity, index) => (
                        <div
                            key={`${amenity.title}-${index}`}
                            className={`group relative flex h-[110px] w-[280px] shrink-0 items-center justify-between overflow-hidden rounded-[24px] ${amenity.color} px-7 shadow-sm`}
                        >

                            {/* Glossy Highlight */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 max-w-[175px]">

                                <p className="font-body text-lg font-medium leading-tight tracking-tight text-foreground">
                                    {amenity.title}
                                </p>

                                <p className="mt-2 font-body text-[10px] leading-4 tracking-wide text-foreground/60">
                                    {amenity.description}
                                </p>

                            </div>

                            {/* Icon */}
                            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center text-4xl">
                                {amenity.icon}
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* ================= LOCAL MARQUEE CSS ================= */}
            <style>{`
                .amenities-marquee-track {
                    animation: amenities-scroll 40s linear infinite;
                    will-change: transform;
                }

                .amenities-marquee:hover .amenities-marquee-track {
                    animation-play-state: paused;
                }

                @keyframes amenities-scroll {
                    from {
                        transform: translateX(0);
                    }

                    to {
                        transform: translateX(calc(-50% - 10px));
                    }
                }
            `}</style>

        </section>
    );
}