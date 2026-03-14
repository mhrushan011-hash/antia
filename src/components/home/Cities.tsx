
"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle, MapPin } from "lucide-react";

const CITIES = [
    { name: "Delhi", aqi: 450, status: "Severe", slug: "delhi" },
    { name: "Gurugram", aqi: 410, status: "Severe", slug: "gurugram" },
    { name: "Noida", aqi: 395, status: "Very Poor", slug: "noida" },
    { name: "Ghaziabad", aqi: 380, status: "Very Poor", slug: "ghaziabad" },
    { name: "Faridabad", aqi: 375, status: "Very Poor", slug: "faridabad" },
    { name: "Mumbai", aqi: 210, status: "Poor", slug: "mumbai" },
    { name: "Lucknow", aqi: 320, status: "Very Poor", slug: "lucknow" },
    { name: "Patna", aqi: 340, status: "Very Poor", slug: "patna" },
    { name: "Kanpur", aqi: 310, status: "Very Poor", slug: "kanpur" },
    { name: "Kolkata", aqi: 250, status: "Poor", slug: "kolkata" },
];

function getStatusColor(status: string) {
    switch (status) {
        case "Severe": return "text-red-700 bg-red-100";
        case "Very Poor": return "text-red-600 bg-red-50";
        case "Poor": return "text-orange-600 bg-orange-50";
        default: return "text-yellow-600 bg-yellow-50";
    }
}

export function Cities() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* Left: Info */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-gray-900 leading-tight">Top 10 Cities with Worst <br /> Air Pollution in India</h2>
                            <span className="animate-pulse px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">Rank Live</span>
                        </div>

                        <p className="text-lg text-gray-600">
                            We are tracking AQI levels across the nation. These cities are currently facing hazardous air quality.
                            We have deployed dedicated Anti-Pollution Squads in these regions.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Health Advisory</h4>
                                    <p className="text-sm text-gray-600">
                                        AQI above 300 is hazardous. It is recommended to use air purifiers and wear N95 masks when stepping outdoors in highlighted cities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link href="/cities" className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                            View All Covered Cities <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    {/* Right: List */}
                    <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between text-sm font-semibold text-gray-500">
                            <span>City</span>
                            <span className="pr-4">Real-time AQI</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {CITIES.map((city, idx) => (
                                <Link
                                    key={city.slug}
                                    href={`/cities/${city.slug}`}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx < 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{city.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(city.status)}`}>
                                            {city.status}
                                        </span>
                                        <span className="font-mono font-bold text-gray-700 w-12 text-right">{city.aqi}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-600" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50/50 text-center text-xs text-gray-400">
                            * Data updated every hour via CPCB
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
