"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const { shopMode } = useShop();
    const { itemCount } = useCart();
    const { customer } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600">Antia</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">

                    {/* Shop */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
                            Shop <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="absolute top-full left-0 w-56 bg-white border rounded-lg shadow-lg py-2 transition-all duration-200 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                            <Link href="/air-purifiers/buy" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Air Purifier</Link>
                            <Link href="/air-purifiers/buy/car" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Car Air Purifier</Link>
                            <Link href="/air-purifiers/rent" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Rent Air Purifier</Link>
                            <div className="border-t my-1"></div>
                            <Link href="/filters" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Filters</Link>
                            <Link href="/protection" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Protection</Link>
                        </div>
                    </div>

                    {/* For Business */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
                            For Business <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="absolute top-full left-0 w-64 bg-white border rounded-lg shadow-lg py-2 transition-all duration-200 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                            <Link href="/business/clean-air-facility" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Clean Air Facility</Link>
                            <Link href="/business/commercial" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Commercial Purification</Link>
                            <div className="border-t my-1"></div>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Industries</div>
                            <Link href="/business/schools" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Schools</Link>
                            <Link href="/business/hospitals" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Hospitals & Clinics</Link>
                            <Link href="/business/dental" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Dental Offices</Link>
                            <Link href="/business/laboratories" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Laboratories</Link>
                            <Link href="/business/museums" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Museums</Link>
                            <div className="border-t my-1"></div>
                            <Link href="/business/esg" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">ESG</Link>
                        </div>
                    </div>

                    <Link href="/news" className="hover:text-blue-600 transition-colors">
                        News
                    </Link>

                    <Link href="/about" className="hover:text-blue-600 transition-colors">
                        Our Mission
                    </Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Icons */}
                    {customer ? (
                        <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                            <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                                {customer.name[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-blue-700 hidden sm:block max-w-[80px] truncate">{customer.name.split(" ")[0]}</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <User className="h-5 w-5 text-gray-700" />
                        </Link>
                    )}
                    <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                                {itemCount > 99 ? "99+" : itemCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t bg-white p-4 absolute w-full shadow-lg h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="flex flex-col gap-4 text-base font-medium text-gray-700">
                        <div className="space-y-2">
                            <div className="font-bold text-gray-900 border-b pb-1">Shop</div>
                            <Link href="/air-purifiers/buy" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Air Purifier</Link>
                            <Link href="/air-purifiers/buy/car" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Car Air Purifier</Link>
                            <Link href="/air-purifiers/rent" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Rent Air Purifier</Link>
                            <Link href="/filters" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Filters</Link>
                            <Link href="/protection" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Protection</Link>
                        </div>

                        <div className="space-y-2">
                            <div className="font-bold text-gray-900 border-b pb-1">For Business</div>
                            <Link href="/business/clean-air-facility" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Clean Air Facility</Link>
                            <Link href="/business/commercial" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Commercial Purification</Link>
                            <div className="font-semibold text-gray-500 pl-4 pt-2 text-sm uppercase tracking-wider">Industries</div>
                            <Link href="/business/schools" className="block pl-8 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Schools</Link>
                            <Link href="/business/hospitals" className="block pl-8 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Hospitals & Clinics</Link>
                            <Link href="/business/dental" className="block pl-8 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Dental Offices</Link>
                            <Link href="/business/laboratories" className="block pl-8 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Laboratories</Link>
                            <Link href="/business/museums" className="block pl-8 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Museums</Link>
                            <Link href="/business/esg" className="block pl-4 py-1 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>ESG</Link>
                        </div>

                        <Link href="/news" className="block py-2 border-b hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>News</Link>
                        <Link href="/about" className="block py-2 border-b hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Our Mission</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
