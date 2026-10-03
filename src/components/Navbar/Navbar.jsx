"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-10 left-0 z-50 w-full">
        <div className="relative flex h-20 w-full items-stretch">

          {/* Left — Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-[220px] shrink-0 items-center px-20 text-white transition-colors duration-300 hover:text-[#E4B441]"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-[1px] w-7 bg-current transition-all duration-300 ${menuOpen ? "translate-y-[4px] rotate-45" : ""
                  }`}
              />

              <span
                className={`block h-[1px] w-7 bg-current transition-all duration-300 ${menuOpen ? "-translate-y-[1px] -rotate-45" : ""
                  }`}
              />
            </div>

            <span className="ml-4 font-body text-md uppercase tracking-[0.15em]">
              Menu
            </span>
          </button>

          {/* Center — Logo */}
          <div className="pointer-events-none absolute left-1/2 top-0 flex h-20 -translate-x-1/2 items-center">
            <a
              href="/"
              className="pointer-events-auto flex h-20 items-center transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src="/images/another.png"
                alt="SU VILLA"
                className="h-32 w-32 object-contain"
              />
            </a>
          </div>

          {/* Right — Book Now */}
          <button
            onClick={() => (window.location.href = "/bookings")}
            className="ml-auto mr-10 flex h-20 w-[180px] shrink-0 cursor-pointer items-center justify-center font-body text-sm uppercase tracking-[0.15em] text-primary transition-colors duration-300 hover:!text-[#E4B441]"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-500 ${menuOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
          }`}
      />

      {/* Side Menu */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[20vw] min-w-[280px] bg-primary text-foreground shadow-2xl transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Menu Header */}
        <div className="flex h-20 items-center justify-between border-b border-foreground/20 px-8">
          <span className="font-body text-sm uppercase tracking-[0.2em] text-foreground/60">
            Navigation
          </span>

          <button
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer text-2xl text-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col px-8 pt-12">
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            Home
          </a>

          <a
            href="/rooms"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            Rooms
          </a>

          <a
            href="/#FeaturedAmenities"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            Amenities
          </a>

          <a
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            Gallery
          </a>

          <a
            href="/blogs"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            Blogs
          </a>

          <a
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="border-b border-foreground/15 py-5 font-body text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
          >
            About
          </a>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-8 left-8 right-8">
          <p className="font-body text-xs uppercase tracking-[0.15em] text-foreground/40">
            SU ViLLA
          </p>
        </div>
      </aside>
    </>
  );
}