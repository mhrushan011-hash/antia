"use client";

import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/cms";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    mode: "buy" | "rent";
}

function getBrandFromName(name: string): string {
    const brands = ["Coway", "Philips", "Dyson", "Honeywell", "Mi", "Qubo", "Eureka Forbes", "Antia"];
    for (const brand of brands) {
        if (name.toLowerCase().includes(brand.toLowerCase())) return brand;
    }
    return "Antia";
}

export function ProductCard({ product, mode }: ProductCardProps) {
    const { addToCart } = useCart();
    const brand = getBrandFromName(product.name);
    const image = product.images[0] ?? "https://placehold.co/400x400/e2e8f0/475569?text=Air+Purifier";
    const coverage = product.specifications?.coverage ?? "—";
    const filterType = product.features?.[0] ?? "HEPA Filter";
    const rating = 4.5;
    const reviews = 120;
    const isBestSeller = product.id === "coway-150" || product.id === "philips-2000";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product, mode);
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg">
            {/* Badges */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                {isBestSeller && (
                    <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                        Best Seller
                    </span>
                )}
                {mode === "rent" && product.rentAvailable && (
                    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                        Rent Available
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
            </button>

            {/* Image */}
            <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                <img
                    src={image}
                    alt={product.altTexts?.[0] ?? product.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">{brand}</div>
                <Link href={`/product/${product.id}`} className="mb-2">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Specs */}
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                    <span>{coverage}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span>{filterType}</span>
                </div>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{rating}</span>
                    <span className="text-sm text-gray-500">({reviews})</span>
                </div>

                {/* Price & Action */}
                <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        {mode === "rent" && product.rentAvailable && product.rentPrice ? (
                            <>
                                <span className="text-xs text-gray-500">Rent from</span>
                                <span className="text-lg font-bold text-blue-600">
                                    ₹{product.rentPrice}<span className="text-sm font-normal text-gray-500">/mo</span>
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-xs text-gray-500">Buy at</span>
                                <span className="text-lg font-bold text-gray-900">
                                    ₹{product.buyPrice?.toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {mode === "rent" ? "Rent" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
