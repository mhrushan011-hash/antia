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
        const blog = db.blogs.getBySlug(slug);
        if (!blog || (!blog.published && !admin)) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    }

    const blogs = admin ? db.blogs.getAll() : db.blogs.getPublished();
    return NextResponse.json(blogs);
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const blog = {
            ...body,
            id: `blog-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        db.blogs.create(blog);
        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id, ...updates } = await req.json();
        const blog = db.blogs.update(id, updates);
        if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.blogs.delete(id);
    return NextResponse.json({ success: true });
}
