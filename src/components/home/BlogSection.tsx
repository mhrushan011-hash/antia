
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const POSTS = [
    {
        id: 1,
        title: "5 Signs Your Home Air Quality is Poor",
        excerpt: "Learn the subtle indicators that your indoor air might be harming your health, from persistent headaches to dust buildup.",
        image: "/images/blogs/poor-air.png",
        date: "Oct 12, 2024",
        author: "Dr. A. Sharma",
        category: "Health",
        link: "/blogs/poor-air-quality-signs"
    },
    {
        id: 2,
        title: "HEPA vs. Carbon Filters: What's the Difference?",
        excerpt: "Understand the technology behind air purification. We break down which filter type is best for smoke, dust, and odors.",
        image: "/images/blogs/hepa-vs-carbon.png",
        date: "Nov 05, 2024",
        author: "R. Verma",
        category: "Technology",
        link: "/blogs/hepa-vs-carbon"
    },
    {
        id: 3,
        title: "Best Air Purifiers for Delhi Winters",
        excerpt: "As the smog season approaches, find out which heavy-duty purifiers are rated best for high AQI levels in North India.",
        image: "/images/blogs/poor-air.png",
        date: "Nov 20, 2024",
        author: "PureAir Team",
        category: "Guides",
        link: "/blogs/delhi-winter-guide"
    }
];

export function BlogSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Latest from our Blog</h2>
                        <p className="mt-2 text-gray-600">Expert advice, tips, and air quality news.</p>
                    </div>
                    <Link href="/blogs" className="hidden md:flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                        View all posts <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {POSTS.map((post) => (
                        <Link key={post.id} href={post.link} className="group flex flex-col h-full">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                {post.excerpt}
                            </p>
                            <span className="text-blue-600 text-sm font-medium group-hover:underline">Read Article</span>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/blogs" className="text-blue-600 font-semibold">
                        View all posts &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
