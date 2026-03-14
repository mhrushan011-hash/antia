import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Return Policy | Antia",
    description: "Antia's return and cancellation policy for air purifier purchases and rentals. 30-day satisfaction guarantee on all purchases.",
};

export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Return Policy</h1>
                <p className="text-lg text-gray-600">We stand behind everything we sell. Here&apos;s what our policy covers.</p>
            </div>

            {/* Purchases */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchases — 30-Day Satisfaction Guarantee</h2>
                <p className="text-gray-600 mb-4">
                    If you&apos;re not completely satisfied with your purchase within 30 days, we&apos;ll arrange a free pickup and full refund. No questions asked.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 border border-gray-200 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Eligible for Return</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Returned within 30 days of delivery</li>
                            <li>• Unit in original condition with all accessories</li>
                            <li>• Original packaging (recommended but not required)</li>
                            <li>• Proof of purchase available</li>
                        </ul>
                    </div>
                    <div className="p-5 border border-gray-200 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><XCircle className="h-5 w-5 text-red-400" /> Not Eligible</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• Returns requested after 30 days</li>
                            <li>• Units with physical damage caused by misuse</li>
                            <li>• Used filters or consumables</li>
                            <li>• Commercial/bulk orders (contact us for custom policy)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Rentals */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rentals — Cancellation Policy</h2>
                <div className="space-y-4 text-gray-600">
                    <p>Rental plans have a minimum commitment period (typically 3 months). After the minimum period, you may cancel with <strong>30 days written notice</strong>.</p>
                    <ul className="space-y-2 text-sm list-disc list-inside">
                        <li>Early cancellation within the minimum period incurs a fee equivalent to remaining months in the minimum term.</li>
                        <li>We arrange free pickup of the unit upon cancellation.</li>
                        <li>Any security deposit paid is refunded within 7 business days after unit inspection.</li>
                    </ul>
                </div>
            </section>

            {/* Refund timeline */}
            <section className="mb-10 bg-blue-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Refund Timeline</h2>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between"><span>UPI / Bank Transfer</span><span className="font-medium">3–5 business days</span></div>
                    <div className="flex justify-between border-t border-blue-100 pt-2"><span>Credit / Debit Card</span><span className="font-medium">5–7 business days</span></div>
                    <div className="flex justify-between border-t border-blue-100 pt-2"><span>Net Banking</span><span className="font-medium">5–7 business days</span></div>
                    <div className="flex justify-between border-t border-blue-100 pt-2"><span>Rental Security Deposit</span><span className="font-medium">7 business days after pickup</span></div>
                </div>
            </section>

            {/* How to initiate */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-3">How to Initiate a Return</h2>
                <ol className="space-y-3 text-gray-600 text-sm list-decimal list-inside">
                    <li>Contact us via WhatsApp or the contact form with your order number.</li>
                    <li>Our team confirms the return and schedules a pickup at your convenience.</li>
                    <li>Once the unit is collected and inspected (typically same day), your refund is processed.</li>
                </ol>
            </section>

            <div className="text-center">
                <Link href="/contact" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors">
                    Start a Return
                </Link>
            </div>
        </div>
    );
}
