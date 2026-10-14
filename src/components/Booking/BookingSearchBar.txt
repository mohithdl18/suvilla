"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function formatDate(date) {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatShortDate(date) {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isBefore(date1, date2) {
  const first = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );

  const second = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  return first < second;
}

function getDateDifference(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(
    checkIn.getFullYear(),
    checkIn.getMonth(),
    checkIn.getDate()
  );

  const end = new Date(
    checkOut.getFullYear(),
    checkOut.getMonth(),
    checkOut.getDate()
  );

  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

export default function BookingSearchBar({ onSearch }) {
  const searchRef = useRef(null);

  const today = useMemo(() => {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }, []);

  /*
   * --------------------------------------------------
   * DATE STATE
   * --------------------------------------------------
   */

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [isDateOpen, setIsDateOpen] = useState(false);

  /*
   * 60 days starting from today
   */

  const availableDates = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) =>
      addDays(today, index)
    );
  }, [today]);

  /*
   * Start calendar from current month
   */

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /*
   * --------------------------------------------------
   * GUEST STATE
   * --------------------------------------------------
   */

  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  /*
   * --------------------------------------------------
   * OTHER STATE
   * --------------------------------------------------
   */

  const [promo, setPromo] = useState("");
  const [roomMode, setRoomMode] = useState("Room");
  const [flexibleDates, setFlexibleDates] = useState(false);

  /*
   * --------------------------------------------------
   * SEARCH VALIDATION
   * --------------------------------------------------
   *
   * Search is allowed only when:
   *
   * 1. Check-in is selected
   * 2. Check-out is selected
   * 3. At least one room exists
   * 4. At least one adult exists
   */

  const canSearch =
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    rooms >= 1 &&
    adults >= 1;

  /*
   * --------------------------------------------------
   * CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
   * --------------------------------------------------
   */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsDateOpen(false);
        setIsGuestOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * --------------------------------------------------
   * DATE SELECTION
   * --------------------------------------------------
   */

  function handleDateClick(date) {
    /*
     * Nothing selected yet
     * First click = check in
     */

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);

      return;
    }

    /*
     * User clicked a date before check-in.
     * Make that the new check-in.
     */

    if (isBefore(date, checkIn)) {
      setCheckIn(date);
      setCheckOut(null);

      return;
    }

    /*
     * Second click = check out
     */

    setCheckOut(date);
  }

  /*
   * --------------------------------------------------
   * CALENDAR GENERATION
   * --------------------------------------------------
   */

  const monthDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    /*
     * JS:
     * Sunday = 0
     * Monday = 1
     */

    const startingDay = firstDay.getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const cells = [];

    /*
     * Empty cells before first day
     */

    for (let i = 0; i < startingDay; i++) {
      cells.push(null);
    }

    /*
     * Actual days
     */

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [calendarMonth]);

  /*
   * --------------------------------------------------
   * CHECK IF DATE IS WITHIN 60 DAY WINDOW
   * --------------------------------------------------
   */

  function isAvailableDate(date) {
    if (!date) return false;

    return availableDates.some((availableDate) =>
      isSameDay(availableDate, date)
    );
  }

  /*
   * --------------------------------------------------
   * CHECK IF DATE IS IN SELECTED RANGE
   * --------------------------------------------------
   */

  function isInSelectedRange(date) {
    if (!date || !checkIn || !checkOut) return false;

    return (
      !isBefore(date, checkIn) &&
      !isBefore(checkOut, date)
    );
  }

  /*
   * --------------------------------------------------
   * MONTH NAVIGATION
   * --------------------------------------------------
   */

  function previousMonth() {
    const previous = new Date(calendarMonth);

    previous.setMonth(previous.getMonth() - 1);

    /*
     * Don't go before current month
     */

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= currentMonth) {
      setCalendarMonth(previous);
    }
  }

  function nextMonth() {
    const next = new Date(calendarMonth);

    next.setMonth(next.getMonth() + 1);

    /*
     * Only allow navigating to months
     * that contain at least one of our 60 days.
     */

    const lastAvailableDate =
      availableDates[availableDates.length - 1];

    const lastAvailableMonth = new Date(
      lastAvailableDate.getFullYear(),
      lastAvailableDate.getMonth(),
      1
    );

    if (next <= lastAvailableMonth) {
      setCalendarMonth(next);
    }
  }

  /*
   * --------------------------------------------------
   * GUEST CONTROLS
   * --------------------------------------------------
   */

  function increaseRooms() {
    setRooms((value) => Math.min(value + 1, 10));
  }

  function decreaseRooms() {
    setRooms((value) => Math.max(value - 1, 1));
  }

  function increaseAdults() {
    setAdults((value) => Math.min(value + 1, 20));
  }

  function decreaseAdults() {
    setAdults((value) => Math.max(value - 1, 1));
  }

  function increaseChildren() {
    setChildren((value) => Math.min(value + 1, 10));
  }

  function decreaseChildren() {
    setChildren((value) => Math.max(value - 1, 0));
  }

  /*
   * --------------------------------------------------
   * MONTH NAME
   * --------------------------------------------------
   */

  const monthName = calendarMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  /*
   * --------------------------------------------------
   * NIGHT COUNT
   * --------------------------------------------------
   */

  const numberOfNights = getDateDifference(
    checkIn,
    checkOut
  );

  /*
   * --------------------------------------------------
   * GUEST SUMMARY
   * --------------------------------------------------
   */

  const guestSummary = `${rooms} ${
    rooms === 1 ? "Room" : "Rooms"
  } • ${adults} ${
    adults === 1 ? "Adult" : "Adults"
  } • ${children} ${
    children === 1 ? "Child" : "Children"
  }`;

  /*
   * --------------------------------------------------
   * SEARCH
   * --------------------------------------------------
   */

  function handleSearch() {
    if (!canSearch) return;

    const searchData = {
      checkIn,
      checkOut,
      nights: numberOfNights,
      rooms,
      adults,
      children,
      promo,
      flexibleDates,
      roomMode,
    };

    /*
     * Send search data to BookingPage
     */

    if (onSearch) {
      onSearch(searchData);
    }

    /*
     * Close dropdowns after search
     */

    setIsDateOpen(false);
    setIsGuestOpen(false);
  }

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      {/* =================================================
          TOP CONTROLS
      ================================================= */}

      {/* <div className="mb-5 flex items-center justify-end gap-5"> */}

      {/* Language */}

      {/* <button
          type="button"
          className="hidden items-center gap-2 font-body text-sm md:flex"
        >
          🇬🇧
          <span>English</span>
          <span className="text-xs">⌄</span>
        </button> */}

      {/* Currency */}

      {/* <button
          type="button"
          className="hidden items-center gap-2 font-body text-sm md:flex"
        >
          INR
          <span className="text-xs">⌄</span>
        </button> */}

      {/* Room / Package */}

      {/* <div className="flex items-center rounded-full border border-foreground/10 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setRoomMode("Room")}
            className={`rounded-full px-4 py-2 font-body text-xs transition ${
              roomMode === "Room"
                ? "bg-foreground text-primary shadow-sm"
                : "text-foreground/70"
            }`}
          >
            Room
          </button>

          <button
            type="button"
            onClick={() => setRoomMode("Package")}
            className={`rounded-full px-4 py-2 font-body text-xs transition ${
              roomMode === "Package"
                ? "bg-foreground text-primary shadow-sm"
                : "text-foreground/70"
            }`}
          >
            Package
          </button>
        </div> */}

      {/* Accessibility */}

      {/* <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-foreground/20 md:flex"
        >
          <span className="text-lg">♿</span>
        </button>
      </div> */}

      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <div className="flex flex-col gap-3 lg:flex-row">

        {/* =================================================
            DATE BOX
        ================================================= */}

        <div className="relative flex-1">

          <button
            type="button"
            onClick={() => {
              setIsDateOpen((value) => !value);
              setIsGuestOpen(false);
            }}
            className="flex min-h-[58px] cursor-pointer w-full items-center border border-foreground/30 bg-white px-4 text-left transition hover:border-foreground/60"
          >

            {/* Calendar Icon */}

            <div className="mr-4 text-2xl text-foreground/50">

              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />

                <path d="M8 2v4M16 2v4M3 9h18" />
              </svg>

            </div>

            <div className="flex flex-1 items-center gap-4">

              {/* Check In */}

              <div className="flex flex-col">

                <span className="font-body text-[10px] uppercase tracking-wider text-foreground/40">
                  Check in
                </span>

                <span className="font-body text-sm font-medium">
                  {checkIn
                    ? formatShortDate(checkIn)
                    : "Select date"}
                </span>

              </div>

              <span className="text-2xl text-foreground/40">
                →
              </span>

              {/* Check Out */}

              <div className="flex flex-col">

                <span className="font-body text-[10px] uppercase tracking-wider text-foreground/40">
                  Check out
                </span>

                <span className="font-body text-sm font-medium">
                  {checkOut
                    ? formatShortDate(checkOut)
                    : "Select date"}
                </span>

              </div>

              {/* Nights */}

              {numberOfNights > 0 && (
                <span className="ml-auto hidden font-body text-xs text-foreground/50 xl:block">
                  {numberOfNights}{" "}
                  {numberOfNights === 1
                    ? "night"
                    : "nights"}
                </span>
              )}

            </div>

          </button>

          {/* =================================================
              CUSTOM CALENDAR
          ================================================= */}

          {isDateOpen && (
            <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-full min-w-[340px] border border-foreground/15 bg-primary p-5 shadow-2xl md:min-w-[430px] lg:w-[500px]">

              {/* Calendar Header */}

              <div className="mb-5 flex items-center justify-between">

                <button
                  type="button"
                  onClick={previousMonth}
                  className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-lg transition hover:border-accent hover:text-accent"
                >
                  ←
                </button>

                <div className="text-center">

                  <p className="font-heading text-lg">
                    {monthName}
                  </p>

                  <p className="mt-1 font-body text-[10px] uppercase tracking-wider text-foreground/40">
                    60 days available
                  </p>

                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-lg transition hover:border-accent hover:text-accent"
                >
                  →
                </button>

              </div>

              {/* Selection Status */}

              <div className="mb-5 grid grid-cols-2 gap-2">

                <div
                  className={`border p-3 ${
                    checkIn
                      ? "border-accent bg-accent/10"
                      : "border-foreground/10"
                  }`}
                >

                  <p className="font-body text-[9px] uppercase tracking-wider text-foreground/40">
                    Check in
                  </p>

                  <p className="mt-1 font-body text-sm font-medium">
                    {checkIn
                      ? formatDate(checkIn)
                      : "Select date"}
                  </p>

                </div>

                <div
                  className={`border p-3 ${
                    checkOut
                      ? "border-accent bg-accent/10"
                      : "border-foreground/10"
                  }`}
                >

                  <p className="font-body text-[9px] uppercase tracking-wider text-foreground/40">
                    Check out
                  </p>

                  <p className="mt-1 font-body text-sm font-medium">
                    {checkOut
                      ? formatDate(checkOut)
                      : "Select date"}
                  </p>

                </div>

              </div>

              {/* Week Days */}

              <div className="mb-2 grid grid-cols-7">

                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map((day) => (
                  <div
                    key={day}
                    className="py-2 text-center font-body text-[10px] uppercase tracking-wider text-foreground/40"
                  >
                    {day}
                  </div>
                ))}

              </div>

              {/* Calendar */}

              <div className="grid grid-cols-7 gap-1">

                {monthDays.map((date, index) => {

                  if (!date) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="aspect-square"
                      />
                    );
                  }

                  const available =
                    isAvailableDate(date);

                  const selectedCheckIn =
                    isSameDay(date, checkIn);

                  const selectedCheckOut =
                    isSameDay(date, checkOut);

                  const inRange =
                    isInSelectedRange(date);

                  const beforeCheckIn =
                    checkIn &&
                    !checkOut &&
                    isBefore(date, checkIn);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={
                        !available ||
                        beforeCheckIn
                      }
                      onClick={() =>
                        handleDateClick(date)
                      }
                      className={`
                        aspect-square
                        flex
                        items-center
                        justify-center
                        font-body
                        text-sm
                        transition

                        ${
                          !available ||
                          beforeCheckIn
                            ? "cursor-not-allowed text-foreground/20"
                            : "hover:bg-accent/20"
                        }

                        ${
                          inRange
                            ? "bg-accent/20"
                            : ""
                        }

                        ${
                          selectedCheckIn ||
                          selectedCheckOut
                            ? "bg-accent text-foreground font-medium"
                            : ""
                        }

                        ${
                          isSameDay(date, today) &&
                          !selectedCheckIn &&
                          !selectedCheckOut
                            ? "font-bold underline decoration-accent decoration-2 underline-offset-4"
                            : ""
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}

              </div>

              {/* Footer */}

              <div className="mt-5 flex items-center justify-between border-t border-foreground/10 pt-4">

                <div className="font-body text-xs text-foreground/50">

                  {!checkIn
                    ? "Select your check-in date"
                    : !checkOut
                    ? "Now select your check-out date"
                    : `${numberOfNights} ${
                        numberOfNights === 1
                          ? "night"
                          : "nights"
                      } selected`}

                </div>

                {checkIn && checkOut && (
                  <button
                    type="button"
                    onClick={() =>
                      setIsDateOpen(false)
                    }
                    className="bg-accent px-5 py-2 font-body text-xs font-medium text-foreground"
                  >
                    Done
                  </button>
                )}

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            GUEST BOX
        ================================================= */}

        <div className="relative flex-1">

          <button
            type="button"
            onClick={() => {
              setIsGuestOpen((value) => !value);
              setIsDateOpen(false);
            }}
            className="flex min-h-[58px] w-full items-center border border-foreground/30 bg-white px-4 text-left transition hover:border-foreground/60"
          >

            {/* Guest Icon */}

            <div className="mr-4 text-2xl text-foreground/50">

              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="7"
                  r="3.5"
                />

                <path d="M5 21c.5-4 2.8-6 7-6s6.5 2 7 6" />
              </svg>

            </div>

            <div className="flex flex-1 flex-col">

              <span className="font-body text-[10px] uppercase tracking-wider text-foreground/40">
                Guests
              </span>

              <span className="font-body text-sm font-medium">
                {guestSummary}
              </span>

            </div>

            <span className="ml-3 text-lg text-foreground/40">
              +
            </span>

          </button>

          {/* =================================================
              GUEST DROPDOWN
          ================================================= */}

          {isGuestOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-full min-w-[320px] border border-foreground/15 bg-primary p-5 shadow-2xl">

              <div className="mb-5">

                <p className="font-heading text-lg">
                  Guests & rooms
                </p>

                <p className="mt-1 font-body text-xs text-foreground/50">
                  Select the number of rooms and guests
                </p>

              </div>

              {/* Rooms */}

              <GuestRow
                title="Rooms"
                subtitle="Number of rooms"
                value={rooms}
                onDecrease={decreaseRooms}
                onIncrease={increaseRooms}
                minimum={1}
              />

              {/* Adults */}

              <GuestRow
                title="Adults"
                subtitle="Age 13+"
                value={adults}
                onDecrease={decreaseAdults}
                onIncrease={increaseAdults}
                minimum={1}
              />

              {/* Children */}

              <GuestRow
                title="Children"
                subtitle="Age 0–12"
                value={children}
                onDecrease={decreaseChildren}
                onIncrease={increaseChildren}
                minimum={0}
              />

              {/* Done */}

              <button
                type="button"
                onClick={() =>
                  setIsGuestOpen(false)
                }
                className="mt-5 w-full bg-foreground px-5 py-3 font-body text-sm text-primary transition hover:bg-accent hover:text-foreground"
              >
                Done
              </button>

            </div>
          )}

        </div>

        {/* =================================================
            PROMO
        ================================================= */}

        {/* <div className="flex min-h-[58px] flex-1 items-center border border-foreground/30 bg-white px-4">

          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo code"
            className="w-full bg-transparent font-body text-sm outline-none placeholder:text-foreground/60"
          />

        </div> */}

        {/* =================================================
            SEARCH BUTTON
        ================================================= */}

        <button
          type="button"
          disabled={!canSearch}
          onClick={handleSearch}
          aria-label="Search availability"
          className={`
            flex
            min-h-[58px]
            items-center
            justify-center
            px-8
            transition

            ${
              canSearch
                ? "bg-foreground text-primary hover:bg-accent hover:text-foreground"
                : "cursor-not-allowed bg-foreground/20 text-foreground/30"
            }
          `}
        >

          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >

            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path d="m20 20-4-4" />

          </svg>

        </button>

        {/* =================================================
            CALENDAR BUTTON
        ================================================= */}

        {/* <button
          type="button"
          onClick={() => setIsDateOpen(true)}
          className="flex min-h-[58px] items-center justify-center border border-foreground/30 bg-white px-6 transition hover:border-accent hover:text-accent"
          aria-label="Open calendar"
        >

          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />

            <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
          </svg>

        </button> */}

      </div>

      {/* =================================================
          SEARCH POINTER
      ================================================= */}

      {!canSearch && (
        <p className="mt-3 font-body text-xs text-foreground/50">
          {!checkIn || !checkOut
            ? "Select your check-in and check-out dates to search availability."
            : "Select your guest and room details to search availability."}
        </p>
      )}

      {/* =================================================
          FLEXIBLE DATES
      ================================================= */}

      <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 font-body text-sm">

        <input
          type="checkbox"
          checked={flexibleDates}
          onChange={(e) =>
            setFlexibleDates(e.target.checked)
          }
          className="h-5 w-5 accent-[#e4b441]"
        />

        <span>
          Flexible Dates
        </span>

      </label>

    </div>
  );
}

/*
========================================================
GUEST ROW COMPONENT
========================================================
*/

function GuestRow({
  title,
  subtitle,
  value,
  onDecrease,
  onIncrease,
  minimum,
}) {
  return (
    <div className="flex items-center justify-between border-b border-foreground/10 py-4">

      <div>

        <p className="font-body text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 font-body text-xs text-foreground/40">
          {subtitle}
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          disabled={value <= minimum}
          onClick={onDecrease}
          className={`flex h-8 w-8 items-center justify-center rounded-full border font-body text-lg transition ${
            value <= minimum
              ? "cursor-not-allowed border-foreground/10 text-foreground/20"
              : "border-foreground/20 hover:border-accent hover:text-accent"
          }`}
        >
          −
        </button>

        <span className="w-5 text-center font-body text-sm">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 font-body text-lg transition hover:border-accent hover:text-accent"
        >
          +
        </button>

      </div>

    </div>
  );
}