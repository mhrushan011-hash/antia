"use client";

import { Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const BANNERS = [
    {
        id: 1,
        icon: Zap,
        iconColor: "text-yellow-600",
        bgColor: "bg-yellow-50",
        title: "Flash Sale - 30% Off",
        description: "Get huge discounts on premium air purifiers. Limited time offer!",
        cta: "Shop Now",
        link: "/air-purifiers/buy",
    },
    {
        id: 2,
        icon: Shield,
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
        title: "Try Before You Buy",
        description: "Rent our air purifiers for one month with no commitment required.",
        cta: "Start Renting",
        link: "/air-purifiers/rent",
    },
    {
        id: 3,
        icon: TrendingUp,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
        title: "Corporate Plans",
        description: "Special bulk pricing for offices. Clean air for your entire team.",
        cta: "Get Quote",
        link: "/contact",
    },
];

export function BannerSection() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BANNERS.map((banner) => (
                        <Link
                            key={banner.id}
                            href={banner.link}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`inline-flex p-4 rounded-xl ${banner.bgColor} mb-4`}>
                                <banner.icon className={`h-8 w-8 ${banner.iconColor}`} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {banner.title}
                            </h3>

                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {banner.description}
                            </p>

                            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                                {banner.cta}
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
