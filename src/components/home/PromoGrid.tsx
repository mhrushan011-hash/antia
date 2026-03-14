"use client";

import Image from "next/image";

export function PromoGrid() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { img: "/images/banners/banner-summer.png", alt: "Summer Sale", title: "Summer Sale" },
                        { img: "/images/banners/banner-rent.png", alt: "Rent & Save", title: "Rent Plans" },
                        { img: "/images/banners/banner-new.png", alt: "New Arrivals", title: "New Tech" },
                        { img: "/images/banners/banner-filters.png", alt: "Genuine Filters", title: "Filters" },
                    ].map((banner, idx) => (
                        <div key={idx} className="group relative aspect-[16/9] md:aspect-auto md:h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer bg-gray-100">
                            <Image
                                src={banner.img}
                                alt={banner.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                    {banner.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
