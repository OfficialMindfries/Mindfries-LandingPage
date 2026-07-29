"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./primitives";

// Abstract source tiles (not brand logos) — the evidence Mindfries reads.
const sources = [
  { key: "GL", name: "GitLab", note: "pipelines & merge requests", color: "text-orange-500" },
  { key: "GH", name: "GitHub", note: "commits, PRs & code review", color: "text-ink" },
  { key: "λ", name: "Live code", note: "sandboxed assessment", color: "text-violet-600" },
  { key: "SO", name: "Stack Overflow", note: "answers & reputation", color: "text-amber-500" },
  { key: "HF", name: "Hugging Face", note: "shipped models & spaces", color: "text-sky-500" },
];

const MID = 2;

export default function Integrations() {
  const [active, setActive] = useState(MID);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % sources.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-hair bg-surface shadow-sm">
            <span className="text-accent-2">✦</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl text-ink sm:text-5xl">
            It reads the work engineers already do.
          </h2>
        </Reveal>

        <div className="relative mt-16 flex items-end justify-center">
          {sources.map((s, i) => {
            const off = i - MID;
            const isActive = i === active;
            return (
              <motion.button
                key={s.key}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: off * 9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * Math.abs(off), ease: [0.22, 1, 0.36, 1] }}
                animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -14 : Math.abs(off) * 16 }}
                style={{ marginLeft: i === 0 ? 0 : -12, zIndex: isActive ? 10 : 5 - Math.abs(off) }}
                className={`grid h-24 w-24 shrink-0 place-items-center rounded-3xl border shadow-lg transition-colors ${
                  isActive
                    ? "border-hair-bright bg-surface shadow-[0_18px_40px_-16px_rgba(124,58,237,0.5)]"
                    : "border-hair bg-surface/80"
                }`}
              >
                <span className={`text-2xl font-bold ${s.color}`}>{s.key}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 h-12">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-lg font-semibold text-ink">{sources[active].name}</div>
            <div className="mt-0.5 text-sm text-dim">{sources[active].note}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
