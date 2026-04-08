import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        id: 1,
        title: "Rent Air Purifiers",
        description: "Zero maintenance, free relocation & upgrades.",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
        link: "/air-purifiers/rent",
        color: "bg-blue-50 hover:bg-blue-100",
    },
    {
        id: 2,
        title: "Buy New Purifiers",
        description: "Top brands like Philips, Dyson & Coway.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
        link: "/air-purifiers/buy",
        color: "bg-green-50 hover:bg-green-100",
    },
    {
        id: 3,
        title: "Replacement Filters",
        description: "Genuine HEPA & Carbon filters.",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80",
        link: "/filters",
        color: "bg-gray-50 hover:bg-gray-100",
    },
    {
        id: 4,
        title: "Corporate Plans",
        description: "Bulk rentals for offices & schools.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
        link: "/business/commercial",
        color: "bg-orange-50 hover:bg-orange-100",
    },
];

export function Categories() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                    <p className="mt-2 text-gray-600">Find the perfect clean air solution for your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link}
                            className={`group block overflow-hidden rounded-2xl border border-gray-100 ${category.color} transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {category.description}
                                </p>
                                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
