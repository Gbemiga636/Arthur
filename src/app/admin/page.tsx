"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Download,
  Trash2,
  Edit3,
  Users,
  UserCheck,
  UserX,
  RefreshCw,
  X,
  Save,
  Loader2,
  LockOpen,
} from "lucide-react";
import { RSVPSubmission } from "@/lib/types";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<RSVPSubmission | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [rsvpLocked, setRsvpLocked] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const fetchSettings = useCallback(async (authToken: string) => {
    try {
      const res = await fetch("/api/admin/settings", {
        headers: { "x-admin-token": authToken },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRsvpLocked(Boolean(data.rsvpLocked));
    } catch {
      /* ignore */
    }
  }, []);

  const fetchRSVPs = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        headers: { "x-admin-token": authToken },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRsvps(data);
    } catch {
      setLoginError("Session expired. Please log in again.");
      sessionStorage.removeItem("admin_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchRSVPs(token);
      fetchSettings(token);
    }
  }, [token, fetchRSVPs, fetchSettings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setLoginError("Invalid username or password");
        return;
      }
      const { token: authToken } = await res.json();
      sessionStorage.setItem("admin_token", authToken);
      setToken(authToken);
    } catch {
      setLoginError("Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const toggleRsvpLock = async () => {
    if (!token) return;
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ rsvpLocked: !rsvpLocked }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRsvpLocked(Boolean(data.rsvpLocked));
    } catch {
      /* ignore */
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setRsvps([]);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`/api/rsvp?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      setRsvps((prev) => prev.filter((r) => r.id !== id));
      setDeleteConfirm(null);
    } catch {
      /* ignore */
    }
  };

  const handleSaveEdit = async () => {
    if (!token || !editing) return;
    try {
      const res = await fetch("/api/rsvp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setRsvps((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setEditing(null);
    } catch {
      /* ignore */
    }
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Attending",
      "Bringing Guest",
      "Guest Name",
      "Guest Phone",
      "Guest Email",
      "Message",
      "Submitted",
    ];
    const rows = rsvps.map((r) => [
      r.name,
      r.phone,
      r.email,
      r.attending ? "Yes" : "No",
      r.bringingGuest ? "Yes" : "No",
      r.guestName ?? "",
      r.guestPhone ?? "",
      r.guestEmail ?? "",
      r.message ?? "",
      new Date(r.createdAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `arthur60-rsvps-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const attending = rsvps.filter((r) => r.attending).length;
  const declining = rsvps.filter((r) => !r.attending).length;
  const withGuests = rsvps.filter((r) => r.bringingGuest).length;

  if (!token) {
    return (
      <div className="min-h-screen bg-navy-deep flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)]" />
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="relative glass rounded-2xl p-10 w-full max-w-md border border-gold/25"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-gold flex items-center justify-center border border-gold/40">
              <Lock className="w-7 h-7 text-gold" />
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] text-gold-light">
              Admin Panel
            </h1>
            <p className="text-cream/50 text-sm mt-2 font-[family-name:var(--font-cormorant)]">
              Arthur 60th Birthday RSVP Management
            </p>
          </div>

          <input
            type="text"
            className="luxury-input mb-4"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            type="password"
            className="luxury-input mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {loginError && (
            <p className="text-red-300 text-sm mb-4 text-center">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 rounded-xl text-navy-deep font-[family-name:var(--font-cormorant)] tracking-wider uppercase flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #c9a227, #e8c547)",
            }}
          >
            {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>

          <a
            href="/"
            className="block text-center text-cream/40 text-sm mt-6 hover:text-gold transition-colors"
          >
            ← Back to invitation
          </a>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-deep">
      {/* Admin header */}
      <header className="glass border-b border-gold/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-[family-name:var(--font-playfair)] text-gold-light">
              RSVP Dashboard
            </h1>
            <p className="text-cream/40 text-xs font-[family-name:var(--font-cormorant)]">
              Arthur 60th Birthday
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRsvpLock}
              disabled={settingsLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${
                rsvpLocked
                  ? "border-red-400/40 text-red-300 bg-red-500/10 hover:bg-red-500/15"
                  : "border-green-400/40 text-green-300 bg-green-500/10 hover:bg-green-500/15"
              }`}
              title={rsvpLocked ? "Unlock RSVP form" : "Lock RSVP form"}
            >
              {settingsLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : rsvpLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <LockOpen className="w-4 h-4" />
              )}
              {rsvpLocked ? "RSVP Locked" : "RSVP Open"}
            </button>
            <button
              onClick={() => token && fetchRSVPs(token)}
              className="p-2 rounded-lg glass-gold text-gold hover:bg-gold/20 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-gold text-gold-light text-sm border border-gold/30 hover:bg-gold/15 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-cream/60 hover:text-red-300 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total RSVPs" value={rsvps.length} />
          <StatCard icon={UserCheck} label="Attending" value={attending} color="text-green-400" />
          <StatCard icon={UserX} label="Declined" value={declining} color="text-red-300" />
          <StatCard icon={Users} label="With Guests" value={withGuests} color="text-gold-light" />
        </div>

        {/* Table */}
        <div className="glass rounded-2xl border border-gold/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gold/20 bg-navy/50">
                  {["Name", "Contact", "Status", "Guest", "Message", "Date", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-gold/70 text-xs tracking-wider uppercase font-[family-name:var(--font-cormorant)]"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {loading && rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-cream/40">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading submissions...
                    </td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-cream/40 font-[family-name:var(--font-cormorant)]">
                      No RSVPs yet. Share the invitation link with your guests!
                    </td>
                  </tr>
                ) : (
                  rsvps.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-gold/10 hover:bg-gold/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-cream font-[family-name:var(--font-cormorant)]">
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-cream/70 text-sm">
                        <div>{r.phone}</div>
                        <div className="text-cream/40">{r.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs ${
                            r.attending
                              ? "bg-green-500/15 text-green-300 border border-green-500/30"
                              : "bg-red-500/15 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {r.attending ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-cream/60 text-sm">
                        {r.bringingGuest ? (
                          <div>
                            <div>{r.guestName}</div>
                            {r.guestPhone && (
                              <div className="text-cream/30 text-xs">{r.guestPhone}</div>
                            )}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-cream/50 text-sm max-w-[200px] truncate">
                        {r.message || "—"}
                      </td>
                      <td className="px-4 py-3 text-cream/40 text-xs whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditing({ ...r })}
                            className="p-1.5 rounded-lg hover:bg-gold/15 text-gold/70 hover:text-gold transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(r.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-300/60 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass rounded-2xl p-8 w-full max-w-lg border border-gold/25"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-[family-name:var(--font-playfair)] text-gold-light">
                  Edit RSVP
                </h2>
                <button onClick={() => setEditing(null)} className="text-cream/40 hover:text-cream">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {(
                  [
                    ["name", "Full Name"],
                    ["phone", "Phone"],
                    ["email", "Email"],
                    ["guestName", "Guest Name"],
                    ["guestPhone", "Guest Phone"],
                    ["guestEmail", "Guest Email"],
                    ["message", "Message"],
                  ] as const
                ).map(([field, label]) => (
                  <div key={field}>
                    <label className="text-gold/70 text-xs uppercase tracking-wider mb-1 block">
                      {label}
                    </label>
                    {field === "message" ? (
                      <textarea
                        className="luxury-input min-h-[80px] resize-none"
                        value={editing[field] ?? ""}
                        onChange={(e) =>
                          setEditing({ ...editing, [field]: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        className="luxury-input"
                        value={editing[field] ?? ""}
                        onChange={(e) =>
                          setEditing({ ...editing, [field]: e.target.value })
                        }
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-cream/70 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.attending}
                      onChange={(e) =>
                        setEditing({ ...editing, attending: e.target.checked })
                      }
                      className="accent-gold"
                    />
                    Attending
                  </label>
                  <label className="flex items-center gap-2 text-cream/70 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.bringingGuest}
                      onChange={(e) =>
                        setEditing({ ...editing, bringingGuest: e.target.checked })
                      }
                      className="accent-gold"
                    />
                    Bringing Guest
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                className="w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2 text-navy-deep font-[family-name:var(--font-cormorant)] tracking-wider uppercase"
                style={{ background: "linear-gradient(135deg, #c9a227, #e8c547)" }}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
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
                Delete RSVP?
              </h3>
              <p className="text-cream/50 text-sm mb-6 font-[family-name:var(--font-cormorant)]">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2 rounded-xl border border-gold/30 text-cream/70 hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-gold-light",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="glass rounded-xl p-5 border border-gold/15">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color}`} />
        <div>
          <p className={`text-2xl font-bold font-[family-name:var(--font-playfair)] ${color}`}>
            {value}
          </p>
          <p className="text-cream/40 text-xs font-[family-name:var(--font-cormorant)]">{label}</p>
        </div>
      </div>
    </div>
  );
}
