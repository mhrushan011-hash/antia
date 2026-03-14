"use client";

import { useState } from "react";
import { Star, Check, MapPin, Shield, Truck, RefreshCw, Info, ShoppingCart, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/cms";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: Product }) {
    const [activeImage, setActiveImage] = useState(0);
    const [purchaseType, setPurchaseType] = useState<"rent" | "buy">(product.rentAvailable ? "rent" : "buy");
    const [selectedPlan, setSelectedPlan] = useState(2);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const rentMonths = rentPlans[selectedPlan]?.months;
        addToCart(product, purchaseType, rentMonths);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Helper to safe access rentPlans (as they are not in the database schema explicit field but maybe in specs or hardcoded logic for now)
    // For now, let's assume we use standard rent plans if not present, or we can add rentPlans to the schema later.
    // The current schema has 'rentPrice' but not explicit plans. check Schema...
    // Schema in cms.ts doesn't have rentPlans. I'll mock them relative to rentPrice.

    // Mock rent plans based on base rentPrice
    const rentPlans = product.rentPrice ? [
        { months: 3, price: Math.round(product.rentPrice * 1.2), deposit: 1000 },
        { months: 6, price: Math.round(product.rentPrice * 1.1), deposit: 1000 },
        { months: 12, price: product.rentPrice, deposit: 0 },
    ] : [];

    const reviews = 1240; // Mock
    const rating = 4.8; // Mock
    const mrp = product.buyPrice ? Math.round(product.buyPrice * 1.4) : 0; // Mock MRP

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            {/* Breadcrumbs */}
            <div className="mb-6 text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600">Home</Link> &gt;
                <Link href="/buy" className="hover:text-blue-600 ml-1">Shop</Link> &gt;
                <span className="font-semibold text-gray-900 ml-1">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-white p-8">
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 p-2 ${activeImage === idx ? "border-blue-600" : "border-gray-200"
                                        }`}
                                >
                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                            <span className="font-bold text-green-700">{rating}</span>
                            <Star className="h-4 w-4 fill-green-700 text-green-700" />
                        </div>
                        <span className="text-sm text-gray-500">{reviews} Reviews</span>
                    </div>

                    {/* Purchase Type Toggle */}
                    <div className="flex p-1 bg-gray-100 rounded-lg mb-8 w-fit">
                        {product.rentAvailable && (
                            <button
                                onClick={() => setPurchaseType("rent")}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${purchaseType === "rent" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                Rent
                            </button>
                        )}
                        {product.buyAvailable && (
                            <button
                                onClick={() => setPurchaseType("buy")}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${purchaseType === "buy" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                Buy
                            </button>
                        )}
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-8">
                        {purchaseType === "rent" && product.rentAvailable && rentPlans.length > 0 ? (
                            <>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">₹{rentPlans[selectedPlan].price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {rentPlans.map((plan, idx) => (
                                        <label
                                            key={idx}
                                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedPlan === idx
                                                ? "border-blue-600 bg-white shadow-sm ring-1 ring-blue-600"
                                                : "border-gray-200 bg-white hover:border-blue-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="rentPlan"
                                                    checked={selectedPlan === idx}
                                                    onChange={() => setSelectedPlan(idx)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="font-medium text-gray-900">{plan.months} Months Plan</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">₹{plan.price}/mo</div>
                                                {plan.deposit > 0 ? (
                                                    <div className="text-xs text-gray-500">₹{plan.deposit} Deposit</div>
                                                ) : (
                                                    <div className="text-xs text-green-600 font-medium">Zero Deposit</div>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                                    <Check className="h-4 w-4 text-green-500" /> Free Delivery
                                    <Check className="h-4 w-4 text-green-500" /> Free Maintenance
                                    <Check className="h-4 w-4 text-green-500" /> Easy Return
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">₹{product.buyPrice?.toLocaleString()}</span>
                                    {mrp > (product.buyPrice || 0) && (
                                        <>
                                            <span className="ml-2 text-lg text-gray-400 line-through">₹{mrp.toLocaleString()}</span>
                                            <span className="ml-2 text-sm font-bold text-green-600">
                                                {Math.round(((mrp - (product.buyPrice || 0)) / mrp) * 100)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    Inclusive of all taxes. Standard 1-year manufacturer warranty included.
                                </p>
                            </>
                        )}

                        {/* Pincode Checker */}
                        <div className="flex gap-2 mb-6">
                            <div className="relative flex-1">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800">
                                Check
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 ${
                                added
                                    ? "bg-green-600 shadow-green-200 text-white"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 text-white"
                            }`}
                        >
                            {added ? (
                                <><CheckCircle className="h-5 w-5" /> Added to Cart</>
                            ) : purchaseType === "rent" ? (
                                <><ShoppingCart className="h-5 w-5" /> Rent Now</>
                            ) : (
                                <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                            )}
                        </button>
                    </div>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-2 gap-4">
                        {product.features?.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Info Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Description & Specs */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </section>

                    {/* Technical Specs */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <tbody className="divide-y divide-gray-100">
                                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                                        <tr key={key} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-500 capitalize w-1/3">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                                            <td className="px-6 py-4 text-gray-900">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                {/* Right Col: Why Choose & Benefits */}
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Why Choose PureAir?</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-sm">Genuine Products</h4>
                                    <p className="text-xs text-gray-500">Sourced directly from brands.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-sm">Fast Delivery</h4>
                                    <p className="text-xs text-gray-500">Within 24 hours in metro cities.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <RefreshCw className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-sm">Easy Returns</h4>
                                    <p className="text-xs text-gray-500">7-day replacement policy.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-600 rounded-xl p-6 text-white">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <Info className="h-5 w-5" /> Rental Benefits
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-100 list-disc list-inside">
                            <li>Free HEPA Filter Replacement</li>
                            <li>Zero Maintenance Cost</li>
                            <li>Free Relocation Service</li>
                            <li>Upgrade Anytime</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
