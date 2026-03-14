import { ShieldCheck, Truck, RefreshCw, Clock, ThumbsUp, Wallet } from "lucide-react";

export function Features() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Why Choose Us */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Us: Purify & Monitor</h2>
                        <p className="mt-2 text-gray-600">We don't just clean the air; we empower you with real-time data and complete control.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-blue-50 rounded-xl text-center">
                            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <Wallet className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Zero Maintenance Cost</h3>
                            <p className="text-gray-600">For rental plans, we cover all filter replacements and repairs. No hidden charges.</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-xl text-center">
                            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Truck className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Free Relocation</h3>
                            <p className="text-gray-600">Moving to a new house? We'll move your purifier for free within our service areas.</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-xl text-center">
                            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <RefreshCw className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Upgrades</h3>
                            <p className="text-gray-600">Upgrade to a newer model anytime after your lock-in period ends.</p>
                        </div>
                    </div>
                </div>



            </div>
        </section>
    );
}
