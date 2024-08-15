import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl;
  const token = cookies().get("accessToken");

  // if (!token && pathname !== "/auth/login") {
  //   // User is not logged in, redirect to login page with return_url
  //   const returnUrl = `${origin}${pathname}${search}`;
  //   const loginUrl = new URL("/auth/login", request.url);
  //   loginUrl.searchParams.set("return_url", returnUrl);

  //   return NextResponse.redirect(loginUrl);
  // }

  // TODO: check if token is valid

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/thank-you/:path*"],
};
