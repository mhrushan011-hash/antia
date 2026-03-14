"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useShop } from "@/context/ShopContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const SUGGESTIONS = [
    { label: "Home Air Purifiers", href: "/air-purifiers/buy/home" },
    { label: "Office Air Purifiers", href: "/air-purifiers/buy/office" },
    { label: "Rent Air Purifiers", href: "/air-purifiers/rent" },
    { label: "DIY Kits", href: "/diy-kits" },
    { label: "Pollution Masks", href: "/pollution-prevention" },
    { label: "Replacement Filters", href: "/filters" },
];

export function SearchBar() {
    const { shopMode, toggleShopMode, setShopMode } = useShop();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleModeToggle = () => {
        const newMode = shopMode === "buy" ? "rent" : "buy";
        setShopMode(newMode);

        if (pathname.includes("/air-purifiers")) {
            const newPath = pathname.replace(`/${shopMode}`, `/${newMode}`);
            router.push(newPath);
        }
    };

    const filteredSuggestions = query
        ? SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()))
        : SUGGESTIONS;

    return (
        <div className="w-full bg-white border-b py-3 sticky top-16 z-40 shadow-sm">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-4">

                {/* Buy/Rent Toggle */}
                <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                    <button
                        onClick={() => shopMode === "rent" && handleModeToggle()}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${shopMode === "buy"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => shopMode === "buy" && handleModeToggle()}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${shopMode === "rent"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Rent
                    </button>
                </div>

                {/* Search Input */}
                <div className="relative flex-1 w-full" ref={containerRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for air purifiers, filters, masks..."
                            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-700"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    {isFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border shadow-lg overflow-hidden max-h-80 overflow-y-auto">
                            {filteredSuggestions.length > 0 ? (
                                <ul>
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <li key={index}>
                                            <Link
                                                href={suggestion.href}
                                                className="flex items-center px-6 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                                                onClick={() => {
                                                    setIsFocused(false);
                                                    setQuery("");
                                                }}
                                            >
                                                <Search className="h-4 w-4 mr-3 text-gray-400" />
                                                {suggestion.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-6 py-4 text-gray-500 text-sm">No results found for "{query}"</div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
