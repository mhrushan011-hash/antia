import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "antia-secret-change-in-prod");

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password } = await request.json();

        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        const existing = db.customers.getByEmail(email);
        if (existing) {
            return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const customer = db.customers.create({
            id: uuidv4(),
            name,
            email,
            phone,
            passwordHash,
            createdAt: new Date().toISOString(),
        });

        const token = await new SignJWT({ customerId: customer.id, email: customer.email, name: customer.name })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true, customer: { id: customer.id, name: customer.name, email: customer.email } });
        response.cookies.set("customer-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
