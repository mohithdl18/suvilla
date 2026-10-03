import { notFound } from "next/navigation";

import Footer from "@/components/Footer/Footer";
import BlogGrid from "../BlogGrid";

import blog1 from "../blog1";
import blog2 from "../blog2";
import blog3 from "../blog3";

const blogs = [
  blog1,
  blog2,
  blog3,
];

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-primary text-foreground">

      {/* ================= HERO ================= */}
      <section className="grid min-h-screen w-full grid-cols-1 bg-primary lg:grid-cols-2">

        {/* LEFT */}
        <div className="relative flex min-h-screen items-center px-8 py-20 md:px-16 lg:px-20 xl:px-24">

          <div className="max-w-2xl">

            <p className="mb-5 font-body text-sm uppercase tracking-[0.3em] text-accent md:text-base">
              Journal
            </p>

            <h1 className="font-body text-5xl font-normal leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
              Stories from slow days and beautiful places
            </h1>

            <p className="mt-8 max-w-xl font-body text-sm leading-7 text-foreground/60 md:text-base">
              Stories, thoughts and little moments from SU Villa — a collection
              of places, experiences and memories worth slowing down for.
            </p>

          </div>
        </div>

        {/* RIGHT */}
        <div className="relative min-h-[60vh] w-full lg:min-h-screen">
          <img
            src="/images/blog/blog-hero.jpg"
            alt="Journal at SU Villa"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

      </section>

      {/* BLOG GRID / MODAL */}
      <BlogGrid initialBlog={blog} />

      <Footer />

    </main>
  );
}