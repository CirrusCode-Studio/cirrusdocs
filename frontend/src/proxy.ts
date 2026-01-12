import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const token = request.cookies?.get('access_token');
    const pathname = request.nextUrl.pathname;

    console.log(token);
    
    if (!token && pathname.startsWith('/app')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (token && (pathname === '/' || pathname === '/sign-in'))
        return NextResponse.redirect(new URL('/app', request.url))
    return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
    matcher: ['/', '/sign-in', '/app', '/app/:path*'],
};