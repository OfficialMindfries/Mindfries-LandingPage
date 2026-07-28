"use client";

import { motion } from "framer-motion";
import { Reveal, SectionLabel, stagger, item } from "./primitives";

export default function Pillars() {
  return (
    <section id="difference" className="relative border-y border-hair py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel index="03">Why Mindfries</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            Three things every other tool skips.
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 lg:grid-cols-3"
        >
          {/* Pillar 1 — large, with code */}
          <motion.div
            variants={item}
            className="hair-card rounded-2xl p-7 lg:col-span-2 lg:row-span-1"
          >
            <div className="mono text-xs text-accent">01 · evidence over keywords</div>
            <h3 className="mt-3 text-2xl font-medium text-ink">
              We read the work, not the buzzwords.
            </h3>
            <p className="mt-3 max-w-lg text-dim">
              A resume is a claim. GitHub, portfolios, and real code are proof. Mindfries
              ranks on demonstrated depth — commit consistency, review quality, test
              discipline — and understands skills semantically, so &ldquo;LangGraph
              pipelines&rdquo; matches &ldquo;AI agent development&rdquo; even when the
              words don&apos;t.
            </p>
            <div className="mono mt-6 space-y-1.5 rounded-xl border border-hair bg-bg/60 p-4 text-sm">
              <div className="text-faint"># keyword match</div>
              <div className="text-red-600/70">&ldquo;LangGraph&rdquo; ≠ &ldquo;AI agent development&rdquo; → rejected</div>
              <div className="pt-2 text-faint"># mindfries</div>
              <div className="text-accent">
                semantic + evidence → strong match, 2yr production history
              </div>
            </div>
          </motion.div>

          {/* Pillar 2 — tall */}
          <motion.div variants={item} className="hair-card rounded-2xl p-7">
            <div className="mono text-xs text-accent">02 · real work, not trivia</div>
            <h3 className="mt-3 text-2xl font-medium text-ink">
              A codebase, not a memorized puzzle.
            </h3>
            <p className="mt-3 text-dim">
              Candidates fix a real bug or ship a small feature in a sandboxed repo while an
              adaptive AI probes their thinking. Every follow-up is generated from what they
              just did — so there&apos;s no script to cram.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={item} className="hair-card rounded-2xl p-7">
            <div className="mono text-xs text-accent">03 · explainable & human-final</div>
            <h3 className="mt-3 text-2xl font-medium text-ink">
              Reasons, not a black-box score.
            </h3>
            <p className="mt-3 text-dim">
              Every candidate arrives with a plain-English case and the gaps. Mindfries
              recommends and ranks — it never auto-rejects. Your team always makes the call.
            </p>
          </motion.div>

          {/* Wide closing quote card */}
          <motion.div
            variants={item}
            className="flex flex-col justify-center rounded-2xl border border-accent-soft bg-accent-soft p-7 lg:col-span-2"
          >
            <p className="text-balance text-xl leading-snug text-ink">
              &ldquo;So many hiring tools become junk software — they add work instead of
              removing it.&rdquo;
            </p>
            <span className="mono mt-3 text-xs uppercase tracking-widest text-dim">
              Kamal Chandran · HR, GoQii
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
