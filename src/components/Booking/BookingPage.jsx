"use client";

import { useState } from "react";
import BookingSearchBar from "./BookingSearchBar";
import RoomAvailability from "./RoomAvailability";

export default function BookingPage() {
  /*
   * --------------------------------------------------
   * SEARCH STATE
   * --------------------------------------------------
   *
   * This is the data that has been submitted by the
   * customer after clicking the Search button.
   */

  const [searchData, setSearchData] = useState(null);

  /*
   * This value changes every time Search is clicked.
   *
   * RoomAvailability can use this to refresh its
   * availability whenever a new search is submitted.
   */

  const [searchVersion, setSearchVersion] = useState(0);

  /*
   * --------------------------------------------------
   * HANDLE SEARCH
   * --------------------------------------------------
   */

  function handleSearch(data) {
    console.log("Booking search:", data);

    setSearchData(data);

    /*
     * Incrementing this causes the availability
     * section to refresh.
     */

    setSearchVersion((value) => value + 1);
  }

  return (
    <main className="min-h-screen bg-primary text-foreground">
      {/* ==================================================
          TOP HEADER
      ================================================== */}

      <section className="px-6 pb-10 pt-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-accent">
            SU VILLA
          </p>

          <h1 className="font-heading text-4xl leading-tight md:text-5xl lg:text-6xl">
            Find your stay
          </h1>

          <p className="mt-4 max-w-xl font-body text-sm leading-6 text-foreground/60 md:text-base">
            Select your dates and preferences to explore available rooms at
            SU VILLA.
          </p>
        </div>
      </section>

      {/* ==================================================
          AVAILABILITY SEARCH
      ================================================== */}

      <section className="border-y border-foreground/10 bg-[#f9f8f7] px-4 py-5">
        <div className="mx-auto w-full max-w-[1000px]">
          <BookingSearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* ==================================================
          ROOMS
      ================================================== */}

      <section className="px-6 py-14 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 font-body text-xs uppercase tracking-[0.25em] text-accent">
                Available stays
              </p>

              <h2 className="font-heading text-3xl md:text-4xl">
                Choose your room
              </h2>
            </div>

            <p className="hidden font-body text-sm text-foreground/50 md:block">
              4 stays
            </p>
          </div>

          {/* 
            The availability component receives the latest
            search information and refresh version.
          */}

          <RoomAvailability
            searchData={searchData}
            searchVersion={searchVersion}
          />

        </div>
      </section>
    </main>
  );
}