import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// GET all products
export async function GET() {
    try {
        const products = db.products.getAll();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST create product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newProduct = {
            id: uuidv4(),
            ...body,
            seo: body.seo || {
                metaTitle: body.name,
                metaDescription: body.description || '',
                h1: body.name,
                canonical: '',
                keywords: [],
            },
            images: body.images || [],
            altTexts: body.altTexts || [],
            features: body.features || [],
            specifications: body.specifications || {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        db.products.create(newProduct);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

// PUT update product
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        const updated = db.products.update(id, updates);

        if (!updated) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        db.products.delete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
