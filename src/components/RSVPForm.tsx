"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, UserPlus, Send, Loader2, Lock } from "lucide-react";
import { RSVPFormData } from "@/lib/types";

const initialForm: RSVPFormData = {
  name: "",
  phone: "",
  email: "",
  attending: true,
  bringingGuest: false,
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  message: "",
};

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [rsvpLocked, setRsvpLocked] = useState(false);
  const [checkingLock, setCheckingLock] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setRsvpLocked(Boolean(data.rsvpLocked)))
      .catch(() => {})
      .finally(() => setCheckingLock(false));
  }, []);

  const update = (field: keyof RSVPFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit RSVP");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <motion.section
      id="rsvp"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative max-w-2xl mx-auto py-10 md:py-12"
    >
      <div className="text-center mb-10">
        <p className="section-label">Kindly Respond</p>
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream mt-4">
          RSVP
        </h2>
        <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] italic text-lg">
          Kindly confirm your attendance at your earliest convenience.
        </p>
      </div>

      {/* Kindly note */}
      <div className="mb-8 glass rounded-xl p-5 border border-gold/10 max-w-2xl mx-auto">
        <p className="section-label mb-3">Kindly Note</p>
        <ul className="space-y-1.5 text-cream/55 text-sm font-[family-name:var(--font-cormorant)]">
          <li>• Each guest is asked to RSVP individually.</li>
          <li>• Please include your plus-one details if bringing someone.</li>
          <li>• This event requires advanced RSVP for planning purposes.</li>
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -inset-3 bg-gradient-to-b from-gold/10 to-transparent rounded-3xl blur-xl" />

        {checkingLock ? (
          <div className="relative glass rounded-2xl p-12 border border-gold/25 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
          </div>
        ) : rsvpLocked ? (
          <div className="relative glass rounded-2xl p-10 md:p-12 border border-gold/25 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-gold/30 flex items-center justify-center bg-gold/10">
              <Lock className="w-6 h-6 text-gold-light" />
            </div>
            <h3 className="text-xl font-[family-name:var(--font-playfair)] text-gold-light mb-2">
              RSVP Is Currently Closed
            </h3>
            <p className="text-cream/55 font-[family-name:var(--font-cormorant)] text-lg max-w-md mx-auto">
              Thank you for your interest. RSVP submissions have been closed for
              now. Please contact the family if you have any questions.
            </p>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          className="relative glass rounded-2xl p-8 md:p-10 space-y-6 border border-gold/25"
        >
          {/* Attendance toggle */}
          <div className="flex gap-4">
            <AttendanceButton
              active={form.attending}
              onClick={() => update("attending", true)}
              label="Joyfully Accept"
            />
            <AttendanceButton
              active={!form.attending}
              onClick={() => update("attending", false)}
              label="Regretfully Decline"
            />
          </div>

          <div className="ornament-divider">
            <span className="text-gold text-sm">Your Details</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Full Name" required>
              <input
                className="luxury-input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </Field>
            <Field label="Phone Number" required>
              <input
                className="luxury-input"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
              />
            </Field>
          </div>

          <Field label="Email Address" required>
            <input
              className="luxury-input"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              required
            />
          </Field>

          {/* Guest toggle */}
          {form.attending && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() => update("bringingGuest", !form.bringingGuest)}
                className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border transition-all ${
                  form.bringingGuest
                    ? "border-gold bg-gold/10 text-gold-light"
                    : "border-gold/30 text-cream/70 hover:border-gold/50"
                }`}
              >
                <UserPlus className="w-5 h-5" />
                <span className="font-[family-name:var(--font-cormorant)] tracking-wide">
                  {form.bringingGuest
                    ? "Bringing a Guest — Details Below"
                    : "Bringing Someone Along?"}
                </span>
              </button>

              <AnimatePresence>
                {form.bringingGuest && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-5 overflow-hidden"
                  >
                    <div className="ornament-divider">
                      <span className="text-gold text-sm">Guest Details</span>
                    </div>
                    <Field label="Guest Full Name" required>
                      <input
                        className="luxury-input"
                        value={form.guestName}
                        onChange={(e) => update("guestName", e.target.value)}
                        placeholder="Guest's full name"
                        required={form.bringingGuest}
                      />
                    </Field>
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Guest Phone">
                        <input
                          className="luxury-input"
                          type="tel"
                          value={form.guestPhone}
                          onChange={(e) => update("guestPhone", e.target.value)}
                          placeholder="Guest phone (optional)"
                        />
                      </Field>
                      <Field label="Guest Email">
                        <input
                          className="luxury-input"
                          type="email"
                          value={form.guestEmail}
                          onChange={(e) => update("guestEmail", e.target.value)}
                          placeholder="Guest email (optional)"
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <Field label="Special Message (Optional)">
            <textarea
              className="luxury-input min-h-[100px] resize-none"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Share a warm wish or dietary note..."
            />
          </Field>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-[family-name:var(--font-cormorant)] tracking-wider uppercase text-lg flex items-center justify-center gap-3 disabled:opacity-60 transition-all"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #c9a227 100%)",
              color: "#0a1628",
              boxShadow: "0 4px 20px rgba(201,162,39,0.4)",
            }}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit RSVP
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300"
              >
                <Check className="w-5 h-5" />
                <span className="font-[family-name:var(--font-cormorant)]">
                  Thank you! Your RSVP has been received with joy.
                </span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-3 text-red-300 font-[family-name:var(--font-cormorant)]"
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        )}
      </div>
    </motion.section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-gold/80 text-sm tracking-wider uppercase mb-2 font-[family-name:var(--font-cormorant)]">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function AttendanceButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 px-4 rounded-xl border transition-all font-[family-name:var(--font-cormorant)] tracking-wide text-sm ${
        active
          ? "border-gold bg-gold/15 text-gold-light shadow-[0_0_20px_rgba(201,162,39,0.15)]"
          : "border-gold/20 text-cream/50 hover:border-gold/40"
      }`}
    >
      {label}
    </button>
  );
}
