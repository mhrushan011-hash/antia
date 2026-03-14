
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function RentHomePage() {
    const products = db.products.getAll().filter(p => p.category === 'home' && p.rentAvailable);
    return <ProductListing mode="rent" category="home" products={products} />;
}
