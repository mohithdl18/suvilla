"use client";

import { useRef, useState } from "react";

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

export default function MobileFeaturedRooms() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const currentDragX = useRef(0);
    const isHorizontalSwipe = useRef(false);

    const SWIPE_THRESHOLD = 70;

    const nextRoom = () => {
        setActiveIndex((prev) => (prev + 1) % rooms.length);
    };

    const previousRoom = () => {
        setActiveIndex(
            (prev) => (prev - 1 + rooms.length) % rooms.length
        );
    };

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
        touchStartY.current = event.touches[0].clientY;
        currentDragX.current = 0;
        isHorizontalSwipe.current = false;

        setIsDragging(true);
        setDragX(0);
    };

    const handleTouchMove = (event) => {
        const deltaX =
            event.touches[0].clientX - touchStartX.current;

        const deltaY =
            event.touches[0].clientY - touchStartY.current;

        if (!isHorizontalSwipe.current) {
            if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    isHorizontalSwipe.current = true;
                } else {
                    return;
                }
            } else {
                return;
            }
        }

        currentDragX.current = deltaX;
        setDragX(deltaX);
    };

    const handleTouchEnd = () => {
        const deltaX = currentDragX.current;

        setIsDragging(false);
        setDragX(0);

        if (
            isHorizontalSwipe.current &&
            Math.abs(deltaX) >= SWIPE_THRESHOLD
        ) {
            if (deltaX < 0) {
                nextRoom();
            } else {
                previousRoom();
            }
        }

        currentDragX.current = 0;
        isHorizontalSwipe.current = false;
    };

    const handleTouchCancel = () => {
        setIsDragging(false);
        setDragX(0);
        currentDragX.current = 0;
        isHorizontalSwipe.current = false;
    };

    const getPosition = (index) =>
        (index - activeIndex + rooms.length) % rooms.length;

    const getCardStyle = (position) => {
        const dragOffset = dragX * 0.35;

        switch (position) {
            case 0:
                return {
                    transform: `translate3d(${dragX}px, 0, 0) scale(${
                        1 - Math.min(Math.abs(dragX) / 2500, 0.035)
                    })`,
                    zIndex: 30,
                    opacity: 1,
                    pointerEvents: "auto",
                };

            case 1:
                return {
                    transform: `translate3d(calc(70% + ${dragOffset}px), 0, 0) scale(0.8)`,
                    zIndex: 20,
                    opacity: 1,
                    pointerEvents: "none",
                };

            case 2:
                return {
                    transform: "translate3d(0, 0, 0) scale(0.8)",
                    zIndex: 10,
                    opacity: 0,
                    pointerEvents: "none",
                };

            case 3:
                return {
                    transform: `translate3d(calc(-70% + ${dragOffset}px), 0, 0) scale(0.8)`,
                    zIndex: 20,
                    opacity: 1,
                    pointerEvents: "none",
                };

            default:
                return {};
        }
    };

    return (
        <section className="w-full overflow-hidden bg-[#F7FAEE] font-body text-[#052a50]">
            {/* HEADING */}
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
                </div>
            </div>

            {/* SWIPEABLE CAROUSEL */}
            <div className="mt-12 w-full">
                <div
                    className="relative h-[590px] w-full touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchCancel}
                >
                    {/* SWIPE INDICATOR — ABOVE THE ACTIVE CARD */}
                    <div className="pointer-events-none absolute right-6 top-[-28px] z-40 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#052a50]/60">
                        <span className="h-px w-5 bg-[#e4b441]" />
                        <span>Swipe</span>
                    </div>

                    {rooms.map((room, index) => {
                        const position = getPosition(index);

                        return (
                            <article
                                key={room.id}
                                className="absolute left-1/2 top-0 w-[calc(100vw-48px)] max-w-[360px] overflow-hidden rounded-[24px] bg-[#E3ECC0] shadow-xl"
                                style={{
                                    ...getCardStyle(position),
                                    marginLeft: "calc(((-100vw + 48px) / 2))",
                                    transition: isDragging
                                        ? "none"
                                        : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease",
                                    willChange: "transform",
                                }}
                            >
                                {/* IMAGE */}
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[24px] bg-[#052a50]">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        draggable={false}
                                        className="h-full w-full select-none object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#052a50]/80 via-transparent to-transparent" />
                                </div>

                                {/* ROOM DETAILS */}
                                <div className="flex flex-col p-5">
                                    <div className="h-[46px] shrink-0">
                                        <h3 className="text-xl leading-tight text-[#052a50]">
                                            {room.name}
                                        </h3>
                                    </div>

                                    <div className="mt-1 h-[48px] shrink-0 overflow-hidden">
                                        <p className="line-clamp-2 text-sm leading-6 text-[#052a50]/75">
                                            {room.description}
                                        </p>
                                    </div>

                                    {/* GUESTS, BED, SIZE AND VIEW */}
                                    <div className="mt-4 h-[72px] shrink-0">
                                        <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-xs">
                                            <span className="flex items-center gap-2">
                                                <span className="text-[#e4b441]">
                                                    ♧
                                                </span>
                                                {room.guests}
                                            </span>

                                            <span className="flex min-w-0 items-center gap-2">
                                                <span className="shrink-0 text-[#e4b441]">
                                                    ▱
                                                </span>
                                                <span className="truncate">
                                                    {room.bed}
                                                </span>
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <span className="text-[#e4b441]">
                                                    ⌁
                                                </span>
                                                {room.size}
                                            </span>

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
                                            {room.amenities.map((amenity) => (
                                                <span
                                                    key={amenity}
                                                    className="inline-flex h-[28px] w-fit items-center rounded-full bg-[#F7FAEE] px-3 text-[11px] font-medium text-[#052a50]"
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

                {/* EXPLORE ROOMS BUTTON */}
                <div className="relative z-50 mt-2 flex justify-center px-6 pb-12">
                    <a
                        href="/rooms"
                        className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-[11px] font-medium uppercase tracking-wider text-primary transition-colors duration-200 hover:bg-accent hover:text-foreground"
                    >
                        Explore Rooms
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}