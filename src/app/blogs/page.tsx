import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Clean Air Blog — Air Quality Tips & Guides",
    description: "Expert advice, guides, and news about air quality, HEPA filters, AQI levels, and how to protect your family from India's air pollution.",
};

const BLOGS = [
    {
        slug: "hepa-vs-carbon-filter",
        title: "HEPA vs. Carbon Filters: What's the Difference?",
        category: "Guides",
        date: "March 10, 2026",
        readTime: "5 min read",
        excerpt: "HEPA filters capture particles — dust, pollen, PM2.5. Carbon filters absorb gases — VOCs, smoke odors. Most modern purifiers use both. Here's when you need each.",
        image: "/images/blogs/hepa-vs-carbon.png",
        imageAlt: "HEPA vs Carbon Filter comparison",
        featured: true,
    },
    {
        slug: "india-air-pollution-2025",
        title: "India's Air Quality Crisis: 2025 Data & What It Means for You",
        category: "News",
        date: "February 28, 2026",
        readTime: "8 min read",
        excerpt: "Delhi, Mumbai, Kolkata — the data is alarming. We break down the latest AQI reports and explain the real health impact of breathing polluted air every day.",
        image: "/images/blogs/poor-air.png",
        imageAlt: "Air pollution over Indian city",
        featured: true,
    },
    {
        slug: "best-air-purifier-bedroom",
        title: "Best Air Purifiers for Bedrooms in India (2026)",
        category: "Buying Guides",
        date: "February 14, 2026",
        readTime: "6 min read",
        excerpt: "You spend 8 hours sleeping. Your bedroom air matters most. We tested Coway, Philips, and Dyson across coverage, noise, and efficiency — here are our picks.",
        image: "https://placehold.co/800x450/e0f2fe/1e40af?text=Bedroom+Purifier",
        imageAlt: "Air purifier in bedroom",
        featured: false,
    },
    {
        slug: "rent-vs-buy-air-purifier",
        title: "Renting vs. Buying an Air Purifier: Which is Smarter?",
        category: "Guides",
        date: "January 30, 2026",
        readTime: "4 min read",
        excerpt: "Upfront cost vs. total cost of ownership. When renting saves money, when buying makes sense — we do the math for Indian households.",
        image: "https://placehold.co/800x450/f0fdf4/166534?text=Rent+vs+Buy",
        imageAlt: "Rent vs buy comparison",
        featured: false,
    },
    {
        slug: "corsi-rosenthal-box-guide",
        title: "How to Build a Corsi-Rosenthal Box in 15 Minutes",
        category: "DIY",
        date: "January 15, 2026",
        readTime: "7 min read",
        excerpt: "The CR Box costs under ₹3,000 and outperforms many commercial purifiers. Step-by-step guide with parts list for the Indian market.",
        image: "https://placehold.co/800x450/fef3c7/92400e?text=DIY+CR+Box",
        imageAlt: "Corsi-Rosenthal Box DIY",
        featured: false,
    },
    {
        slug: "pm25-explained",
        title: "PM2.5 Explained: Why This Invisible Particle is So Dangerous",
        category: "Health",
        date: "January 5, 2026",
        readTime: "5 min read",
        excerpt: "PM2.5 particles are 30x smaller than a human hair. They bypass your nose and throat and go directly into your bloodstream. Here's what you need to know.",
        image: "https://placehold.co/800x450/f3e8ff/7c3aed?text=PM2.5+Particles",
        imageAlt: "PM2.5 particle illustration",
        featured: false,
    },
];

const CATEGORIES = ["All", "Guides", "Buying Guides", "News", "DIY", "Health"];

export default function BlogsPage() {
    const featured = BLOGS.filter((b) => b.featured);
    const rest = BLOGS.filter((b) => !b.featured);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Clean Air Blog</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Expert advice, buying guides, and the latest on India's air quality — so you can make smarter decisions for your family's health.
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors first:bg-blue-600 first:text-white first:border-blue-600"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Featured Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                {featured.map((post) => (
                    <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{post.category}</span>
                                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                            <p className="text-gray-600 text-sm flex-1 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{post.date}</span>
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:gap-2 transition-all"
                                >
                                    Read Article <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* More Articles */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rest.map((post) => (
                    <article key={post.slug} className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="aspect-video overflow-hidden bg-gray-100">
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">{post.category}</span>
                            <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                            <p className="text-xs text-gray-500 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                <Link href={`/blogs/${post.slug}`} className="text-xs font-semibold text-blue-600 hover:underline">
                                    Read →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
