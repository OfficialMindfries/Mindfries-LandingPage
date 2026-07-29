"use client";

import { Reveal } from "./primitives";
import WaitlistForm from "./WaitlistForm";

export default function CTA() {
  return (
    <section id="access" className="relative overflow-hidden border-t border-hair">
      <div className="ambient pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
        <Reveal>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-hair bg-surface/60 px-3 py-1.5">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="eyebrow !tracking-[0.18em]">early access · 2026</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Hire on evidence.
            <br />
            <span className="text-dim">Not on keywords.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-dim">
            Join the waitlist, or tell us you&apos;re hiring engineers now and come in as a
            design partner. We ship the MVP in October.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
