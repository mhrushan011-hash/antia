import { Star } from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        name: "Aditi Sharma",
        location: "Delhi",
        rating: 5,
        text: "Living in Delhi, an air purifier is a must. Renting from PureAir was the best decision. The service is prompt and the device works perfectly.",
        image: "https://placehold.co/100x100/e0f2fe/1e40af?text=AS",
    },
    {
        id: 2,
        name: "Rahul Verma",
        location: "Mumbai",
        rating: 5,
        text: "I bought the Coway AirMega. Delivery was super fast and the installation team explained everything clearly. Highly recommended!",
        image: "https://placehold.co/100x100/f0fdf4/166534?text=RV",
    },
    {
        id: 3,
        name: "Sneha Gupta",
        location: "Bangalore",
        rating: 4,
        text: "Great concept for rentals. I move cities often so this is perfect for me. Just wish they had more color options for the devices.",
        image: "https://placehold.co/100x100/fff7ed/9a3412?text=SG",
    },
];

export function Testimonials() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
                    <p className="mt-2 text-gray-600">Join thousands of happy families breathing pure air.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                    <p className="text-xs text-gray-500">{review.location}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
