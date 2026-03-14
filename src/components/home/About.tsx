import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function About() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <img
                            src="https://placehold.co/600x400/e0f2fe/1e40af?text=Our+Mission"
                            alt="About PureAir"
                            className="rounded-2xl shadow-lg w-full object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Combating India's Air Pollution</h2>
                        <p className="text-lg text-gray-600">
                            At PureAir, we believe that breathing clean air is a fundamental right, not a luxury.
                            Founded in 2024, we are on a mission to make high-quality air purification accessible to every Indian household.
                        </p>

                        <div className="grid grid-cols-3 gap-4 border-y border-gray-100 py-6 my-6">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-blue-600">10,000+</span>
                                <span className="text-sm text-gray-500">Happy Homes</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-blue-600">50+</span>
                                <span className="text-sm text-gray-500">Cities Served</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-blue-600">1M+</span>
                                <span className="text-sm text-gray-500">Hours of Clean Air</span>
                            </div>
                        </div>

                        <p className="text-gray-600">
                            Whether you want to buy a top-of-the-line purifier or rent one for the winter months,
                            we have flexible plans tailored for you. We partner with global leaders like Philips, Dyson, and Coway to bring you the best technology.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                        >
                            Read our full story <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
