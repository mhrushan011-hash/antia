"use client";

import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";

interface FilterItem {
    id: string;
    name: string;
    brand: string;
    compatible: string;
    price: number;
    image: string;
    type: string;
    lifespan: string;
}

export function FilterProductCard({ item }: { item: FilterItem }) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col">
            <div className="h-44 bg-gray-50 p-4 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{item.type}</span>
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-1">By {item.brand}</p>
                <p className="text-xs text-gray-500 mb-1">Compatible: {item.compatible}</p>
                <p className="text-xs text-gray-500 mb-4">Lifespan: {item.lifespan}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                    <button
                        onClick={handleAdd}
                        className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg font-semibold transition-colors ${
                            added ? "bg-green-600 text-white" : "bg-gray-900 text-white hover:bg-blue-600"
                        }`}
                    >
                        {added ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                        {added ? "Added" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
