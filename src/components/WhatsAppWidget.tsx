"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const PHONE = "919876543210"; // Replace with real number

export function WhatsAppWidget() {
    const [open, setOpen] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const { items } = useCart();

    if (dismissed) return null;

    const cartMessage = items.length > 0
        ? `Hi, I have ${items.length} item${items.length > 1 ? "s" : ""} in my cart (${items.map(i => i.product.name).join(", ")}) and need help completing my order.`
        : "Hi, I'm looking for an air purifier. Can you help me choose the right one?";

    const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(cartMessage)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Tooltip popup */}
            {open && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-9 bg-green-500 rounded-full flex items-center justify-center">
                                <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Antia Support</p>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full inline-block" />
                                    Online now
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm text-gray-700">
                        {items.length > 0
                            ? `You have ${items.length} item${items.length > 1 ? "s" : ""} in your cart. Need help completing your purchase?`
                            : "Hi! 👋 Need help choosing the right air purifier for your home or office?"}
                    </div>

                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                        className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold text-sm transition-colors">
                        Chat on WhatsApp
                    </a>

                    <button onClick={() => setDismissed(true)}
                        className="mt-2 w-full text-xs text-gray-400 hover:text-gray-500 text-center py-1">
                        No thanks
                    </button>
                </div>
            )}

            {/* Main button */}
            <button
                onClick={() => setOpen(!open)}
                className="h-14 w-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center relative"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="h-7 w-7" />
                {items.length > 0 && !open && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </button>
        </div>
    );
}
