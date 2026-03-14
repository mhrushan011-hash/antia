import { Phone, MessageCircle, Mail } from "lucide-react";

export function Contact() {
    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Need Help Choosing the Right Purifier?</h2>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                    Our air quality experts are here to help you understand your needs based on your room size and city's pollution levels.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="tel:+919876543210"
                        className="flex items-center gap-3 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                    >
                        <Phone className="h-5 w-5" />
                        Call +91 98765 43210
                    </a>
                    <a
                        href="https://wa.me/919876543210"
                        className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                    </a>
                </div>

                <p className="mt-8 text-sm text-blue-200">
                    Available Mon-Sat, 9 AM - 8 PM
                </p>
            </div>
        </section>
    );
}
