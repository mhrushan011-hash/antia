"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Check, Info } from "lucide-react";

export default function AdminCodeInjectionPage() {
    const [headCode, setHeadCode] = useState("");
    const [bodyCode, setBodyCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings").then(r => r.json()).then(data => {
            setHeadCode(data.globalHeadCode || "");
            setBodyCode(data.globalBodyCode || "");
            setLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ globalHeadCode: headCode, globalBodyCode: bodyCode }),
            });
            if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
        } finally { setSaving(false); }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft className="h-5 w-5" /> Dashboard</Link>
                    <h1 className="text-xl font-bold text-gray-900">Code Injection</h1>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white ${saved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-60`}>
                    {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}</>}
                </button>
            </div>
            <div className="max-w-3xl mx-auto p-8 space-y-6">
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div><strong>Use with care.</strong> Bad scripts can break your site. Code is injected on every page.</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-1">Header Code <span className="text-gray-400 font-normal text-sm">(inside &lt;head&gt;)</span></h2>
                    <p className="text-sm text-gray-500 mb-3">Use for: Google Tag Manager, Analytics, Search Console meta tags.</p>
                    <textarea value={headCode} onChange={e => setHeadCode(e.target.value)}
                        className="w-full h-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono bg-gray-50"
                        placeholder={`<!-- Google Tag Manager -->\n<script>...</script>`} />
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-1">Body Code <span className="text-gray-400 font-normal text-sm">(after &lt;body&gt; opens)</span></h2>
                    <p className="text-sm text-gray-500 mb-3">Use for: GTM noscript, chat widgets, Intercom, Crisp.</p>
                    <textarea value={bodyCode} onChange={e => setBodyCode(e.target.value)}
                        className="w-full h-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono bg-gray-50"
                        placeholder={`<!-- Google Tag Manager (noscript) -->\n<noscript>...</noscript>`} />
                </div>
            </div>
        </div>
    );
}
