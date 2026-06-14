import { NextRequest, NextResponse } from "next/server";
import { createRSVP, getAllRSVPs, updateRSVP, deleteRSVP } from "@/lib/rsvp-server";
import { getSettings } from "@/lib/settings-server";
import { validateAdminToken } from "@/lib/admin-auth";
import { RSVPFormData } from "@/lib/types";

export async function GET(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rsvps = await getAllRSVPs();
    return NextResponse.json(rsvps);
  } catch {
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await getSettings();
    if (settings.rsvpLocked) {
      return NextResponse.json(
        { error: "RSVP submissions are currently closed." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as RSVPFormData;

    if (!body.name?.trim() || !body.phone?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    if (body.bringingGuest && !body.guestName?.trim()) {
      return NextResponse.json(
        { error: "Guest name is required when bringing a guest" },
        { status: 400 }
      );
    }

    const record = await createRSVP(body);
    return NextResponse.json(record, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const updated = await updateRSVP(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update RSVP" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await deleteRSVP(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete RSVP" }, { status: 500 });
  }
}
