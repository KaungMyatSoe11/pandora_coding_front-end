import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware(req, next) {
    if (!req.nextauth) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    let response = NextResponse.next();
    response.cookies.set("T", req.nextauth.token.token);
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
