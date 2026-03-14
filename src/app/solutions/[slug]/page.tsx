import { db } from "@/lib/db";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SOLUTION_CONTENT: Record<string, { title: string; description: string; icon: string; tip: string }> = {
    "allergies": { title: "Air Purifiers for Allergies", description: "HEPA filters capture 99.97% of pollen, pet dander, mold spores, and dust mites — the most common allergy triggers.", icon: "🤧", tip: "Look for True HEPA (H13/H14) rated purifiers and replace filters every 12 months for maximum allergen capture." },
    "asthma": { title: "Air Purifiers for Asthma", description: "Clinical-grade filtration reduces asthma triggers. Our picks are certified by allergy and asthma foundations.", icon: "💨", tip: "Run your purifier continuously in the bedroom — most asthma attacks happen at night." },
    "pets": { title: "Air Purifiers for Pet Owners", description: "Pet hair, dander, and odors are no match for activated carbon + HEPA combination filters.", icon: "🐾", tip: "Place your purifier near your pet's favorite resting spot for best results." },
    "smoke": { title: "Air Purifiers for Smoke & Wildfire", description: "Carbon filters absorb smoke odors while HEPA traps the fine particles from wildfire smoke and cigarettes.", icon: "🔥", tip: "Use a purifier rated for at least 2x your room size during smoke events for faster clearance." },
    "babies": { title: "Air Purifiers for Babies & Children", description: "Children breathe more air per body weight than adults. Create a safe nursery with ultra-quiet, efficient purification.", icon: "👶", tip: "Choose models with a night mode — silent operation below 25dB so it doesn't disturb sleep." },
    "office": { title: "Air Purifiers for Offices", description: "Improve cognitive performance and reduce sick days. Studies show clean air boosts productivity by up to 11%.", icon: "💼", tip: "One purifier per 300 sqft is the recommended coverage ratio for open-plan offices." },
    "viruses": { title: "Air Purifiers for Viruses & Bacteria", description: "H13 HEPA filters capture particles as small as 0.1 microns — including most airborne viruses and bacteria.", icon: "🦠", tip: "UV-C add-on modules can further neutralize pathogens captured on the filter surface." },
};

function toTitleCase(str: string) {
    return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function SolutionsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = SOLUTION_CONTENT[slug] ?? {
        title: `Solutions for ${toTitleCase(slug)}`,
        description: `Curated air purifiers and products to help with ${toTitleCase(slug.replace("-", " "))}.`,
        icon: "🌬️",
        tip: "Consult our experts to find the best fit for your specific needs.",
    };

    const products = db.products.getAll().filter((p) => (p.category === "home" || p.category === "prevention") && p.buyAvailable);

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">
                    Home &gt; Solutions &gt; <span className="font-medium text-gray-900">{content.title}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{content.icon}</span>
                    <h1 className="text-4xl font-bold text-gray-900">{content.title}</h1>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">{content.description}</p>
            </div>

            {/* Expert Tip */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10 flex gap-4">
                <span className="text-2xl">💡</span>
                <div>
                    <h3 className="font-bold text-amber-900 mb-1">Expert Tip</h3>
                    <p className="text-amber-800 text-sm">{content.tip}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Products</h2>
            <ProductGrid products={products} mode="buy" />

            <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Not sure which product is right for your situation?</p>
                <Link href="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Get Expert Advice
                </Link>
            </div>
        </div>
    );
}
