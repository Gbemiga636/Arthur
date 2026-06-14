import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

export interface SiteSettings {
  rsvpLocked: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = { rsvpLocked: false };

async function readFileSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

async function writeFileSettings(settings: SiteSettings) {
  await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true });
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

export async function getSettings(): Promise<SiteSettings> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("site_settings")
        .select("rsvp_locked")
        .eq("id", 1)
        .single();
      if (error) throw error;
      return { rsvpLocked: Boolean(data?.rsvp_locked) };
    } catch {
      /* Table missing or not seeded — use local file */
    }
  }
  return readFileSettings();
}

export async function updateSettings(
  updates: Partial<SiteSettings>
): Promise<SiteSettings> {
  const client = getSupabaseAdmin();
  if (client && isSupabaseConfigured) {
    try {
      const { data, error } = await client
        .from("site_settings")
        .update({
          rsvp_locked: updates.rsvpLocked,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1)
        .select("rsvp_locked")
        .single();
      if (error) throw error;
      return { rsvpLocked: Boolean(data?.rsvp_locked) };
    } catch {
      /* Fall back to file storage */
    }
  }

  const current = await readFileSettings();
  const next = { ...current, ...updates };
  await writeFileSettings(next);
  return next;
}
