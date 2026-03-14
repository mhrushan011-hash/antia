import { ProductGrid } from "@/components/shop/ProductGrid";
import { db } from "@/lib/db";
import { Car, Shield, Wind } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Car Air Purifiers — Buy Online",
    description: "Compact HEPA air purifiers designed for cars. Remove traffic pollution, dust, and odors from your vehicle interior.",
};

export default function CarPurifiersPage() {
    const products = db.products.getAll().filter((p) => p.category === "car" && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">
                    Home &gt; Shop &gt; <span className="font-medium text-gray-900">Car Air Purifiers</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Air Purifiers</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    You spend hours in traffic breathing exhaust fumes directly. Our compact car purifiers filter PM2.5, dust, and odors silently — powered by your car's USB or adapter.
                </p>
            </div>

            {/* Why you need one */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                    { icon: Car, color: "text-blue-600 bg-blue-50", title: "Traffic Pollution", desc: "Cabin air can be 6x more polluted than roadside air during peak traffic." },
                    { icon: Shield, color: "text-green-600 bg-green-50", title: "HEPA Filtration", desc: "Removes PM2.5, pollen, and bacteria from your car's interior air." },
                    { icon: Wind, color: "text-purple-600 bg-purple-50", title: "Silent & Compact", desc: "USB-powered, fits in a cupholder, whisper-quiet operation." },
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
