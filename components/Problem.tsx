"use client";

import { motion } from "framer-motion";
import { AnimatedNumber, Reveal, SectionLabel, stagger, item } from "./primitives";

const stats = [
  { value: 2000, suffix: "+", label: "applications for a single role", sub: "and no consistent way to triage them" },
  { value: 10, suffix: "%", label: "of applicants meet basic criteria", sub: '"a waste of time for them, and for me" — ScInter' },
  { value: 20, suffix: "h", label: "of engineer time burned per role", sub: "interviewing across rounds is a real cost" },
  { value: 1, prefix: "1 in ", label: "hires still miss the mark", sub: "even after a full, structured process", raw: "3" },
  { value: 27, suffix: "M", label: "qualified people filtered out", sub: "screened out by ATS keyword matching — Harvard" },
];

export default function Problem() {
  return (
    <section id="problem" className="relative border-b border-hair py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="01">The problem</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            Hiring tools filter on the{" "}
            <span className="text-dim">wrong signal.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-dim">
            Resumes are self-reported. Keyword matching rejects strong people who simply
            don&apos;t write like the job description. DSA rounds reward memorization. The
            real evidence of who can do the work lives somewhere else entirely.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="group bg-bg p-7 transition-colors hover:bg-surface"
            >
              <div className="mono text-4xl font-semibold tracking-tight text-ink">
                {s.raw ? (
                  <>
                    1 in <span className="text-accent">{s.raw}</span>
                  </>
                ) : (
                  <span className="text-accent">
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                )}
              </div>
              <div className="mt-3 text-sm font-medium text-ink">{s.label}</div>
              <div className="mt-1 text-sm text-faint">{s.sub}</div>
            </motion.div>
          ))}

          {/* Quote cell fills the grid */}
          <motion.div
            variants={item}
            className="flex flex-col justify-center bg-surface p-7"
          >
            <p className="text-balance text-lg leading-snug text-ink">
              &ldquo;I can claim I built Google in my resume now — and it will sound
              genuine.&rdquo;
            </p>
            <span className="mono mt-3 text-xs uppercase tracking-widest text-faint">
              Neeraj Agarwal · AlgoScale
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
