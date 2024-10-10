export {default} from "next-auth/middleware"

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Handle the case where the user is already signed in and trying to access /login or /register
  // if (token) {
  //   if (pathname === '/login' || pathname === '/register') {
  //     // If the user is an admin, redirect them to the admin dashboard
  //     if (token.isAdmin) {
  //       return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
  //     }
  //     // Otherwise, redirect them to the investor dashboard
  //     return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
  //   }
  // } else {
  //   // If the user is not logged in, but trying to access protected routes
  //   if (pathname.startsWith('/investor/dashboard') || pathname.startsWith('/admin/dashboard')) {
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }
  // }

  // Role-based access control for specific areas
  if (token) {
    // Admin trying to access investor dashboard
    if (token.isAdmin && pathname.startsWith('/investor/dashboard')) {
      return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
    }

    // Investor (non-admin) trying to access admin dashboard
    if (!token.isAdmin && pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}


// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If user is authenticated and tries to access '/login' or '/register', redirect them to their dashboard
//   if (token && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
//     if (token.isAdmin) {
//       return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
//     }
//     return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
//   }

//   // Redirect to login if token is missing (user not logged in) and they try to access a protected route
//   if (!token && req.nextUrl.pathname.startsWith('/')) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // If the user is an admin, restrict access to '/investor/dashboard' routes
//   if (token?.isAdmin && req.nextUrl.pathname.startsWith('/investor/dashboard')) {
//     return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
//   }

//   // If the user is not an admin, restrict access to '/admin/dashboard' routes
//   if (!token?.isAdmin && req.nextUrl.pathname.startsWith('/admin/dashboard')) {
//     return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
//   }

//   // Allow access to other routes
//   return NextResponse.next();
// }



export const config = {
  matcher: ['/investor/dashboard(.*)','/admin/dashboard/:path*'], // Protect all routes under '/admin/dashboard'
};

