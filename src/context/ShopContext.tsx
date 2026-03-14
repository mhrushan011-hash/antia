"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ShopMode = "buy" | "rent";

interface ShopContextType {
    shopMode: ShopMode;
    toggleShopMode: () => void;
    setShopMode: (mode: ShopMode) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
    const [shopMode, setShopModeState] = useState<ShopMode>("buy");

    useEffect(() => {
        // Load persisted mode from local storage if available
        const savedMode = localStorage.getItem("shopMode") as ShopMode;
        if (savedMode && (savedMode === "buy" || savedMode === "rent")) {
            setShopModeState(savedMode);
        }
    }, []);

    const setShopMode = (mode: ShopMode) => {
        setShopModeState(mode);
        localStorage.setItem("shopMode", mode);
    };

    const toggleShopMode = () => {
        setShopMode(shopMode === "buy" ? "rent" : "buy");
    };

    return (
        <ShopContext.Provider value={{ shopMode, toggleShopMode, setShopMode }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
}
