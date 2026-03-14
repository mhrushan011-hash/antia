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
    return NextResponse.json(db.redirects.getAll());
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { from, to, type, active } = await req.json();
        if (!from || !to) return NextResponse.json({ error: 'from and to are required' }, { status: 400 });
        const redirect = {
            id: `redirect-${Date.now()}`,
            from: from.trim(),
            to: to.trim(),
            type: type || '301',
            active: active !== false,
            createdAt: new Date().toISOString(),
        };
        db.redirects.create(redirect);
        return NextResponse.json(redirect, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create redirect' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.redirects.delete(id);
    return NextResponse.json({ success: true });
}
