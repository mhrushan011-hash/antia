"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send message");
            setSuccess(true);
            setForm({ name: "", email: "", message: "" });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h1>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
                Have questions about which purifier is right for you? Need support? We&apos;re here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Phone</h3>
                            <p className="text-gray-600">+91 98765 43210</p>
                            <p className="text-sm text-gray-500">Mon–Sat, 9am – 7pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Email</h3>
                            <p className="text-gray-600">support@antia.in</p>
                            <p className="text-sm text-gray-500">We reply within 24 hours</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Office</h3>
                            <p className="text-gray-600">Green Park, New Delhi</p>
                            <p className="text-gray-600">India 110016</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-6 text-sm text-blue-600 hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required
                                    value={form.message}
                                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                                    placeholder="How can we help?"
                                />
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
