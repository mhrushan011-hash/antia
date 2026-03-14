import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "Help Center | Antia",
    description: "Find answers to common questions about renting, buying, delivery, installation, and maintenance of your Antia air purifier.",
};

const FAQS = [
    {
        category: "Renting",
        questions: [
            { q: "How does the rental plan work?", a: "Choose a purifier, pick a monthly plan (minimum 3 months), and we deliver and install for free. Cancel anytime after the minimum period with 30 days notice." },
            { q: "Are filter replacements included in the rental?", a: "Yes. All HEPA and carbon filter replacements are included at no extra cost. We schedule them proactively every 6–12 months." },
            { q: "Can I upgrade my purifier mid-rental?", a: "Yes. You can upgrade to a higher model anytime. Your billing adjusts to the new plan from the next billing cycle." },
            { q: "What happens if the purifier breaks down?", a: "We cover all repairs. If a rental unit has a hardware fault, we replace it within 48 hours at no cost." },
        ]
    },
    {
        category: "Buying",
        questions: [
            { q: "How long does delivery take?", a: "We deliver within 2–5 business days across most metro cities. Same-day delivery is available in Delhi, Mumbai, and Bangalore for orders placed before 12 PM." },
            { q: "Do you provide installation?", a: "Yes. Free installation is included for all purchases. Our technician will set up the unit and explain the controls." },
            { q: "What warranty do products carry?", a: "All products carry the manufacturer warranty (typically 1 year). Antia additionally provides a 30-day satisfaction guarantee — if you're not happy, we'll arrange a return." },
        ]
    },
    {
        category: "Payments & Billing",
        questions: [
            { q: "What payment methods do you accept?", a: "We accept UPI, all major credit/debit cards, net banking, and EMI options via Razorpay." },
            { q: "When am I billed for rentals?", a: "Rental billing is monthly from your start date. You'll receive an invoice via email before each billing cycle." },
        ]
    },
];

export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
                <p className="text-lg text-gray-600">Find quick answers below, or reach our support team directly.</p>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-5 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group">
                    <MessageCircle className="h-8 w-8 text-green-500 shrink-0" />
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-green-600">WhatsApp Chat</div>
                        <div className="text-sm text-gray-500">Fastest response</div>
                    </div>
                </a>
                <Link href="/contact"
                    className="flex items-center gap-3 p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                    <Mail className="h-8 w-8 text-blue-500 shrink-0" />
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600">Email Support</div>
                        <div className="text-sm text-gray-500">Reply within 24 hours</div>
                    </div>
                </Link>
                <a href="tel:+919999999999"
                    className="flex items-center gap-3 p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                    <Phone className="h-8 w-8 text-blue-500 shrink-0" />
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600">Call Us</div>
                        <div className="text-sm text-gray-500">Mon–Sat, 9 AM–7 PM</div>
                    </div>
                </a>
            </div>

            {/* FAQs */}
            <div className="space-y-10">
                {FAQS.map((section) => (
                    <div key={section.category}>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{section.category}</h2>
                        <div className="space-y-4">
                            {section.questions.map((item) => (
                                <details key={item.q} className="group border border-gray-200 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none">
                                        {item.q}
                                        <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-2xl text-center">
                <p className="text-gray-700 font-medium mb-2">Still need help?</p>
                <Link href="/contact" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors">
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
