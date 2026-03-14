"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, ArrowLeft } from "lucide-react";

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    altText: string;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    featured: boolean;
    readTime: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
        h1: string;
        canonical: string;
        keywords: string[];
    };
    createdAt: string;
    updatedAt: string;
}

const EMPTY_BLOG: Omit<Blog, "id" | "createdAt" | "updatedAt"> = {
    title: "", slug: "", excerpt: "", content: "", image: "", altText: "",
    author: "Antia Team", category: "Guides", tags: [], published: false, featured: false, readTime: "5 min read",
    seo: { metaTitle: "", metaDescription: "", h1: "", canonical: "", keywords: [] },
};

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Blog | null>(null);
    const [form, setForm] = useState(EMPTY_BLOG);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await fetch("/api/blogs?admin=1");
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
    };

    const handleEdit = (blog: Blog) => {
        setEditing(blog);
        setForm({ ...blog });
        setActiveTab("content");
    };

    const handleNew = () => {
        setEditing({ id: "new" } as Blog);
        setForm({ ...EMPTY_BLOG });
        setActiveTab("content");
    };

    const handleSlugGenerate = () => {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        setForm(f => ({ ...f, slug, seo: { ...f.seo, h1: f.title, metaTitle: f.title + " | Antia", canonical: `https://antia-india.vercel.app/blogs/${slug}` } }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const isNew = editing?.id === "new";
            const res = await fetch("/api/blogs", {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(isNew ? form : { id: editing!.id, ...form }),
            });
            if (res.ok) {
                await fetchBlogs();
                setEditing(null);
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this blog post?")) return;
        await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
        fetchBlogs();
    };

    const handleTogglePublish = async (blog: Blog) => {
        await fetch("/api/blogs", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: blog.id, published: !blog.published }),
        });
        fetchBlogs();
    };

    if (editing) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5" /> Back to Blogs
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">{editing.id === "new" ? "New Blog Post" : "Edit Blog Post"}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="h-4 w-4" />
                            Published
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="h-4 w-4" />
                            Featured
                        </label>
                        <button onClick={handleSave} disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                            {saving ? "Saving..." : "Save Post"}
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-8">
                    {/* Tabs */}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Blog post title" />
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
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                        {["Guides", "Buying Guides", "News", "DIY", "Health"].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                                    <input value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="5 min read" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm h-20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text</label>
                                <input value={form.altText} onChange={e => setForm(f => ({ ...f, altText: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                <input value={form.tags.join(", ")} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="HEPA, Air Quality, India" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
                                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono h-80" placeholder="<p>Your article content here...</p>" />
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
                    <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
                </div>
                <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    <Plus className="h-4 w-4" /> New Post
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 mb-4">No blog posts yet.</p>
                        <button onClick={handleNew} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                            Write Your First Post
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {blogs.map(blog => (
                            <div key={blog.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
                                <div className="h-16 w-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    {blog.image && <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">{blog.title}</h3>
                                        {blog.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{blog.category}</span>
                                        <span>{blog.readTime}</span>
                                        <span>{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${blog.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {blog.published ? "Published" : "Draft"}
                                    </span>
                                    <button onClick={() => handleTogglePublish(blog)} title={blog.published ? "Unpublish" : "Publish"}
                                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                                        {blog.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                    <button onClick={() => handleEdit(blog)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
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
