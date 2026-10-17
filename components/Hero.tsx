"use client";

import { motion } from "framer-motion";
import HeroDashboard from "@/components/HeroDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const lines = [
  { text: "Real skills.", cls: "text-ink" },
  { text: "Real evidence.", cls: "bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent" },
  { text: "Better hiring.", cls: "text-ink" },
];

const features = [
  { label: "Real coding evaluation", icon: <path d="m9 7-5 5 5 5M15 7l5 5-5 5" /> },
  {
    label: "Evidence backed assessment",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  { label: "Confident hiring decisions", icon: <path d="M6 20v-6M12 20V8M18 20V4" strokeWidth={3} /> },
];

/* Wordmarks for the trust row — simple marks, not official brand assets */
const logos: { name: string; mark?: React.ReactNode; cls?: string }[] = [
  { name: "Vercel", mark: <path d="M12 4 22 20H2L12 4Z" fill="currentColor" stroke="none" /> },
  { name: "Linear", mark: <><circle cx="12" cy="12" r="9" /><path d="m6 9 9 9M5 13l6 6M9 6l9 9" /></> },
  { name: "Notion", mark: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 16V8l6 8V8" /></> },
  { name: "GitHub", mark: <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /> },
  { name: "stripe", cls: "font-bold tracking-tight text-[1.35rem]" },
  { name: "supabase", mark: <path d="M13 2 4 14h8l-1 8 9-12h-8l1-8Z" fill="currentColor" stroke="none" /> },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-12 pt-28 sm:pt-32 [background:radial-gradient(48rem_36rem_at_85%_10%,rgba(124,58,237,0.16),transparent_60%),radial-gradient(40rem_30rem_at_100%_80%,rgba(124,58,237,0.12),transparent_60%),radial-gradient(30rem_24rem_at_0%_0%,rgba(124,58,237,0.05),transparent_60%)]"
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-8">
        {/* copy */}
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-[0.8rem] font-medium uppercase tracking-[0.28em] text-slate-500"
          >
            AI assessment platform for SDE skills
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.25rem,5.2vw,5.5rem)] !leading-[1.02]">
            {lines.map((l, i) => (
              <motion.span
                key={l.text}
                className={`block whitespace-nowrap pb-1 ${l.cls}`}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.12, ease }}
              >
                {l.text}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#access"
              className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-[#0f172a] px-7 py-4 text-base font-medium text-white shadow-[0_14px_30px_-12px_rgba(15,23,42,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Request access
              <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-hair-bright bg-white px-7 py-4 text-base font-medium text-ink transition-colors hover:bg-surface-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} aria-hidden>
                <circle cx="12" cy="12" r="9.5" />
                <path d="M10 8.5v7l5.5-3.5L10 8.5Z" />
              </svg>
              Watch demo
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="mt-12 grid grid-cols-3 divide-x divide-hair-bright"
          >
            {features.map((f) => (
              <li key={f.label} className="px-3 first:pl-0 sm:px-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-100 text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>{f.icon}</svg>
                </span>
                <p className="mt-3 max-w-[9rem] text-sm leading-snug text-ink/85 sm:text-[15px]">{f.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* product mockup */}
        <div className="mx-auto w-full min-w-0 max-w-[880px] xl:-mr-10">
          <HeroDashboard />
        </div>
      </div>

      {/* trust row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mx-auto mt-14 max-w-6xl text-center"
      >
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.24em] text-slate-500">Trusted by forward-thinking engineering teams</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-y-4 sm:divide-x sm:divide-hair-bright">
          {logos.map((l) => (
            <li key={l.name} className="flex items-center gap-2 px-6 text-xl font-semibold text-slate-500 sm:px-9">
              {l.mark && (
                <svg width="24" height="24" viewBox="0 0 24 24" {...stroke} aria-hidden>{l.mark}</svg>
              )}
              <span className={l.cls}>{l.name}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
