import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import BlogCategoryFilter from "./BlogCategoryFilter";

export const metadata: Metadata = {
    title: "Clean Air Blog — Air Quality Tips & Guides | Antia",
    description: "Expert advice, guides, and news about air quality, HEPA filters, AQI levels, and how to protect your family from India's air pollution.",
    alternates: { canonical: "https://antia-india.vercel.app/blogs" },
};

export default function BlogsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const category = searchParams?.category || "All";
    const allBlogs = db.blogs.getPublished();
    const categories = ["All", ...Array.from(new Set(allBlogs.map(b => b.category)))];

    const filtered = category === "All" ? allBlogs : allBlogs.filter(b => b.category === category);
    const featured = filtered.filter(b => b.featured);
    const rest = filtered.filter(b => !b.featured);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Clean Air Blog</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Expert advice, buying guides, and the latest on India&apos;s air quality — so you can make smarter decisions for your family&apos;s health.
                </p>
            </div>

            {/* Category Tabs — client component for active state */}
            <BlogCategoryFilter categories={categories} active={category} />

            {/* Featured Articles */}
            {featured.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                    {featured.map((post) => (
                        <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                <img src={post.image} alt={post.altText} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{post.category}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                                <p className="text-gray-600 text-sm flex-1 mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                                    <Link href={`/blogs/${post.slug}`} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:gap-2 transition-all">
                                        Read Article <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* More Articles */}
            {rest.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{featured.length > 0 ? "More Articles" : "Articles"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rest.map((post) => (
                            <article key={post.slug} className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all">
                                <div className="aspect-video overflow-hidden bg-gray-100">
                                    <img src={post.image} alt={post.altText} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="flex flex-col flex-1 p-4">
                                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{post.category}</span>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                    <p className="text-xs text-gray-500 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                        <Link href={`/blogs/${post.slug}`} className="text-xs font-semibold text-blue-600 hover:underline">Read →</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}

            {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-500">No articles in this category yet.</div>
            )}
        </div>
    );
}
