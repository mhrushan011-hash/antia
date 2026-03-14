"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8">Add some products to get started.</p>
                <Link
                    href="/air-purifiers/buy"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                    Clear All
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {items.map((item) => {
                            const image = item.product.images[0] ?? "https://placehold.co/200x200/e2e8f0/475569?text=Product";
                            const price = item.mode === "rent"
                                ? (item.product.rentPrice ?? 0)
                                : (item.product.buyPrice ?? 0);

                            return (
                                <div key={`${item.product.id}-${item.mode}`} className="p-6 border-b last:border-0 flex flex-col sm:flex-row gap-6">
                                    <Link href={`/product/${item.product.id}`} className="h-24 w-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border">
                                        <img src={image} alt={item.product.name} className="h-full w-full object-contain p-2" />
                                    </Link>

                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <Link href={`/product/${item.product.id}`}>
                                                <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{item.product.name}</h3>
                                            </Link>
                                            <p className="font-bold text-gray-900">
                                                ₹{(price * item.quantity).toLocaleString()}
                                                {item.mode === "rent" && <span className="text-sm font-normal text-gray-500">/mo</span>}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 capitalize">
                                            Mode: <span className={`font-medium ${item.mode === "rent" ? "text-blue-600" : "text-green-600"}`}>{item.mode}</span>
                                            {item.mode === "rent" && item.rentMonths && ` • ${item.rentMonths} months plan`}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            {item.mode === "buy" ? (
                                                <div className="flex items-center border rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.mode, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-50 text-gray-500"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 font-medium text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.mode, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-50 text-gray-500"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">Qty: 1 unit</span>
                                            )}

                                            <button
                                                onClick={() => removeFromCart(item.product.id, item.mode)}
                                                className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                                            >
                                                <Trash2 className="h-4 w-4" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>GST (18%)</span>
                                <span>₹{gst.toLocaleString()}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                        >
                            Proceed to Checkout <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link href="/air-purifiers/buy" className="block text-center mt-4 text-blue-600 hover:underline text-sm font-medium">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
