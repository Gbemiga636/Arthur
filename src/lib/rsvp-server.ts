import { promises as fs } from "fs";
import path from "path";
import { RSVPSubmission, RSVPFormData } from "./types";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, "[]", "utf-8");
    }
  } catch {
    /* ignore */
  }
}

async function readFileStore(): Promise<RSVPSubmission[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as RSVPSubmission[];
  } catch {
    return [];
  }
}

async function writeFileStore(data: RSVPSubmission[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function mapToDb(r: Partial<RSVPSubmission>) {
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    attending: r.attending,
    bringing_guest: r.bringingGuest,
    guest_name: r.guestName ?? null,
    guest_phone: r.guestPhone ?? null,
    guest_email: r.guestEmail ?? null,
    message: r.message ?? null,
    created_at: r.createdAt,
    updated_at: r.updatedAt,
  };
}

function mapFromDb(row: Record<string, unknown>): RSVPSubmission {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: row.phone as string,
    email: row.email as string,
    attending: row.attending as boolean,
    bringingGuest: row.bringing_guest as boolean,
    guestName: (row.guest_name as string) ?? undefined,
    guestPhone: (row.guest_phone as string) ?? undefined,
    guestEmail: (row.guest_email as string) ?? undefined,
    message: (row.message as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getAllRSVPs(): Promise<RSVPSubmission[]> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapFromDb);
    } catch {
      /* Table missing — use local file */
    }
  }
  return readFileStore();
}

export async function createRSVP(form: RSVPFormData): Promise<RSVPSubmission> {
  const now = new Date().toISOString();
  const record: RSVPSubmission = {
    id: crypto.randomUUID(),
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    attending: form.attending,
    bringingGuest: form.bringingGuest,
    guestName: form.bringingGuest ? form.guestName.trim() : undefined,
    guestPhone: form.bringingGuest ? form.guestPhone.trim() : undefined,
    guestEmail: form.bringingGuest ? form.guestEmail.trim() : undefined,
    message: form.message.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("rsvps")
        .insert(mapToDb(record))
        .select()
        .single();
      if (error) throw error;
      return mapFromDb(data);
    } catch {
      /* Fall back to file storage */
    }
  }

  const all = await readFileStore();
  all.unshift(record);
  await writeFileStore(all);
  return record;
}

export async function updateRSVP(
  id: string,
  updates: Partial<RSVPSubmission>
): Promise<RSVPSubmission | null> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("rsvps")
        .update({
          ...mapToDb(updates),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapFromDb(data);
    } catch {
      /* Fall back to file storage */
    }
  }

  const all = await readFileStore();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  await writeFileStore(all);
  return all[idx];
}

export async function deleteRSVP(id: string): Promise<boolean> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { error } = await client.from("rsvps").delete().eq("id", id);
      if (error) throw error;
      return true;
    } catch {
      /* Fall back to file storage */
    }
  }

  const all = (await readFileStore()).filter((r) => r.id !== id);
  await writeFileStore(all);
  return true;
}

export { isSupabaseConfigured };
