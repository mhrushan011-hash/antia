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

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') as 'header' | 'footer' | null;

    if (location) {
        const menu = db.menus.getByLocation(location);
        return menu
            ? NextResponse.json(menu)
            : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(db.menus.getAll());
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id, ...updates } = await req.json();
        const menu = db.menus.update(id, updates);
        if (!menu) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(menu);
    } catch {
        return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
    }
}
