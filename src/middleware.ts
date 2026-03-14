import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');

export async function middleware(request: NextRequest) {
    // Only protect /admin routes except /admin (login page)
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            const response = NextResponse.redirect(new URL('/admin', request.url));
            response.cookies.delete('auth-token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
