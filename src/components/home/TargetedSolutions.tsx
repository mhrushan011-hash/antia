
"use client";

import { ShieldAlert, Flower, Cat, Baby, Droplets, Cigarette, Flame, FlaskConical } from "lucide-react";
import Link from "next/link";

const SOLUTIONS = [
    {
        id: "allergies",
        title: "Allergies & Asthma",
        icon: Flower,
        color: "text-pink-500",
        bgColor: "bg-pink-50",
        description: "Breathe easier with purifiers that remove 99.97% of allergens.",
    },
    {
        id: "pets",
        title: "Pet Owners",
        icon: Cat,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
        description: "Capture pet dander, hair, and odors effectively.",
    },
    {
        id: "children",
        title: "Baby & Children",
        icon: Baby,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        description: "Protect developing lungs from harmful pollutants.",
    },
    {
        id: "virus",
        title: "Virus & Bacteria",
        icon: ShieldAlert,
        color: "text-red-500",
        bgColor: "bg-red-50",
        description: "Advanced filtration to reduce airborne transmission.",
    },
    {
        id: "mold",
        title: "Mold & Mildew",
        icon: Droplets,
        color: "text-teal-500",
        bgColor: "bg-teal-50",
        description: "Prevent mold spore circulation and growth.",
    },
    {
        id: "smoke",
        title: "Tobacco Smoke",
        icon: Cigarette,
        color: "text-gray-500",
        bgColor: "bg-gray-50",
        description: "Eliminate harmful smoke particles and odors.",
    },
    {
        id: "wildfire",
        title: "Wildfire Smoke",
        icon: Flame,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        description: "Heavy duty protection against PM2.5 from fires.",
    },
    {
        id: "chemicals",
        title: "Chemicals & VOCs",
        icon: FlaskConical,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
        description: "Carbon filters to absorb volatile organic compounds.",
    },
];

export function TargetedSolutions() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Targeted Solutions</h2>
                    <p className="mt-2 text-gray-600">Find the right purification for your specific concern.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {SOLUTIONS.map((item) => (
                        <Link
                            key={item.id}
                            href={`/solutions/${item.id}`}
                            className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 text-center"
                        >
                            <div className={`w-14 h-14 mx-auto ${item.bgColor} rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                <item.icon className={`h-7 w-7 ${item.color}`} />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
