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
    const slug = searchParams.get('slug');
    const admin = searchParams.get('admin');

    if (slug) {
        const page = db.pages.getBySlug(slug);
        if (!page || (!page.published && !admin)) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(page);
    }

    const pages = db.pages.getAll();
    if (admin) {
        return NextResponse.json(pages);
    }
    return NextResponse.json(pages.filter(p => p.published));
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const page = {
            ...body,
            id: `page-${Date.now()}`,
            seo: body.seo ?? { metaTitle: '', metaDescription: '', h1: '', canonical: '', keywords: [] },
            customCode: body.customCode ?? { headCode: '', bodyCode: '' },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        db.pages.create(page);
        return NextResponse.json(page, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id, ...updates } = await req.json();
        const page = db.pages.update(id, updates);
        if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(page);
    } catch {
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.pages.delete(id);
    return NextResponse.json({ success: true });
}
