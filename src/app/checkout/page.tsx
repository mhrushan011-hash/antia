"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, CreditCard, Truck, Shield, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Razorpay: any;
    }
}

type Step = "address" | "payment" | "review";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const { customer } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState<Step>("address");
    const [placed, setPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const [form, setForm] = useState({
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveOrder = async (paymentStatus: "paid" | "pending", razorpayOrderId?: string, razorpayPaymentId?: string) => {
        const orderItems = items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            productImage: i.product.images[0] ?? "",
            mode: i.mode,
            rentMonths: i.rentMonths,
            price: i.mode === "rent" ? (i.product.rentPrice ?? 0) : (i.product.buyPrice ?? 0),
            quantity: i.quantity,
        }));

        await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                address: form.address,
                city: form.city,
                pincode: form.pincode,
                items: orderItems,
                subtotal,
                gst,
                total,
                paymentMethod,
                paymentStatus,
                razorpayOrderId,
                razorpayPaymentId,
            }),
        });
    };

    const loadRazorpayScript = () =>
        new Promise<boolean>((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    const handlePlaceOrder = async () => {
        setError("");
        setProcessing(true);

        if (paymentMethod === "cod") {
            await saveOrder("pending");
            clearCart();
            setPlaced(true);
            setProcessing(false);
            return;
        }

        // Razorpay flow
        const loaded = await loadRazorpayScript();
        if (!loaded) {
            setError("Payment service unavailable. Please try Cash on Delivery.");
            setProcessing(false);
            return;
        }

        try {
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total, receipt: `order_${Date.now()}` }),
            });
            const data = await res.json();

            if (data.error) {
                setError("Could not initiate payment. Please try Cash on Delivery.");
                setProcessing(false);
                return;
            }

            const rzp = new window.Razorpay({
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "Antia",
                description: "Air Purifier Order",
                order_id: data.orderId,
                prefill: { name: form.name, email: form.email, contact: form.phone },
                theme: { color: "#2563eb" },
                handler: async (response: any) => {
                    // Verify signature
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.verified) {
                        await saveOrder("paid", response.razorpay_order_id, response.razorpay_payment_id);
                        clearCart();
                        setPlaced(true);
                    } else {
                        setError("Payment verification failed. Please contact support.");
                    }
                    setProcessing(false);
                },
                modal: {
                    ondismiss: () => setProcessing(false),
                },
            });
            rzp.open();
        } catch (err) {
            setError("Payment failed. Please try again or use Cash on Delivery.");
            setProcessing(false);
        }
    };

    if (items.length === 0 && !placed) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                <Link href="/air-purifiers/buy" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Shop Now
                </Link>
            </div>
        );
    }

    if (placed) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you, {form.name}! Your order has been confirmed.
                    {form.email && ` A confirmation has been sent to ${form.email}.`}
                </p>
                <Link href="/profile" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    View My Orders
                </Link>
            </div>
        );
    }

    const STEPS: { key: Step; label: string }[] = [
        { key: "address", label: "Address" },
        { key: "payment", label: "Payment" },
        { key: "review", label: "Review" },
    ];

    return (
        <div className="container mx-auto px-4 py-10 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-10">
                {STEPS.map((s, idx) => (
                    <div key={s.key} className="flex items-center gap-2">
                        <button
                            onClick={() => STEPS.findIndex(x => x.key === step) > idx && setStep(s.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                step === s.key ? "bg-blue-600 text-white" :
                                STEPS.findIndex(x => x.key === step) > idx ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {STEPS.findIndex(x => x.key === step) > idx && <CheckCircle className="h-4 w-4" />}
                            {s.label}
                        </button>
                        {idx < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Form */}
                <div className="flex-1">
                    {step === "address" && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input name="name" value={form.name} onChange={handleInput} type="text" required placeholder="Rahul Sharma"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input name="email" value={form.email} onChange={handleInput} type="email" required placeholder="you@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <input name="phone" value={form.phone} onChange={handleInput} type="tel" required placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <input name="address" value={form.address} onChange={handleInput} type="text" required placeholder="Flat 3B, Green Park Colony"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input name="city" value={form.city} onChange={handleInput} type="text" required placeholder="New Delhi"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                                    <input name="pincode" value={form.pincode} onChange={handleInput} type="text" required placeholder="110016"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                </div>
                            </div>
                            <button
                                onClick={() => setStep("payment")}
                                disabled={!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode}
                                className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                            <div className="space-y-3 mb-6">
                                {[
                                    { id: "upi", label: "UPI (GPay, PhonePe, Paytm)", icon: "📱", desc: "Instant payment" },
                                    { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                                    { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All major banks" },
                                    { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
                                ].map((method) => (
                                    <label key={method.id}
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}>
                                        <input type="radio" name="payment" value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={() => setPaymentMethod(method.id)}
                                            className="h-4 w-4 text-blue-600" />
                                        <span className="text-xl">{method.icon}</span>
                                        <div>
                                            <div className="font-medium text-gray-800">{method.label}</div>
                                            <div className="text-xs text-gray-500">{method.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                                <Shield className="h-4 w-4 text-green-500" />
                                256-bit SSL encrypted. Powered by Razorpay.
                            </div>
                            <button onClick={() => setStep("review")}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                                Review Order
                            </button>
                        </div>
                    )}

                    {step === "review" && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-700">
                                    <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                {items.map((item) => {
                                    const price = item.mode === "rent" ? (item.product.rentPrice ?? 0) : (item.product.buyPrice ?? 0);
                                    return (
                                        <div key={`${item.product.id}-${item.mode}`} className="flex items-center gap-4 py-3 border-b last:border-0">
                                            <img src={item.product.images[0] ?? ""} alt={item.product.name}
                                                className="h-14 w-14 object-contain rounded-lg bg-gray-50 border p-1" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{item.mode} × {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">₹{(price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-2">
                                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
                                <div className="flex justify-between text-gray-600"><span>Delivery</span><span className="text-green-600">Free</span></div>
                                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                <Truck className="h-4 w-4 text-blue-600" />
                                Estimated delivery: 24–48 hours in metro cities
                            </div>

                            <button onClick={handlePlaceOrder} disabled={processing}
                                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors text-lg disabled:opacity-60 flex items-center justify-center gap-2">
                                {processing ? (
                                    <><div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…</>
                                ) : (
                                    `Place Order — ₹${total.toLocaleString()}`
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Summary */}
                <div className="lg:w-80">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-3 mb-4">
                            {items.map((item) => (
                                <div key={`${item.product.id}-${item.mode}`} className="flex justify-between text-sm">
                                    <span className="text-gray-600 line-clamp-1 flex-1 pr-2">{item.product.name}</span>
                                    <span className="font-medium shrink-0">
                                        ₹{((item.mode === "rent" ? (item.product.rentPrice ?? 0) : (item.product.buyPrice ?? 0)) * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-gray-600"><span>GST</span><span>₹{gst.toLocaleString()}</span></div>
                            <div className="flex justify-between font-bold text-gray-900 text-base pt-2"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
