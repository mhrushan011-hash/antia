"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Check } from "lucide-react";

interface SiteSettings {
    siteName: string;
    siteDescription: string;
    favicon: string;
    logo: string;
    globalHeadCode: string;
    globalBodyCode: string;
    defaultSEO: {
        metaTitle: string;
        metaDescription: string;
        h1: string;
        canonical: string;
        keywords: string[];
        ogTitle?: string;
        ogDescription?: string;
        ogImage?: string;
    };
}

const TABS = ["Branding", "SEO Defaults", "OG / Social"] as const;
type Tab = typeof TABS[number];

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("Branding");

    useEffect(() => {
        fetch("/api/settings").then(r => r.json()).then(data => {
            setSettings(data);
            setLoading(false);
        });
    }, []);

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
        } finally { setSaving(false); }
    };

    if (loading || !settings) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading settings...</p></div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900"><ArrowLeft className="h-5 w-5" /> Dashboard</Link>
                    <h1 className="text-xl font-bold text-gray-900">Site Settings</h1>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white transition-colors ${saved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-60`}>
                    {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Settings"}</>}
                </button>
            </div>
            <div className="max-w-3xl mx-auto p-8">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-8">
                    {TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>{tab}</button>
                    ))}
                </div>
                {activeTab === "Branding" && (
                    <div className="space-y-5 bg-white rounded-xl border border-gray-100 p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-4">Brand Identity</h2>
                        {[
                            { label: "Site Name", key: "siteName", type: "input" },
                            { label: "Site Description", key: "siteDescription", type: "textarea" },
                            { label: "Logo URL", key: "logo", type: "input", placeholder: "/logo.png" },
                            { label: "Favicon URL", key: "favicon", type: "input", placeholder: "/favicon.ico" },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                {type === "textarea" ? (
                                    <textarea value={(settings as any)[key]} onChange={e => setSettings(s => s ? { ...s, [key]: e.target.value } : s)}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20" />
                                ) : (
                                    <input value={(settings as any)[key]} onChange={e => setSettings(s => s ? { ...s, [key]: e.target.value } : s)}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder={placeholder} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "SEO Defaults" && (
                    <div className="space-y-5 bg-white rounded-xl border border-gray-100 p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-1">Default SEO</h2>
                        <p className="text-sm text-gray-500 mb-4">Used as fallback for pages without specific SEO settings.</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default H1</label>
                            <input value={settings.defaultSEO.h1} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, h1: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-gray-400 text-xs">({settings.defaultSEO.metaTitle.length}/60)</span></label>
                            <input value={settings.defaultSEO.metaTitle} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, metaTitle: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-gray-400 text-xs">({settings.defaultSEO.metaDescription.length}/160)</span></label>
                            <textarea value={settings.defaultSEO.metaDescription} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, metaDescription: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Canonical Base URL</label>
                            <input value={settings.defaultSEO.canonical} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, canonical: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
                            <input value={settings.defaultSEO.keywords.join(", ")} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                    </div>
                )}
                {activeTab === "OG / Social" && (
                    <div className="space-y-5 bg-white rounded-xl border border-gray-100 p-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-1">Open Graph & Social</h2>
                        <p className="text-sm text-gray-500 mb-4">Controls how links look when shared on WhatsApp, Twitter, Facebook.</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                            <input value={settings.defaultSEO.ogTitle || ""} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, ogTitle: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Same as Meta Title if empty" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                            <textarea value={settings.defaultSEO.ogDescription || ""} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, ogDescription: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default OG Image URL</label>
                            <input value={settings.defaultSEO.ogImage || ""} onChange={e => setSettings(s => s ? { ...s, defaultSEO: { ...s.defaultSEO, ogImage: e.target.value } } : s)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="https://..." />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
