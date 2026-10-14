
"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import UtilBar from "@/components/Booking/UtilBar";
import RoomCard from "@/components/Booking/RoomCard";
import AddonsModal from "@/components/Booking/AddonsModal";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getToday() {
  return formatLocalDate(new Date());
}

function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatLocalDate(tomorrow);
}

function formatDisplayDate(value) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RoomAvailability() {
  const [checkIn, setCheckIn] = useState(getToday);
  const [checkOut, setCheckOut] = useState(getTomorrow);

  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const [result, setResult] = useState(null);
  const [quotes, setQuotes] = useState({});
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const loadPrices = useCallback(
    async (rooms, startDate, endDate, guestSelection) => {
      setQuoteLoading(true);

      try {
        const entries = await Promise.all(
          rooms.map(async (room) => {
            try {
              const quote = await apiRequest("/pricing/quote", {
                method: "POST",
                body: JSON.stringify({
                  room_id: room.id,
                  check_in: startDate,
                  check_out: endDate,
                  extra_adults: Math.max(0, guestSelection.adults - 2),
                  children: guestSelection.children,
                  breakfasts: 0,
                  lunches: 0,
                  dinners: 0,
                  driver: false,
                }),
              });

              return [room.id, quote];
            } catch {
              return [room.id, null];
            }
          })
        );

        setQuotes(Object.fromEntries(entries));
      } finally {
        setQuoteLoading(false);
      }
    },
    []
  );

  const checkRooms = useCallback(
    async (event) => {
      event?.preventDefault();

      setError("");

      if (!checkIn || !checkOut || checkOut <= checkIn) {
        setError("Check-out must be after check-in.");
        return;
      }

      setLoading(true);
      setSelectedRoom(null);
      setExpiresAt(null);
      setQuotes({});

      try {
        const data = await apiRequest(
          `/availability?check_in=${encodeURIComponent(checkIn)}&check_out=${encodeURIComponent(checkOut)}`
        );

        setResult(data);
        await loadPrices(data.rooms || [], checkIn, checkOut, guests);
      } catch (err) {
        setResult(null);
        setError(err.message || "Unable to check availability.");
      } finally {
        setLoading(false);
      }
    },
    [checkIn, checkOut, guests, loadPrices]
  );

  // Load today's availability automatically, only on the first mount.
  useEffect(() => {
    let cancelled = false;

    async function loadInitialAvailability() {
      const startDate = getToday();
      const endDate = getTomorrow();

      try {
        const data = await apiRequest(
          `/availability?check_in=${startDate}&check_out=${endDate}`
        );

        if (cancelled) return;

        setResult(data);

        const entries = await Promise.all(
          (data.rooms || []).map(async (room) => {
            try {
              const quote = await apiRequest("/pricing/quote", {
                method: "POST",
                body: JSON.stringify({
                  room_id: room.id,
                  check_in: startDate,
                  check_out: endDate,
                  extra_adults: 0,
                  children: 0,
                  breakfasts: 0,
                  lunches: 0,
                  dinners: 0,
                  driver: false,
                }),
              });

              return [room.id, quote];
            } catch {
              return [room.id, null];
            }
          })
        );

        if (!cancelled) {
          setQuotes(Object.fromEntries(entries));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load room availability.");
        }
      }
    }

    loadInitialAvailability();

    return () => {
      cancelled = true;
    };
  }, []);

  // One deadline is shared across every booking step.
  useEffect(() => {
    if (!expiresAt) return;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((expiresAt - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining === 0) {
        setExpiresAt(null);
        setSelectedRoom(null);
        setTimeLeft(300);

        window.dispatchEvent(
          new CustomEvent("suvilla:booking-expired")
        );
      }
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 250);

    return () => window.clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    function handleBookingCompleted() {
      setSelectedRoom(null);
      setExpiresAt(null);
      setTimeLeft(300);
    }

    window.addEventListener(
      "suvilla:booking-completed",
      handleBookingCompleted
    );

    return () => {
      window.removeEventListener(
        "suvilla:booking-completed",
        handleBookingCompleted
      );
    };
  }, []);

  function handleSelectRoom(room) {
    if (!room.available) return;

    const deadline = Date.now() + 5 * 60 * 1000;

    setError("");
    setExpiresAt(deadline);
    setTimeLeft(300);
    setSelectedRoom(room);
  }

  function handleCloseBooking() {
    setSelectedRoom(null);
    setExpiresAt(null);
    setTimeLeft(300);

    window.dispatchEvent(
      new CustomEvent("suvilla:booking-cancelled")
    );
  }

  function handleContinueToBooking(selection) {
    if (!expiresAt || Date.now() >= expiresAt) {
      setSelectedRoom(null);
      setExpiresAt(null);
      setTimeLeft(300);

      window.dispatchEvent(
        new CustomEvent("suvilla:booking-expired")
      );

      return;
    }

    window.dispatchEvent(
      new CustomEvent("suvilla:booking-selection", {
        detail: {
          ...selection,
          expiresAt,
          room_name: selectedRoom?.name || "",
        },
      })
    );

    setSelectedRoom(null);
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        SU VILLA — Room Availability
      </h1>

      <UtilBar
        checkIn={checkIn}
        checkOut={checkOut}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        guests={guests}
        setGuests={setGuests}
        onCheckRooms={checkRooms}
        loading={loading}
      />

      {result && (
        <p className="text-sm text-slate-600">
          {result.nights} night(s): {formatDisplayDate(result.check_in)} to{" "}
          {formatDisplayDate(result.check_out)}
          <span className="ml-2">
            · {guests.rooms} room(s), {guests.adults} adult(s),{" "}
            {guests.children} child(ren)
          </span>
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {loading && !result && (
        <div className="rounded-xl border p-8 text-center text-slate-500">
          Checking room availability...
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {result.rooms
            .filter((room) => {
              const totalGuests = guests.adults + guests.children;

              if (totalGuests <= 3) {
                return true;
              }

              return room.id === "room1" || room.id === "room2";
            })
            .map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                quote={quotes[room.id]}
                loading={quoteLoading}
                guests={guests}
                onSelect={handleSelectRoom}
              />
            ))}
        </div>
      )}

      {selectedRoom && expiresAt && (
        <AddonsModal
          room={selectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          expiresAt={expiresAt}
          timeLeft={timeLeft}
          onClose={handleCloseBooking}
          onContinue={handleContinueToBooking}
        />
      )}
    </section>
  );
}
