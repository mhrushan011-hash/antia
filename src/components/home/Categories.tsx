import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        id: 1,
        title: "Rent Air Purifiers",
        description: "Zero maintenance, free relocation & upgrades.",
        image: "https://image.pollinations.ai/prompt/white%20air%20purifier%20rental%20service%20cozy%20Indian%20home%20interior%20blue%20theme%20clean%20fresh%20air%20concept%20lifestyle%20photography?width=400&height=300&seed=101&nologo=true",
        link: "/air-purifiers/rent",
        color: "bg-blue-50 hover:bg-blue-100",
    },
    {
        id: 2,
        title: "Buy New Purifiers",
        description: "Top brands like Philips, Dyson & Coway.",
        image: "https://image.pollinations.ai/prompt/premium%20air%20purifier%20models%20display%20Philips%20Dyson%20Coway%20product%20showcase%20white%20background%20India%20store?width=400&height=300&seed=102&nologo=true",
        link: "/air-purifiers/buy",
        color: "bg-green-50 hover:bg-green-100",
    },
    {
        id: 3,
        title: "Replacement Filters",
        description: "Genuine HEPA & Carbon filters.",
        image: "https://image.pollinations.ai/prompt/HEPA%20replacement%20filter%20cylinder%20white%20clean%20air%20purifier%20filter%20product%20photography%20white%20background%20studio?width=400&height=300&seed=103&nologo=true",
        link: "/filters",
        color: "bg-gray-50 hover:bg-gray-100",
    },
    {
        id: 4,
        title: "Corporate Plans",
        description: "Bulk rentals for offices & schools.",
        image: "https://image.pollinations.ai/prompt/modern%20Indian%20office%20air%20purifier%20corporate%20workspace%20clean%20air%20professional%20bulk%20rental%20office%20setting?width=400&height=300&seed=104&nologo=true",
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
