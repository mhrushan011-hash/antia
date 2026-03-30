import Link from "next/link";
import {
    LayoutDashboard, Package, FileText, Menu as MenuIcon,
    Image, Settings, Code, ArrowLeftRight, LogOut, Home,
    BookOpen, ShoppingBag, Users
} from "lucide-react";
import { db } from "@/lib/db";
import AdminLogoutButton from "./LogoutButton";

export default function AdminDashboard() {
    const products = db.products.getAll();
    const blogs = db.blogs.getAll();
    const orders = db.orders.getAll();
    const customers = db.customers.getAll();
    const media = db.media.getAll();
    const redirects = db.redirects.getAll().filter(r => r.active);

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
        { icon: Package, label: "Products", href: "/admin/products" },
        { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
        { icon: Users, label: "Customers", href: "/admin/customers" },
        { icon: BookOpen, label: "Blogs", href: "/admin/blogs" },
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
                    <h1 className="text-2xl font-bold text-gray-900">Antia CMS</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Home className="h-4 w-4" /> View Site
                        </Link>
                        <AdminLogoutButton />
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                            {[
                                { label: "Products", value: products.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/products" },
                                { label: "Blog Posts", value: blogs.length, icon: BookOpen, color: "text-green-600", bg: "bg-green-50", href: "/admin/blogs" },
                                { label: "Orders", value: orders.length, icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50", href: "/admin/orders" },
                                { label: "Customers", value: customers.length, icon: Users, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/customers" },
                                { label: "Media Files", value: media.length, icon: Image, color: "text-pink-600", bg: "bg-pink-50", href: "/admin/media" },
                                { label: "Redirects", value: redirects.length, icon: ArrowLeftRight, color: "text-yellow-600", bg: "bg-yellow-50", href: "/admin/redirects" },
                            ].map(stat => (
                                <Link key={stat.label} href={stat.href}
                                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                                </Link>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[
                                    { href: "/admin/products", icon: Package, label: "Add Product", desc: "Create a new product listing", color: "blue" },
                                    { href: "/admin/blogs", icon: BookOpen, label: "Write Blog Post", desc: "Publish new content", color: "green" },
                                    { href: "/admin/settings", icon: Settings, label: "Site Settings", desc: "Update SEO, branding, logo", color: "purple" },
                                    { href: "/admin/orders", icon: ShoppingBag, label: "Manage Orders", desc: "View and update orders", color: "orange" },
                                    { href: "/admin/media", icon: Image, label: "Upload Media", desc: "Add images to library", color: "pink" },
                                ].map(action => (
                                    <Link key={action.href} href={action.href}
                                        className={`flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-${action.color}-400 hover:bg-${action.color}-50 transition-all`}>
                                        <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{action.label}</h4>
                                            <p className="text-xs text-gray-500">{action.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
