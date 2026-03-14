"use client";

import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/cms";

interface ProductListingProps {
    mode: "buy" | "rent";
    category: "all" | "home" | "office";
    products: Product[];
}

export function ProductListing({ mode, category, products }: ProductListingProps) {
    const title = `${mode === "buy" ? "Buy" : "Rent"} ${category === "all" ? "Best" : category === "home" ? "Home" : "Office"} Air Purifiers`;
    const subtitle = mode === "buy"
        ? "Top rated models with manufacturer warranty."
        : "Flexible rental plans with free maintenance.";

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            {/* Breadcrumbs */}
            <div className="mb-6 text-sm text-gray-500 capitalize">
                Home &gt; Air Purifiers &gt; <span className="font-semibold text-gray-900">{mode} {category !== "all" && `> ${category}`}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <FilterSidebar />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">{title}</h1>
                            <p className="text-gray-600">{subtitle}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Showing {products.length} results</span>
                            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 md:hidden">
                                <SlidersHorizontal className="h-4 w-4" /> Filters
                            </button>
                            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Sort by: Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <ProductGrid products={products} mode={mode} />
                </div>
            </div>
        </div>
    );
}
