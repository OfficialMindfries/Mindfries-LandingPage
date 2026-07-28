"use client";

import { Reveal, SectionLabel } from "./primitives";

const points = [
  { title: "Never an auto-reject", body: "Mindfries surfaces evidence and ranks. A human reviews every shortlist and makes every call." },
  { title: "Explainable by design", body: "Each ranking traces to specific, checkable evidence — not a hidden model output you have to trust blindly." },
  { title: "Built to reduce bias", body: "Evidence over pedigree. We weigh what someone has actually shipped, not which university brand is on the resume." },
];

export default function Ethics() {
  return (
    <section className="relative border-y border-hair py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div>
              <SectionLabel index="04">Trust</SectionLabel>
              <h2 className="mt-6 text-balance text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
                A recommendation engine — not a decision-maker.
              </h2>
              <p className="mt-5 text-lg text-dim">
                Hiring decisions carry real weight, and real legal exposure. Mindfries is
                designed to keep humans firmly in the loop.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="hair-card flex gap-5 rounded-2xl p-6">
                  <span className="mono mt-0.5 text-sm text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-dim">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
