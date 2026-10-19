"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { Fit, MaskLine, Rise, Scene, useBeat, useDesktop, useScene } from "./primitives";

/* ---- FAQs ----
   Answers only restate what the rest of the site already says. */

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What is Mindfries?",
    a: "Mindfries is hiring intelligence for engineering roles. It reads the work candidates have actually done, matches it to what your role needs, assesses top candidates on live code with an AI interviewer, and hands you a ranked, explainable shortlist.",
  },
  {
    q: "How is it different from an ATS?",
    a: "An ATS tracks applicants and filters them on keywords. Mindfries isn't another ATS: it evaluates evidence of real engineering skill, so strong engineers don't get lost to keyword filters or polished CVs.",
  },
  {
    q: "What does Mindfries look at?",
    a: "Real work: GitHub and GitLab repositories, pull requests and reviews, portfolios and project links, then the results of a live, role-specific assessment. Every score shows the evidence behind it.",
  },
  {
    q: "Does Mindfries reject candidates automatically?",
    a: "No. Mindfries recommends and your team decides. Every candidate comes with a plain-English reason for their rank and the gaps we saw, and a human always makes the final call.",
  },
  {
    q: "What does the assessment involve?",
    a: "Strong matches work on a real task in a live coding workspace, then talk it through with an AI interviewer. It covers coding, system design and reasoning: real problems, not memorised puzzles.",
  },
  {
    q: "What if a candidate doesn't have much public code?",
    a: "Public work is a starting signal, not a requirement. The live assessment gives every candidate the same chance to show how they actually build.",
  },
  {
    q: "How much does it cost?",
    a: "Starter is $199/month for up to 5 active roles, Growth is $499/month for up to 20, and Enterprise is custom. Paying annually saves 20%. See the pricing section for everything included.",
  },
  {
    q: "Can we become a design partner?",
    a: "Yes. We're building Mindfries with engineering teams who are hiring now. Book a short call and we'll walk through what partnering looks like.",
  },
];

function Item({ q, a, open, onToggle, i }: { q: string; a: string; open: boolean; onToggle: () => void; i: number }) {
  const id = `faq-${i}`;
  return (
    <div
      className={`rounded-3xl border transition-colors duration-500 ${
        open ? "border-violet-200 bg-white shadow-[0_24px_50px_-32px_rgba(76,29,149,0.5)]" : "border-hair bg-white/60 hover:bg-white/90"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center gap-4 px-6 py-5 text-left lg:py-4"
        >
          <span className={`flex-1 text-[16.5px] font-medium ${open ? "text-[#1e1b4b]" : "text-ink/85"}`}>{q}</span>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
              open ? "bg-accent text-white" : "bg-violet-100 text-accent"
            }`}
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.35, ease }}
              aria-hidden
            >
              <path d="M12 4v16M4 12h16" />
            </motion.svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <p className="px-6 pb-6 pr-16 text-[15px] leading-relaxed text-dim lg:pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Scene "Guided tour": on desktop the page pins and, as you keep scrolling,
 * the questions open one after another while a rail beside the list fills
 * up. Clicking a question still opens it; the next scroll step moves on.
 */
export default function FAQ() {
  return (
    <Scene
      id="faq"
      length={3.2}
      className="px-6 py-16 sm:py-20 lg:pb-10 lg:pt-24 lg:px-12 [background:radial-gradient(46rem_30rem_at_0%_0%,rgba(124,58,237,0.09),transparent_65%),radial-gradient(40rem_30rem_at_100%_100%,rgba(124,58,237,0.07),transparent_60%)]"
    >
      <Fit>
        <FAQContent />
      </Fit>
    </Scene>
  );
}

function FAQContent() {
  const [open, setOpen] = useState<number | null>(0);
  const p = useScene();
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const tour = desktop && !reduce;

  const eyebrow = useBeat(p, 0, 0.1);
  const line1 = useBeat(p, 0.02, 0.18);
  const line2 = useBeat(p, 0.08, 0.24);
  const rest = useBeat(p, 0.16, 0.3);
  const list = useBeat(p, 0.1, 0.26);
  const listY = useTransform(list, [0, 1], [60, 0]);

  // The tour: which question the scroll has reached
  const travel = useBeat(p, 0.26, 0.94);
  const step = useTransform(travel, (v) => Math.min(faqs.length - 1, Math.floor(v * faqs.length)));
  useMotionValueEvent(step, "change", (i) => {
    if (tour) setOpen(i);
  });

  return (
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="lg:self-center">
          <Rise p={eyebrow} y={10}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/70 px-4 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink/70">FAQs</span>
            </span>
          </Rise>
          <h2 className="mt-5 text-[clamp(2.3rem,4.4vw,3.9rem)] !font-serif !font-semibold !leading-[1.04] !tracking-[-0.02em] text-[#1e1b4b]">
            <MaskLine p={line1}>Questions,</MaskLine>
            <MaskLine p={line2}>
              <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-2 italic text-transparent">answered.</em>
            </MaskLine>
          </h2>
          <Rise p={rest} y={18}>
            <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed text-dim">
              Everything teams usually ask before hiring with Mindfries. Can&rsquo;t find yours?
            </p>
            <a
              href="#access"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#0f172a] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_16px_34px_-14px_rgba(76,29,149,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Ask us on a call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </Rise>
        </div>

        <motion.div style={{ opacity: list, y: listY }} className="relative">
          {/* tour progress rail */}
          {tour && (
            <span className="absolute -left-6 bottom-2 top-2 hidden w-px overflow-hidden bg-violet-100 lg:block">
              <motion.span style={{ scaleY: travel }} className="absolute inset-0 origin-top bg-violet-500" />
            </span>
          )}
          <div className="space-y-3 lg:space-y-2.5">
            {faqs.map((f, i) => (
              <Item key={f.q} q={f.q} a={f.a} i={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
        </motion.div>
      </div>
  );
}
