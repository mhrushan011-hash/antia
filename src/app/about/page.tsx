import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Antia — India's Air Purifier Rental & Sales Service",
    description: "Antia is on a mission to make clean air accessible to every Indian home. Learn about our story, values, and why 10,000+ families trust us.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About Antia</h1>
                <p className="text-lg text-gray-600 mb-6">
                    At Antia, we believe that breathing clean air is a fundamental right, not a luxury. Founded in 2024, we set out on a mission to make high-quality air purification accessible to every Indian household and office.
                </p>
                <p className="text-gray-600 mb-6">
                    India is home to some of the most polluted cities on Earth. We started Antia because we saw families struggling with the cost and complexity of buying and maintaining air purifiers — and we knew there was a better way.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                    To combat the rising pollution levels in our cities by providing affordable, effective, and flexible air purification solutions. Whether you want to buy, rent, or build your own, we have a solution for you.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Antia?</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    <li><strong>Flexibility:</strong> Rent for a month or buy for a lifetime — no lock-in.</li>
                    <li><strong>Quality:</strong> We only stock top-rated global brands and high-performance DIY kits.</li>
                    <li><strong>Service:</strong> Free filter replacements and maintenance for all rental units.</li>
                    <li><strong>Transparency:</strong> No hidden costs, just clean air.</li>
                    <li><strong>Pan-India Delivery:</strong> Serving Delhi, Mumbai, Bangalore, Hyderabad, Pune, and growing.</li>
                </ul>

                <div className="grid grid-cols-3 gap-6 mt-10 p-8 bg-blue-50 rounded-2xl text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-600">10,000+</div>
                        <div className="text-sm text-gray-600 mt-1">Homes Served</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600">50+</div>
                        <div className="text-sm text-gray-600 mt-1">Cities Covered</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-600">99.97%</div>
                        <div className="text-sm text-gray-600 mt-1">Particle Capture Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
