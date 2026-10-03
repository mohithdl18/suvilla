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

export default function MobileFeaturedBlogs() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    /* Lock background scrolling while modal is open */
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

                {/* ================================================= */}
                {/* SECTION HEADING */}
                {/* ================================================= */}

                <div className="px-5 py-10">

                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-accent">
                        Blogs
                    </p>

                    <h2 className="mt-3 max-w-[95%] font-body text-4xl leading-tight text-foreground">
                        Stories from slow days and beautiful places
                    </h2>

                    {/* Explore More */}
                    <a
                        href="/blogs"
                        className="mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-primary transition-all duration-200 hover:bg-accent hover:text-foreground"
                    >
                        Explore More
                        <span>→</span>
                    </a>

                </div>


                {/* ================================================= */}
                {/* BLOG CARDS */}
                {/* ================================================= */}

                <div className="flex flex-col gap-4 px-4 pb-10">

                    {blogs.map((blog) => (
                        <button
                            key={blog.id}
                            onClick={() => setSelectedBlog(blog)}
                            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-foreground/15 bg-[#E3ECC0] text-left"
                        >

                            {/* ===================================== */}
                            {/* TOP 75% */}
                            {/* ===================================== */}

                            <div className="absolute inset-x-0 top-0 h-[75%]">

                                {/* Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                            </div>


                            {/* ===================================== */}
                            {/* BOTTOM 25% */}
                            {/* ===================================== */}

                            <div className="absolute inset-x-0 bottom-0 flex h-[25%] items-center border-t border-foreground/15 bg-[#E3ECC0] px-5">

                                <h3 className="font-body text-xl leading-tight text-foreground">
                                    {blog.title}
                                </h3>

                            </div>

                        </button>
                    ))}

                </div>

            </section>


            {/* ===================================================== */}
            {/* BLOG MODAL */}
            {/* ===================================================== */}

            {selectedBlog && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/70 p-3 backdrop-blur-sm"
                    onClick={closeBlog}
                >

                    {/* ================================================= */}
                    {/* MODAL */}
                    {/* ================================================= */}

                    <div
                        className="relative flex h-[92vh] w-full overflow-hidden rounded-2xl bg-primary shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* ============================================= */}
                        {/* CLOSE BUTTON */}
                        {/* ============================================= */}

                        <button
                            onClick={closeBlog}
                            aria-label="Close blog"
                            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/40 bg-primary/80 text-xl leading-none text-foreground backdrop-blur-md transition-colors duration-300 hover:border-accent hover:text-accent"
                        >
                            ×
                        </button>


                        {/* ============================================= */}
                        {/* SCROLLABLE CONTENT */}
                        {/* ============================================= */}

                        <div className="w-full overflow-y-auto">

                            {/* Hero Image */}
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>


                            {/* ========================================= */}
                            {/* ARTICLE */}
                            {/* ========================================= */}

                            <article className="px-6 py-8">

                                {/* Meta */}

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[9px] uppercase tracking-[0.15em] text-accent">

                                    <span>
                                        {selectedBlog.author}
                                    </span>

                                    <span className="h-px w-4 bg-accent" />

                                    <span>
                                        {selectedBlog.date}
                                    </span>

                                    <span className="h-px w-4 bg-accent" />

                                    <span>
                                        {selectedBlog.readTime}
                                    </span>

                                </div>


                                {/* Heading */}

                                <h2 className="mt-5 font-body text-4xl leading-[1.05] text-foreground">
                                    {selectedBlog.title}
                                </h2>


                                {/* ===================================== */}
                                {/* BLOG CONTENT */}
                                {/* ===================================== */}

                                <div className="mt-8">

                                    {selectedBlog.content.map(
                                        (section, index) => (
                                            <section
                                                key={index}
                                                className={
                                                    index === 0
                                                        ? ""
                                                        : "mt-10"
                                                }
                                            >

                                                {/* Section Heading */}

                                                {section.heading && (
                                                    <h3 className="mb-4 font-body text-2xl leading-tight text-foreground">
                                                        {section.heading}
                                                    </h3>
                                                )}


                                                {/* Paragraphs */}

                                                {section.paragraphs.map(
                                                    (
                                                        paragraph,
                                                        paragraphIndex
                                                    ) => (
                                                        <p
                                                            key={
                                                                paragraphIndex
                                                            }
                                                            className="mb-5 font-body text-[15px] leading-7 text-foreground/75"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    )
                                                )}

                                            </section>
                                        )
                                    )}

                                </div>

                            </article>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}