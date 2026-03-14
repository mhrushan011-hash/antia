import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = "https://antia-india.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const products = db.products.getAll();
    const blogs = db.blogs.getPublished();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/air-purifiers/buy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/air-purifiers/rent`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/air-purifiers/buy/home`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/air-purifiers/buy/office`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/air-purifiers/buy/car`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/air-purifiers/rent/home`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/air-purifiers/rent/office`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/filters`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/diy-kits`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/pollution-prevention`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ];

    // City pages
    const cities = ["delhi", "mumbai", "bangalore", "kolkata", "hyderabad", "pune", "chennai"];
    const cityRoutes: MetadataRoute.Sitemap = cities.map(city => ({
        url: `${BASE_URL}/cities/${city}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Business pages
    const businesses = ["clean-air-facility", "commercial", "schools", "hospitals", "dental", "laboratories", "museums", "esg"];
    const businessRoutes: MetadataRoute.Sitemap = businesses.map(slug => ({
        url: `${BASE_URL}/business/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Solution pages
    const solutions = ["allergies", "asthma", "pets", "smoke", "babies", "office", "viruses"];
    const solutionRoutes: MetadataRoute.Sitemap = solutions.map(slug => ({
        url: `${BASE_URL}/solutions/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Product pages
    const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
        url: `${BASE_URL}/product/${p.id}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Blog pages
    const blogRoutes: MetadataRoute.Sitemap = blogs.map(b => ({
        url: `${BASE_URL}/blogs/${b.slug}`,
        lastModified: new Date(b.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...cityRoutes,
        ...businessRoutes,
        ...solutionRoutes,
        ...productRoutes,
        ...blogRoutes,
    ];
}
