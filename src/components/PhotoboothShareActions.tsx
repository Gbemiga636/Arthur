"use client";

import { useState } from "react";
import { Copy, Download, Share2, Check } from "lucide-react";
import { EVENT_HASHTAG } from "@/lib/constants";
import {
  copyShareCaption,
  downloadPhotoboothBlob,
  openInstagramShare,
  openWhatsAppShare,
  sharePhotoboothNative,
} from "@/lib/photobooth-share";

export default function PhotoboothShareActions({ blob }: { blob: Blob }) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleDownload = () => {
    downloadPhotoboothBlob(blob);
  };

  const handleNativeShare = async () => {
    setSharing(true);
    try {
      const shared = await sharePhotoboothNative(blob);
      if (!shared) await copyShareCaption();
    } finally {
      setSharing(false);
    }
  };

  const handleWhatsApp = async () => {
    const shared = await sharePhotoboothNative(blob);
    if (!shared) openWhatsAppShare();
  };

  const handleInstagram = async () => {
    const shared = await sharePhotoboothNative(blob);
    if (!shared) openInstagramShare();
  };

  const handleCopy = async () => {
    const ok = await copyShareCaption();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-center text-cream/45 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-cormorant)]">
        Save &amp; Share Your Moment
      </p>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gold/30 text-gold-light text-sm font-[family-name:var(--font-cormorant)] hover:bg-gold/10 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          disabled={sharing}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gold/30 text-gold-light text-sm font-[family-name:var(--font-cormorant)] hover:bg-gold/10 transition-colors disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          {sharing ? "Sharing..." : "Share"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-cormorant)] tracking-wide border border-green-500/35 text-green-300/90 hover:bg-green-500/10 transition-colors"
        >
          WhatsApp
        </button>
        <button
          type="button"
          onClick={handleInstagram}
          className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-cormorant)] tracking-wide border border-pink-400/35 text-pink-200/90 hover:bg-pink-500/10 transition-colors"
        >
          Instagram
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-cormorant)] tracking-wide border border-gold/30 text-cream/70 hover:text-gold-light hover:bg-gold/10 transition-colors flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : EVENT_HASHTAG}
        </button>
      </div>
    </div>
  );
}
