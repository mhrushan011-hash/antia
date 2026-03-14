import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get("q")?.toLowerCase().trim() ?? "";

    if (!q || q.length < 2) {
        return NextResponse.json({ products: [], pages: [] });
    }

    const allProducts = db.products.getAll();

    const products = allProducts
        .filter((p) => {
            return (
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.features.some((f) => f.toLowerCase().includes(q)) ||
                Object.values(p.specifications ?? {}).some((v) => String(v).toLowerCase().includes(q))
            );
        })
        .slice(0, 6)
        .map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            buyPrice: p.buyPrice,
            rentPrice: p.rentPrice,
            rentAvailable: p.rentAvailable,
            buyAvailable: p.buyAvailable,
            image: p.images[0] ?? "",
        }));

    // Static page suggestions that match
    const PAGE_SUGGESTIONS = [
        { label: "Home Air Purifiers", href: "/air-purifiers/buy/home", keywords: ["home", "purifier", "buy"] },
        { label: "Office Air Purifiers", href: "/air-purifiers/buy/office", keywords: ["office", "work", "commercial"] },
        { label: "Rent Air Purifiers", href: "/air-purifiers/rent", keywords: ["rent", "rental", "monthly"] },
        { label: "Replacement Filters", href: "/filters", keywords: ["filter", "hepa", "carbon", "replacement"] },
        { label: "DIY Air Purifier Kits", href: "/diy-kits", keywords: ["diy", "kit", "build", "cr box"] },
        { label: "Pollution Protection", href: "/pollution-prevention", keywords: ["mask", "pollution", "pm2.5", "n95"] },
        { label: "Car Air Purifiers", href: "/air-purifiers/buy/car", keywords: ["car", "vehicle", "auto"] },
    ];

    const pages = PAGE_SUGGESTIONS.filter((p) =>
        p.label.toLowerCase().includes(q) || p.keywords.some((k) => k.includes(q) || q.includes(k))
    ).slice(0, 3);

    return NextResponse.json({ products, pages });
}
