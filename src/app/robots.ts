import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api/"],
            },
        ],
        sitemap: "https://antia-india.vercel.app/sitemap.xml",
    };
}
