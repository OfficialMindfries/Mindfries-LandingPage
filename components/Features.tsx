"use client";

import { motion } from "framer-motion";
import { Reveal, stagger, item } from "./primitives";

const bars = [
  { label: "commits", w: 0.94 },
  { label: "PR reviews", w: 0.82 },
  { label: "test cov", w: 0.88 },
  { label: "issues", w: 0.7 },
];

const ring = ["PN", "DO", "LW", "TM", "SQ", "MB", "AR", "JK"];

// Mini product mockups, all CSS/SVG — no images.
function RankMock() {
  return (
    <div className="rounded-xl border border-hair bg-surface-2/60 p-4">
      <div className="mono mb-3 text-[0.7rem] text-faint">evidence score · @priya-nair</div>
      <div className="space-y-2.5">
        {bars.map((b, i) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="mono w-20 shrink-0 text-[0.7rem] text-dim">{b.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
              <motion.span
                className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${b.w * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-hair bg-[#15161b]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-accent/70" />
        <span className="mono ml-2 text-[0.65rem] text-white/40">sandbox · refund.ts</span>
      </div>
      <div className="mono space-y-1 p-3 text-[0.68rem] leading-relaxed">
        <div className="text-rose-400/80">- if (amount &gt; balance) return;</div>
        <div className="text-emerald-300">+ if (amount &gt; balance) throw new RefundError();</div>
        <div className="flex items-center gap-1.5 pt-1 text-white/50">
          <span className="text-emerald-400">✓</span> tests 214 / 214
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}

function TableMock() {
  const rows = [
    { h: "@priya-nair", r: "backend", s: 94 },
    { h: "@d-okafor", r: "platform", s: 89 },
    { h: "@leiwang", r: "ml", s: 84 },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-hair bg-surface-2/60">
      <div className="flex items-center justify-between border-b border-hair px-4 py-2.5">
        <span className="mono text-[0.7rem] text-ink">shortlist</span>
        <span className="mono text-[0.65rem] text-faint">ranked · 2,481 → 10</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={row.h}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="flex items-center gap-3 border-b border-hair px-4 py-2.5 last:border-0"
        >
          <span className="mono text-xs text-accent">#{i + 1}</span>
          <div className="min-w-0 flex-1">
            <div className="mono truncate text-xs text-ink">{row.h}</div>
            <div className="mono text-[0.65rem] text-faint">{row.r}</div>
          </div>
          <span className="mono text-sm font-semibold text-accent">{row.s}</span>
        </motion.div>
      ))}
    </div>
  );
}

function RingMock() {
  return (
    <div className="relative mx-auto h-44 w-44">
      <div className="tile tile-violet absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M22 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      </div>
      {ring.map((r, i) => {
        const angle = (i / ring.length) * Math.PI * 2;
        const rad = 76;
        const x = Math.cos(angle) * rad;
        const y = Math.sin(angle) * rad;
        return (
          <motion.div
            key={r}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i, type: "spring", stiffness: 260, damping: 18 }}
            className="absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full border border-hair-bright bg-surface"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <span className="mono text-[0.6rem] text-accent">{r}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Features() {
  return (
    <section id="difference" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
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
            <h3 className="mt-5 text-xl font-semibold text-ink">Rank on real evidence</h3>
            <p className="mt-2 max-w-lg text-sm text-dim">
              Commits, PR reviews, test discipline, issue history — scored for demonstrated
              depth, matched semantically so &ldquo;LangGraph&rdquo; reads as
              &ldquo;AI agents&rdquo; even when the words differ.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card p-6">
            <TerminalMock />
            <h3 className="mt-5 text-xl font-semibold text-ink">Assess on live code</h3>
            <p className="mt-2 text-sm text-dim">
              Top candidates fix a real bug in a sandboxed repo while an adaptive AI probes
              their thinking. Nothing to cram.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card p-6">
            <TableMock />
            <h3 className="mt-5 text-xl font-semibold text-ink">Explainable shortlist</h3>
            <p className="mt-2 text-sm text-dim">
              Every name arrives with a plain-English reason and its gaps. Mindfries
              recommends — never auto-rejects.
            </p>
          </motion.div>

          <motion.div variants={item} className="hair-card flex flex-col items-center justify-center p-6 text-center lg:col-span-2">
            <RingMock />
            <h3 className="mt-5 text-xl font-semibold text-ink">Your whole panel, aligned</h3>
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
