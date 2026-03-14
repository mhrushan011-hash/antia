"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const BANNERS = [
    {
        id: 1,
        title: "Breathe Pure Air Today",
        subtitle: "Rent premium air purifiers starting @ ₹499/month",
        cta: "Explore Rentals",
        link: "/rent",
        bgClass: "bg-blue-600",
        image: "https://placehold.co/800x400/2563eb/white?text=Rent+Air+Purifiers",
    },
    {
        id: 2,
        title: "Best-in-Class HEPA Purifiers",
        subtitle: "Buy top rated models from Philips, Dyson & Coway",
        cta: "Shop Now",
        link: "/buy",
        bgClass: "bg-green-600",
        image: "https://placehold.co/800x400/16a34a/white?text=Buy+Air+Purifiers",
    },
    {
        id: 3,
        title: "Winter Pollution Shield",
        subtitle: "Protect your family from hazardous smog. Limited time offer!",
        cta: "View Offers",
        link: "/offers",
        bgClass: "bg-gray-800",
        image: "https://placehold.co/800x400/1f2937/white?text=Winter+Sale",
    },
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

    return (
        <section className="relative w-full overflow-hidden bg-gray-100">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {BANNERS.map((banner) => (
                    <div key={banner.id} className="min-w-full relative h-[400px] md:h-[500px] flex items-center">
                        {/* Background Image/Color Placeholder */}
                        <div className={`absolute inset-0 ${banner.bgClass} opacity-10`}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent z-10"></div>

                        <div className="container mx-auto px-4 md:px-6 relative z-20 flex items-center">
                            <div className="max-w-xl space-y-6">
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                    {banner.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-700">
                                    {banner.subtitle}
                                </p>
                                <Link
                                    href={banner.link}
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    {banner.cta}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                            {/* Image Placeholder on Right */}
                            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-full object-cover object-center mask-image-gradient"
                                    style={{ maskImage: 'linear-gradient(to right, transparent, black)' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/50 hover:bg-white rounded-full shadow-lg transition-all"
            >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/50 hover:bg-white rounded-full shadow-lg transition-all"
            >
                <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {BANNERS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-blue-600" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
