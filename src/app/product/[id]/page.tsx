
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProductDetails from "@/components/shop/ProductDetails";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = db.products.getById(id);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}
