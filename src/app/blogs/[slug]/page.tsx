import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Clock, ArrowLeft, Tag } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = db.blogs.getBySlug(slug);
    if (!blog) return { title: "Blog Not Found" };
    return {
        title: blog.seo.metaTitle,
        description: blog.seo.metaDescription,
        keywords: blog.seo.keywords,
        alternates: { canonical: blog.seo.canonical },
        openGraph: {
            title: blog.seo.metaTitle,
            description: blog.seo.metaDescription,
            images: blog.image ? [{ url: blog.image, alt: blog.altText }] : [],
            type: "article",
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
        },
        twitter: {
            card: "summary_large_image",
            title: blog.seo.metaTitle,
            description: blog.seo.metaDescription,
        },
    };
}

export async function generateStaticParams() {
    const blogs = db.blogs.getPublished();
    return blogs.map(b => ({ slug: b.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const blog = db.blogs.getBySlug(slug);
    if (!blog || !blog.published) notFound();

    const related = db.blogs.getPublished()
        .filter(b => b.slug !== slug && b.category === blog.category)
        .slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt,
        image: blog.image,
        author: { "@type": "Organization", name: "Antia" },
        publisher: { "@type": "Organization", name: "Antia", logo: { "@type": "ImageObject", url: "/logo.svg" } },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": blog.seo.canonical },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="container mx-auto px-4 py-10 max-w-4xl">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <Link href="/blogs" className="hover:text-blue-600">Blog</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium truncate">{blog.title}</span>
                </div>

                {/* Category + Meta */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        {blog.category}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {blog.readTime}
                    </span>
                    <span className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>

                {/* H1 */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    {blog.seo.h1 || blog.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {blog.author.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-900">{blog.author}</div>
                        <div className="text-xs text-gray-500">Antia Clean Air Team</div>
                    </div>
                </div>

                {/* Hero Image */}
                {blog.image && (
                    <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-gray-100">
                        <img
                            src={blog.image}
                            alt={blog.altText}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <article
                    className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-700 prose-p:text-gray-700 prose-p:leading-relaxed mb-12"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-gray-100">
                        <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                        {blog.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Back link */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all mb-12"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>

                {/* Related Articles */}
                {related.length > 0 && (
                    <div className="border-t border-gray-100 pt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map(post => (
                                <Link key={post.slug} href={`/blogs/${post.slug}`} className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                                    <div className="aspect-video bg-gray-100 overflow-hidden">
                                        <img src={post.image} alt={post.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs font-semibold text-blue-600 uppercase">{post.category}</span>
                                        <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
