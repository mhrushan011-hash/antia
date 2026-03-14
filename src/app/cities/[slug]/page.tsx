import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Link from "next/link";
import { MapPin, Wind, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

const CITY_DATA: Record<string, { aqi: number; level: string; color: string; population: string; fact: string }> = {
    "delhi": { aqi: 312, level: "Very Poor", color: "text-red-600 bg-red-50", population: "32 million", fact: "Delhi consistently ranks among the world's most polluted capitals." },
    "mumbai": { aqi: 168, level: "Moderate", color: "text-orange-600 bg-orange-50", population: "21 million", fact: "Industrial emissions and traffic contribute to Mumbai's pollution spike in winters." },
    "bangalore": { aqi: 134, level: "Moderate", color: "text-yellow-600 bg-yellow-50", population: "13 million", fact: "Rapid urbanization has worsened Bangalore's air quality over the last decade." },
    "kolkata": { aqi: 245, level: "Poor", color: "text-red-500 bg-red-50", population: "15 million", fact: "Vehicle and industrial emissions make Kolkata's winters particularly hazardous." },
    "hyderabad": { aqi: 156, level: "Moderate", color: "text-orange-500 bg-orange-50", population: "10 million", fact: "Construction dust and vehicular pollution are Hyderabad's primary contributors." },
    "pune": { aqi: 142, level: "Moderate", color: "text-yellow-600 bg-yellow-50", population: "7 million", fact: "Pune sees significant pollution spikes during the pre-monsoon dry season." },
    "chennai": { aqi: 118, level: "Moderate", color: "text-yellow-500 bg-yellow-50", population: "11 million", fact: "Chennai's coastal winds help, but industrial zones still show poor air quality." },
};

function toTitleCase(str: string) {
    return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cityName = toTitleCase(slug);
    const cityInfo = CITY_DATA[slug.toLowerCase()];

    const products = db.products.getAll().filter((p) => (p.category === "home" || p.category === "office") && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            {/* Header */}
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">
                    Home &gt; Cities &gt; <span className="font-medium text-gray-900">{cityName}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-7 w-7 text-blue-600" />
                    <h1 className="text-4xl font-bold text-gray-900">Air Purifiers in {cityName}</h1>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Protect your family from {cityName}'s air pollution. Same-day delivery and installation available across {cityName}.
                </p>
            </div>

            {/* City AQI Card */}
            {cityInfo && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className={`rounded-2xl p-6 ${cityInfo.color}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="font-semibold">Current AQI</span>
                        </div>
                        <div className="text-5xl font-bold mb-1">{cityInfo.aqi}</div>
                        <div className="font-medium">{cityInfo.level}</div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                            <Wind className="h-5 w-5" />
                            <span className="font-semibold text-gray-700">Population at Risk</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{cityInfo.population}</div>
                        <div className="text-sm text-gray-500">residents exposed daily</div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-start">
                        <p className="text-gray-600 text-sm leading-relaxed">{cityInfo.fact}</p>
                    </div>
                </div>
            )}

            {/* Products */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Picks for {cityName}</h2>
            <ProductGrid products={products} mode="buy" />

            {/* CTA */}
            <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Need Help Choosing?</h2>
                <p className="text-blue-100 mb-6">Our experts know {cityName}'s pollution profile. Get a personalized recommendation.</p>
                <Link href="/contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                    Talk to an Expert
                </Link>
            </div>
        </div>
    );
}
