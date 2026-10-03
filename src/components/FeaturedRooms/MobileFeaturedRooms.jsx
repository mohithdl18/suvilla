"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const rooms = [
    {
        id: 1,
        name: "Family Suite 01",
        shortName: "Family Suite 01",
        description:
            "A spacious family stay beside the creek, surrounded by nature.",
        guests: "6 Guests",
        bed: "1 King + Extra Bed",
        size: "280 sq.ft",
        view: "Creek View",
        amenities: [
            "Wi-Fi",
            "Air-Conditioning/Heater",
            "Private Bathroom",
            "Indoor Patio",
            "Toiletries",
        ],
        image: "/images/room1.jpg",
    },
    {
        id: 2,
        name: "Family Suite 02",
        shortName: "Family Suite 02",
        description:
            "A peaceful family suite tucked beside gardens and tall trees.",
        guests: "6 Guests",
        bed: "1 King + Extra Bed",
        size: "260 sq.ft",
        view: "Garden View",
        amenities: [
            "Wi-Fi",
            "Air-Conditioning/Heater",
            "Private Open Roof Bathroom",
            "Indoor Patio",
            "Toiletries",
            "Well Furnished",
        ],
        image: "/images/room2.jpg",
    },
    {
        id: 3,
        name: "Couple Suite",
        shortName: "Couple Suite",
        description:
            "A cozy retreat with hillside views, natural light, and quiet.",
        guests: "3 Guests",
        bed: "1 King + Extra Bed",
        size: "310 sq.ft",
        view: "Hill View",
        amenities: [
            "Wi-Fi",
            "Air-Conditioning/Heater",
            "Private Bathroom",
            "Privacy Curtains",
            "Toiletries",
        ],
        image: "/images/room3.jpg",
    },
    {
        id: 4,
        name: "Pond View Cottage",
        shortName: "Pond View Cottage",
        description:
            "A spacious cottage surrounded by greenery overlooking the pond.",
        guests: "3 Guests",
        bed: "1 King + Extra Bed",
        size: "360 sq.ft",
        view: "Pond View",
        amenities: [
            "Wi-Fi",
            "Air-Conditioning/Heater",
            "Private Bathroom",
            "Privacy Curtains",
            "Toiletries",
        ],
        image: "/images/rooms/room-4.jpg",
    },
];

export default function MobileFeaturedRooms() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    /* =========================
       AUTO SCROLL
    ========================= */

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % rooms.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [isHovered]);

    /* =========================
       NAVIGATION
    ========================= */

    const nextRoom = () => {
        setActiveIndex((prev) => (prev + 1) % rooms.length);
    };

    const previousRoom = () => {
        setActiveIndex(
            (prev) => (prev - 1 + rooms.length) % rooms.length
        );
    };

    /* =========================
       CARD POSITION
    ========================= */

    const getPosition = (index) => {
        return (index - activeIndex + rooms.length) % rooms.length;
    };

    /* =========================
       CARD STYLE
    ========================= */

    const getCardStyle = (position) => {
        switch (position) {
            /* FRONT */
            case 0:
                return {
                    transform: "translateX(0) scale(1)",
                    zIndex: 30,
                    opacity: 1,
                };

            /* RIGHT */
            case 1:
                return {
                    transform: "translateX(70%) scale(0.8)",
                    zIndex: 20,
                    opacity: 1,
                };

            /* BACK */
            case 2:
                return {
                    transform: "translateX(0) scale(0.8)",
                    zIndex: 10,
                    opacity: 0,
                };

            /* LEFT */
            case 3:
                return {
                    transform: "translateX(-70%) scale(0.8)",
                    zIndex: 20,
                    opacity: 1,
                };

            default:
                return {};
        }
    };

    return (
        <section className="w-full overflow-hidden bg-[#F7FAEE] font-body text-[#052a50]">

            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            <div className="px-6 pt-16">

                <div className="max-w-[500px]">

                    <p className="text-xs uppercase tracking-[0.3em] text-[#e4b441]">
                        Stay With Us
                    </p>

                    <h2 className="mt-3 text-4xl leading-tight">
                        Rooms built for slower mornings
                    </h2>

                    <p className="mt-6 text-base leading-7 text-[#052a50]/70">
                        Four individually laid out rooms — each private,
                        each facing a little more quiet than the last.
                    </p>

                    <a
                        href="/rooms"
                        className="mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-primary transition-all duration-200 hover:bg-accent hover:text-foreground"
                    >
                        Explore Rooms
                        <span>→</span>
                    </a>

                </div>

            </div>


            {/* ================================================= */}
            {/* CAROUSEL */}
            {/* ================================================= */}

            <div className="mt-12 w-full">

                <div
                    className="relative h-[590px] w-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >

                    {rooms.map((room, index) => {

                        const position = getPosition(index);
                        const cardStyle = getCardStyle(position);

                        return (
                            <article
                                key={room.id}
                                className="absolute left-1/2 top-0 w-[calc(100vw-48px)] max-w-[360px] overflow-hidden rounded-[24px] bg-[#E3ECC0] shadow-xl"
                                style={{
                                    ...cardStyle,

                                    marginLeft:
                                        "calc(((-100vw + 48px) / 2))",

                                    transition:
                                        "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",

                                    willChange:
                                        "transform, opacity",
                                }}
                            >

                                {/* ================================================= */}
                                {/* IMAGE — FIXED 16:9 */}
                                {/* ================================================= */}

                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[24px] bg-[#052a50]">

                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#052a50]/80 via-transparent to-transparent" />

                                </div>


                                {/* ================================================= */}
                                {/* CONTENT */}
                                {/* ================================================= */}

                                <div className="flex flex-col p-5">

                                    {/* HEADING */}

                                    <div className="h-[46px] shrink-0">

                                        <h3 className="text-xl leading-tight text-[#052a50]">
                                            {room.name}
                                        </h3>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <div className="mt-1 h-[48px] shrink-0 overflow-hidden">

                                        <p className="line-clamp-2 text-sm leading-6 text-[#052a50]/75">
                                            {room.description}
                                        </p>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="mt-4 h-[72px] shrink-0">

                                        <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-xs">

                                            {/* Guests */}

                                            <span className="flex items-center gap-2">

                                                <span className="text-[#e4b441]">
                                                    ♧
                                                </span>

                                                {room.guests}

                                            </span>


                                            {/* Bed */}

                                            <span className="flex min-w-0 items-center gap-2">

                                                <span className="shrink-0 text-[#e4b441]">
                                                    ▱
                                                </span>

                                                <span className="truncate">
                                                    {room.bed}
                                                </span>

                                            </span>


                                            {/* Size */}

                                            <span className="flex items-center gap-2">

                                                <span className="text-[#e4b441]">
                                                    ⌁
                                                </span>

                                                {room.size}

                                            </span>


                                            {/* View */}

                                            <span className="flex items-center gap-2">

                                                <span className="text-[#e4b441]">
                                                    ◉
                                                </span>

                                                {room.view}

                                            </span>

                                        </div>

                                    </div>


                                    {/* AMENITIES */}

                                    <div className="mt-4 shrink-0">

                                        <div className="flex flex-wrap content-start gap-2">

                                            {room.amenities.map(
                                                (amenity) => (
                                                    <span
                                                        key={amenity}
                                                        className="inline-flex h-[28px] w-fit items-center rounded-full bg-[#F7FAEE] px-3 text-[11px] font-medium text-[#052a50]"
                                                    >
                                                        {amenity}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>


                {/* ================================================= */}
                {/* NAVIGATION */}
                {/* ================================================= */}

                <div className="relative z-50 -mt-2 flex items-center justify-center gap-3">

                    <button
                        type="button"
                        onClick={previousRoom}
                        aria-label="Previous room"
                        className="flex h-11 w-11 items-center justify-center border border-[#052a50]/30 text-lg transition-all duration-300 hover:border-[#e4b441] hover:bg-[#e4b441]"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        onClick={nextRoom}
                        aria-label="Next room"
                        className="flex h-11 w-11 items-center justify-center border border-[#052a50]/30 text-lg transition-all duration-300 hover:border-[#e4b441] hover:bg-[#e4b441]"
                    >
                        →
                    </button>

                </div>


                {/* ================================================= */}
                {/* COUNTER */}
                {/* ================================================= */}

                <div className="mt-5 pb-12 text-center text-xs uppercase tracking-[0.3em] text-[#052a50]/50">
                    0{activeIndex + 1} / 0{rooms.length}
                </div>

            </div>

        </section>
    );
}