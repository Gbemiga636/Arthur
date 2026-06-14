import { NextRequest, NextResponse } from "next/server";
import { validateAdminLogin, getAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username?.trim() || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    if (!validateAdminLogin(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ token: getAdminCredentials().sessionToken });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
