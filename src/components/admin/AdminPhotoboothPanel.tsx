"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Download,
  Loader2,
  Trash2,
  X,
  ZoomIn,
  Archive,
} from "lucide-react";
import { PhotoboothPhoto } from "@/lib/types";

export default function AdminPhotoboothPanel({ token }: { token: string }) {
  const [photos, setPhotos] = useState<PhotoboothPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewPhoto, setViewPhoto] = useState<PhotoboothPhoto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/photobooth", {
        headers: { "x-admin-token": token },
      });
      if (!res.ok) throw new Error();
      setPhotos(await res.json());
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/photobooth?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (!res.ok) throw new Error();
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
      if (viewPhoto?.id === id) setViewPhoto(null);
    } catch {
      /* ignore */
    } finally {
      setDeleting(false);
    }
  };

  const downloadAllZip = async () => {
    setDownloadingZip(true);
    try {
      const res = await fetch("/api/photobooth/zip", {
        headers: { "x-admin-token": token },
      });
      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `photobooth-${stamp}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    } finally {
      setDownloadingZip(false);
    }
  };

  const downloadPhoto = async (photo: PhotoboothPhoto) => {
    try {
      const res = await fetch(photo.imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `photobooth-${photo.id.slice(0, 8)}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-2xl border border-gold/20 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-3" />
        <p className="text-cream/40 font-[family-name:var(--font-cormorant)]">
          Loading photobooth gallery...
        </p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="glass rounded-2xl border border-gold/20 py-20 text-center px-6">
        <Camera className="w-10 h-10 text-gold/50 mx-auto mb-4" />
        <p className="text-cream/60 font-[family-name:var(--font-cormorant)] text-lg">
          No photobooth pictures yet.
        </p>
        <p className="text-cream/35 text-sm mt-2 font-[family-name:var(--font-cormorant)]">
          Guests can capture photos at{" "}
          <a href="/photobooth" className="text-gold hover:underline" target="_blank" rel="noreferrer">
            /photobooth
          </a>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-cream/50 text-sm font-[family-name:var(--font-cormorant)]">
          {photos.length} photo{photos.length !== 1 ? "s" : ""} captured
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={downloadAllZip}
            disabled={downloadingZip}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-gold/35 text-gold-light bg-gold/10 hover:bg-gold/15 transition-colors disabled:opacity-50"
          >
            {downloadingZip ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Archive className="w-3.5 h-3.5" />
            )}
            {downloadingZip ? "Preparing..." : "Download All (ZIP)"}
          </button>
          <button
            onClick={fetchPhotos}
            className="text-xs text-gold/80 hover:text-gold font-[family-name:var(--font-cormorant)] tracking-wide px-2 py-2"
          >
            Refresh gallery
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layout
            className="group glass rounded-xl overflow-hidden border border-gold/15 hover:border-gold/35 transition-all"
          >
            <button
              type="button"
              onClick={() => setViewPhoto(photo)}
              className="relative aspect-square w-full block"
            >
              <img
                src={photo.imageUrl}
                alt={photo.guestName ?? "Photobooth photo"}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-8 h-8 text-gold-light" />
              </div>
            </button>
            <div className="p-3 border-t border-gold/10">
              <p className="text-cream/80 text-sm font-[family-name:var(--font-cormorant)] truncate">
                {photo.guestName || "Guest"}
              </p>
              <p className="text-cream/35 text-[10px] mt-0.5">
                {new Date(photo.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => downloadPhoto(photo)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs border border-gold/25 text-gold-light hover:bg-gold/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(photo.id)}
                  className="p-1.5 rounded-lg border border-red-500/25 text-red-300/70 hover:bg-red-500/10 transition-colors"
                  aria-label="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full view lightbox */}
      <AnimatePresence>
        {viewPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setViewPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setViewPhoto(null)}
                className="absolute -top-12 right-0 text-cream/60 hover:text-cream p-2"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="rounded-xl overflow-hidden border border-gold/30 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewPhoto.imageUrl}
                  alt={viewPhoto.guestName ?? "Photobooth photo"}
                  className="w-full h-auto max-h-[75vh] object-contain bg-navy-deep"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-cream font-[family-name:var(--font-cormorant)] text-lg">
                    {viewPhoto.guestName || "Guest"}
                  </p>
                  <p className="text-cream/40 text-sm">
                    {new Date(viewPhoto.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadPhoto(viewPhoto)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/30 text-gold-light text-sm hover:bg-gold/10"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(viewPhoto.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-300 text-sm hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-2xl p-8 w-full max-w-sm border border-red-500/30 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-10 h-10 text-red-300 mx-auto mb-4" />
              <h3 className="text-lg text-cream mb-2 font-[family-name:var(--font-playfair)]">
                Delete this photo?
              </h3>
              <p className="text-cream/50 text-sm mb-6 font-[family-name:var(--font-cormorant)]">
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                  className="flex-1 py-2 rounded-xl border border-gold/30 text-cream/70 hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className="flex-1 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
