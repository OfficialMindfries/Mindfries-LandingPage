"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./primitives";

const quotes = [
  {
    name: "Kamal Chandran",
    role: "HR, GoQii",
    grad: "from-violet-400 to-violet-600",
    text: "So many hiring tools become junk software — they add work instead of removing it. Mindfries actually reads the work and hands us a shortlist we trust.",
  },
  {
    name: "Head of Engineering",
    role: "AlgoScale",
    grad: "from-orange-300 to-rose-500",
    text: "We stopped losing strong engineers to keyword filters. Seeing real commits and a live-code assessment side by side changed who we interviewed.",
  },
  {
    name: "Founder",
    role: "VXT AI",
    grad: "from-sky-300 to-cyan-500",
    text: "The plain-English reason for every candidate is the part my team loves. It recommends, we decide — no black-box score to argue with.",
  },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Stars() {
  return (
    <div className="flex items-center justify-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 400, damping: 14 }}
        >
          ★
        </motion.span>
      ))}
      <span className="mono ml-2 text-xs text-dim">5.0</span>
    </div>
  );
}

/* Tilted, blurred peek of the neighbouring quote — floats gently. */
function GhostCard({ side, grad }: { side: "left" | "right"; grad: string }) {
  const left = side === "left";
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: left ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`absolute top-1/2 hidden -translate-y-1/2 md:block ${left ? "left-0 lg:left-8" : "right-0 lg:right-8"}`}
    >
      <motion.div
        animate={{ rotate: left ? -9 : 9, y: [0, left ? -10 : 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="h-60 w-52 rounded-[1.75rem] border border-hair bg-surface/70 p-6 opacity-70 blur-[1.5px] shadow-[0_20px_50px_-30px_rgba(20,22,30,0.5)]"
      >
        <div className={`mx-auto mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br ${grad} opacity-70`} />
        <div className="mx-auto h-3 w-24 rounded-full bg-hair-bright" />
        <div className="mx-auto mt-3 h-2 w-16 rounded-full bg-hair" />
        <div className="mt-6 space-y-2">
          <div className="h-2 w-full rounded-full bg-hair" />
          <div className="h-2 w-5/6 rounded-full bg-hair" />
          <div className="h-2 w-2/3 rounded-full bg-hair" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [[i, dir], setI] = useState<[number, number]>([0, 0]);
  const go = (d: number) => setI(([c]) => [(c + d + quotes.length) % quotes.length, d]);

  // auto-advance; pauses while the tab is hidden
  useEffect(() => {
    const t = setInterval(() => setI(([c]) => [(c + 1) % quotes.length, 1]), 4600);
    return () => clearInterval(t);
  }, []);

  const q = quotes[i];
  const prev = quotes[(i - 1 + quotes.length) % quotes.length];
  const next = quotes[(i + 1) % quotes.length];

  return (
    <section className="overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl text-ink sm:text-5xl">
            Built with the people hiring engineers now.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-4 max-w-lg text-dim">
            Design partners across health-tech, infra, and AI shape every release.
          </p>
        </Reveal>

        <div className="relative mt-14 flex h-[22rem] items-center justify-center">
          <GhostCard side="left" grad={prev.grad} />
          <GhostCard side="right" grad={next.grad} />

          <div className="relative z-10 w-full max-w-md">
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 90 : -90, scale: 0.88, rotate: dir >= 0 ? 5 : -5 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -90 : 90, scale: 0.88, rotate: dir >= 0 ? -5 : 5 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className="rounded-[1.75rem] border border-hair-bright bg-surface px-8 py-9 shadow-[0_30px_70px_-30px_rgba(20,22,30,0.45)]"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                  className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${q.grad} text-lg font-bold text-white`}
                >
                  {initials(q.name)}
                </motion.div>
                <div className="text-lg font-semibold text-ink">{q.name}</div>
                <div className="mono mt-0.5 text-xs text-dim">{q.role}</div>
                <div className="mt-3">
                  <Stars />
                </div>
                <p className="mt-4 text-balance text-sm leading-relaxed text-dim">
                  &ldquo;{q.text}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-hair-bright bg-surface text-ink transition-transform hover:-translate-x-0.5 hover:bg-surface-2"
          >
            ‹
          </button>
          <div className="flex items-center gap-1.5">
            {quotes.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(([c]) => [n, n > c ? 1 : -1])}
                aria-label={`Go to testimonial ${n + 1}`}
                className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-accent" : "w-1.5 bg-hair-bright"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-hair-bright bg-surface text-ink transition-transform hover:translate-x-0.5 hover:bg-surface-2"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
