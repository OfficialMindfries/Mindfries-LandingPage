"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./primitives";
import WaitlistForm from "./WaitlistForm";

const partners = ["AlgoScale", "GoQii", "ScInter", "VXT AI"];

const evidence = [
  { label: "commits / 12mo", value: "2,481", weight: 0.94 },
  { label: "PR reviews", value: "318", weight: 0.88 },
  { label: "test coverage", value: "91%", weight: 0.83 },
  { label: "issues resolved", value: "204", weight: 0.79 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="ambient relative overflow-hidden border-b border-hair"
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70 transition-opacity"
        style={{
          background:
            "radial-gradient(28rem 28rem at var(--mx,50%) var(--my,10%), rgba(27,58,107,0.07), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-44">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hair bg-surface/60 px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="eyebrow !tracking-[0.18em]">AI hiring intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            We rank engineers on what they{" "}
            <span className="accent-text">actually built.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-dim"
          >
            Mindfries reads real work — GitHub, portfolios, live code — then runs an
            adaptive assessment on a real codebase. You get a ranked shortlist with a
            plain-English reason for every name.{" "}
            <span className="text-ink">You decide.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9"
          >
            <WaitlistForm compact />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <span className="mono text-xs uppercase tracking-widest text-faint">
              built with design partners
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {partners.map((p) => (
                <span key={p} className="text-sm text-dim">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: evidence card visual */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ perspective: 1200 }}
        >
          <div className="hair-card relative overflow-hidden rounded-2xl p-6 shadow-2xl shadow-black/10">
            <div className="flex items-center justify-between border-b border-hair pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-hair-bright bg-surface-2 text-sm text-accent">
                  ✓
                </div>
                <div>
                  <div className="mono text-sm text-ink">@priya-nair</div>
                  <div className="mono text-xs text-faint">backend · staff</div>
                </div>
              </div>
              <div className="text-right">
                <div className="mono text-[0.65rem] uppercase tracking-widest text-faint">
                  match
                </div>
                <div className="mono text-2xl font-semibold text-accent">
                  <AnimatedNumber value={94} />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {evidence.map((e, i) => (
                <motion.div
                  key={e.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="mono w-32 shrink-0 text-xs text-dim">{e.label}</span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${e.weight * 100}%` }}
                      transition={{ delay: 0.8 + i * 0.12, duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                  <span className="mono w-12 shrink-0 text-right text-xs text-ink">
                    {e.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-hair bg-surface/50 p-3">
              <div className="mono text-[0.65rem] uppercase tracking-widest text-faint">
                why this rank
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-dim">
                Two years of consistent commits to a production ML service, deep PR review
                history, strong test discipline.{" "}
                <span className="text-ink">Gap:</span> limited frontend exposure.
              </p>
            </div>
          </div>

          {/* floating accent chip */}
          <div className="absolute -left-4 -top-4 hidden rounded-lg border border-hair-bright bg-surface px-3 py-2 shadow-xl shadow-black/10 sm:block">
            <span className="mono text-xs text-dim">evidence read from</span>
            <span className="mono ml-2 text-xs text-accent">github ↗</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
