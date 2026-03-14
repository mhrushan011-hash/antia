"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, Save, X, Plus, Trash2 } from "lucide-react";

interface Product {
    id?: string;
    name: string;
    slug: string;
    category: 'home' | 'office';
    buyPrice: number | null;
    rentPrice: number | null;
    buyAvailable: boolean;
    rentAvailable: boolean;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    images: string[];
    altTexts: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        h1: string;
        canonical: string;
        keywords: string[];
    };
}

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleNew = () => {
        setEditingProduct({
            name: '',
            slug: '',
            category: 'home',
            buyPrice: null,
            rentPrice: null,
            buyAvailable: true,
            rentAvailable: true,
            description: '',
            features: [''],
            specifications: {},
            images: [''],
            altTexts: [''],
            seo: {
                metaTitle: '',
                metaDescription: '',
                h1: '',
                canonical: '',
                keywords: [],
            },
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!editingProduct) return;

        try {
            const method = editingProduct.id ? 'PUT' : 'POST';
            await fetch('/api/products', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProduct),
            });

            setIsEditing(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (isEditing && editingProduct) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingProduct.id ? 'Edit Product' : 'New Product'}
                            </h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            setEditingProduct({
                                                ...editingProduct,
                                                name,
                                                slug: name.toLowerCase().replace(/\s+/g, '-'),
                                            });
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL Slug *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.slug}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={editingProduct.category}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as 'home' | 'office' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="home">Home</option>
                                    <option value="office">Office</option>
                                </select>
                            </div>

                            {/* Pricing */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Availability</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editingProduct.buyAvailable}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, buyAvailable: e.target.checked })}
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label className="text-sm font-medium text-gray-700">Available for Purchase</label>
                                        </div>
                                        {editingProduct.buyAvailable && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Buy Price (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editingProduct.buyPrice || ''}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, buyPrice: Number(e.target.value) })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editingProduct.rentAvailable}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, rentAvailable: e.target.checked })}
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <label className="text-sm font-medium text-gray-700">Available for Rent</label>
                                        </div>
                                        {editingProduct.rentAvailable && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Rent Price (₹/month)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={editingProduct.rentPrice || ''}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, rentPrice: Number(e.target.value) })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* SEO Section */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.seo.metaTitle}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                seo: { ...editingProduct.seo, metaTitle: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={editingProduct.seo.metaDescription}
                                            onChange={(e) => setEditingProduct({
                                                ...editingProduct,
                                                seo: { ...editingProduct.seo, metaDescription: e.target.value }
                                            })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                H1 Tag
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProduct.seo.h1}
                                                onChange={(e) => setEditingProduct({
                                                    ...editingProduct,
                                                    seo: { ...editingProduct.seo, h1: e.target.value }
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Canonical URL
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProduct.seo.canonical}
                                                onChange={(e) => setEditingProduct({
                                                    ...editingProduct,
                                                    seo: { ...editingProduct.seo, canonical: e.target.value }
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-6 border-t">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Product
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first product.</p>
                        <button
                            onClick={handleNew}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Buy Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rent Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">/{product.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {product.buyAvailable ? `₹${product.buyPrice}` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {product.rentAvailable ? `₹${product.rentPrice}/mo` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id!)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
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
