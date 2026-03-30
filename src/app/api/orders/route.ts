import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "antia-secret-change-in-prod");

async function getCustomerId(request: NextRequest): Promise<string | null> {
    const token = request.cookies.get("customer-token")?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload.customerId as string;
    } catch {
        return null;
    }
}

async function isAdminAuthed(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) return false;
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

// Create order
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const customerId = await getCustomerId(request);

        const order = db.orders.create({
            id: uuidv4(),
            customerId: customerId ?? undefined,
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone,
            address: body.address,
            city: body.city,
            pincode: body.pincode,
            items: body.items,
            subtotal: body.subtotal,
            gst: body.gst,
            total: body.total,
            paymentMethod: body.paymentMethod,
            paymentStatus: body.paymentStatus ?? "pending",
            razorpayOrderId: body.razorpayOrderId,
            razorpayPaymentId: body.razorpayPaymentId,
            status: "placed",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

// Get orders — admin gets all, customer gets their own
export async function GET(request: NextRequest) {
    const admin = request.nextUrl.searchParams.get("admin");

    if (admin && (await isAdminAuthed())) {
        const orders = db.orders.getAll();
        return NextResponse.json({ orders });
    }

    const customerId = await getCustomerId(request);
    const email = request.nextUrl.searchParams.get("email");

    let orders;
    if (customerId) {
        orders = db.orders.getByCustomerId(customerId);
    } else if (email) {
        orders = db.orders.getByEmail(email);
    } else {
        return NextResponse.json({ orders: [] });
    }

    return NextResponse.json({ orders });
}

// Update order (admin only — status changes)
export async function PUT(request: NextRequest) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id, ...updates } = await request.json();
        const order = db.orders.update(id, updates);
        if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, order });
    } catch {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
