"use client";

import { useState } from "react";
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

function Stars() {
  return (
    <div className="flex items-center justify-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      <span className="mono ml-2 text-xs text-dim">5.0</span>
    </div>
  );
}

export default function Testimonials() {
  const [[i, dir], setI] = useState<[number, number]>([0, 0]);
  const q = quotes[i];
  const go = (d: number) => setI(([c]) => [(c + d + quotes.length) % quotes.length, d]);

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

        <div className="relative mt-14 flex items-center justify-center">
          {/* faded side placeholders */}
          <div className="absolute left-0 hidden h-64 w-64 rounded-3xl border border-hair bg-surface/40 md:block" />
          <div className="absolute right-0 hidden h-64 w-64 rounded-3xl border border-hair bg-surface/40 md:block" />

          <div className="relative z-10 w-full max-w-md">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hair-card px-8 py-9"
              >
                <div className={`mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${q.grad} text-lg font-bold text-white`}>
                  {q.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
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

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-hair-bright bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-hair-bright bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
