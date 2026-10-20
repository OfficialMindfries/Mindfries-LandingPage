"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Fit, MaskLine, Rise, Scene, useBeat, useScene } from "./primitives";

/* Footer links. Only items with a real destination are rendered — add an
   href here when a page exists (e.g. Careers, Blog, Privacy, Security, Terms). */
const cols: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Evidence ranking", href: "#how-it-works" },
      { label: "Live assessment", href: "#how-it-works" },
      { label: "Shortlist", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Design partners", href: "#design-partners" },
      { label: "Careers" },
      { label: "Blog" },
      { label: "Contact", href: "#access" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "CLI docs", href: "/docs" },
      { label: "Waitlist", href: "#access" },
      { label: "Privacy" },
      { label: "Security" },
      { label: "Terms" },
    ],
  },
];

/* Social profiles. Empty URLs are hidden. */
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mindfries/",
    icon: <path d="M7 10v7M7 7v.01M11 17v-7m0 3.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V17" strokeWidth={2.1} />,
  },
  {
    label: "X",
    href: "https://x.com/mindfries",
    icon: <path d="m5 5 14 14M19 5 5 19" strokeWidth={2} />,
  },
];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image src="/logo.png" alt="Mindfries logo" width={size} height={size} className="rounded-full" />
      <span className="text-[22px] font-semibold tracking-tight text-[#1e1b4b]">Mindfries</span>
    </span>
  );
}

/* Dreamy violet landscape: a glowing orb, layered hills and a misty horizon.
   The orb and the hills rise at different speeds, like a sunrise. */
function Landscape({ orb, orbScale, hills }: { orb: MotionValue<number>; orbScale: MotionValue<number>; hills: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden" aria-hidden>
      {/* orb */}
      <motion.div
        style={{ y: orb, scale: orbScale }}
        className="absolute -right-[12%] -top-[28%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(237,233,254,0.85)_35%,rgba(196,181,253,0.55)_65%,rgba(167,139,250,0.35))] shadow-[inset_0_0_80px_rgba(255,255,255,0.8)]"
      />
      <span className="absolute right-[18%] top-[30%] h-64 w-64 rounded-full bg-amber-100/60 blur-[90px]" />
      <motion.svg style={{ y: hills }} className="absolute inset-x-0 bottom-0 h-[340px] w-full" viewBox="0 0 1600 340" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="hillB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M0 240 C 120 200, 220 230, 320 250 L 0 260 Z" fill="url(#hillA)" />
        <path d="M600 250 C 700 200, 820 205, 900 245 C 960 250, 1000 255, 1040 250 L 600 260 Z" fill="url(#hillA)" />
        <path d="M980 250 C 1100 170, 1200 160, 1290 210 C 1350 150, 1450 100, 1600 70 L 1600 260 L 980 260 Z" fill="url(#hillB)" />
        <path d="M1150 255 C 1260 200, 1360 190, 1440 220 C 1500 200, 1560 190, 1600 195 L 1600 260 L 1150 260 Z" fill="#7c3aed" fillOpacity="0.35" />
        <rect x="0" y="240" width="1600" height="100" fill="url(#mist)" />
      </motion.svg>
    </div>
  );
}

/**
 * Scene "Sunrise": the last page pins while the orb climbs and the hills
 * lift beneath it, the closing headline rises out of its masks line by
 * line, and the links settle in underneath.
 */
export default function Footer() {
  return (
    <Scene
      as="footer"
      length={1.9}
      className="bg-gradient-to-b from-[#f7f4ff] via-white to-[#faf8ff] px-6 lg:pt-20 lg:px-12"
    >
      <FooterContent />
    </Scene>
  );
}

function FooterContent() {
  const p = useScene();
  const sky = useBeat(p, 0, 0.62);
  const orb = useTransform(sky, [0, 1], [320, 0]);
  const orbScale = useTransform(sky, [0, 1], [0.8, 1]);
  const hills = useTransform(useBeat(p, 0.06, 0.58), [0, 1], [180, 0]);

  const logo = useBeat(p, 0.06, 0.2);
  const l1 = useBeat(p, 0.12, 0.32);
  const l2 = useBeat(p, 0.2, 0.4);
  const l3 = useBeat(p, 0.28, 0.48);
  const cta = useBeat(p, 0.4, 0.56);
  const links = useBeat(p, 0.54, 0.72);
  const base = useBeat(p, 0.64, 0.8);

  return (
    <>
      <Landscape orb={orb} orbScale={orbScale} hills={hills} />

      <Fit className="relative">
      <div className="relative mx-auto max-w-6xl">
        {/* closing call to action */}
        <div className="pb-24 pt-20 sm:pb-32 sm:pt-24 lg:pb-14 lg:pt-2">
          <Rise p={logo} y={12}>
            <Logo />
          </Rise>
          <h2 className="mt-10 max-w-2xl text-[clamp(2.6rem,5.6vw,4.75rem)] !font-serif !font-normal !leading-[1.04] !tracking-[-0.02em] text-[#1e1b4b]">
            <MaskLine p={l1}>A better way</MaskLine>
            <MaskLine p={l2}>
              to hire <span className="font-semibold">engineers</span>
            </MaskLine>
            <MaskLine p={l3}>
              is{" "}
              <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-1 font-semibold italic text-transparent">
                possible
              </em>
              .
            </MaskLine>
          </h2>
          <Rise p={cta} y={20}>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-dim">
            Join forward-thinking teams building with engineering evidence.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#access"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0f172a] px-7 py-4 text-[15px] font-medium text-white shadow-[0_16px_34px_-14px_rgba(76,29,149,0.6)] transition-transform hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                <path d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
              Book a call
              <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#access"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-hair-bright bg-white/80 px-7 py-4 text-[15px] font-medium text-ink backdrop-blur transition-colors hover:bg-white"
            >
              Join waitlist
              <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          </Rise>
        </div>

        <Rise p={links} y={30}>
        <div className="grid gap-12 pb-12 lg:pb-8 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo size={30} />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-dim">
              Hiring intelligence built on real engineering evidence.
            </p>
            <div className="mt-6 flex gap-3">
              {socials
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Mindfries on ${s.label}`}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-hair bg-white text-ink/80 shadow-sm transition-all hover:-translate-y-0.5 hover:text-accent"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
                      {s.icon}
                    </svg>
                  </a>
                ))}
            </div>
          </div>

          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-slate-500">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links
                  .filter((l) => l.href)
                  .map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-[15px] text-ink/85 transition-colors hover:text-accent">
                        {l.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
        </div>

        </Rise>

        <Rise p={base} y={16}>
        <div className="flex flex-col gap-3 border-t border-hair py-7 lg:py-5 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Mindfries. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Built for a more open engineering world.
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>
        </Rise>
      </div>
      </Fit>
    </>
  );
}
