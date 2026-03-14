import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Link from "next/link";
import { Building2, CheckCircle, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

const BUSINESS_CONTENT: Record<string, { title: string; description: string; icon: string }> = {
    "clean-air-facility": { title: "Clean Air Facility Program", description: "Certify your facility as a Clean Air Zone. Includes installation, maintenance, and air quality monitoring.", icon: "🏢" },
    "commercial": { title: "Commercial Air Purification", description: "Bulk rental and purchase solutions for large commercial spaces. Custom pricing for 10+ units.", icon: "🏭" },
    "schools": { title: "Schools & Educational Institutions", description: "Create safe learning environments for children. Studies show clean air improves concentration by 15%.", icon: "🏫" },
    "hospitals": { title: "Hospitals & Clinics", description: "Medical-grade air purification for patient rooms, waiting areas, and operating theaters.", icon: "🏥" },
    "dental": { title: "Dental Offices", description: "Dental procedures generate aerosols. Our HEPA systems reduce airborne pathogen exposure for staff and patients.", icon: "🦷" },
    "laboratories": { title: "Laboratories", description: "Precision air quality control for labs. Removes VOCs, chemical fumes, and particulates.", icon: "🔬" },
    "museums": { title: "Museums & Archives", description: "Protect valuable artifacts from dust and particulates with silent, consistent air purification.", icon: "🏛️" },
    "esg": { title: "ESG & Sustainability Programs", description: "Report clean air initiatives as part of your ESG goals. We provide documentation and impact reports.", icon: "🌱" },
};

const BENEFITS = [
    "Dedicated account manager",
    "Volume discounts from 5+ units",
    "Free professional installation",
    "Quarterly maintenance included",
    "Air quality reporting & certificates",
    "Priority support line",
];

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = BUSINESS_CONTENT[slug] ?? {
        title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Solutions`,
        description: "Commercial grade air purification solutions. Contact us for bulk orders and custom installations.",
        icon: "🏢",
    };

    const products = db.products.getAll().filter((p) => p.category === "home" && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            {/* Header */}
            <div className="mb-12">
                <div className="text-sm text-gray-500 mb-3">Home &gt; For Business &gt; <span className="font-medium text-gray-900">{content.title}</span></div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{content.icon}</span>
                    <h1 className="text-4xl font-bold text-gray-900">{content.title}</h1>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">{content.description}</p>
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    What's Included in Business Plans
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {BENEFITS.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Purifiers</h2>
            <ProductGrid products={products} mode="buy" />

            {/* CTA */}
            <div className="mt-16 bg-gray-900 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Need a custom quote?</h2>
                    <p className="text-gray-400">We work with 500+ businesses across India. Talk to our team today.</p>
                </div>
                <Link
                    href="/contact"
                    className="shrink-0 flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    <Phone className="h-5 w-5" /> Get a Quote
                </Link>
            </div>
        </div>
    );
}
