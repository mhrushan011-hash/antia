import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand & About */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Antia</h3>
                        <p className="text-sm text-gray-400">
                            Combating India's air pollution one home at a time. Breathe pure, live healthy.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/air-purifiers/buy" className="hover:text-white transition-colors">Start Buying</Link></li>
                            <li><Link href="/air-purifiers/rent" className="hover:text-white transition-colors">Start Renting</Link></li>
                            <li><Link href="/filters" className="hover:text-white transition-colors">Replacement Filters</Link></li>
                            <li><Link href="/protection" className="hover:text-white transition-colors">Protection</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/service" className="hover:text-white transition-colors">Service Request</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                            <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                            <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                            <li><Link href="/business/clean-air-facility" className="hover:text-white transition-colors">For Business</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Antia India. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
