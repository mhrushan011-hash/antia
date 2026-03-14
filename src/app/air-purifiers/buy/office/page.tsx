
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function BuyOfficePage() {
    const products = db.products.getAll().filter(p => p.category === 'office' && p.buyAvailable);
    return <ProductListing mode="buy" category="office" products={products} />;
}
