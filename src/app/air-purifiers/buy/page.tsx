
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function BuyAllPage() {
    // Show all buy-available items (home & office)
    const products = db.products.getAll().filter(p => (p.category === 'home' || p.category === 'office') && p.buyAvailable);
    return <ProductListing mode="buy" category="all" products={products} />;
}
