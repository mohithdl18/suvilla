
"use client";

import { useEffect, useState } from "react";

import blog1 from "@/app/(experience)/blogs/blog1";
import blog2 from "@/app/(experience)/blogs/blog2";
import blog3 from "@/app/(experience)/blogs/blog3";

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

export default function FeaturedBlogs() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Lock background scrolling while the modal is open
    useEffect(() => {
        document.body.style.overflow = selectedBlog ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedBlog]);

    // Close modal using browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const slug = window.location.pathname.startsWith("/blogs/")
                ? window.location.pathname.split("/blogs/")[1]
                : null;

            if (slug) {
                const blog = blogs.find((item) => item.slug === slug);
                setSelectedBlog(blog || null);
            } else {
                setSelectedBlog(null);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const openBlog = (blog) => {
        if (blog.slug) {
            window.history.pushState({}, "", `/blogs/${blog.slug}`);
        }

        setSelectedBlog(blog);
    };

    const closeBlog = () => {
        if (window.location.pathname.startsWith("/blogs/")) {
            window.history.pushState({}, "", "/blogs");
        }

        setSelectedBlog(null);
    };

    return (
        <>
            <section className="w-full bg-[#F7FAEE] text-foreground">

                {/* SECTION HEADING */}
                
{/* SECTION HEADING */}
<div className="flex items-end justify-between gap-6 px-6 py-10 md:px-12 lg:px-20">
    <div>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-accent">
            Blogs
        </p>

        <h2 className="mt-3 max-w-4xl font-body text-4xl leading-tight md:text-6xl lg:text-7xl">
            Stories from slow days and beautiful places
        </h2>

        {/* MOBILE EXPLORE MORE — BELOW HEADING */}
        <a
            href="/blogs"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-accent hover:text-foreground md:hidden"
        >
            Explore More
            <span>→</span>
        </a>
    </div>

    {/* DESKTOP EXPLORE MORE — RIGHT SIDE */}
    <a
        href="/blogs"
        className="mb-1 hidden shrink-0 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-accent hover:text-foreground md:inline-flex"
    >
        Explore More
        <span>→</span>
    </a>
</div>


                {/* BLOG GRID */}
                <div className="px-6 pb-12 md:px-12 lg:px-16 xl:px-20">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {blogs.map((blog) => (
                            <button
                                key={blog.id}
                                type="button"
                                onClick={() => openBlog(blog)}
                                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#E3ECC0] text-left md:cursor-none"
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
                                {/* IMAGE + HOVER CONTENT */}
                                <div className="relative aspect-[4/3] overflow-hidden">

                                    {/* Image */}
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
                                    />

                                    {/* Hover Content */}
                                    <div className="absolute inset-0 flex flex-col justify-between bg-[#E3ECC0] p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 md:p-6">
                                        <p className="max-w-md font-body text-base leading-relaxed text-foreground md:text-lg">
                                            {blog.description}
                                        </p>

                                        <div className="flex flex-wrap items-center justify-between gap-3 font-body text-xs text-foreground/60">
                                            <span>{blog.author}</span>
                                            <span>{blog.readingTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM CONTENT */}
                                <div className="min-h-[145px] px-5 py-5 md:px-6 md:py-6">
                                    <p className="mb-3 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                                        {blog.date}
                                    </p>

                                    <h3 className="font-body text-2xl font-light leading-tight text-foreground md:text-3xl">
                                        {blog.title}
                                    </h3>
                                </div>

                                {/* CUSTOM READ CURSOR — DESKTOP */}
                                <span
                                    id={`read-cursor-${blog.id}`}
                                    className="pointer-events-none fixed z-[9999] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-xs tracking-[0.15em] text-foreground opacity-0 transition-opacity duration-200 md:flex"
                                >
                                    READ
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* MOBILE EXPLORE MORE */}
                {/* <div className="px-4 pb-10 md:hidden">
                    <a
                        href="/blogs"
                        className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-accent hover:text-foreground"
                    >
                        Explore More
                        <span>→</span>
                    </a>
                </div> */}
            </section>

            {/* BLOG MODAL */}
            {selectedBlog && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/70 px-3 py-4 backdrop-blur-sm md:px-8 md:py-6"
                    onClick={closeBlog}
                >
                    <div
                        className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-primary md:h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={closeBlog}
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#E3ECC0] text-xl text-foreground transition-opacity hover:opacity-70 md:right-5 md:top-5"
                            aria-label="Close blog"
                        >
                            ×
                        </button>

                        {/* ARTICLE */}
                        <article className="overflow-y-auto px-5 py-12 md:px-12 md:py-16 lg:px-20">
                            <div className="mx-auto max-w-3xl">

                                {/* DATE */}
                                <p className="mb-5 font-body text-xs uppercase tracking-[0.2em] text-foreground/50">
                                    {selectedBlog.date}
                                </p>

                                {/* TITLE */}
                                <h1 className="font-body text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
                                    {selectedBlog.title}
                                </h1>

                                {/* META */}
                                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-foreground/50">
                                    <span>{selectedBlog.author}</span>
                                    <span>{selectedBlog.readingTime}</span>
                                </div>

                                {/* HERO IMAGE */}
                                <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl md:mt-10">
                                    <img
                                        src={selectedBlog.image}
                                        alt={selectedBlog.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* ARTICLE CONTENT */}
                                <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
                                    {selectedBlog.content.map((section, index) => (
                                        <section key={index}>
                                            {section.heading && (
                                                <h2 className="mb-5 font-body text-2xl font-light text-foreground md:text-3xl">
                                                    {section.heading}
                                                </h2>
                                            )}

                                            <div className="space-y-5">
                                                {section.paragraphs.map(
                                                    (paragraph, paragraphIndex) => (
                                                        <p
                                                            key={paragraphIndex}
                                                            className="font-body text-base leading-8 text-foreground/75 md:text-lg"
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    )
                                                )}
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
