import React from "react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About PureAir</h1>
                <p className="text-lg text-gray-600 mb-6">
                    At PureAir, we believe that breathing clean air is a fundamental right, not a luxury. Founded in 2024, we set out on a mission to make high-quality air purification accessible to every Indian household and office.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                    To combat the rising pollution levels in our cities by providing affordable, effective, and flexible air purification solutions. Whether you want to buy, rent, or build your own, we have a solution for you.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    <li><strong>Flexibility:</strong> Rent for a month or buy for a lifetime.</li>
                    <li><strong>Quality:</strong> We only stock top-rated global brands and high-performance DIY kits.</li>
                    <li><strong>Service:</strong> Free maintenance and filter checks for all rental units.</li>
                    <li><strong>Transparency:</strong> No hidden costs, just clean air.</li>
                </ul>
            </div>
        </div>
    );
}
