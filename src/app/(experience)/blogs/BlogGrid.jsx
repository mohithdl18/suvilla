"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import blog1 from "./blog1";
import blog2 from "./blog2";
import blog3 from "./blog3";

const blogs = [
  {
    ...blog1,
    description:
      "A relaxed family stay in Sakleshpura, with flexible room arrangements and shared spaces designed for spending time together.",
  },
  {
    ...blog2,
    description:
      "A slower stay by the pond, exploring the character of SU Villa’s Pond View Cottage and its quiet connection with nature.",
  },
  {
    ...blog3,
    description:
      "A natural setting for corporate getaways, intimate celebrations and meaningful gatherings in Sakleshpura.",
  },
];

export default function BlogGrid({ initialBlog = null }) {
  const pathname = usePathname();
  const [selectedBlog, setSelectedBlog] = useState(initialBlog);

  useEffect(() => {
    const slug = pathname?.startsWith("/blogs/")
      ? pathname.split("/blogs/")[1]
      : null;

    if (slug) {
      const blog = blogs.find((item) => item.slug === slug);

      if (blog) {
        setSelectedBlog(blog);
      }
    } else if (pathname === "/blogs") {
      setSelectedBlog(null);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = selectedBlog ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedBlog]);

  const openBlog = (blog) => {
    window.history.pushState({}, "", `/blogs/${blog.slug}`);
    setSelectedBlog(blog);
  };

  const closeBlog = () => {
    window.history.pushState({}, "", "/blogs");
    setSelectedBlog(null);
  };

  return (
    <>
      {/* Blog Grid */}
      <section className="px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <button
              key={blog.id}
              onClick={() => openBlog(blog)}
              className="group overflow-hidden rounded-2xl border border-foreground/10 bg-[#E3ECC0] text-left md:cursor-none"
              onMouseMove={(e) => {
  if (window.innerWidth < 768) return;

  const cursor = document.getElementById(
    `read-cursor-${blog.id}`
  );

  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
}}

onMouseEnter={() => {
  if (window.innerWidth < 768) return;

  const cursor = document.getElementById(
    `read-cursor-${blog.id}`
  );

  if (cursor) {
    cursor.style.opacity = "1";
  }
}}

onMouseLeave={() => {
  const cursor = document.getElementById(
    `read-cursor-${blog.id}`
  );

  if (cursor) {
    cursor.style.opacity = "0";
  }
}}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="max-w-md text-lg leading-relaxed text-foreground">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <span>{blog.author}</span>
                    <span>{blog.readingTime}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="min-h-[150px] px-6 py-6">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {blog.date}
                </p>

                <h3 className="text-2xl font-light leading-tight text-foreground">
                  {blog.title}
                </h3>
              </div>

              {/* READ Cursor */}
              <span
                id={`read-cursor-${blog.id}`}
                className="pointer-events-none fixed z-[9999] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-xs tracking-[0.15em] text-foreground opacity-0 transition-opacity duration-200"
              >
                READ
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/70 px-4 py-6 backdrop-blur-sm md:px-8">
          <div className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-primary">
            {/* Close */}
            <button
              onClick={closeBlog}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#E3ECC0] text-xl text-foreground transition-opacity hover:opacity-70"
              aria-label="Close"
            >
              ×
            </button>

            {/* Article */}
            <article className="overflow-y-auto px-6 py-16 md:px-12 md:py-20 lg:px-20">
              <div className="mx-auto max-w-3xl">
                {/* Date */}
                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-foreground/50">
                  {selectedBlog.date}
                </p>

                {/* Title */}
                <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
                  {selectedBlog.title}
                </h1>

                {/* Meta */}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/50">
                  <span>{selectedBlog.author}</span>
                  <span>{selectedBlog.readingTime}</span>
                </div>

                {/* Hero Image */}
                <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="mt-12 space-y-12">
                  {selectedBlog.content.map((section, index) => (
                    <section key={index}>
                      {section.heading && (
                        <h2 className="mb-5 text-2xl font-light text-foreground md:text-3xl">
                          {section.heading}
                        </h2>
                      )}

                      <div className="space-y-5">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className="text-base leading-8 text-foreground/75 md:text-lg"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
}