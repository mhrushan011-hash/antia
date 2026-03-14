import { db } from "@/lib/db";
import { FilterProductCard } from "@/components/shop/FilterProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Replacement Filters & Accessories",
    description: "Genuine HEPA and Carbon replacement filters for all major air purifier brands. Keep your air purifier running at peak efficiency.",
};

const FILTER_PRODUCTS = [
    {
        id: "hepa-philips-1000",
        name: "Philips FY1410/30 HEPA Filter",
        brand: "Philips",
        compatible: "Philips AC1215, AC1217",
        price: 2199,
        image: "https://m.media-amazon.com/images/I/41QdJm3bGkL._SX679_.jpg",
        type: "HEPA",
        lifespan: "12 months",
    },
    {
        id: "hepa-coway-150",
        name: "Coway AP-1019C HEPA Filter",
        brand: "Coway",
        compatible: "Coway AirMega 150",
        price: 2499,
        image: "https://m.media-amazon.com/images/I/51HaE70EANL._SX679_.jpg",
        type: "HEPA",
        lifespan: "12 months",
    },
    {
        id: "carbon-universal",
        name: "Universal Activated Carbon Filter",
        brand: "Antia",
        compatible: "Most models (30x30cm)",
        price: 799,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=Carbon+Filter",
        type: "Carbon",
        lifespan: "6 months",
    },
    {
        id: "pre-filter-universal",
        name: "Pre-Filter Washable Mesh",
        brand: "Antia",
        compatible: "Universal fit",
        price: 349,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=Pre-Filter",
        type: "Pre-Filter",
        lifespan: "Washable",
    },
    {
        id: "merv13-20x20",
        name: "MERV-13 Filter Panel 20×20×1",
        brand: "Antia",
        compatible: "Corsi-Rosenthal Box, HVAC",
        price: 649,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=MERV-13",
        type: "MERV-13",
        lifespan: "3–6 months",
    },
    {
        id: "hepa-dyson-tp03",
        name: "Dyson TP03 HEPA + Carbon Filter",
        brand: "Dyson",
        compatible: "Dyson Pure Cool TP03",
        price: 4999,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=Dyson+Filter",
        type: "HEPA + Carbon",
        lifespan: "12 months",
    },
    {
        id: "honeywell-hepa",
        name: "Honeywell HRF-R3 HEPA Filter",
        brand: "Honeywell",
        compatible: "Honeywell HPA300 series",
        price: 3299,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=Honeywell+Filter",
        type: "HEPA",
        lifespan: "12 months",
    },
    {
        id: "aqi-sensor",
        name: "Laser PM2.5 Replacement Sensor",
        brand: "Antia",
        compatible: "Antia AQI Monitor",
        price: 1299,
        image: "https://placehold.co/400x400/f1f5f9/475569?text=Sensor",
        type: "Sensor",
        lifespan: "3 years",
    },
];

export default function FiltersPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            {/* Header */}
            <div className="mb-10">
                <div className="text-sm text-gray-500 mb-3">Home &gt; <span className="font-medium text-gray-900">Replacement Filters</span></div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Replacement Filters & Accessories</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Genuine HEPA, Carbon, and MERV-13 filters to keep your air purifier running at peak efficiency.
                    Regular replacement ensures 99.97% filtration is maintained.
                </p>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                    <h3 className="font-bold text-blue-900 mb-1">When to replace your filter?</h3>
                    <p className="text-sm text-blue-800">HEPA filters should be replaced every 12 months. Carbon filters every 6 months. Pre-filters can be washed monthly. Most purifiers have an indicator light.</p>
                </div>
                <a href="/contact" className="shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                    Get Filter Advice
                </a>
            </div>

            {/* Filter Types */}
            <div className="flex flex-wrap gap-3 mb-8">
                {["All", "HEPA", "Carbon", "MERV-13", "Pre-Filter", "Sensor"].map((type) => (
                    <button key={type} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors first:bg-blue-600 first:text-white first:border-blue-600">
                        {type}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FILTER_PRODUCTS.map((item) => (
                    <FilterProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
