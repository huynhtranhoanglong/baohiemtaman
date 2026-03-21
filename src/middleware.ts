import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // If user is trying to access /admin/login, let them pass
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if they are trying to access any other /admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');
    
    // If no valid session cookie, redirect to login
    if (!session || session.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
