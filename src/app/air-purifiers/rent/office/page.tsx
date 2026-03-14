
import { ProductListing } from "@/components/shop/ProductListing";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default function RentOfficePage() {
    const products = db.products.getAll().filter(p => p.category === 'office' && p.rentAvailable);
    return <ProductListing mode="rent" category="office" products={products} />;
}
