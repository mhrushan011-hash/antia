"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSidebarProps {
    minPrice?: string;
    maxPrice?: string;
    onMinPrice?: (val: string) => void;
    onMaxPrice?: (val: string) => void;
}

export function FilterSidebar({ minPrice = "", maxPrice = "", onMinPrice, onMaxPrice }: FilterSidebarProps) {
    const [openSection, setOpenSection] = useState<string | null>("price");

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
            {/* Price Range */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection("price")}
                    className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-900"
                >
                    Price Range
                    {openSection === "price" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openSection === "price" && (
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                placeholder="Min ₹"
                                value={minPrice}
                                onChange={e => onMinPrice?.(e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <span className="text-gray-400 flex-shrink-0">–</span>
                            <input
                                type="number"
                                placeholder="Max ₹"
                                value={maxPrice}
                                onChange={e => onMaxPrice?.(e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        {(minPrice || maxPrice) && (
                            <button onClick={() => { onMinPrice?.(""); onMaxPrice?.(""); }} className="text-xs text-blue-600 hover:underline">Clear price filter</button>
                        )}
                    </div>
                )}
            </div>

            {/* Environment */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection("environment")}
                    className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-900"
                >
                    Environment
                    {openSection === "environment" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openSection === "environment" && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Personal Space</h4>
                            <div className="space-y-1">
                                {["100 sq ft", "101 - 200 sq ft", "201 - 249 sq ft", "250 sq ft", "251 - 300 sq ft", "301 - 350 sq ft", "351 - 400 sq ft", "401 - 500 sq ft", "501 - 600 sq ft", "601 - 800 sq ft", "Above 800 sq ft"].map((size, idx) => (
                                    <label key={idx} className="flex items-center gap-2">
                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-600">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Other</h4>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600">Car Air Purifier</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Brands */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection("brands")}
                    className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-900"
                >
                    Brands
                    {openSection === "brands" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openSection === "brands" && (
                    <div className="mt-4 space-y-2">
                        {["Mi", "PHILIPS", "Dyson", "Qubo", "Honeywell", "Coway", "EUREKA FORBES"].map((brand) => (
                            <label key={brand} className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600">{brand}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Need */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection("need")}
                    className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-900"
                >
                    Need / Concern
                    {openSection === "need" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openSection === "need" && (
                    <div className="mt-4 space-y-2">
                        {["Allergies & Asthma", "Pets", "Mold", "Children", "Virus & Bacteria", "Chemicals/VOCs", "Wildfire Smoke", "Tobacco Smoke"].map((need) => (
                            <label key={need} className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600">{need}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Features */}
            <div className="border-b border-gray-200 pb-6">
                <button
                    onClick={() => toggleSection("features")}
                    className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-900"
                >
                    Features
                    {openSection === "features" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {openSection === "features" && (
                    <div className="mt-4 space-y-2">
                        {["Air Quality Indicator", "App Connectivity", "Extra Slim Design", "Portable", "Smart Mode", "HVAC Integration"].map((feature) => (
                            <label key={feature} className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600">{feature}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
