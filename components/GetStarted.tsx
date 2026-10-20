"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ---- Get started ----
   Every "Get started" button opens one chooser: are you hiring (Company) or
   taking an assessment (Candidate)? Each choice continues to that portal's
   sign-up, with a sign-in link for people who already have an account.
   The dialog is mounted once in the root layout; buttons open it with an
   event, and a link to #get-started opens it from anywhere. */

export const PORTALS = {
  company: {
    url: "https://company.mindfries.com",
    title: "I'm hiring",
    role: "Company",
    body: "Create roles, invite candidates and review the evidence behind every shortlist.",
    cta: "Continue as a company",
  },
  candidate: {
    url: "https://candidate.mindfries.com",
    title: "I'm a candidate",
    role: "Candidate",
    body: "Take your assessment, work in a real environment and show how you actually build.",
    cta: "Continue as a candidate",
  },
} as const;

const OPEN_EVENT = "mindfries:get-started";
const HASH = "#get-started";

export function openGetStarted() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function GetStartedButton({ className = "", children = "Get started" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={openGetStarted} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  company: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12.5h18" />
    </>
  ),
  candidate: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="m8 9-2 1.5L8 12M16 9l2 1.5-2 1.5M13 8l-2 5M8 20h8M12 17v3" />
    </>
  ),
};

function Option({ kind, first }: { kind: keyof typeof PORTALS; first?: boolean }) {
  const p = PORTALS[kind];
  return (
    <div className="group relative flex flex-col rounded-3xl border border-hair bg-white p-5 sm:p-6 shadow-[0_24px_50px_-36px_rgba(76,29,149,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-accent transition-colors group-hover:bg-violet-600 group-hover:text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} aria-hidden>
          {icons[kind]}
        </svg>
      </span>
      <p className="mt-4 text-[11.5px] font-medium uppercase tracking-[0.24em] text-slate-500 sm:mt-5">{p.role}</p>
      <h3 className="mt-1 !font-serif text-[1.6rem] !font-semibold !leading-tight text-[#1e1b4b]">{p.title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-dim">{p.body}</p>
      <a
        href={`${p.url}/signup`}
        data-autofocus={first ? "" : undefined}
        className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0f172a] px-5 py-3.5 sm:mt-6 text-[15px] font-medium text-white shadow-[0_14px_30px_-14px_rgba(15,23,42,0.6)] transition-transform after:absolute after:inset-0 after:rounded-3xl hover:-translate-y-0.5"
      >
        {p.cta}
        <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-0.5" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
      <p className="relative z-10 mt-3 text-center text-[13px] text-dim">
        Already have an account?{" "}
        <a href={`${p.url}/login`} className="font-medium text-accent underline-offset-4 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}

export function GetStartedDialog() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  // Open from any button (event) or from a #get-started link
  useEffect(() => {
    const show = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const fromHash = () => {
      if (window.location.hash === HASH) {
        show();
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("hashchange", fromHash);
    fromHash();
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  // While open: Esc closes, Tab stays inside, the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && el) {
        const items = [...el.querySelectorAll<HTMLElement>("a[href], button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      returnTo.current?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 cursor-default bg-[#1e1b4b]/35 backdrop-blur-sm"
          />
          {/* min-h-full + flex: centred when it fits, scrolls from its top when it doesn't */}
          <div className="pointer-events-none relative flex min-h-full items-end justify-center p-3 sm:items-center sm:p-4">
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-started-title"
            className="pointer-events-auto relative w-full max-w-3xl rounded-[2rem] border border-white/80 bg-gradient-to-b from-[#f7f4ff] to-white p-5 shadow-[0_60px_120px_-40px_rgba(30,27,75,0.6)] sm:p-9"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-500">Get started</p>
            <h2 id="get-started-title" className="mt-2 pr-10 !font-serif text-[clamp(1.9rem,3.6vw,2.6rem)] !font-semibold !leading-[1.08] !tracking-[-0.02em] text-[#1e1b4b]">
              How will you use{" "}
              <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-1 italic text-transparent">Mindfries?</em>
            </h2>
            <p className="mt-2 text-[15px] text-dim">Pick one and we&rsquo;ll take you to the right place.</p>

            <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
              <Option kind="company" first />
              <Option kind="candidate" />
            </div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
