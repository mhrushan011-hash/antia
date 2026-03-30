"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2, Copy, X, Image as ImageIcon, Check } from "lucide-react";

interface MediaFile {
    id: string;
    filename: string;
    originalName: string;
    url: string;
    alt: string;
    size: number;
    type: string;
    uploadedAt: string;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function AdminMediaPage() {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<MediaFile | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadPreview, setUploadPreview] = useState<{ file: File; preview: string; alt: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetchMedia(); }, []);

    const fetchMedia = async () => {
        const res = await fetch("/api/media");
        const data = await res.json();
        setMedia(data);
        setLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setUploadPreview({ file, preview, alt: "" });
    };

    const handleUpload = async () => {
        if (!uploadPreview) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", uploadPreview.file);
            formData.append("alt", uploadPreview.alt);
            const res = await fetch("/api/media", { method: "POST", body: formData });
            if (res.ok) {
                await fetchMedia();
                URL.revokeObjectURL(uploadPreview.preview);
                setUploadPreview(null);
            }
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this file?")) return;
        await fetch(`/api/media?id=${id}`, { method: "DELETE" });
        if (selected?.id === id) setSelected(null);
        fetchMedia();
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" /> Dashboard
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Media Library</h1>
                </div>
                <button onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    <Upload className="h-4 w-4" /> Upload
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </div>

            <div className="max-w-6xl mx-auto p-8">
                {/* Upload Preview */}
                {uploadPreview && (
                    <div className="bg-white rounded-xl border border-blue-200 p-6 mb-6">
                        <div className="flex items-start gap-6">
                            <div className="h-32 w-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={uploadPreview.preview} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="text-sm font-medium text-gray-900">{uploadPreview.file.name}</p>
                                <p className="text-xs text-gray-500">{formatSize(uploadPreview.file.size)} &middot; {uploadPreview.file.type}</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                                    <input value={uploadPreview.alt} onChange={e => setUploadPreview(p => p ? { ...p, alt: e.target.value } : null)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe this image..." />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleUpload} disabled={uploading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60">
                                        {uploading ? "Uploading..." : "Upload"}
                                    </button>
                                    <button onClick={() => { URL.revokeObjectURL(uploadPreview.preview); setUploadPreview(null); }}
                                        className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : media.length === 0 ? (
                    <div className="text-center py-16">
                        <ImageIcon className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No media files yet.</p>
                        <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                            Upload Your First Image
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-6">
                        {/* Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {media.map(file => (
                                    <div key={file.id}
                                        onClick={() => setSelected(file)}
                                        className={`group bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${selected?.id === file.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-100 hover:border-gray-300"}`}>
                                        <div className="aspect-square bg-gray-100 relative">
                                            <img src={file.url} alt={file.alt || file.originalName} className="h-full w-full object-cover" />
                                            <button onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                                                className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 text-gray-500 hover:text-red-600">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-gray-900 truncate">{file.originalName}</p>
                                            <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detail Panel */}
                        {selected && (
                            <div className="w-72 flex-shrink-0">
                                <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-900 text-sm">Details</h3>
                                        <button onClick={() => setSelected(null)} className="p-1 text-gray-400 hover:text-gray-600">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                        <img src={selected.url} alt={selected.alt || selected.originalName} className="h-full w-full object-contain" />
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <p className="text-gray-500 text-xs mb-0.5">Filename</p>
                                            <p className="font-medium text-gray-900 break-all">{selected.originalName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-0.5">Size</p>
                                            <p className="text-gray-900">{formatSize(selected.size)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-0.5">Uploaded</p>
                                            <p className="text-gray-900">{new Date(selected.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-0.5">Alt Text</p>
                                            <p className="text-gray-900">{selected.alt || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">URL</p>
                                            <div className="flex gap-2">
                                                <input readOnly value={selected.url} className="flex-1 px-2 py-1.5 border rounded text-xs bg-gray-50 text-gray-600" />
                                                <button onClick={() => handleCopyUrl(selected.url)}
                                                    className="p-1.5 border rounded hover:bg-gray-50 text-gray-500 hover:text-gray-700">
                                                    {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(selected.id)}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
