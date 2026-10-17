"use client";

import { useMemo, useState } from "react";
import { calculateRoomPrice } from "@/logic/pricing";

const COLORS = {
    background: "#F7FAEE",
    foreground: "#052a50",
    accent: "#e4b441",
};

function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
}

function getMaxGuests(room) {
    const guestDetail = room?.details?.find(
        (detail) => detail.label?.toLowerCase() === "guests"
    );

    if (guestDetail?.value) {
        const match = guestDetail.value.match(/\d+/);
        if (match) return Number(match[0]);
    }

    return room?.maxGuests ?? null;
}

function getAmenities(room) {
    const allAmenities = [
        ...(Array.isArray(room?.features) ? room.features : []),
        ...(Array.isArray(room?.bathroom) ? room.bathroom : []),
        ...(Array.isArray(room?.tech) ? room.tech : []),
        ...(Array.isArray(room?.amenities) ? room.amenities : []),
    ];

    return [...new Set(allAmenities.filter(Boolean))];
}

function RoomImageCarousel({ room }) {
    const images = useMemo(() => {
        const roomImages = Array.isArray(room?.images)
            ? room.images.filter(Boolean)
            : [];

        const allImages = [
            ...(room?.heroImage ? [room.heroImage] : []),
            ...(room?.image ? [room.image] : []),
            ...roomImages,
        ];

        return [...new Set(allImages)];
    }, [room]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentImage = images[currentIndex];

    function showPrevious(event) {
        event.stopPropagation();

        setCurrentIndex((index) =>
            index === 0 ? images.length - 1 : index - 1
        );
    }

    function showNext(event) {
        event.stopPropagation();

        setCurrentIndex((index) =>
            index === images.length - 1 ? 0 : index + 1
        );
    }

    return (
        <div
            className="relative w-full overflow-hidden bg-black/5"
            style={{ aspectRatio: "4 / 3" }}
        >
            {currentImage ? (
                <img
                    key={currentImage}
                    src={currentImage}
                    alt={`${room?.name || "Room"} image ${currentIndex + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm opacity-60">
                    Room image
                </div>
            )}

            {images.length > 1 && (
                <>
                    {/* Previous image */}
                    <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous room image"
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white"
                    >
                        &#8249;
                    </button>

                    {/* Next image */}
                    <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next room image"
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white"
                    >
                        &#8250;
                    </button>

                    {/* Image position dots */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
                        {images.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setCurrentIndex(index);
                                }}
                                aria-label={`Show image ${index + 1} of ${images.length}`}
                                aria-current={
                                    index === currentIndex ? "true" : undefined
                                }
                                className={`h-2 rounded-full border border-white/80 transition-all ${index === currentIndex
                                        ? "w-5 bg-white"
                                        : "w-2 bg-white/50 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Current image count */}
                    <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
                        {currentIndex + 1} / {images.length}
                    </span>
                </>
            )}
        </div>
    );
}

export default function RoomCard({
    room,
    checkIn,
    checkOut,
    nights = 1,
    adults = 2,
    children = 0,
    available = true,
    onSelectRoom,
}) {
    const pricing = useMemo(() => {
        if (!checkIn || !checkOut || checkOut <= checkIn) {
            return { roomTotal: 0, nightlyBreakdown: [] };
        }

        try {
            return calculateRoomPrice(checkIn, checkOut);
        } catch {
            return { roomTotal: 0, nightlyBreakdown: [] };
        }
    }, [checkIn, checkOut]);

    const nightlyAverage =
        nights > 0 ? Math.round(pricing.roomTotal / nights) : 0;

    const amenities = useMemo(() => getAmenities(room), [room]);
    const maxGuests = getMaxGuests(room);

    return (
        <article
            className="grid overflow-hidden rounded-2xl border bg-white/60 shadow-sm transition hover:shadow-md md:grid-cols-10"
            style={{ borderColor: `${COLORS.foreground}18` }}
        >
            {/* Left column: image carousel and room title */}
            <div className="flex flex-col md:col-span-3">
                <RoomImageCarousel room={room} />

                <div className="flex flex-1 flex-col justify-center px-5 py-5">
                    <h3 className="text-lg font-semibold leading-snug">
                        {room.name}
                    </h3>

                    {room.tagline && (
                        <p className="mt-1 text-sm opacity-65">
                            {room.tagline}
                        </p>
                    )}
                </div>
            </div>

            {/* Middle column: amenities and room capacity */}
            {/* Middle column: capacity displayed separately above amenities */}
            <div
                className="flex flex-col justify-center p-5 md:col-span-4 md:border-l md:p-6"
                style={{ borderColor: `${COLORS.foreground}18` }}
            >
                {/* Maximum guests */}
                {maxGuests !== null && (
                    <div
                        className="mb-5 border-b pb-4"
                        style={{ borderColor: `${COLORS.foreground}18` }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                            Maximum occupancy
                        </p>

                        <p className="mt-2 text-base font-semibold">
                            
                             {maxGuests} guests
                        </p>
                    </div>
                )}

                {/* Amenities */}
                <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                            Amenities 
                        </p>

                {amenities.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {amenities.map((amenity) => (
                            <li
                                key={amenity}
                                className="rounded-full px-3 py-1.5 text-xs"
                                style={{
                                    backgroundColor: `${COLORS.foreground}09`,
                                }}
                            >
                                {amenity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-sm opacity-60">
                        Contact us for room amenities.
                    </p>
                )}
            </div>

            {/* Right column: pricing, selected guests, and booking */}
            <div
                className="flex flex-col justify-center gap-5 border-t p-5 md:col-span-3 md:border-l md:border-t-0 md:p-6"
                style={{ borderColor: `${COLORS.foreground}18` }}
            >
                <div>
                    <p className="text-xs opacity-60">
                        {nights} {nights === 1 ? "night" : "nights"}
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {formatINR(pricing.roomTotal)}
                    </p>

                    <p className="mt-2 text-xs opacity-60">
                        {formatINR(nightlyAverage)} average per night
                    </p>

                    {/* Selected guest count moved below the night information */}
                    <p className="mt-3 text-sm font-medium">
                        {adults} {adults === 1 ? "adult" : "adults"} ·{" "}
                        {children} {children === 1 ? "child" : "children"} ·{" "}
                        Including Breakfast
                    </p>

                    <p className="mt-2 text-xs leading-relaxed opacity-60">
                        Excludes checkout fees and add-ons
                    </p>
                </div>

                <button
                    type="button"
                    disabled={!available}
                    onClick={() => onSelectRoom?.(room)}
                    className="w-full rounded-xl px-5 py-3.5 text-sm font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                        backgroundColor: COLORS.accent,
                        color: COLORS.foreground,
                    }}
                >
                    {available ? "Select Room" : "Unavailable"}
                </button>
            </div>
        </article>
    );
}