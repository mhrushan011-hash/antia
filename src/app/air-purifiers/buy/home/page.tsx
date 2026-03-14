
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function BuyHomePage() {
    const products = db.products.getAll().filter(p => p.category === 'home' && p.buyAvailable);
    return <ProductListing mode="buy" category="home" products={products} />;
}
