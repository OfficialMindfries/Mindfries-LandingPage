"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [partner, setPartner] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, designPartner: partner }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className={compact ? "max-w-md" : "mx-auto max-w-lg"}>
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border border-accent-soft bg-accent-soft px-5 py-4"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm text-on-accent">
              ✓
            </span>
            <div>
              <div className="text-sm font-medium text-ink">You&apos;re on the list.</div>
              <div className="text-xs text-dim">
                We&apos;ll reach out as early access opens.
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="you@company.com"
                aria-label="Work email"
                className={`h-12 flex-1 rounded-xl border bg-surface px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-hair-bright ${
                  state === "error" ? "border-red-500/60" : "border-hair"
                }`}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {state === "loading" ? "Sending…" : "Request early access"}
                {state !== "loading" && (
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                )}
              </button>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-dim">
              <input
                type="checkbox"
                checked={partner}
                onChange={(e) => setPartner(e.target.checked)}
                className="h-4 w-4 accent-[#1b3a6b]"
              />
              We&apos;re hiring engineers now — interested in being a design partner.
            </label>

            {state === "error" && (
              <p className="text-xs text-red-600">
                Please enter a valid email and try again.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
