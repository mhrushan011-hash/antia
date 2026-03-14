import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Shield, Wind, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Personal Protection — Masks, AQI Monitors",
    description: "N95 masks, AQI monitors, and air quality essentials to protect you from PM2.5, smoke, and pollution outdoors and at home.",
};

export default function ProtectionPage() {
    const products = db.products.getAll().filter((p) => p.category === "prevention" && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">Home &gt; <span className="font-medium text-gray-900">Protection</span></div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Protection Essentials</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Air purifiers protect you indoors. These products protect you everywhere else — from N95 masks to precise AQI monitors.
                </p>
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                    { icon: Shield, title: "N95 Certified", desc: "Filters 95%+ of airborne particles including PM2.5", color: "bg-blue-50 text-blue-600" },
                    { icon: Activity, title: "Real-time AQI", desc: "Know exactly what you're breathing with laser sensors", color: "bg-green-50 text-green-600" },
                    { icon: Wind, title: "Breathable Design", desc: "Comfortable enough for all-day outdoor wear", color: "bg-purple-50 text-purple-600" },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className={`p-3 rounded-xl ${item.color}`}>
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <ProductGrid products={products} mode="buy" />
        </div>
    );
}
