
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
    {
        question: "How do I choose the right air purifier size?",
        answer: "The size depends on your room's square footage. Measure your room (length x width) and choose a purifier with a coverage area slightly larger than your room size for optimal performance. Our filters let you select by 'Personal Space' or specific square footage ranges."
    },
    {
        question: "How often should I change the filters?",
        answer: "Typically, HEPA filters need replacement every 12-18 months, while carbon filters might need changing every 6 months depending on usage and air quality. Many of our models come with a filter change indicator to take the guesswork out."
    },
    {
        question: "Does renting make more sense than buying?",
        answer: "Renting is great if you move frequently, want to try before you buy, or want to avoid maintenance costs (rentals include free filter changes). Buying is better for long-term ownership and stability."
    },
    {
        question: "Do air purifiers help with allergies?",
        answer: "Yes! High-quality HEPA filters capture 99.97% of airborne particles, including pollen, dust mites, pet dander, and mold spores, which are common allergy triggers."
    },
    {
        question: "What is the 'Smart Mode' feature?",
        answer: "Smart Mode uses built-in sensors to monitor air quality in real-time and automatically adjusts the fan speed to clear pollutants efficiently, saving energy when the air is clean."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="mt-2 text-gray-600">Common questions about air purification answered.</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                ) : (
                                    <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
