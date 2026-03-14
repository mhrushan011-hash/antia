import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const contact = {
            id: `contact-${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            createdAt: new Date().toISOString(),
        };
        db.contacts.create(contact);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
