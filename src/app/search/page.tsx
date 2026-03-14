import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.toLowerCase().trim() ?? "";

    const allProducts = db.products.getAll();

    const results = query.length >= 2
        ? allProducts.filter((p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.features.some((f) => f.toLowerCase().includes(query))
        )
        : [];

    return (
        <div className="container mx-auto px-4 py-10 md:px-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {query ? `Search results for "${q}"` : "Search"}
                </h1>
                {query && <p className="text-gray-500">{results.length} product{results.length !== 1 ? "s" : ""} found</p>}
            </div>

            {!query && (
                <div className="text-center py-20 text-gray-400">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>Start typing to search for products</p>
                </div>
            )}

            {query && results.length === 0 && (
                <div className="text-center py-20">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
                    <p className="text-gray-500 mb-6">Try a different search term, or browse our categories.</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            { label: "Air Purifiers", href: "/air-purifiers/buy" },
                            { label: "Filters", href: "/filters" },
                            { label: "DIY Kits", href: "/diy-kits" },
                            { label: "Masks & Monitors", href: "/pollution-prevention" },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {results.length > 0 && (
                <ProductGrid products={results} mode="buy" />
            )}
        </div>
    );
}
