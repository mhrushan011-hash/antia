"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft, FileText } from "lucide-react";

interface PageItem {
    id: string;
    name: string;
    slug: string;
    type: "category" | "static";
    content: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
        h1: string;
        canonical: string;
        keywords: string[];
    };
    customCode: {
        headCode: string;
        bodyCode: string;
    };
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

const EMPTY_PAGE: Omit<PageItem, "id" | "createdAt" | "updatedAt"> = {
    name: "", slug: "", type: "static", content: "", published: false,
    seo: { metaTitle: "", metaDescription: "", h1: "", canonical: "", keywords: [] },
    customCode: { headCode: "", bodyCode: "" },
};

export default function AdminPagesPage() {
    const [pages, setPages] = useState<PageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<PageItem | null>(null);
    const [form, setForm] = useState(EMPTY_PAGE);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    useEffect(() => { fetchPages(); }, []);

    const fetchPages = async () => {
        const res = await fetch("/api/pages?admin=1");
        const data = await res.json();
        setPages(data);
        setLoading(false);
    };

    const handleEdit = (page: PageItem) => {
        setEditing(page);
        setForm({ ...page });
        setActiveTab("content");
    };

    const handleNew = () => {
        setEditing({ id: "new" } as PageItem);
        setForm({ ...EMPTY_PAGE });
        setActiveTab("content");
    };

    const handleSlugGenerate = () => {
        const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        setForm(f => ({ ...f, slug, seo: { ...f.seo, h1: f.name, metaTitle: f.name + " | Antia", canonical: `https://antia-india.vercel.app/${slug}` } }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const isNew = editing?.id === "new";
            const res = await fetch("/api/pages", {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(isNew ? form : { id: editing!.id, ...form }),
            });
            if (res.ok) {
                await fetchPages();
                setEditing(null);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this page?")) return;
        await fetch(`/api/pages?id=${id}`, { method: "DELETE" });
        fetchPages();
    };

    const handleTogglePublish = async (page: PageItem) => {
        await fetch("/api/pages", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: page.id, published: !page.published }),
        });
        fetchPages();
    };

    if (editing) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5" /> Back to Pages
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">{editing.id === "new" ? "New Page" : "Edit Page"}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="h-4 w-4" />
                            Published
                        </label>
                        <button onClick={handleSave} disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                            {saving ? "Saving..." : "Save Page"}
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-8">
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                        {(["content", "seo"] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                                {tab === "seo" ? "SEO & Meta" : "Content"}
                            </button>
                        ))}
                    </div>

                    {activeTab === "content" ? (
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Name *</label>
                                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Page name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <div className="flex gap-2">
                                        <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="url-friendly-slug" />
                                        <button onClick={handleSlugGenerate} className="px-3 py-2 bg-gray-100 border rounded-lg text-xs hover:bg-gray-200">Auto</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Page Type</label>
                                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as "category" | "static" }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                    <option value="static">Static Page</option>
                                    <option value="category">Category Page</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
                                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono h-64" placeholder="<p>Page content here...</p>" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Head Code</label>
                                <textarea value={form.customCode.headCode} onChange={e => setForm(f => ({ ...f, customCode: { ...f.customCode, headCode: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono h-24" placeholder="<!-- Custom head scripts -->" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Body Code</label>
                                <textarea value={form.customCode.bodyCode} onChange={e => setForm(f => ({ ...f, customCode: { ...f.customCode, bodyCode: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono h-24" placeholder="<!-- Custom body scripts -->" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">H1 Heading</label>
                                <input value={form.seo.h1} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, h1: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title <span className="text-gray-400 text-xs">(50–60 chars ideal)</span></label>
                                <input value={form.seo.metaTitle} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                                <p className="text-xs text-gray-400 mt-1">{form.seo.metaTitle.length}/60 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description <span className="text-gray-400 text-xs">(150–160 chars ideal)</span></label>
                                <textarea value={form.seo.metaDescription} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20" />
                                <p className="text-xs text-gray-400 mt-1">{form.seo.metaDescription.length}/160 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                <input value={form.seo.canonical} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, canonical: e.target.value } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
                                <input value={form.seo.keywords.join(", ")} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) } }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" /> Dashboard
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Pages</h1>
                </div>
                <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    <Plus className="h-4 w-4" /> New Page
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : pages.length === 0 ? (
                    <div className="text-center py-16">
                        <FileText className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No pages yet.</p>
                        <button onClick={handleNew} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                            Create Your First Page
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {pages.map(page => (
                            <div key={page.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">{page.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{page.type}</span>
                                        <span>/{page.slug}</span>
                                        <span>{new Date(page.createdAt).toLocaleDateString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${page.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {page.published ? "Published" : "Draft"}
                                    </span>
                                    <button onClick={() => handleTogglePublish(page)} title={page.published ? "Unpublish" : "Publish"}
                                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                                        {page.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                    <button onClick={() => handleEdit(page)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(page.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
