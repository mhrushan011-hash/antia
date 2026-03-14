
"use client";

import { Mail } from "lucide-react";

export function Newsletter() {
    return (
        <section className="py-16 bg-blue-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -top-10 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-white">Breath Clean, Live Healthy</h2>
                    <p className="text-blue-100 text-lg">
                        Join 10,000+ subscribers. Get exclusive air quality tips, health advice, and early access to our sales.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-grow">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-white/50 bg-white text-gray-900 placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-blue-200">
                        No spam. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
