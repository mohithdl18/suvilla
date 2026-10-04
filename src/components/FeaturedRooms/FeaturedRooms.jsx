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
        size: "456 sq.ft",
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
        size: "456 sq.ft",
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
        size: "315 sq.ft",
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
        size: "464 sq.ft",
        view: "Pond View",
        amenities: [
            "Wi-Fi",
            "Air-Conditioning/Heater",
            "Private Bathroom",
            "Privacy Curtains",
            "Toiletries",
        ],
        image: "/images/room4.jpg",
    },
];

export default function Rooms() {
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
            case 0:
                return {
                    transform: "translateX(0) scale(1)",
                    zIndex: 30,
                    opacity: 1,
                };

            case 1:
                return {
                    transform: "translateX(50%) scale(0.8)",
                    zIndex: 20,
                    opacity: 1,
                };

            case 2:
                return {
                    transform: "translateX(0) scale(0.8)",
                    zIndex: 10,
                    opacity: 0,
                };

            case 3:
                return {
                    transform: "translateX(-50%) scale(0.8)",
                    zIndex: 20,
                    opacity: 1,
                };

            default:
                return {};
        }
    };

    return (
        <section className="w-full bg-[#F7FAEE] font-body text-[#052a50]">

            <div className="grid min-h-[760px] grid-cols-1 lg:grid-cols-[40%_60%]">

                {/* ================================================= */}
                {/* LEFT — CONTENT */}
                {/* ================================================= */}

                <div className="flex items-start justify-end py-16 pr-8 md:pr-10 lg:py-24 lg:pr-10">

                    <div className="w-full max-w-[500px]">

                        <p className="text-xs uppercase tracking-[0.3em] text-[#e4b441]">
                            Stay With Us
                        </p>

                        <h2 className="mt-3 text-4xl leading-tight md:text-5xl lg:text-6xl">
                            Rooms built for slower mornings
                        </h2>

                        <p className="mt-8 text-base leading-7 text-[#052a50]/70 md:text-lg">
                            Four individually laid out rooms — each private,
                            each facing a little more quiet than the last.
                        </p>

                        <Link
                            href="/rooms"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-all duration-300 hover-bg-accent hover-text-foreground"
                        >
                            Explore Rooms
                            <span>→</span>
                        </Link>

                    </div>

                </div>


                {/* ================================================= */}
                {/* RIGHT — CAROUSEL */}
                {/* ================================================= */}

                <div className="relative flex min-w-0 flex-col justify-center overflow-hidden">

                    {/* ================================================= */}
                    {/* CAROUSEL STAGE */}
                    {/* ================================================= */}

                    <div
                        className="relative h-[660px] w-full"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >

                        {rooms.map((room, index) => {

                            const position = getPosition(index);
                            const cardStyle = getCardStyle(position);

                            return (
                                <article
                                    key={room.id}
                                    className="absolute left-1/2 top-1/2 w-[360px] overflow-hidden rounded-[26px] bg-[#E3ECC0] shadow-xl"
                                    style={{
                                        ...cardStyle,

                                        marginLeft: "-180px",
                                        marginTop: "-300px",

                                        // height: "600px",

                                        transition:
                                            "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",

                                        willChange:
                                            "transform, opacity",
                                    }}
                                >

                                    {/* ================================================= */}
                                    {/* IMAGE — FIXED 16:9 */}
                                    {/* ================================================= */}

                                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[26px] bg-[#052a50]">

                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#052a50]/80 via-transparent to-transparent" />

                                    </div>


                                    {/* ================================================= */}
                                    {/* CONTENT — FIXED HEIGHT */}
                                    {/* ================================================= */}

                                    <div className="flex  flex-col p-6">

                                        {/* HEADING */}

                                        <div className="h-[52px] shrink-0">
                                            <h3 className="text-2xl leading-tight text-[#052a50]">
                                                {room.name}
                                            </h3>
                                        </div>


                                        {/* DESCRIPTION */}

                                        <div className="mt-1 h-[56px] shrink-0 overflow-hidden">
                                            <p className="line-clamp-2 text-sm leading-7 text-[#052a50]/75">
                                                {room.description}
                                            </p>
                                        </div>


                                        {/* =========================
                                            ROOM DETAILS — 2 ROWS
                                        ========================= */}

                                        <div className="mt-4 h-[76px] shrink-0">

                                            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">

                                                {/* Guests */}

                                                <span className="flex items-center gap-2">

                                                    <span className="text-[#e4b441]">
                                                        ♧
                                                    </span>

                                                    {room.guests}

                                                </span>


                                                {/* Bed */}

                                                <span className="flex items-center gap-2">

                                                    <span className="text-[#e4b441]">
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

                                        <div className="mt-4 h-[110px] shrink-0 overflow-hidden">

                                            <div className="flex flex-wrap content-start gap-2">

                                                {room.amenities.map((amenity) => (
                                                    <span
                                                        key={amenity}
                                                        className="inline-flex h-[30px] w-fit items-center rounded-full bg-[#F7FAEE] px-3 text-xs font-medium text-[#052a50]"
                                                    >
                                                        {amenity}
                                                    </span>
                                                ))}

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
                            className="flex h-12 w-12 items-center justify-center border border-[#052a50]/30 text-xl transition-all duration-300 hover:border-[#e4b441] hover:bg-[#e4b441]"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={nextRoom}
                            aria-label="Next room"
                            className="flex h-12 w-12 items-center justify-center border border-[#052a50]/30 text-xl transition-all duration-300 hover:border-[#e4b441] hover:bg-[#e4b441]"
                        >
                            →
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/* COUNTER */}
                    {/* ================================================= */}

                    <div className="mt-5 pb-10 text-center text-xs uppercase tracking-[0.3em] text-[#052a50]/50">
                        0{activeIndex + 1} / 0{rooms.length}
                    </div>

                </div>

            </div>

        </section>
    );
}