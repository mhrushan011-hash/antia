import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production');

async function isAdminAuthed(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) return false;
        await jwtVerify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customers = db.customers.getAll().map(({ passwordHash, ...rest }) => rest);
    return NextResponse.json(customers);
}
