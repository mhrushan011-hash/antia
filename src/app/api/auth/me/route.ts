import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "antia-secret-change-in-prod");

export async function GET(request: NextRequest) {
    const token = request.cookies.get("customer-token")?.value;
    if (!token) return NextResponse.json({ customer: null });

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return NextResponse.json({ customer: { id: payload.customerId, name: payload.name, email: payload.email } });
    } catch {
        return NextResponse.json({ customer: null });
    }
}

export async function DELETE(request: NextRequest) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("customer-token");
    return response;
}
