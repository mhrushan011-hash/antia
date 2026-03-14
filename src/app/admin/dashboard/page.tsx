"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    FileText,
    Menu as MenuIcon,
    Image,
    Settings,
    Code,
    ArrowLeftRight,
    LogOut,
    Home
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
        { icon: Package, label: "Products", href: "/admin/products" },
        { icon: FileText, label: "Pages", href: "/admin/pages" },
        { icon: MenuIcon, label: "Menu", href: "/admin/menu" },
        { icon: Image, label: "Media", href: "/admin/media" },
        { icon: ArrowLeftRight, label: "Redirects", href: "/admin/redirects" },
        { icon: Code, label: "Code Injection", href: "/admin/code-injection" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <div className="bg-white border-b">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">PureAir CMS</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            View Site
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-600 text-sm font-medium">Total Products</h3>
                                    <Package className="h-5 w-5 text-blue-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-600 text-sm font-medium">Total Pages</h3>
                                    <FileText className="h-5 w-5 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-600 text-sm font-medium">Media Files</h3>
                                    <Image className="h-5 w-5 text-purple-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-600 text-sm font-medium">Active Redirects</h3>
                                    <ArrowLeftRight className="h-5 w-5 text-orange-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">0</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link
                                    href="/admin/products"
                                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                                >
                                    <Package className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Add Product</h4>
                                        <p className="text-sm text-gray-600">Create a new air purifier listing</p>
                                    </div>
                                </Link>

                                <Link
                                    href="/admin/pages"
                                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                                >
                                    <FileText className="h-6 w-6 text-green-600" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Add Page</h4>
                                        <p className="text-sm text-gray-600">Create a new category or static page</p>
                                    </div>
                                </Link>

                                <Link
                                    href="/admin/media"
                                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                                >
                                    <Image className="h-6 w-6 text-purple-600" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Upload Media</h4>
                                        <p className="text-sm text-gray-600">Add images and files to library</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
