"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/customers")
            .then(r => r.json())
            .then(data => { setCustomers(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" /> Dashboard
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Customers</h1>
                <span className="text-sm text-gray-500 ml-auto">{customers.length} registered</span>
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : customers.length === 0 ? (
                    <div className="text-center py-16">
                        <Users className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">No registered customers yet.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(c => (
                                    <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                                        <td className="px-5 py-4 text-sm text-gray-600">{c.email}</td>
                                        <td className="px-5 py-4 text-sm text-gray-600">{c.phone || "—"}</td>
                                        <td className="px-5 py-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
