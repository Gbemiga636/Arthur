import { promises as fs } from "fs";
import path from "path";
import { PhotoboothPhoto } from "./types";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const PHOTO_DIR = path.join(DATA_DIR, "photobooth");
const META_FILE = path.join(DATA_DIR, "photobooth.json");
const STORAGE_BUCKET = "photobooth";

export function photoboothImageApiPath(id: string) {
  return `/api/photobooth/${id}/image`;
}

async function ensureLocalStore() {
  await fs.mkdir(PHOTO_DIR, { recursive: true });
  try {
    await fs.access(META_FILE);
  } catch {
    await fs.writeFile(META_FILE, "[]", "utf-8");
  }
}

async function readMeta(): Promise<PhotoboothPhoto[]> {
  await ensureLocalStore();
  try {
    const raw = await fs.readFile(META_FILE, "utf-8");
    return JSON.parse(raw) as PhotoboothPhoto[];
  } catch {
    return [];
  }
}

async function writeMeta(data: PhotoboothPhoto[]) {
  await ensureLocalStore();
  await fs.writeFile(META_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function mapFromDb(row: Record<string, unknown>, publicUrl?: string): PhotoboothPhoto {
  const id = row.id as string;
  const storagePath = row.storage_path as string;
  return {
    id,
    guestName: (row.guest_name as string) ?? undefined,
    imageUrl: publicUrl ?? photoboothImageApiPath(id),
    storagePath,
    createdAt: row.created_at as string,
  };
}

export async function getAllPhotoboothPhotos(): Promise<PhotoboothPhoto[]> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("photobooth_photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      return (data ?? []).map((row) => {
        const storagePath = row.storage_path as string;
        const { data: urlData } = client.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(storagePath);
        return mapFromDb(row as Record<string, unknown>, urlData.publicUrl);
      });
    } catch {
      /* Fall back to local files */
    }
  }
  return readMeta();
}

export async function savePhotoboothPhoto(
  buffer: Buffer,
  guestName?: string
): Promise<PhotoboothPhoto> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const fileName = `${id}.jpg`;
  const trimmedName = guestName?.trim() || undefined;

  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { error: uploadError } = await client.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, buffer, {
          contentType: "image/jpeg",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data, error } = await client
        .from("photobooth_photos")
        .insert({
          id,
          guest_name: trimmedName ?? null,
          storage_path: fileName,
          created_at: now,
        })
        .select()
        .single();
      if (error) throw error;

      const { data: urlData } = client.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);
      return mapFromDb(data as Record<string, unknown>, urlData.publicUrl);
    } catch {
      /* Fall back to local files */
    }
  }

  await ensureLocalStore();
  await fs.writeFile(path.join(PHOTO_DIR, fileName), buffer);

  const record: PhotoboothPhoto = {
    id,
    guestName: trimmedName,
    imageUrl: photoboothImageApiPath(id),
    storagePath: fileName,
    createdAt: now,
  };

  const all = await readMeta();
  all.unshift(record);
  await writeMeta(all);
  return record;
}

export async function getPhotoboothImageBuffer(id: string): Promise<Buffer | null> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data: row, error } = await client
        .from("photobooth_photos")
        .select("storage_path")
        .eq("id", id)
        .single();
      if (error || !row) throw error;

      const { data, error: dlError } = await client.storage
        .from(STORAGE_BUCKET)
        .download(row.storage_path as string);
      if (dlError || !data) throw dlError;

      return Buffer.from(await data.arrayBuffer());
    } catch {
      /* Fall back */
    }
  }

  const filePath = path.join(PHOTO_DIR, `${id}.jpg`);
  try {
    return await fs.readFile(filePath);
  } catch {
    return null;
  }
}

export async function deletePhotoboothPhoto(id: string): Promise<boolean> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data: row } = await client
        .from("photobooth_photos")
        .select("storage_path")
        .eq("id", id)
        .single();

      if (row?.storage_path) {
        await client.storage.from(STORAGE_BUCKET).remove([row.storage_path as string]);
      }

      const { error } = await client.from("photobooth_photos").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch {
      /* Fall back */
    }
  }

  const all = await readMeta();
  const photo = all.find((p) => p.id === id);
  if (!photo) return false;

  try {
    await fs.unlink(path.join(PHOTO_DIR, photo.storagePath));
  } catch {
    /* file may already be gone */
  }

  await writeMeta(all.filter((p) => p.id !== id));
  return true;
}
