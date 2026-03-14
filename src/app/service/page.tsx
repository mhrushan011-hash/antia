import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Clock, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Service Request | Antia",
    description: "Request a service visit for filter replacement, maintenance, or repair of your Antia air purifier.",
};

export default function ServicePage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Service Request</h1>
                <p className="text-lg text-gray-600">
                    Need a filter replacement, maintenance visit, or have a technical issue? We&apos;re here to help.
                </p>
            </div>

            {/* Service Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[
                    { icon: <Wrench className="h-6 w-6 text-blue-600" />, title: "Filter Replacement", desc: "Schedule a free filter swap (rental customers)" },
                    { icon: <Clock className="h-6 w-6 text-blue-600" />, title: "Routine Maintenance", desc: "Annual deep-clean and performance check" },
                    { icon: <Phone className="h-6 w-6 text-blue-600" />, title: "Technical Issue", desc: "Repair or replacement for faulty units" },
                ].map((s) => (
                    <div key={s.title} className="p-5 border border-gray-200 rounded-xl text-center space-y-2">
                        <div className="flex justify-center">{s.icon}</div>
                        <div className="font-semibold text-gray-900">{s.title}</div>
                        <div className="text-sm text-gray-500">{s.desc}</div>
                    </div>
                ))}
            </div>

            {/* What to expect */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h2>
                <ul className="space-y-3">
                    {[
                        "Submit your service request via WhatsApp or the contact form below",
                        "Our team will confirm your appointment within 4 hours (Mon–Sat)",
                        "A certified technician visits your location at the scheduled time",
                        "Service is completed same-visit for most issues",
                    ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* SLA */}
            <div className="border border-blue-100 bg-blue-50 rounded-2xl p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Service Timelines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-900">Filter Replacement:</span> <span className="text-gray-600">Scheduled 48–72 hours</span></div>
                    <div><span className="font-semibold text-gray-900">Technical Fault (Rental):</span> <span className="text-gray-600">Replacement within 48 hours</span></div>
                    <div><span className="font-semibold text-gray-900">Routine Maintenance:</span> <span className="text-gray-600">Scheduled at your convenience</span></div>
                    <div><span className="font-semibold text-gray-900">Emergency:</span> <span className="text-gray-600">Same-day (subject to availability)</span></div>
                </div>
            </div>

            <div className="text-center space-y-3">
                <p className="text-gray-700 font-medium">To raise a service request, contact us via:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                        className="bg-green-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-green-600 transition-colors">
                        WhatsApp Us
                    </a>
                    <Link href="/contact" className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors">
                        Contact Form
                    </Link>
                </div>
            </div>
        </div>
    );
}
