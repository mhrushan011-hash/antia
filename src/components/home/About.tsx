import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function About() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <img
                            src="https://image.pollinations.ai/prompt/happy%20Indian%20family%20modern%20apartment%20air%20purifier%20visible%20parents%20child%20breathing%20clean%20air%20Delhi%20lifestyle%20photography%20warm%20lighting?width=600&height=400&seed=200&nologo=true"
                            alt="About Antia"
                            className="rounded-2xl shadow-lg w-full object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Combating India's Air Pollution</h2>
                        <p className="text-lg text-gray-600">
                            At Antia, we believe that breathing clean air is a fundamental right, not a luxury.
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
