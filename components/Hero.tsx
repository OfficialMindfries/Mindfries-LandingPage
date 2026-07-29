"use client";

import { motion } from "framer-motion";

// Floating candidate cards flanking the centered headline. No stock
// photos — each card is a product artifact: gradient portrait, handle,
// match score. That reads truer for a hiring product anyway.
type Card = {
  handle: string;
  role: string;
  score: number;
  grad: string;
  float: string;
  shift: string;
};

const left: Card[] = [
  { handle: "@priya-nair", role: "backend", score: 94, grad: "from-violet-400 to-violet-600", float: "float-a", shift: "mt-0" },
  { handle: "@d-okafor", role: "platform", score: 89, grad: "from-orange-300 to-rose-500", float: "float-c", shift: "-mt-2 mr-8" },
  { handle: "@sana-q", role: "backend", score: 71, grad: "from-amber-300 to-orange-500", float: "float-b", shift: "mt-2" },
];
const right: Card[] = [
  { handle: "@leiwang", role: "ml", score: 84, grad: "from-sky-300 to-cyan-500", float: "float-b", shift: "mt-0" },
  { handle: "@t-mendes", role: "fullstack", score: 78, grad: "from-fuchsia-300 to-violet-500", float: "float-a", shift: "-mt-2 ml-8" },
  { handle: "@marco-b", role: "frontend", score: 63, grad: "from-emerald-300 to-teal-500", float: "float-c", shift: "mt-2" },
];

function PortraitCard({ c, i, dir }: { c: Card; i: number; dir: number }) {
  const initials = c.handle.replace("@", "").split("-").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className={`${c.shift} ${c.float}`}
    >
      <div className="hair-card w-44 overflow-hidden !rounded-2xl p-0">
        <div className={`relative flex h-24 items-center justify-center bg-gradient-to-br ${c.grad}`}>
          <span className="text-2xl font-bold text-white/95">{initials}</span>
          <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-bold text-ink">
            {c.score}
          </span>
        </div>
        <div className="px-3.5 py-3">
          <div className="mono text-sm text-ink">{c.handle}</div>
          <div className="mono text-[0.7rem] text-faint">{c.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="ambient relative overflow-hidden px-6 pb-16 pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* left floating cards */}
        <div className="hidden flex-col items-end gap-5 lg:flex">
          {left.map((c, i) => (
            <PortraitCard key={c.handle} c={c} i={i} dir={-1} />
          ))}
        </div>

        {/* centered copy */}
        <div className="mx-auto max-w-md text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto mb-7 h-14 w-14"
          >
            <div className="tile tile-violet float-b h-14 w-14">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl text-ink sm:text-6xl"
          >
            We rank engineers on what they{" "}
            <span className="accent-text">actually built</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-dim"
          >
            Mindfries reads real work — GitHub, portfolios, live code — then scores an
            adaptive assessment on a real codebase. A ranked shortlist with a reason for
            every name.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="#access"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent shadow-[0_12px_28px_-10px_rgba(124,58,237,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Request early access
            </a>
            <a
              href="#how"
              className="rounded-full border border-hair-bright bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* right floating cards */}
        <div className="hidden flex-col items-start gap-5 lg:flex">
          {right.map((c, i) => (
            <PortraitCard key={c.handle} c={c} i={i} dir={1} />
          ))}
        </div>
      </div>

      {/* mobile: a compact card row so it's not empty */}
      <div className="mt-12 flex justify-center gap-4 lg:hidden">
        {[left[0], right[0]].map((c, i) => (
          <PortraitCard key={c.handle} c={c} i={i} dir={i === 0 ? -1 : 1} />
        ))}
      </div>
    </section>
  );
}
