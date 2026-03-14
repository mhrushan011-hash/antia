"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Wind, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await register(form.name, form.email, form.phone, form.password);
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            router.push("/profile");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Wind className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">Antia</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 mt-4">Create your account</h1>
                    <p className="text-gray-500 mt-1">Start breathing cleaner air today</p>
                </div>

                {/* Benefits */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-2">
                    {["Track orders & rentals in one place", "Faster checkout on future orders", "Exclusive member offers & discounts"].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-blue-800">
                            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                            {b}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" required value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Rahul Sharma"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" required value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="you@email.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="tel" required value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                placeholder="+91 98765 43210"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input type={showPass ? "text" : "password"} required minLength={6}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Min. 6 characters"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-60">
                            {loading ? "Creating account…" : "Create Account"}
                        </button>

                        <p className="text-xs text-center text-gray-400">
                            By creating an account you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
