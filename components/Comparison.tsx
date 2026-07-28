"use client";

import { Reveal } from "./primitives";

const oldPipe = ["Resume", "Keyword match", "Single opaque score", "Hand to recruiter"];
const newPipe = ["Public evidence + real work", "Ranked on demonstrated depth", "Plain-English reasons + gaps", "Human decides"];

function Flow({ steps, accent }: { steps: string[]; accent?: boolean }) {
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <span
            className={`mono grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs ${
              accent
                ? "border border-accent-soft bg-accent-soft text-accent"
                : "border border-hair bg-surface text-faint"
            }`}
          >
            {i + 1}
          </span>
          <span className={`text-sm ${accent ? "text-ink" : "text-dim"}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-hair bg-bg p-8">
              <div className="mono text-xs uppercase tracking-widest text-faint">
                the old pipeline
              </div>
              <h3 className="mt-2 text-xl font-medium text-dim">
                Every ATS treats hiring as document-matching.
              </h3>
              <div className="mt-6">
                <Flow steps={oldPipe} />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-hair-bright bg-surface p-8">
              <div className="ambient pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="mono text-xs uppercase tracking-widest text-accent">
                  mindfries
                </div>
                <h3 className="mt-2 text-xl font-medium text-ink">
                  A system of understanding, not a scanner.
                </h3>
                <div className="mt-6">
                  <Flow steps={newPipe} accent />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-dim">
            We studied <span className="text-ink">21 hiring platforms</span> — ATS, talent
            intelligence, AI recruiters. None read real work{" "}
            <span className="text-ink">and</span> explain themselves. That gap is the whole
            product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
