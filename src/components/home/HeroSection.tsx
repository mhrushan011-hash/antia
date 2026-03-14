"use client";

import { Search, X, ArrowRight, ShieldCheck, Wind, Zap } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useShop } from "@/context/ShopContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
    products: { id: string; name: string; category: string; buyPrice: number | null; rentPrice: number | null; rentAvailable: boolean; image: string }[];
    pages: { label: string; href: string }[];
}

export function HeroSection() {
    const { shopMode, toggleShopMode, setShopMode } = useShop();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<SearchResult>({ products: [], pages: [] });
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const containerRef = useRef<HTMLFormElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!query || query.length < 2) {
            setResults({ products: [], pages: [] });
            return;
        }
        setLoading(true);
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch { /* ignore */ }
            setLoading(false);
        }, 250);
    }, [query]);

    const handleModeToggle = () => {
        const newMode = shopMode === "buy" ? "rent" : "buy";
        setShopMode(newMode);
        if (pathname.includes("/air-purifiers")) {
            router.push(pathname.replace(`/${shopMode}`, `/${newMode}`));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsFocused(false);
        }
    };

    const hasResults = results.products.length > 0 || results.pages.length > 0;

    return (
        <section className="relative bg-gradient-to-b from-blue-50 to-white pt-12 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Breathe Pure, <span className="text-blue-600">Live Healthy</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                        India's #1 destination for buying and renting premium air purifiers.
                        Protect your family from pollution today.
                    </p>

                    {/* Search Bar Container */}
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-2 md:p-3 border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">

                            {/* Buy/Rent Toggle */}
                            <div className="flex items-center bg-gray-100 rounded-xl p-1 shrink-0 w-full md:w-auto">
                                <button
                                    onClick={() => shopMode === "rent" && handleModeToggle()}
                                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all ${shopMode === "buy"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => shopMode === "buy" && handleModeToggle()}
                                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all ${shopMode === "rent"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Rent
                                </button>
                            </div>

                            {/* Search Input */}
                            <form onSubmit={handleSubmit} className="relative flex-1 w-full" ref={containerRef}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search purifiers, filters, masks..."
                                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    {query && (
                                        <button type="button" onClick={() => { setQuery(""); setResults({ products: [], pages: [] }); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400">
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                {isFocused && query.length >= 2 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border shadow-xl overflow-hidden z-50 text-left">
                                        {loading && (
                                            <div className="px-6 py-4 text-sm text-gray-400">Searching…</div>
                                        )}
                                        {!loading && !hasResults && (
                                            <div className="px-6 py-4 text-gray-500 text-sm">No results for &ldquo;{query}&rdquo;</div>
                                        )}
                                        {!loading && hasResults && (
                                            <>
                                                {results.products.length > 0 && (
                                                    <div>
                                                        <div className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Products</div>
                                                        {results.products.map((p) => (
                                                            <Link key={p.id} href={`/product/${p.id}`}
                                                                onClick={() => { setIsFocused(false); setQuery(""); }}
                                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                                                                <img src={p.image} alt={p.name} className="h-10 w-10 object-contain rounded-lg bg-gray-100 p-1 shrink-0" />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {p.rentAvailable ? `Rent ₹${p.rentPrice}/mo · ` : ""}Buy ₹{p.buyPrice?.toLocaleString()}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                                {results.pages.length > 0 && (
                                                    <div className="border-t">
                                                        <div className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Browse</div>
                                                        {results.pages.map((pg, i) => (
                                                            <Link key={i} href={pg.href}
                                                                onClick={() => { setIsFocused(false); setQuery(""); }}
                                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                                                <Search className="h-4 w-4 text-gray-400 shrink-0" /> {pg.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="border-t px-4 py-2.5">
                                                    <button type="submit" className="text-sm text-blue-600 font-medium hover:underline">
                                                        See all results for &ldquo;{query}&rdquo; →
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </form>

                            <button type="submit" form="hero-search" className="hidden md:flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Banners / Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Certified Protection</h3>
                            <p className="text-sm text-gray-600">HEPA filters tested for 99.97% efficiency against pollutants.</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Wind className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Instant Delivery</h3>
                            <p className="text-sm text-gray-600">Get your air purifier delivered and installed within 4 hours.</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Low Energy</h3>
                            <p className="text-sm text-gray-600">Energy-efficient models that save on your electricity bills.</p>
                        </div>
                    </div>
                </div>


            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-30"></div>
            </div>
        </section>
    );
}
