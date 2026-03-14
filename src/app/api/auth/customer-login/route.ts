import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "@/lib/db";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "antia-secret-change-in-prod");

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const customer = db.customers.getByEmail(email);
        if (!customer) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, customer.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = await new SignJWT({ customerId: customer.id, email: customer.email, name: customer.name })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true, customer: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone } });
        response.cookies.set("customer-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
