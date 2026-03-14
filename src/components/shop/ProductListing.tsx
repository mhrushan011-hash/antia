"use client";

import { useState, useMemo } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types/cms";

interface ProductListingProps {
    mode: "buy" | "rent";
    category: "all" | "home" | "office";
    products: Product[];
}

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";

export function ProductListing({ mode, category, products }: ProductListingProps) {
    const title = `${mode === "buy" ? "Buy" : "Rent"} ${category === "all" ? "Best" : category === "home" ? "Home" : "Office"} Air Purifiers`;
    const subtitle = mode === "buy"
        ? "Top rated models with manufacturer warranty."
        : "Flexible rental plans with free maintenance.";

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState<SortOption>("popular");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const filtered = useMemo(() => {
        let list = [...products];
        const min = minPrice ? parseInt(minPrice) : null;
        const max = maxPrice ? parseInt(maxPrice) : null;

        if (min !== null || max !== null) {
            list = list.filter(p => {
                const price = mode === "rent" ? (p.rentPrice ?? 0) : (p.buyPrice ?? 0);
                if (min !== null && price < min) return false;
                if (max !== null && price > max) return false;
                return true;
            });
        }

        if (sort === "price-asc") {
            list.sort((a, b) => {
                const pa = mode === "rent" ? (a.rentPrice ?? 0) : (a.buyPrice ?? 0);
                const pb = mode === "rent" ? (b.rentPrice ?? 0) : (b.buyPrice ?? 0);
                return pa - pb;
            });
        } else if (sort === "price-desc") {
            list.sort((a, b) => {
                const pa = mode === "rent" ? (a.rentPrice ?? 0) : (a.buyPrice ?? 0);
                const pb = mode === "rent" ? (b.rentPrice ?? 0) : (b.buyPrice ?? 0);
                return pb - pa;
            });
        } else if (sort === "newest") {
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return list;
    }, [products, minPrice, maxPrice, sort, mode]);

    const hasFilters = minPrice || maxPrice;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            {/* Breadcrumbs */}
            <div className="mb-6 text-sm text-gray-500 capitalize">
                Home &gt; Air Purifiers &gt; <span className="font-semibold text-gray-900">{mode}{category !== "all" && ` > ${category}`}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar — desktop */}
                <div className="hidden md:block">
                    <FilterSidebar
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onMinPrice={setMinPrice}
                        onMaxPrice={setMaxPrice}
                    />
                </div>

                {/* Mobile filter drawer */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setShowMobileFilters(false)}>
                        <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Filters</h3>
                                <button onClick={() => setShowMobileFilters(false)}><X className="h-5 w-5" /></button>
                            </div>
                            <FilterSidebar
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                onMinPrice={setMinPrice}
                                onMaxPrice={setMaxPrice}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">{title}</h1>
                            <p className="text-gray-600">{subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                {filtered.length} of {products.length} results
                                {hasFilters && <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="ml-2 text-blue-600 hover:underline text-xs">Clear filters</button>}
                            </span>
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 md:hidden"
                            >
                                <SlidersHorizontal className="h-4 w-4" /> Filters
                            </button>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value as SortOption)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="popular">Sort: Popularity</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>
                    <ProductGrid products={filtered} mode={mode} />
                </div>
            </div>
        </div>
    );
}
