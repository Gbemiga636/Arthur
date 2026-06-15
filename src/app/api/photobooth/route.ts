import { NextRequest, NextResponse } from "next/server";
import {
  deletePhotoboothPhoto,
  getAllPhotoboothPhotos,
  savePhotoboothPhoto,
} from "@/lib/photobooth-server";
import { validateAdminToken } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const photos = await getAllPhotoboothPhotos();
    return NextResponse.json(photos);
  } catch {
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo");
    const guestName = formData.get("guestName");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Photo is required" }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Photo must be under 8MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const record = await savePhotoboothPhoto(
      buffer,
      typeof guestName === "string" ? guestName : undefined
    );

    return NextResponse.json(record, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to upload photo" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await deletePhotoboothPhoto(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
  }
}
