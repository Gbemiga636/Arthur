import { EVENT_BRAND, EVENT_HASHTAG } from "@/lib/constants";

export const PHOTOBOOTH_SHARE_TEXT = `Celebrating ${EVENT_BRAND}! ${EVENT_HASHTAG}`;

export function downloadPhotoboothBlob(blob: Blob, idHint = "photo") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `photobooth-${idHint}.jpg`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function sharePhotoboothNative(blob: Blob): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) return false;

  const file = new File([blob], "photobooth.jpg", { type: "image/jpeg" });
  const payload = {
    files: [file],
    text: PHOTOBOOTH_SHARE_TEXT,
    title: EVENT_BRAND,
  };

  try {
    if (navigator.canShare && !navigator.canShare(payload)) return false;
    await navigator.share(payload);
    return true;
  } catch {
    return false;
  }
}

export function openWhatsAppShare() {
  const url = `https://wa.me/?text=${encodeURIComponent(PHOTOBOOTH_SHARE_TEXT)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openInstagramShare() {
  const url = `https://www.instagram.com/`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyShareCaption(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(PHOTOBOOTH_SHARE_TEXT);
    return true;
  } catch {
    return false;
  }
}
