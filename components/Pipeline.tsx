"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { SectionLabel } from "./primitives";

const ROW = 66;

type Cand = {
  handle: string;
  role: string;
  score: number;
  initial: number; // scattered order
  rank: number; // final ranked order (0 = top)
  chips: string[];
};

const candidates: Cand[] = [
  { handle: "@priya-nair", role: "backend", score: 94, initial: 3, rank: 0, chips: ["2.4k commits", "318 PRs", "91% cov"] },
  { handle: "@d-okafor", role: "platform", score: 89, initial: 0, rank: 1, chips: ["1.8k commits", "OSS maintainer"] },
  { handle: "@leiwang", role: "ml", score: 84, initial: 5, rank: 2, chips: ["ships models", "204 issues"] },
  { handle: "@t-mendes", role: "fullstack", score: 78, initial: 1, rank: 3, chips: ["steady cadence", "clean tests"] },
  { handle: "@sana-q", role: "backend", score: 71, initial: 4, rank: 4, chips: ["strong reviews"] },
  { handle: "@marco-b", role: "frontend", score: 63, initial: 2, rank: 5, chips: ["portfolio depth"] },
];

const steps = [
  { n: "01", title: "Read the candidates", body: "Every applicant comes in as raw signal — a resume, a handle, a link. Unread and unranked." },
  { n: "02", title: "Rank on real evidence", body: "We pull actual work — commits, PR reviews, test discipline, issue history — and score depth, not keywords." },
  { n: "03", title: "Assess on real work", body: "The top few enter a live, sandboxed codebase. Fix a bug, ship a change. An adaptive AI probes what they actually do — nothing to memorize." },
  { n: "04", title: "Hand you the shortlist", body: "A ranked shortlist with a plain-English reason and the gaps for every name. Mindfries recommends. You decide." },
];

function Row({ c, p }: { c: Cand; p: MotionValue<number> }) {
  const y = useTransform(p, [0.62, 0.82], [c.initial * ROW, c.rank * ROW]);
  const scoreMV = useTransform(p, [0.26, 0.46], [0, c.score]);
  const score = useTransform(scoreMV, (v) => Math.round(v));
  const dataOpacity = useTransform(p, [0.28, 0.44], [0, 1]);
  const borderA = useTransform(
    p,
    [0.24, 0.44, 0.82, 0.9],
    [0.08, 0.16, 0.16, c.rank === 0 ? 0.42 : 0.16],
  );
  const border = useMotionTemplate`1px solid rgba(23,20,15,${borderA})`;
  const bgA = useTransform(p, [0.82, 0.92], [0, c.rank === 0 ? 0.06 : 0]);
  const bg = useMotionTemplate`rgba(124,58,237,${bgA})`;
  const rankOpacity = useTransform(p, [0.8, 0.92], [0, 1]);

  return (
    <motion.div
      style={{ y, border, background: bg }}
      className="absolute inset-x-0 flex h-[58px] items-center gap-3 rounded-xl bg-bg/70 px-4 backdrop-blur-sm"
    >
      <motion.span style={{ opacity: rankOpacity }} className="mono w-6 text-sm text-accent">
        #{c.rank + 1}
      </motion.span>
      <div className="min-w-0 flex-1">
        <div className="mono truncate text-sm text-ink">{c.handle}</div>
        <div className="mono text-[0.7rem] text-faint">{c.role}</div>
      </div>
      <motion.div
        style={{ opacity: dataOpacity }}
        className="hidden items-center gap-1.5 sm:flex"
      >
        {c.chips.map((chip) => (
          <span
            key={chip}
            className="mono rounded-md border border-hair bg-bg/60 px-2 py-1 text-[0.68rem] text-dim"
          >
            {chip}
          </span>
        ))}
      </motion.div>
      <div className="mono w-11 shrink-0 text-right text-lg font-semibold text-accent">
        <motion.span style={{ opacity: dataOpacity }}>{score}</motion.span>
      </div>
    </motion.div>
  );
}

function Terminal({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.48, 0.56, 0.6, 0.66], [0, 1, 1, 0]);
  const yv = useTransform(p, [0.48, 0.58], [16, 0]);
  const l1 = useTransform(p, [0.5, 0.53], [0, 1]);
  const l2 = useTransform(p, [0.53, 0.56], [0, 1]);
  const l3 = useTransform(p, [0.56, 0.59], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y: yv, pointerEvents: "none" }}
      className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2"
    >
      <div className="hair-card overflow-hidden rounded-xl">
        <div className="flex items-center gap-2 border-b border-hair bg-surface-2 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="mono ml-2 text-xs text-faint">
            sandbox · payments-service/refund.ts
          </span>
        </div>
        <div className="mono space-y-1.5 p-4 text-[0.78rem] leading-relaxed">
          <motion.div style={{ opacity: l1 }} className="text-dim">
            <span className="text-red-600/80">- if (amount &gt; balance) return;</span>
          </motion.div>
          <motion.div style={{ opacity: l2 }} className="text-dim">
            <span className="text-accent">+ if (amount &gt; balance) throw new RefundError();</span>
          </motion.div>
          <motion.div style={{ opacity: l3 }} className="flex items-center gap-2 pt-1 text-faint">
            <span className="text-accent">✓</span> running tests… 214 / 214 passed
            <span className="caret" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = v < 0.26 ? 0 : v < 0.48 ? 1 : v < 0.66 ? 2 : 3;
    setActive(idx);
  });

  const stageLabel = ["intake", "evidence ranking", "live assessment", "ranked shortlist"][
    active
  ];

  return (
    <section id="how" ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left: narrative steps */}
          <div>
            <SectionLabel index="02">How it works</SectionLabel>
            <h2 className="mt-6 max-w-md text-balance text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
              From two thousand names to your ten best.
            </h2>
            <div className="mt-10 space-y-1">
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() =>
                    ref.current?.children[0]?.scrollIntoView?.({ behavior: "smooth" })
                  }
                  className="block w-full cursor-default text-left"
                >
                  <div
                    className={`rounded-xl border-l-2 py-3 pl-5 transition-all duration-500 ${
                      active === i
                        ? "border-accent bg-surface/50"
                        : "border-hair opacity-45"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="mono text-xs text-accent">{s.n}</span>
                      <span className="text-lg font-medium text-ink">{s.title}</span>
                    </div>
                    <motion.p
                      animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                      className="overflow-hidden text-sm leading-relaxed text-dim"
                    >
                      <span className="block pt-2">{s.body}</span>
                    </motion.p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: the living visual */}
          <div className="hair-card relative rounded-2xl p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-hair pb-3">
              <span className="mono text-xs text-dim">candidate pipeline</span>
              <span className="mono flex items-center gap-2 text-xs text-accent">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                {stageLabel}
              </span>
            </div>
            <div className="relative" style={{ height: candidates.length * ROW - 8 }}>
              {candidates.map((c) => (
                <Row key={c.handle} c={c} p={scrollYProgress} />
              ))}
              <Terminal p={scrollYProgress} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-hair pt-3">
              <span className="mono text-xs text-faint">
                mindfries recommends — you decide
              </span>
              <span className="mono rounded-md border border-hair-bright bg-surface px-2.5 py-1 text-[0.68rem] text-ink">
                human final ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
