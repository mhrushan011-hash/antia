
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function RentAllPage() {
    // Show all rent-available items (home & office)
    const products = db.products.getAll().filter(p => (p.category === 'home' || p.category === 'office') && p.rentAvailable);
    return <ProductListing mode="rent" category="all" products={products} />;
}
