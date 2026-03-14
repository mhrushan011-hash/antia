import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Wrench, Zap, DollarSign, Wind } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "DIY Air Purifier Kits",
    description: "Build your own Corsi-Rosenthal box air purifier. MERV-13 filtration at a fraction of the cost of commercial purifiers.",
};

export default function DIYKitsPage() {
    const products = db.products.getAll().filter((p) => p.category === "diy" && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">Home &gt; <span className="font-medium text-gray-900">DIY Kits</span></div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">DIY Air Purifier Kits</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Build your own Corsi-Rosenthal box — scientifically proven, ultra-affordable, and outperforms many commercial purifiers.
                    Originally developed during COVID-19 and now trusted by hospitals and schools worldwide.
                </p>
            </div>

            {/* Why DIY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { icon: DollarSign, color: "text-green-600 bg-green-50", title: "80% Cheaper", desc: "Vs. equivalent commercial purifiers" },
                    { icon: Wind, color: "text-blue-600 bg-blue-50", title: "High CADR 400+", desc: "Estimated 400+ m³/h airflow" },
                    { icon: Wrench, color: "text-orange-600 bg-orange-50", title: "15-min Build", desc: "No tools needed, anyone can do it" },
                    { icon: Zap, color: "text-purple-600 bg-purple-50", title: "MERV-13 Rated", desc: "Traps PM2.5, smoke, pollen" },
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

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Kits</h2>
            <ProductGrid products={products} mode="buy" />

            {/* How it works */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Build a CR Box in 4 Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { step: "1", title: "Get the Kit", desc: "Includes 4 MERV-13 filters, a box fan, and duct tape." },
                        { step: "2", title: "Stack Filters", desc: "Arrange 4 filters into a cube on 4 sides with airflow arrows pointing inward." },
                        { step: "3", title: "Attach Fan", desc: "Place box fan on top blowing air upward. Tape all edges airtight." },
                        { step: "4", title: "Plug & Breathe", desc: "Power on and enjoy clean air immediately." },
                    ].map((s) => (
                        <div key={s.step} className="text-center">
                            <div className="h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                                {s.step}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                            <p className="text-sm text-gray-600">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
