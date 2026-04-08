"use client";

import Image from "next/image";

export function PromoGrid() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { img: "https://image.pollinations.ai/prompt/air%20purifier%20summer%20sale%20promotional%20banner%20Indian%20summer%20clean%20fresh%20air%20orange%20colorful%20vibrant?width=640&height=360&seed=701&nologo=true", alt: "Summer Sale", title: "Summer Sale" },
                        { img: "https://image.pollinations.ai/prompt/air%20purifier%20monthly%20rental%20plan%20subscription%20banner%20India%20clean%20blue%20minimal%20modern%20design?width=640&height=360&seed=702&nologo=true", alt: "Rent & Save", title: "Rent Plans" },
                        { img: "https://image.pollinations.ai/prompt/new%20air%20purifier%20technology%202025%20latest%20model%20modern%20sleek%20product%20India%20launch?width=640&height=360&seed=703&nologo=true", alt: "New Arrivals", title: "New Tech" },
                        { img: "https://image.pollinations.ai/prompt/genuine%20replacement%20HEPA%20filter%20air%20purifier%20maintenance%20product%20promo%20banner%20white%20clean%20studio?width=640&height=360&seed=704&nologo=true", alt: "Genuine Filters", title: "Filters" },
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
