import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/cms";

interface ProductGridProps {
    products: Product[];
    mode: "buy" | "rent";
}

export function ProductGrid({ products, mode }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} mode={mode} />
            ))}
        </div>
    );
}
