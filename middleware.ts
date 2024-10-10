import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If user is not logged in and trying to access protected routes
  if (!token) {
    if (pathname.startsWith('/investor/dashboard') || pathname.startsWith('/admin/dashboard')) {
      // Redirect to login if trying to access protected routes
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Handle role-based access control if the user is authenticated
  if (token) {
    // Redirect authenticated users away from login/register
    if (pathname === '/login' || pathname === '/register') {
      if (token.isAdmin) {
        // Admins get redirected to admin dashboard
        return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
      } else {
        // Non-admin users go to the investor dashboard
        return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
      }
    }

    // Admin trying to access investor dashboard
    if (token.isAdmin && pathname.startsWith('/investor/dashboard')) {
      return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
    }

    // Non-admin trying to access admin dashboard
    if (!token.isAdmin && pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/investor/dashboard(.*)', '/admin/dashboard/:path*'],
};
