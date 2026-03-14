"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/types/cms";

export interface CartItem {
    product: Product;
    quantity: number;
    mode: "buy" | "rent";
    rentMonths?: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, mode: "buy" | "rent", rentMonths?: number) => void;
    removeFromCart: (productId: string, mode: "buy" | "rent") => void;
    updateQuantity: (productId: string, mode: "buy" | "rent", quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("antia_cart");
        if (saved) {
            try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("antia_cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, mode: "buy" | "rent", rentMonths = 12) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id && i.mode === mode);
            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id && i.mode === mode
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, quantity: 1, mode, rentMonths }];
        });
    };

    const removeFromCart = (productId: string, mode: "buy" | "rent") => {
        setItems(prev => prev.filter(i => !(i.product.id === productId && i.mode === mode)));
    };

    const updateQuantity = (productId: string, mode: "buy" | "rent", quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, mode);
            return;
        }
        setItems(prev =>
            prev.map(i =>
                i.product.id === productId && i.mode === mode ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    const subtotal = items.reduce((sum, i) => {
        const price = i.mode === "rent" ? (i.product.rentPrice ?? 0) : (i.product.buyPrice ?? 0);
        return sum + price * i.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
