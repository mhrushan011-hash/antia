"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, ArrowRight } from "lucide-react";

interface Redirect { id: string; from: string; to: string; type: "301" | "302"; active: boolean; createdAt: string; }

export default function AdminRedirectsPage() {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ from: "", to: "", type: "301", active: true });
    const [adding, setAdding] = useState(false);

    useEffect(() => { fetchRedirects(); }, []);

    const fetchRedirects = async () => {
        const res = await fetch("/api/redirects");
        setRedirects(await res.json());
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        await fetch("/api/redirects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        setForm({ from: "", to: "", type: "301", active: true });
        await fetchRedirects();
        setAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this redirect?")) return;
        await fetch(`/api/redirects?id=${id}`, { method: "DELETE" });
        fetchRedirects();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center gap-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft className="h-5 w-5" /> Dashboard</Link>
                <h1 className="text-xl font-bold text-gray-900">URL Redirects</h1>
            </div>
            <div className="max-w-4xl mx-auto p-8 space-y-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-4">Add Redirect</h2>
                    <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-40">
                            <label className="block text-xs font-medium text-gray-600 mb-1">From (old URL)</label>
                            <input required value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="/old-page" />
                        </div>
                        <div className="flex-1 min-w-40">
                            <label className="block text-xs font-medium text-gray-600 mb-1">To (new URL)</label>
                            <input required value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="/new-page" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as "301" | "302" }))}
                                className="px-3 py-2 border rounded-lg text-sm">
                                <option value="301">301 Permanent</option>
                                <option value="302">302 Temporary</option>
                            </select>
                        </div>
                        <button type="submit" disabled={adding}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                            <Plus className="h-4 w-4" /> {adding ? "Adding..." : "Add"}
                        </button>
                    </form>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b"><h2 className="font-bold text-gray-900">Redirects ({redirects.length})</h2></div>
                    {loading ? <p className="p-6 text-gray-500">Loading...</p> : redirects.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center">No redirects configured yet.</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                                <tr><th className="px-6 py-3 text-left">From</th><th className="px-6 py-3 text-left">To</th><th className="px-6 py-3">Type</th><th className="px-6 py-3">Status</th><th className="px-6 py-3"></th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {redirects.map(r => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-3 font-mono text-xs text-blue-600">{r.from}</td>
                                        <td className="px-6 py-3 font-mono text-xs text-gray-600 flex items-center gap-1"><ArrowRight className="h-3 w-3" />{r.to}</td>
                                        <td className="px-6 py-3 text-center"><span className={`text-xs px-2 py-1 rounded-full font-medium ${r.type === "301" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>{r.type}</span></td>
                                        <td className="px-6 py-3 text-center"><span className={`text-xs px-2 py-1 rounded-full ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{r.active ? "Active" : "Inactive"}</span></td>
                                        <td className="px-6 py-3 text-right"><button onClick={() => handleDelete(r.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
