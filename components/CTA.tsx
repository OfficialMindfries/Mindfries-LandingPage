"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import { SCENE_PACE, SCENE_SPRING } from "./primitives";

/* Paste the team's Calendly link here. While it is empty, "Book a call"
   opens the waitlist form instead and the Calendly caption is hidden. */
const CALENDLY_URL = "";

const ease = [0.22, 1, 0.36, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* A headline line that rises out of its own mask as `p` goes 0 → 1 */
function MaskLine({ p, children, className = "" }: { p: MotionValue<number>; children: React.ReactNode; className?: string }) {
  const y = useTransform(p, [0, 1], ["105%", "0%"]);
  const skew = useTransform(p, [0, 1], [6, 0]);
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className={`block ${className}`} style={{ y, skewY: skew }}>
        {children}
      </motion.span>
    </span>
  );
}

function Content({ reveal }: { reveal?: { line1: MotionValue<number>; line2: MotionValue<number>; rest: MotionValue<number> } }) {
  const [waitlist, setWaitlist] = useState(false);
  const one = useMotionValue(1); // static layout: everything fully revealed
  const line1 = reveal?.line1 ?? one;
  const line2 = reveal?.line2 ?? one;
  const rest = reveal?.rest ?? one;
  const restY = useTransform(rest, [0, 1], [24, 0]);

  const button = (
    <>
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </svg>
      Book a call
      <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-1" aria-hidden>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </>
  );
  const buttonCls =
    "group inline-flex items-center gap-3 rounded-full bg-[#0f172a] px-9 py-4 text-[17px] font-medium text-white shadow-[0_18px_40px_-14px_rgba(76,29,149,0.55)] transition-transform hover:-translate-y-0.5";

  return (
    <div className="relative mx-auto max-w-3xl px-6 text-center">
      <motion.div style={{ opacity: rest }} className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/70 px-4 py-2 backdrop-blur">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-ink/70">Early access · 2026</span>
      </motion.div>

      <h2 className="text-[clamp(3rem,9vw,7.5rem)] !leading-[0.98]">
        <MaskLine p={line1} className="text-ink">
          Let&rsquo;s talk
        </MaskLine>
        <MaskLine p={line2} className="bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-400 bg-clip-text text-transparent">
          engineering.
        </MaskLine>
      </h2>

      <motion.div style={{ opacity: rest, y: restY }}>
        <p className="mx-auto mt-7 max-w-xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-dim">
          Hiring engineers? Book a short call to explore becoming a Mindfries design partner.
        </p>

        <div className="mt-10 flex flex-col items-center">
          {CALENDLY_URL ? (
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={buttonCls}>
              {button}
            </a>
          ) : (
            <button type="button" onClick={() => setWaitlist(true)} className={buttonCls}>
              {button}
            </button>
          )}
          {CALENDLY_URL && (
            <p className="mt-4 text-[13px] text-dim">Choose a time that works for you · Powered by Calendly</p>
          )}

          <span className="mt-8 h-px w-10 bg-hair-bright" />

          <AnimatePresence mode="wait" initial={false}>
            {waitlist ? (
              <motion.div
                key="form"
                className="mt-8 w-full"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                <WaitlistForm />
              </motion.div>
            ) : (
              <motion.button
                key="link"
                type="button"
                onClick={() => setWaitlist(true)}
                className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-ink/70 underline decoration-hair-bright underline-offset-4 transition-colors hover:text-ink"
                exit={{ opacity: 0, y: -6 }}
              >
                Join the waitlist instead
                <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-1" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* Soft colour glows that drift as the page scrolls */
function Glows({ p }: { p?: MotionValue<number> }) {
  const still = useMotionValue(0);
  const v = p ?? still;
  const x1 = useTransform(v, [0, 1], ["-8%", "4%"]);
  const y1 = useTransform(v, [0, 1], ["10%", "-6%"]);
  const x2 = useTransform(v, [0, 1], ["8%", "-4%"]);
  const y2 = useTransform(v, [0, 1], ["-12%", "6%"]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.span style={{ x: x1, y: y1 }} className="absolute -left-[10%] top-[15%] h-[55vh] w-[45vw] rounded-full bg-violet-400/25 blur-[90px]" />
      <motion.span style={{ x: x2, y: y2 }} className="absolute -right-[8%] top-[5%] h-[50vh] w-[40vw] rounded-full bg-orange-300/25 blur-[100px]" />
      <motion.span style={{ x: x1, y: y2 }} className="absolute bottom-[-10%] right-[15%] h-[45vh] w-[35vw] rounded-full bg-violet-500/20 blur-[90px]" />
      <svg className="absolute inset-0 h-full w-full text-violet-300/40" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path d="M-50 600 C 300 380, 520 760, 900 520 S 1450 300, 1650 420" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M-50 260 C 260 120, 600 420, 1000 260 S 1500 80, 1650 160" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * CTA — "Let's talk engineering." with its own pinned scroll scene.
 *
 * The section is ~2.4 screens (times SCENE_PACE) tall with a sticky full-screen stage. As you
 * scroll through it, the stage opens from a rounded, inset card to a
 * full-bleed canvas (clip-path), the glows drift, the two headline lines
 * rise out of their masks one after the other, and the copy and actions
 * settle in last. The final third holds the finished page still.
 */
export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, SCENE_SPRING);

  const inset = useTransform(p, [0, 0.4], [12, 0]);
  const radius = useTransform(p, [0, 0.4], [48, 0]);
  const clipPath = useTransform(() => `inset(${inset.get()}% ${inset.get() * 0.8}% round ${radius.get()}px)`);
  const stageScale = useTransform(p, [0, 0.4], [0.92, 1]);

  const line1 = useTransform(p, [0.12, 0.38], [0, 1]);
  const line2 = useTransform(p, [0.22, 0.5], [0, 1]);
  const rest = useTransform(p, [0.42, 0.62], [0, 1]);

  if (reduce) {
    return (
      <section id="access" className="relative overflow-hidden bg-white py-32">
        <Glows />
        <Content />
      </section>
    );
  }

  return (
    <section id="access" ref={ref} className="relative" style={{ height: `${2.4 * SCENE_PACE * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 bg-white" style={{ clipPath }}>
          <Glows p={p} />
          <motion.div className="flex h-full items-center justify-center pt-16" style={{ scale: stageScale }}>
            <Content reveal={{ line1, line2, rest }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
