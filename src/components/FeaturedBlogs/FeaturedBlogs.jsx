"use client";

import { useEffect, useState } from "react";

import blog1 from "@/app/(experience)/blogs/blog1";
import blog2 from "@/app/(experience)/blogs/blog2";
import blog3 from "@/app/(experience)/blogs/blog3";

const blogs = [
    {
        ...blog1,
        description:
            "Plan a family stay at SU VILLA, with spacious family suites, supplementary rooms and shared spaces designed for relaxed time together in the peaceful surroundings of Sakleshpura.",
        readTime: blog1.readingTime,
    },

    {
        ...blog2,
        description:
            "Discover the charm of SU VILLA's pond-view cottage, featuring a front balcony and sky-view bathroom. Explore what makes this stay different from the main-block Couple Suite.",
        readTime: blog2.readingTime,
    },

    {
        ...blog3,
        description:
            "Plan a corporate getaway or intimate celebration at SU VILLA in Sakleshpura. Discover gathering spaces, accommodation options and everything you need to plan your event.",
        readTime: blog3.readingTime,
    },
];

export default function FeaturedBlogs() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Lock background scrolling while modal is open
    useEffect(() => {
        if (selectedBlog) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedBlog]);

    const closeBlog = () => {
        setSelectedBlog(null);
    };

    return (
        <>
            <section className="w-full bg-[#F7FAEE] text-foreground">

                {/* ================= SECTION HEADING ================= */}

                <div className="flex items-end justify-between px-8 py-10 md:px-12 lg:px-20">

                    <div>
                        <p className="font-body text-xs uppercase tracking-[0.3em] text-accent">
                            Blogs
                        </p>

                        <h2 className="mt-3 max-w-4xl font-body text-5xl leading-tight md:text-6xl lg:text-7xl">
                            Stories from slow days and beautiful places
                        </h2>
                    </div>

                    {/* Explore More */}
                    <a
                        href="/blogs"
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-all duration-200 hover-bg-accent hover-text-foreground"
                    >
                        Explore More
                        <span>→</span>
                    </a>

                </div>


                {/* ================= BLOG CARDS ================= */}

                <div className="grid grid-cols-1 gap-4 px-4 pb-12 md:grid-cols-3 md:gap-5 md:px-8">

                    {blogs.map((blog) => (
                        <button
                            key={blog.id}
                            onClick={() => setSelectedBlog(blog)}
                            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-foreground/15 bg-[#E3ECC0] text-left"
                        >

                            {/* ================= TOP 75% ================= */}

                            <div className="absolute inset-x-0 top-0 h-[75%]">

                                {/* Image */}
                                <div className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>


                                {/* Hover Content */}
                                <div className="absolute inset-0 flex flex-col justify-between bg-[#E3ECC0] p-6 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 md:p-7">

                                    {/* Description */}
                                    <div>
                                        <p className="max-w-md font-body text-sm leading-6 text-foreground/70 md:text-[15px]">
                                            {blog.description}
                                        </p>
                                    </div>


                                    {/* Meta */}
                                    <div>

                                        <div className="mb-4 h-px w-8 bg-accent" />

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[10px] uppercase tracking-[0.16em] text-accent">

                                            <span>{blog.author}</span>

                                            <span className="h-1 w-1 rounded-full bg-accent" />

                                            <span>{blog.date}</span>

                                            <span className="h-1 w-1 rounded-full bg-accent" />

                                            <span>{blog.readTime}</span>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ================= BOTTOM 25% ================= */}

                            <div className="absolute inset-x-0 bottom-0 flex h-[25%] items-center border-t border-foreground/15 px-6 md:px-7">

                                <div className="flex w-full items-center justify-between gap-4">

                                    <h3 className="font-body text-2xl leading-tight text-foreground md:text-3xl">
                                        {blog.title}
                                    </h3>

                                    {/* Arrow */}
                                    {/* <span className="shrink-0 text-xl text-accent transition-transform duration-300 group-hover:translate-x-1">
                                        ↗
                                    </span> */}

                                </div>

                            </div>

                        </button>
                    ))}

                </div>

            </section>


            {/* ===================================================== */}
            {/* ===================== BLOG MODAL ==================== */}
            {/* ===================================================== */}

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