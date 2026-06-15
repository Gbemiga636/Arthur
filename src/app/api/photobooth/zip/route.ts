import { NextRequest, NextResponse } from "next/server";
import {
  createPhotoboothZipArchive,
  photoboothZipFilename,
} from "@/lib/photobooth-server";
import { validateAdminToken } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!validateAdminToken(request.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const zipBuffer = await createPhotoboothZipArchive();
    const filename = photoboothZipFilename();

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to create zip archive" }, { status: 500 });
  }
}
