"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Customer {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    customer: Customer | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (name: string, email: string, phone: string, password: string) => Promise<{ error?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((data) => {
                setCustomer(data.customer ?? null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch("/api/auth/customer-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) return { error: data.error };
        setCustomer(data.customer);
        return {};
    };

    const register = async (name: string, email: string, phone: string, password: string) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, password }),
        });
        const data = await res.json();
        if (!res.ok) return { error: data.error };
        setCustomer(data.customer);
        return {};
    };

    const logout = async () => {
        await fetch("/api/auth/me", { method: "DELETE" });
        setCustomer(null);
    };

    return (
        <AuthContext.Provider value={{ customer, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
