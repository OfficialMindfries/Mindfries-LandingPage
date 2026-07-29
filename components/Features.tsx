"use client";

import { motion } from "framer-motion";
import { Reveal, stagger, item, AnimatedNumber } from "./primitives";

const bars = [
  { label: "commits", w: 0.94, c: "from-violet-400 to-violet-600" },
  { label: "PR reviews", w: 0.82, c: "from-violet-400 to-violet-600" },
  { label: "test cov", w: 0.88, c: "from-orange-300 to-rose-500" },
  { label: "issues", w: 0.7, c: "from-orange-300 to-rose-500" },
];

const ring = ["PN", "DO", "LW", "TM", "SQ", "MB", "AR", "JK"];
const ringGrads = [
  "from-violet-400 to-violet-600",
  "from-orange-300 to-rose-500",
  "from-sky-300 to-cyan-500",
  "from-fuchsia-300 to-violet-500",
  "from-amber-300 to-orange-500",
  "from-emerald-300 to-teal-500",
  "from-violet-400 to-violet-600",
  "from-sky-300 to-cyan-500",
];

/* A pill that pops in on scroll, then floats gently (float on inner el so the
   CSS keyframe transform doesn't fight framer's). */
function FloatChip({
  children,
  className,
  float = "float-a",
}: {
  children: React.ReactNode;
  className?: string;
  float?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`absolute z-20 ${className ?? ""}`}
    >
      <div
        className={`${float} flex items-center gap-1.5 rounded-full border border-hair-bright bg-surface px-2.5 py-1 shadow-[0_10px_24px_-10px_rgba(20,22,30,0.45)]`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function RankMock() {
  return (
    <div className="relative">
      {/* layered card peeking behind */}
      <div
        className="absolute right-0 top-0 h-full w-full rounded-2xl border border-hair bg-surface-2/50"
        style={{ transform: "rotate(2.5deg) translate(6px,-6px)" }}
        aria-hidden
      />
      <div className="relative rounded-2xl border border-hair bg-surface p-5 shadow-[0_22px_50px_-30px_rgba(20,22,30,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="mono text-[0.7rem] text-faint">evidence score · @priya-nair</div>
          <div className="flex items-baseline gap-1">
            <AnimatedNumber value={94} className="text-2xl font-bold leading-none text-ink" />
            <span className="text-xs font-bold text-emerald-500">↑</span>
          </div>
        </div>
        <div className="space-y-3">
          {bars.map((b, i) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="mono w-20 shrink-0 text-[0.7rem] text-dim">{b.label}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <motion.span
                  className={`block h-full rounded-full bg-gradient-to-r ${b.c}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.w * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + 0.15 * i }}
                className="mono w-7 text-right text-[0.65rem] text-faint"
              >
                {Math.round(b.w * 100)}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
      <FloatChip className="right-3 top-6" float="float-b">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
        <span className="mono text-[0.65rem] text-ink">Top 4%</span>
      </FloatChip>
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-hair bg-[#15161b] shadow-[0_22px_50px_-30px_rgba(20,22,30,0.7)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-accent/70" />
          <span className="mono ml-2 text-[0.65rem] text-white/40">sandbox · refund.ts</span>
        </div>
        <div className="mono space-y-1 p-3 text-[0.68rem] leading-relaxed">
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-rose-400/80"
          >
            - if (amount &gt; balance) return;
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-emerald-300"
          >
            + if (amount &gt; balance) throw new RefundError();
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-1.5 pt-1 text-white/50"
          >
            <span className="text-emerald-400">✓</span> tests 214 / 214
            <span className="caret" />
          </motion.div>
        </div>
      </div>
      <FloatChip className="-bottom-3 right-4" float="float-c">
        <span className="text-emerald-500">✓</span>
        <span className="mono text-[0.65rem] text-ink">all passing</span>
      </FloatChip>
    </div>
  );
}

function TableMock() {
  const rows = [
    { h: "@priya-nair", r: "backend", s: 94, g: "from-violet-400 to-violet-600" },
    { h: "@d-okafor", r: "platform", s: 89, g: "from-orange-300 to-rose-500" },
    { h: "@leiwang", r: "ml", s: 84, g: "from-sky-300 to-cyan-500" },
  ];
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-hair bg-surface shadow-[0_22px_50px_-30px_rgba(20,22,30,0.5)]">
        <div className="flex items-center justify-between border-b border-hair px-4 py-2.5">
          <span className="mono text-[0.7rem] text-ink">shortlist</span>
          <span className="mono text-[0.65rem] text-faint">ranked</span>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.h}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-2.5 border-b border-hair px-4 py-2.5 last:border-0 ${
              i === 0 ? "bg-accent-soft" : ""
            }`}
          >
            <span className="mono w-4 text-xs text-accent">#{i + 1}</span>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br ${row.g} text-[0.6rem] font-bold text-white`}>
              {row.h.replace("@", "").split("-").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mono truncate text-xs text-ink">{row.h}</div>
              <div className="mono text-[0.65rem] text-faint">{row.r}</div>
            </div>
            <span className="mono text-sm font-semibold text-accent">{row.s}</span>
          </motion.div>
        ))}
      </div>
      <FloatChip className="-top-3 right-4" float="float-a">
        <span className="mono text-[0.65rem] text-ink">2,481 → 10</span>
      </FloatChip>
    </div>
  );
}

function RingMock() {
  const R = 66;
  const C = 88;
  const pts = ring.map((r, i) => {
    const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
    return { r, x: Math.cos(a) * R, y: Math.sin(a) * R };
  });
  return (
    <div className="relative mx-auto h-44 w-44">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 176 176" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-hair)" strokeWidth="1" strokeDasharray="3 5" />
        {pts.map((p, i) => (
          <motion.line
            key={i}
            x1={C}
            y1={C}
            x2={C + p.x}
            y2={C + p.y}
            stroke="var(--color-hair-bright)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i, duration: 0.4 }}
          />
        ))}
      </svg>
      <div className="tile tile-violet absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 !rounded-2xl shadow-[0_16px_36px_-16px_rgba(124,58,237,0.6)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M22 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      </div>
      {pts.map((p, i) => (
        <motion.div
          key={p.r}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + 0.06 * i, type: "spring", stiffness: 260, damping: 18 }}
          className={`absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${ringGrads[i]} text-white shadow-md`}
          style={{ transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))` }}
        >
          <span className="text-[0.6rem] font-bold">{p.r}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <section id="difference" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Reveal>
            <span className="eyebrow">what it does</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl text-ink sm:text-5xl">
              Built for the way you actually hire.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-dim">
              Four moves take two thousand names down to your ten best — on evidence, not
              keywords.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 lg:grid-cols-3"
        >
          <motion.div variants={item} className="hair-card p-6 lg:col-span-2">
            <RankMock />
            <h3 className="mt-8 text-xl font-semibold text-ink">Rank on real evidence</h3>
            <p className="mt-2 max-w-lg text-sm text-dim">
              Commits, PR reviews, test discipline, issue history — scored for demonstrated
              depth, matched semantically so &ldquo;LangGraph&rdquo; reads as
              &ldquo;AI agents&rdquo; even when the words differ.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card p-6">
            <TerminalMock />
            <h3 className="mt-8 text-xl font-semibold text-ink">Assess on live code</h3>
            <p className="mt-2 text-sm text-dim">
              Top candidates fix a real bug in a sandboxed repo while an adaptive AI probes
              their thinking. Nothing to cram.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card p-6">
            <TableMock />
            <h3 className="mt-8 text-xl font-semibold text-ink">Explainable shortlist</h3>
            <p className="mt-2 text-sm text-dim">
              Every name arrives with a plain-English reason and its gaps. Mindfries
              recommends — never auto-rejects.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card flex flex-col items-center justify-center p-6 text-center lg:col-span-2">
            <RingMock />
            <h3 className="mt-6 text-xl font-semibold text-ink">Your whole panel, aligned</h3>
            <p className="mt-2 max-w-md text-sm text-dim">
              One shared view of every candidate&apos;s evidence, so your team decides
              together — and the human always makes the final call.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
