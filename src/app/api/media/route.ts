import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import fs from 'fs';
import path from 'path';

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

function getUploadDir(): string {
    const dir = process.env.NODE_ENV === 'production'
        ? '/tmp/uploads'
        : path.join(process.cwd(), 'public', 'images', 'uploads');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
}

export async function GET() {
    return NextResponse.json(db.media.getAll());
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const alt = (formData.get('alt') as string) || '';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const ext = path.extname(file.name);
        const filename = `media-${Date.now()}${ext}`;
        const uploadDir = getUploadDir();
        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, buffer);

        const url = process.env.NODE_ENV === 'production'
            ? `/tmp/uploads/${filename}`
            : `/images/uploads/${filename}`;

        const media = {
            id: `media-${Date.now()}`,
            filename,
            originalName: file.name,
            url,
            alt,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
        };

        db.media.create(media);
        return NextResponse.json(media, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const media = db.media.getById(id);
    if (media) {
        const uploadDir = getUploadDir();
        const filePath = path.join(uploadDir, media.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    db.media.delete(id);
    return NextResponse.json({ success: true });
}
