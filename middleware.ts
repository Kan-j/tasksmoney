export {default} from "next-auth/middleware"

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Handle the case where the user is already signed in and trying to access /login or /register
  if (token) {
    if (pathname === '/login' || pathname === '/register') {
      // If the user is an admin, redirect them to the admin dashboard
      if (token.isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
      }
      // Otherwise, redirect them to the investor dashboard
      return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
    }
  } else {
    // If the user is not logged in, but trying to access protected routes
    if (pathname.startsWith('/investor/dashboard') || pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

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
//   // Get the token using next-auth's getToken utility
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

//   const { pathname } = req.nextUrl;



//   // Handle cases where the user is already logged in (token exists)
//   if (token) {
   
//     // Prevent access to the login or register page if already authenticated
//     if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
//       if (token.isAdmin) {
//         console.log("User is an admin, redirecting to admin dashboard");
//         return NextResponse.redirect(new URL('/admin/dashboard/users', req.url));
//       }
//       console.log("User is not an admin, redirecting to investor dashboard");
//       return NextResponse.redirect(new URL('/investor/dashboard/profile', req.url));
//     }
//   } else {
//     // Handle cases where the user is not logged in (token is null)
//     console.log("User is NOT logged in");

//     // Protect investor and admin dashboard routes, redirect to login if not authenticated
//     if (pathname.startsWith('/investor/dashboard') || pathname.startsWith('/admin/dashboard')) {
//       console.log("Protected route accessed, redirecting to login");
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   // Default to continuing the request if no conditions are met
//   return NextResponse.next();
// }

export const config = {
  matcher: ['/investor/dashboard(.*)','/admin/dashboard(.*)'], // Protect all routes under '/admin/dashboard'
};

