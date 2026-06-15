"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Check,
  Loader2,
  RefreshCw,
  Upload,
  ArrowLeft,
  SwitchCamera,
  Zap,
  ZapOff,
} from "lucide-react";
import Link from "next/link";
import { EVENT_BRAND } from "@/lib/constants";
import { EVENT_HASHTAG_LINES } from "@/lib/hashtag";
import {
  drawPhotoboothFrame,
  PHOTOBOOTH_FOOTER_RATIO,
} from "@/lib/photobooth-frame-draw";

type Step = "camera" | "preview" | "success";
type FacingMode = "user" | "environment";

export default function PhotoboothCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [step, setStep] = useState<Step>("camera");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [guestName, setGuestName] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [flashOn, setFlashOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [multipleCameras, setMultipleCameras] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraReady(false);
    setTorchSupported(false);
  }, []);

  const applyTorch = useCallback(async (track: MediaStreamTrack, on: boolean) => {
    try {
      const caps = track.getCapabilities?.() as MediaTrackCapabilities & {
        torch?: boolean;
      };
      if (!caps?.torch) return false;
      await track.applyConstraints({
        advanced: [{ torch: on } as MediaTrackConstraintSet],
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const startCamera = useCallback(
    async (mode: FacingMode, torch: boolean) => {
      setCameraError("");
      stopCamera();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        });
        streamRef.current = stream;
        const track = stream.getVideoTracks()[0];
        const caps = track.getCapabilities?.() as MediaTrackCapabilities & {
          torch?: boolean;
        };
        const hasTorch = Boolean(caps?.torch);
        setTorchSupported(hasTorch);

        if (torch && hasTorch) {
          await applyTorch(track, true);
        } else if (torch && !hasTorch) {
          setFlashOn(false);
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((d) => d.kind === "videoinput");
        setMultipleCameras(cameras.length > 1);
      } catch {
        setCameraError(
          "Camera access is needed to take your photo. Please allow camera permission and try again."
        );
      }
    },
    [stopCamera, applyTorch]
  );

  useEffect(() => {
    if (step === "camera") startCamera(facingMode, flashOn);
    return () => stopCamera();
  }, [step, facingMode, startCamera, stopCamera]);

  const toggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || !torchSupported) return;
    const next = !flashOn;
    const ok = await applyTorch(track, next);
    if (ok) setFlashOn(next);
  };

  const switchCamera = () => {
    setFlashOn(false);
    setFacingMode((m) => (m === "user" ? "environment" : "user"));
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const crop = Math.min(video.videoWidth, video.videoHeight);
    const photoWidth = crop;
    const footerHeight = Math.round(photoWidth * PHOTOBOOTH_FOOTER_RATIO);
    const canvas = document.createElement("canvas");
    canvas.width = photoWidth;
    canvas.height = photoWidth + footerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sx = (video.videoWidth - crop) / 2;
    const sy = (video.videoHeight - crop) / 2;
    const mirror = facingMode === "user";

    if (mirror) {
      ctx.translate(photoWidth, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, sx, sy, crop, crop, 0, 0, photoWidth, photoWidth);
    if (mirror) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawPhotoboothFrame(ctx, photoWidth, photoWidth);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        stopCamera();
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setPreviewBlob(blob);
        setStep("preview");
      },
      "image/jpeg",
      0.92
    );
  };

  const retake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
    setUploadError("");
    setStep("camera");
  };

  const uploadPhoto = async () => {
    if (!previewBlob) return;
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("photo", previewBlob, "photobooth.jpg");
      if (guestName.trim()) formData.append("guestName", guestName.trim());

      const res = await fetch("/api/photobooth", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Upload failed");
      }

      setStep("success");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const takeAnother = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
    setGuestName("");
    setUploadError("");
    setStep("camera");
  };

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {step === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="photobooth-frame-card">
                <div className="photobooth-viewport">
                  {cameraError ? (
                    <div className="photobooth-viewport__empty">
                      <p className="text-cream/70 text-sm font-[family-name:var(--font-cormorant)] text-center px-6">
                        {cameraError}
                      </p>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className={`photobooth-viewport__video ${
                        facingMode === "user" ? "photobooth-viewport__video--mirror" : ""
                      }`}
                    />
                  )}

                  <div className="photobooth-viewport__corners" aria-hidden />

                  <div className="photobooth-viewport__toolbar">
                    {multipleCameras && (
                      <button
                        type="button"
                        onClick={switchCamera}
                        disabled={!cameraReady || !!cameraError}
                        className="photobooth-toolbar-btn"
                        title="Switch camera"
                        aria-label="Switch camera"
                      >
                        <SwitchCamera className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={toggleFlash}
                      disabled={!cameraReady || !torchSupported || !!cameraError}
                      className={`photobooth-toolbar-btn ${
                        flashOn ? "photobooth-toolbar-btn--active" : ""
                      } ${!torchSupported ? "photobooth-toolbar-btn--disabled" : ""}`}
                      title={
                        torchSupported
                          ? flashOn
                            ? "Turn flash off"
                            : "Turn flash on"
                          : "Flash not available on this camera"
                      }
                      aria-label={flashOn ? "Turn flash off" : "Turn flash on"}
                    >
                      {flashOn ? (
                        <Zap className="w-4 h-4" />
                      ) : (
                        <ZapOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="photobooth-footer-band">
                  <div className="photobooth-footer-band__rule" aria-hidden />
                  <p className="photobooth-footer-band__brand font-[family-name:var(--font-playfair)]">
                    {EVENT_BRAND}
                  </p>
                  <p className="photobooth-footer-band__hashtag font-[family-name:var(--font-cormorant)]">
                    {EVENT_HASHTAG_LINES[0]}
                  </p>
                  <p className="photobooth-footer-band__hashtag font-[family-name:var(--font-cormorant)]">
                    {EVENT_HASHTAG_LINES[1]}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input
                className="luxury-input"
                placeholder="Your name (optional)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <button
                type="button"
                onClick={capturePhoto}
                disabled={!cameraReady || !!cameraError}
                className="w-full py-4 rounded-xl flex items-center justify-center gap-3 font-[family-name:var(--font-cormorant)] tracking-wider uppercase text-lg disabled:opacity-50 transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #c9a227 100%)",
                  color: "#0a1628",
                  boxShadow: "0 4px 20px rgba(201, 162, 39, 0.4)",
                }}
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
              {cameraError && (
                <button
                  type="button"
                  onClick={() => startCamera(facingMode, flashOn)}
                  className="w-full py-3 rounded-xl border border-gold/30 text-cream/70 hover:text-gold-light text-sm font-[family-name:var(--font-cormorant)] flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Camera
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === "preview" && previewUrl && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <div className="mx-auto max-w-[360px] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Your photobooth preview"
                className="w-full h-auto block"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={retake}
                disabled={uploading}
                className="flex-1 py-3 rounded-xl border border-gold/30 text-cream/70 hover:text-gold-light font-[family-name:var(--font-cormorant)] tracking-wide flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retake
              </button>
              <button
                type="button"
                onClick={uploadPhoto}
                disabled={uploading}
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-[family-name:var(--font-cormorant)] tracking-wider uppercase text-navy-deep disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #e8c547)",
                }}
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploadError && (
              <p className="text-center text-red-300 text-sm font-[family-name:var(--font-cormorant)]">
                {uploadError}
              </p>
            )}
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass-cream rounded-2xl p-10 border border-gold/25"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-300" />
            </div>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] text-gold-light mb-2">
              Photo Saved!
            </h2>
            <p className="text-cream/65 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed mb-8">
              Your celebration moment has been captured beautifully. Thank you for
              sharing this memory with us!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={takeAnother}
                className="px-6 py-3 rounded-xl border border-gold/35 text-gold-light font-[family-name:var(--font-cormorant)] tracking-wide"
              >
                Take Another Photo
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-navy-deep font-[family-name:var(--font-cormorant)] tracking-wide"
                style={{ background: "linear-gradient(135deg, #c9a227, #e8c547)" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Invitation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
