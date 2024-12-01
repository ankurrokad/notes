// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")?.value;

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/api/authenticate", "/favicon.ico"];

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Allow access to public paths
  if (isPublicPath || request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Handle root path '/'
  if (request.nextUrl.pathname === "/") {
    if (authCookie === "authenticated") {
      // Redirect to /notes if authenticated
      return NextResponse.redirect(new URL("/notes", request.url));
    } else {
      // Redirect to /login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect other routes under (auth) group
  if (authCookie !== "authenticated") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Apply the middleware to all routes except:
     * - /login
     * - /api/*
     * - /_next/*
     * - /favicon.ico
     */
    "/((?!api/|login$|_next/|favicon.ico).*)",
  ],
};
