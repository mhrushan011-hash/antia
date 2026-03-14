"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Package, Wind, LogOut, ChevronRight, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";
import type { Order } from "@/types/cms";

const STATUS_STYLES: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    placed: { label: "Order Placed", color: "bg-blue-100 text-blue-700", icon: <Clock className="h-4 w-4" /> },
    confirmed: { label: "Confirmed", color: "bg-indigo-100 text-indigo-700", icon: <CheckCircle className="h-4 w-4" /> },
    dispatched: { label: "Dispatched", color: "bg-orange-100 text-orange-700", icon: <Truck className="h-4 w-4" /> },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-4 w-4" /> },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <AlertCircle className="h-4 w-4" /> },
};

export default function ProfilePage() {
    const { customer, loading, logout } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    useEffect(() => {
        if (!loading && !customer) {
            router.push("/login");
        }
    }, [customer, loading, router]);

    useEffect(() => {
        if (customer) {
            setOrdersLoading(true);
            fetch("/api/orders")
                .then((r) => r.json())
                .then((data) => {
                    setOrders(data.orders ?? []);
                    setOrdersLoading(false);
                })
                .catch(() => setOrdersLoading(false));
        }
    }, [customer]);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!customer) return null;

    const initials = customer.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const activeRentals = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled" && o.items.some((i) => i.mode === "rent")).length;
    const totalOrders = orders.length;

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{customer.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm">
                                <Package className="h-4 w-4" /> My Orders
                            </div>
                            <Link href="/air-purifiers/rent" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                                <Wind className="h-4 w-4" /> Rent an Purifier
                            </Link>
                        </nav>

                        <button onClick={handleLogout}
                            className="mt-6 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-sm font-medium">
                            <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
                            <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Rentals</h3>
                            <p className="text-3xl font-bold text-blue-600">{activeRentals}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Spent</h3>
                            <p className="text-3xl font-bold text-gray-900">
                                ₹{orders.reduce((s, o) => s + o.total, 0).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                        </div>

                        {ordersLoading && (
                            <div className="p-12 text-center text-gray-400">Loading orders…</div>
                        )}

                        {!ordersLoading && orders.length === 0 && (
                            <div className="p-12 text-center">
                                <Package className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-700 mb-1">No orders yet</h3>
                                <p className="text-gray-400 text-sm mb-6">Your orders will appear here once you make a purchase.</p>
                                <Link href="/air-purifiers/buy"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                                    Shop Now
                                </Link>
                            </div>
                        )}

                        {!ordersLoading && orders.map((order) => {
                            const statusInfo = STATUS_STYLES[order.status] ?? STATUS_STYLES.placed;
                            return (
                                <div key={order.id} className="p-6 border-b last:border-0">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                            {statusInfo.icon} {statusInfo.label}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <img src={item.productImage} alt={item.productName} className="h-12 w-12 object-contain rounded-lg bg-gray-50 border p-1" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{item.mode}{item.rentMonths ? ` · ${item.rentMonths} months` : ""} · Qty {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900 shrink-0">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Total: <span className="font-bold text-gray-900">₹{order.total.toLocaleString()}</span></span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {order.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
