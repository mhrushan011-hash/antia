"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BlogCategoryFilter({ categories, active }: { categories: string[]; active: string }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => router.push(cat === "All" ? pathname : `${pathname}?category=${encodeURIComponent(cat)}`)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        active === cat
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
