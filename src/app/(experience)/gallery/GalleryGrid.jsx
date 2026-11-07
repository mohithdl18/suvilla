"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryGrid({ images = [] }) {
  // Index of the photo open in the preview, or null when closed.
  const [active, setActive] = useState(null);
  const touchStartX = useRef(null);
  const count = images.length;
  const isOpen = active !== null;

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (step) => setActive((current) => (current + step + count) % count),
    [count]
  );

  // Keyboard controls and page-scroll lock while the preview is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, go]);

  if (count === 0) {
    return (
      <section className="px-6 py-24 text-center text-[#052a50]/60 md:px-12">
        Photos coming soon.
      </section>
    );
  }

  const current = isOpen ? images[active] : null;

  return (
    <>
      {/* ================= MASONRY GRID ================= */}
      <section className="px-6 py-14 md:px-12 md:py-20 lg:px-20 lg:pb-32">
        <div className="mx-auto max-w-7xl columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open photo: ${image.alt}`}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#052a50]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </section>


      {/* ================= PREVIEW ================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          className="fixed inset-0 z-[100] flex flex-col bg-[#052a50]/95 backdrop-blur-sm"
          onClick={close}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-[#F7FAEE] md:px-8">
            <span className="font-body text-sm tracking-[0.2em] text-[#F7FAEE]/70">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground transition-opacity hover:opacity-80"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          {/* Image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F7FAEE]/90 text-[#052a50] transition hover:bg-[#e4b441] md:left-6"
                >
                  <ChevronLeft size={22} strokeWidth={1.75} />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F7FAEE]/90 text-[#052a50] transition hover:bg-[#e4b441] md:right-6"
                >
                  <ChevronRight size={22} strokeWidth={1.75} />
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          <p className="px-6 pb-6 text-center font-body text-sm text-[#F7FAEE]/85 md:text-base">
            {current.alt}
          </p>
        </div>
      )}
    </>
  );
}