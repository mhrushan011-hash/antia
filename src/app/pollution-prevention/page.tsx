import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { AlertTriangle, Eye, Wind, Heart } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Pollution Prevention & Protection",
    description: "Masks, monitors, and tools to protect yourself from India's air pollution — indoors and outdoors.",
};

const AQI_LEVELS = [
    { range: "0–50", label: "Good", color: "bg-green-500", advice: "Air quality is satisfactory. Enjoy outdoor activities." },
    { range: "51–100", label: "Satisfactory", color: "bg-lime-400", advice: "Sensitive individuals should limit prolonged outdoor exertion." },
    { range: "101–200", label: "Moderate", color: "bg-yellow-400", advice: "People with respiratory issues may experience discomfort." },
    { range: "201–300", label: "Poor", color: "bg-orange-500", advice: "Everyone may begin to experience health effects outdoors." },
    { range: "301–400", label: "Very Poor", color: "bg-red-500", advice: "Health warnings. Wear N95 mask outdoors. Run air purifier indoors." },
    { range: "401+", label: "Severe", color: "bg-purple-800", advice: "Emergency conditions. Avoid all outdoor exposure." },
];

export default function PollutionPreventionPage() {
    const products = db.products.getAll().filter((p) => p.category === "prevention");

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">Home &gt; <span className="font-medium text-gray-900">Pollution Prevention</span></div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Pollution Prevention Essentials</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    India has 6 of the world's 10 most polluted cities. Protect yourself and your family with N95 masks, AQI monitors, and expert guidance.
                </p>
            </div>

            {/* AQI guide */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <Eye className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">India AQI Scale — Know Your Air</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AQI_LEVELS.map((level) => (
                        <div key={level.range} className="flex items-start gap-3">
                            <span className={`h-4 w-4 rounded mt-1 shrink-0 ${level.color}`}></span>
                            <div>
                                <div className="font-semibold text-gray-900">{level.range} — {level.label}</div>
                                <p className="text-xs text-gray-500">{level.advice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { icon: Wind, title: "Run air purifiers 24/7", desc: "During high pollution days (AQI 200+), keep purifiers running continuously, especially in bedrooms.", color: "text-blue-600 bg-blue-50" },
                    { icon: Heart, title: "Wear N95 outdoors", desc: "Surgical masks don't filter PM2.5. Only N95 or better masks provide real protection against fine particles.", color: "text-red-600 bg-red-50" },
                    { icon: AlertTriangle, title: "Seal your home", desc: "Close windows when outdoor AQI exceeds 150. Use weather-stripping on doors to reduce pollutant entry.", color: "text-orange-600 bg-orange-50" },
                ].map((tip, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <div className={`p-3 rounded-xl ${tip.color} w-fit mb-4`}>
                            <tip.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.desc}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Protection Products</h2>
            <ProductGrid products={products} mode="buy" />

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-3">Protect Your Home Too</h2>
                <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                    A mask protects you outdoors. An air purifier protects your entire family indoors — 24 hours a day.
                </p>
                <Link
                    href="/air-purifiers/buy"
                    className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                    Shop Air Purifiers
                </Link>
            </div>
        </div>
    );
}
