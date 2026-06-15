import { NextRequest, NextResponse } from "next/server";
import { getPhotoboothImageBuffer } from "@/lib/photobooth-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const buffer = await getPhotoboothImageBuffer(id);
    if (!buffer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
