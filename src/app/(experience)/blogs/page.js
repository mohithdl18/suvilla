// import HomeBackButton from "./HomeBackButton";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Footer from "@/components/Footer/Footer";
import BlogGrid from "./BlogGrid";
import { House } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Finding Stillness by the Creek",
    author: "SU Villa",
    date: "12 September 2026",
    readingTime: "4 min read",
    image: "/images/room1.jpg",
    file: "blog1.txt",
  },
  {
    id: 2,
    title: "A Weekend Away from the Ordinary",
    author: "SU Villa",
    date: "28 August 2026",
    readingTime: "5 min read",
    image: "/images/room2.jpg",
    file: "blog1.txt",
  },
  {
    id: 3,
    title: "The Art of Doing Nothing",
    author: "SU Villa",
    date: "16 August 2026",
    readingTime: "3 min read",
    image: "/images/room3.jpg",
    file: "blog1.txt",
  },
  {
    id: 4,
    title: "Mornings Beside the Water",
    author: "SU Villa",
    date: "02 August 2026",
    readingTime: "4 min read",
    image: "/images/blog/blog-4.jpg",
    file: "blog1.txt",
  },
  {
    id: 5,
    title: "A Place to Reconnect",
    author: "SU Villa",
    date: "21 July 2026",
    readingTime: "5 min read",
    image: "/images/blog/blog-5.jpg",
    file: "blog1.txt",
  },
  {
    id: 6,
    title: "The Beauty of Slow Travel",
    author: "SU Villa",
    date: "08 July 2026",
    readingTime: "4 min read",
    image: "/images/blog/blog-6.jpg",
    file: "blog1.txt",
  },
];

export default function BlogsPage() {
  const blogsWithContent = blogs.map((blog) => {
    const filePath = path.join(
      process.cwd(),
      "src/app/(experience)/blogs",
      blog.file
    );

    const content = fs.readFileSync(filePath, "utf8");

    return {
      ...blog,
      content,
    };
  });

  return (
    <main className="min-h-screen bg-primary text-foreground">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen w-full overflow-hidden bg-primary lg:grid lg:grid-cols-2">

        {/* ================= MOBILE BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src="/images/blog/blog-hero.jpg"
            alt="Journal at SU Villa"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-black/30 lg:hidden" />

        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-10 flex min-h-screen items-end px-8 pb-20 md:px-16 md:pb-24 lg:items-center lg:px-20 lg:py-20 xl:px-24">

          {/* Home Button */}
          <Link
            href="/"
            className="absolute left-6 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground transition-opacity duration-300 hover:opacity-70 md:left-12 md:top-6 lg:left-6"
            aria-label="Home"
          >
            <House
              size={20}
              strokeWidth={1.5}
            />  
          </Link>

          <div className="mb-20 max-w-2xl lg:mb-0">

            {/* Label */}
            <p className="mb-5 font-body text-sm uppercase tracking-[0.3em] text-accent md:text-base">
              Journal
            </p>

            {/* Main Heading */}
            {/* Mobile Heading */}
            <h1 className="font-body text-5xl font-normal leading-[0.95] tracking-tight text-primary md:text-6xl lg:hidden">
              Stories from slow days and beautiful places
            </h1>

            {/* Desktop Heading */}
            <h1 className="hidden font-body text-7xl font-normal leading-[0.95] tracking-tight text-foreground xl:text-8xl lg:block">
              Stories from slow days and beautiful places
            </h1>

            {/* Description */}
            {/* Mobile Description */}
            <p className="mt-8 max-w-xl font-body text-sm leading-7 text-primary md:text-base lg:hidden">
              Stories, thoughts and little moments from SU Villa — a collection
              of places, experiences and memories worth slowing down for.
            </p>

            {/* Desktop Description */}
            <p className="mt-8 hidden max-w-xl font-body text-base leading-7 text-foreground/60 lg:block">
              Stories, thoughts and little moments from SU Villa — a collection
              of places, experiences and memories worth slowing down for.
            </p>

          </div>
        </div>

        {/* ================= ORIGINAL DESKTOP RIGHT IMAGE ================= */}
        <div className="relative hidden min-h-[60vh] w-full lg:block lg:min-h-screen">
          <img
            src="/images/blog/blog-hero.jpg"
            alt="Journal at SU Villa"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

      </section>

      {/* ================= BLOG GRID ================= */}
      <BlogGrid />

      <Footer />
    </main>
  );
}