"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, AlertCircle, Package } from "lucide-react";
import type { Order } from "@/types/cms";

const STATUS_STYLES: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    placed: { label: "Placed", color: "bg-blue-100 text-blue-700", icon: <Clock className="h-3.5 w-3.5" /> },
    confirmed: { label: "Confirmed", color: "bg-indigo-100 text-indigo-700", icon: <CheckCircle className="h-3.5 w-3.5" /> },
    dispatched: { label: "Dispatched", color: "bg-orange-100 text-orange-700", icon: <Truck className="h-3.5 w-3.5" /> },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: <CheckCircle className="h-3.5 w-3.5" /> },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <AlertCircle className="h-3.5 w-3.5" /> },
};

const PAYMENT_STYLES: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        const res = await fetch("/api/orders?admin=1");
        const data = await res.json();
        setOrders(data.orders ?? []);
        setLoading(false);
    };

    const handleStatusUpdate = async (orderId: string, status: string) => {
        setUpdatingId(orderId);
        try {
            await fetch("/api/orders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: orderId, status }),
            });
            await fetchOrders();
        } finally {
            setUpdatingId(null);
        }
    };

    const statusCounts = {
        total: orders.length,
        placed: orders.filter(o => o.status === "placed").length,
        confirmed: orders.filter(o => o.status === "confirmed").length,
        dispatched: orders.filter(o => o.status === "dispatched").length,
        delivered: orders.filter(o => o.status === "delivered").length,
        cancelled: orders.filter(o => o.status === "cancelled").length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" /> Dashboard
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
                    {[
                        { label: "Total", value: statusCounts.total, color: "text-gray-700", bg: "bg-gray-100" },
                        { label: "Placed", value: statusCounts.placed, color: "text-blue-700", bg: "bg-blue-100" },
                        { label: "Confirmed", value: statusCounts.confirmed, color: "text-indigo-700", bg: "bg-indigo-100" },
                        { label: "Dispatched", value: statusCounts.dispatched, color: "text-orange-700", bg: "bg-orange-100" },
                        { label: "Delivered", value: statusCounts.delivered, color: "text-green-700", bg: "bg-green-100" },
                        { label: "Cancelled", value: statusCounts.cancelled, color: "text-red-700", bg: "bg-red-100" },
                    ].map(s => (
                        <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className={`text-xs font-medium ${s.color} mt-0.5`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingBag className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">No orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => {
                            const statusInfo = STATUS_STYLES[order.status] ?? STATUS_STYLES.placed;
                            const isExpanded = expandedId === order.id;

                            return (
                                <div key={order.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    {/* Row */}
                                    <div className="p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setExpandedId(isExpanded ? null : order.id)}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-semibold text-gray-900 text-sm">#{order.id.slice(0, 8).toUpperCase()}</span>
                                                <span className="text-gray-500 text-sm">{order.customerName}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span>{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                                                <span>₹{order.total.toLocaleString()}</span>
                                                <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${PAYMENT_STYLES[order.paymentStatus] ?? PAYMENT_STYLES.pending}`}>
                                                {order.paymentStatus}
                                            </span>
                                            <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${statusInfo.color}`}>
                                                {statusInfo.icon} {statusInfo.label}
                                            </span>
                                            {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                                        </div>
                                    </div>

                                    {/* Expanded Detail */}
                                    {isExpanded && (
                                        <div className="border-t px-5 py-4 bg-gray-50 space-y-4">
                                            {/* Customer Info */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">Customer</p>
                                                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Email</p>
                                                    <p className="text-sm text-gray-900">{order.customerEmail}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Phone</p>
                                                    <p className="text-sm text-gray-900">{order.customerPhone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Address</p>
                                                    <p className="text-sm text-gray-900">{order.address}, {order.city} - {order.pincode}</p>
                                                </div>
                                            </div>

                                            {/* Items */}
                                            <div>
                                                <p className="text-xs text-gray-500 mb-2">Items</p>
                                                <div className="space-y-2">
                                                    {order.items.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 border">
                                                            <img src={item.productImage} alt={item.productName} className="h-10 w-10 object-contain rounded bg-gray-50 border p-0.5" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                                                                <p className="text-xs text-gray-500 capitalize">{item.mode}{item.rentMonths ? ` · ${item.rentMonths}mo` : ""} · Qty {item.quantity}</p>
                                                            </div>
                                                            <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Payment & Total */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500">Payment Method</p>
                                                    <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Subtotal / GST / Total</p>
                                                    <p className="text-sm text-gray-900">₹{order.subtotal.toLocaleString()} + ₹{order.gst.toLocaleString()} = <span className="font-bold">₹{order.total.toLocaleString()}</span></p>
                                                </div>
                                                {order.razorpayPaymentId && (
                                                    <div>
                                                        <p className="text-xs text-gray-500">Razorpay ID</p>
                                                        <p className="text-sm text-gray-900 font-mono">{order.razorpayPaymentId}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Update */}
                                            <div className="flex items-center gap-3 pt-2 border-t">
                                                <label className="text-sm font-medium text-gray-700">Update Status:</label>
                                                <select
                                                    value={order.status}
                                                    onChange={e => handleStatusUpdate(order.id, e.target.value)}
                                                    disabled={updatingId === order.id}
                                                    className="px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60">
                                                    <option value="placed">Placed</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                {updatingId === order.id && <span className="text-xs text-gray-500">Updating...</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
