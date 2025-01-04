// app/api/authenticate/route.ts
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { authenticator } from "otplib";

export async function POST(request: Request) {
  const { token } = await request.json();

  const isValid = authenticator.verify({
    token,
    secret: process.env.TOTP_SECRET!,
  });

  if (isValid) {
    const cookie = serialize("auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 1 day
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } else {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
