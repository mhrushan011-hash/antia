import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        const secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return NextResponse.json({ verified: true });
        } else {
            return NextResponse.json({ verified: false, error: "Signature mismatch" }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment verify error:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
