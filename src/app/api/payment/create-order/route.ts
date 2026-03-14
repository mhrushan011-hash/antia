import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export async function POST(request: NextRequest) {
    try {
        const { amount, currency = "INR", receipt } = await request.json();

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // paise
            currency,
            receipt: receipt ?? `order_${Date.now()}`,
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
    }
}
