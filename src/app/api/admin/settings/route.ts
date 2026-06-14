import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin-auth";
import { getSettings, updateSettings } from "@/lib/settings-server";

export async function GET(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const settings = await updateSettings({
      rsvpLocked: Boolean(body.rsvpLocked),
    });
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
