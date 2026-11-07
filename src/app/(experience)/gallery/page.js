import Link from "next/link";
import fs from "fs";
import path from "path";
import { House } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import GalleryGrid from "./GalleryGrid";

export const metadata = {
  title: "Gallery | SU VILLA",
  description:
    "A look around SU VILLA by the Creek, Sakleshpura: the villa, the pool, the creek-side cottage and our rooms.",
};

// Optional captions, keyed by file name. Any image in
// public/images/gallery without an entry here still appears,
// with a simple numbered caption.
const captions = {
  "gallery-01.jpg": "SU VILLA from above at night",
  "gallery-02.jpg": "The villa, pool and garden path after dark",
  "gallery-03.jpg": "The lit-up villa beside the pond",
  "gallery-04.jpg": "The cottage on a misty morning",
  "gallery-05.jpg": "The pond-view cottage at dawn",
  "gallery-06.jpg": "The pool and the forest beyond",
  "gallery-07.jpg": "The garden walk to the main door",
  "gallery-08.jpg": "The open-air hall",
  "gallery-09.jpg": "Poolside lawn and stepping stones",
  "gallery-10.jpg": "The cottage balcony",
  "gallery-11.jpg": "A quiet courtyard corner",
  "gallery-12.jpg": "The open-roof shower",
  "gallery-13.jpg": "Family suite with the loft stairs",
  "gallery-14.jpg": "The loft bedroom, facing the trees",
  "gallery-15.jpg": "Courtyard seating among the plants",
};

const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

// Reads every image in public/images/gallery, so new photos show up
// just by adding them to that folder (sorted by file name).
function getGalleryImages() {
  const dir = path.join(process.cwd(), "public", "images", "gallery");

  let files = [];
  try {
    files = fs.readdirSync(dir).filter((file) => IMAGE_FILE.test(file));
  } catch {
    return [];
  }

  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file, index) => ({
      src: `/images/gallery/${file}`,
      alt: captions[file] || `SU VILLA by the Creek, photo ${index + 1}`,
    }));
}

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <main className="min-h-screen bg-primary text-foreground">

      {/* ================= HEADING ================= */}
      <section className="relative px-6 pt-28 md:px-12 md:pt-32 lg:px-20">

        {/* Home Button */}
        <Link
          href="/"
          className="absolute left-6 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground transition-opacity duration-300 hover:opacity-70 md:left-12 md:top-6 lg:left-8"
          aria-label="Home"
        >
          <House size={20} strokeWidth={1.5} />
        </Link>

        <div className="mx-auto max-w-7xl">
          <h1 className="font-body text-5xl font-normal leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Gallery
          </h1>
        </div>

      </section>


      {/* ================= GRID ================= */}
      <GalleryGrid images={images} />

      <Footer />
    </main>
  );
}