import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const userData = JSON.parse(req.cookies["udata"] || "false");

  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    // Parse the cookie
    if (userData && userData.state === "user_registered") {
      // Rewrite to the correct page
      return NextResponse.rewrite("/dashboard");
    }
  }

  if (req.nextUrl.pathname === "/dashboard") {
    // Parse the cookie
    if (!userData && userData.state !== "user_registered") {
      // Rewrite to the correct page
      return NextResponse.rewrite("/login");
    }
  }
}
