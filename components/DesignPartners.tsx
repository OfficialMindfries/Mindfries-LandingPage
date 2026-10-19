"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { Fit, MaskLine, Rise, Scene, useBeat, useDesktop, useScene } from "./primitives";

/* ---- Design partners: three pinned scenes ----
   1. PartnersIntro    – who we're building with, by sector ("Word by word")
   2. PartnerVoices    – what each design partner told us ("Horizontal ride")
   3. JoinConversation – the partner teams + a call to join them ("Assemble")
   Everything here comes from real design-partner conversations. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, size = 16, className }: { children: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      {children}
    </svg>
  );
}

type Partner = {
  name: string;
  role: string;
  company: string;
  grad: string;
  note: string;
};

const partners: Partner[] = [
  {
    name: "Kamal Chandran",
    role: "HR Manager",
    company: "GOQii",
    grad: "from-violet-400 to-violet-600",
    note: "Joined as a design partner to shape how Mindfries fits a real HR hiring workflow.",
  },
  {
    name: "Luke Campbell",
    role: "Founder",
    company: "VXT AI",
    grad: "from-sky-400 to-cyan-500",
    note: "Backed the need to cut manual screening and surface genuine technical talent.",
  },
  {
    name: "Prajol Annamudu",
    role: "Co-founder",
    company: "KubeGraf",
    grad: "from-pink-400 to-rose-500",
    note: "Flagged ATS bias and high application volumes, and asked for mock, synthetic training data.",
  },
  {
    name: "Soumya Krishna",
    role: "Founder",
    company: "ScInter",
    grad: "from-amber-400 to-orange-500",
    note: "Raised screening at volume, plus cultural fit, mission fit and salary expectations.",
  },
  {
    name: "Neeraj Agarwal",
    role: "Founder",
    company: "AlgoScale",
    grad: "from-emerald-400 to-teal-500",
    note: "Called out the limits of resume and DSA-based tests, and wants live, interactive assessment.",
  },
];

const initials = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* Official logo marks, downloaded from each company's own site */
const logos: Record<string, string> = {
  GOQii: "/partners/goqii.png",
  "VXT AI": "/partners/vxt.png",
  KubeGraf: "/partners/kubegraf.png",
  AlgoScale: "/partners/algoscale.webp",
};

/* A company's logo in a soft white tile; initials when we don't have one */
function CompanyLogo({ company, size = 32, className = "" }: { company: string; size?: number; className?: string }) {
  const src = logos[company];
  const box = { width: size, height: size };
  if (!src) {
    return (
      <span
        style={box}
        className={`grid shrink-0 place-items-center rounded-lg bg-[#1e1b4b] text-[11px] font-semibold text-white shadow-sm ${className}`}
      >
        {initials(company)}
      </span>
    );
  }
  return (
    <span
      style={box}
      className={`grid shrink-0 place-items-center overflow-hidden rounded-lg border border-hair bg-white shadow-sm ${className}`}
    >
      <Image src={src} alt={`${company} logo`} width={size} height={size} className="h-full w-full object-contain" />
    </span>
  );
}

function Avatar({ name, grad, className = "h-16 w-16 text-lg" }: { name: string; grad: string; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${grad} ${className} font-semibold text-white shadow-[0_10px_24px_-10px_rgba(76,29,149,0.5)] ring-4 ring-white`}
    >
      {initials(name)}
    </span>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-[0.75rem] font-medium uppercase tracking-[0.32em] text-slate-500">{children}</p>;
}

function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`!font-serif !font-semibold !leading-[1.06] !tracking-[-0.02em] text-[#1e1b4b] ${className}`}>
      {children}
    </h2>
  );
}

const Accent = ({ children }: { children: string }) => (
  <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-1 italic text-transparent">{children}</em>
);

const panelBg =
  "[background:radial-gradient(48rem_30rem_at_50%_0%,rgba(124,58,237,0.08),transparent_65%),radial-gradient(36rem_28rem_at_100%_100%,rgba(124,58,237,0.07),transparent_60%)]";

/* ---------- Panel 1: who we're building with ---------- */

const sectors = [
  {
    title: "Health-tech",
    company: "GOQii",
    icon: <path d="M12 5v14M5 12h14" strokeWidth={3} />,
    art: (
      <>
        <path d="M30 10v34a26 26 0 0 0 52 0V10" />
        <circle cx="56" cy="92" r="12" />
        <path d="M56 70v10" />
      </>
    ),
  },
  {
    title: "Infrastructure",
    company: "KubeGraf",
    icon: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
    art: (
      <>
        <rect x="18" y="16" width="76" height="22" rx="5" />
        <rect x="18" y="46" width="76" height="22" rx="5" />
        <rect x="18" y="76" width="76" height="22" rx="5" />
        <path d="M30 27h.01M30 57h.01M30 87h.01" strokeWidth={5} />
      </>
    ),
  },
  {
    title: "AI",
    company: "VXT AI",
    icon: <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7ZM19 16c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z" fill="currentColor" stroke="none" />,
    art: (
      <>
        <path d="M56 8c3 21 14 32 35 35-21 3-32 14-35 35-3-21-14-32-35-35 21-3 32-14 35-35Z" />
        <circle cx="94" cy="88" r="10" />
      </>
    ),
  },
];

const stage = `px-6 py-16 sm:py-20 lg:px-12 lg:pb-10 lg:pt-24 ${panelBg}`;

/* A headline word that lights up (fades in, sharpens, lifts) when the scene reaches it */
function Word({ p, at, children }: { p: MotionValue<number>; at: number; children: React.ReactNode }) {
  const lit = useBeat(p, at, at + 0.09);
  const opacity = useTransform(lit, [0, 1], [0.12, 1]);
  const filter = useTransform(lit, (v) => `blur(${(1 - v) * 6}px)`);
  const y = useTransform(lit, [0, 1], [12, 0]);
  return (
    <motion.span style={{ opacity, filter, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

/* A sector card that fans in from below, tilted away from the centre */
function SectorCard({ p, i, children }: { p: MotionValue<number>; i: number; children: React.ReactNode }) {
  const t = useBeat(p, 0.42 + i * 0.08, 0.64 + i * 0.08);
  const y = useTransform(t, [0, 1], [180, 0]);
  const rotate = useTransform(t, [0, 1], [(i - 1) * 12, 0]);
  const scale = useTransform(t, [0, 1], [0.85, 1]);
  return <motion.div style={{ opacity: t, y, rotate, scale }}>{children}</motion.div>;
}

/**
 * Scene "Word by word": the headline lights up one word at a time as you
 * scroll, the line beneath fades in, then the three sector cards fan in.
 */
export function PartnersIntro() {
  return (
    <Scene id="design-partners" length={2.1} className={stage}>
      <Fit>
        <div className="mx-auto max-w-6xl">
          <PartnersIntroContent />
        </div>
      </Fit>
    </Scene>
  );
}

function PartnersIntroContent() {
  const p = useScene();
  const eyebrow = useBeat(p, 0, 0.1);
  const line = useBeat(p, 0.34, 0.46);
  const words: React.ReactNode[] = ["Built", "with", "the", "people", "hiring", <Accent key="e">engineers</Accent>, "now."];
  return (
    <>
      <div className="text-center">
        <Rise p={eyebrow} y={10}>
          <Eyebrow>Design partners</Eyebrow>
        </Rise>
        <Heading className="mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">
          {words.map((w, i) => (
            <span key={i}>
              <Word p={p} at={0.04 + i * 0.045}>{w}</Word>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </Heading>
        <Rise p={line} y={16}>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-dim sm:text-base">
            Conversations with founders and hiring leaders across health-tech, infrastructure and AI are
            helping shape Mindfries.
          </p>
        </Rise>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {sectors.map((s, i) => (
          <SectorCard key={s.title} p={p} i={i}>
            <div className="group relative h-44 overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white via-white to-violet-100/70 p-6 shadow-[0_30px_60px_-34px_rgba(76,29,149,0.35)] transition-transform duration-500 hover:-translate-y-1">
              <svg
                className="pointer-events-none absolute -right-4 top-1/2 h-36 w-36 -translate-y-1/2 text-violet-300/70 transition-transform duration-700 group-hover:scale-105"
                viewBox="0 0 112 112"
                {...stroke}
                strokeWidth={2.5}
                aria-hidden
              >
                {s.art}
              </svg>
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-accent">
                <Svg size={20}>{s.icon}</Svg>
              </span>
              <p className="relative mt-6 font-serif text-[22px] font-semibold text-[#1e1b4b]">{s.title}</p>
              <p className="relative mt-1 flex items-center gap-1.5 text-[13px] text-dim">
                Design partner ·
                <CompanyLogo company={s.company} size={18} className="!rounded-[5px]" />
                <span className="font-medium text-ink/80">{s.company}</span>
              </p>
            </div>
          </SectorCard>
        ))}
      </div>
    </>
  );
}

/* ---------- Panel 2: what they told us ---------- */

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous partners" : "Next partners"}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hair-bright bg-white text-ink shadow-sm transition-colors hover:bg-surface-2"
    >
      <Svg size={16}>{dir === "prev" ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}</Svg>
    </button>
  );
}

/* A voice card that rises in as the scene opens */
function VoiceCard({ p, i, partner }: { p: MotionValue<number>; i: number; partner: Partner }) {
  const t = useBeat(p, 0.16 + i * 0.04, 0.32 + i * 0.04);
  const y = useTransform(t, [0, 1], [60, 0]);
  return (
    <motion.article
      data-card
      style={{ opacity: t, y }}
      className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-hair bg-white/85 p-6 shadow-[0_24px_50px_-34px_rgba(76,29,149,0.45)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/2.6)] xl:w-[calc((100%-60px)/3.2)]"
    >
      <div className="flex items-end justify-between">
        <Avatar name={partner.name} grad={partner.grad} />
        <CompanyLogo company={partner.company} size={36} />
      </div>
      <p className="mt-5 font-serif text-[19px] font-semibold leading-tight text-[#1e1b4b]">{partner.name}</p>
      <p className="mt-1 text-[13px] text-dim">
        {partner.role} · <span className="font-medium text-ink/80">{partner.company}</span>
      </p>
      <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-ink/75">{partner.note}</p>
      <span className="mt-5 w-fit rounded-full bg-violet-50 px-3 py-1 text-[12px] font-medium text-violet-700">
        Design partner
      </span>
    </motion.article>
  );
}

/**
 * Scene "Horizontal ride": on desktop, scrolling down slides the partner
 * cards sideways across the pinned page, with a progress line beneath.
 * Elsewhere it is a swipeable carousel with arrow buttons.
 */
export function PartnerVoices() {
  return (
    <Scene id="partner-voices" length={3} className={stage}>
      <Fit>
        <div className="mx-auto max-w-6xl">
          <PartnerVoicesContent />
        </div>
      </Fit>
    </Scene>
  );
}

function PartnerVoicesContent() {
  const p = useScene();
  const reduce = useReducedMotion();
  const ride = useDesktop() && !reduce;
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);

  // How far the track must travel for its last card to reach the right edge
  useEffect(() => {
    const b = box.current;
    const t = track.current;
    if (!b || !t) return;
    const update = () => setOverflow(Math.max(0, t.scrollWidth - b.clientWidth));
    const ro = new ResizeObserver(update);
    ro.observe(b);
    ro.observe(t);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const eyebrow = useBeat(p, 0, 0.1);
  const head = useBeat(p, 0.02, 0.22);
  const line = useBeat(p, 0.12, 0.28);
  const travel = useBeat(p, 0.3, 0.92);
  const x = useTransform(travel, (v) => -v * overflow);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="text-center">
        <Rise p={eyebrow} y={10}>
          <Eyebrow>Conversations that shape Mindfries</Eyebrow>
        </Rise>
        <Heading className="mx-auto mt-4 max-w-5xl text-[clamp(2.1rem,3.8vw,3.4rem)]">
          <MaskLine p={head}>
            Founders and leaders <Accent>we&rsquo;ve spoken with</Accent>
          </MaskLine>
        </Heading>
        <Rise p={line} y={16}>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-dim sm:text-base">
            We&rsquo;re grateful to the builders who shared their time and feedback on engineering hiring and
            assessment. Here&rsquo;s what each of them told us.
          </p>
        </Rise>
      </div>

      <div className="mt-12 flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:block lg:hidden">
          <ArrowButton dir="prev" onClick={() => scroll(-1)} />
        </div>

        <div ref={box} className="min-w-0 flex-1">
          <motion.div
            ref={track}
            style={ride ? { x } : undefined}
            className={
              ride
                ? "flex gap-5 pb-4 pt-2"
                : "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            {partners.map((partner, i) => (
              <VoiceCard key={partner.name} p={p} i={i} partner={partner} />
            ))}
          </motion.div>
        </div>

        <div className="hidden sm:block lg:hidden">
          <ArrowButton dir="next" onClick={() => scroll(1)} />
        </div>
      </div>

      {ride ? (
        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-violet-100">
          <motion.span style={{ scaleX: travel }} className="block h-full origin-left rounded-full bg-violet-500" />
        </div>
      ) : (
        <div className="mt-2 flex justify-center gap-3 sm:hidden">
          <ArrowButton dir="prev" onClick={() => scroll(-1)} />
          <ArrowButton dir="next" onClick={() => scroll(1)} />
        </div>
      )}
    </>
  );
}

/* ---------- Panel 3: the partner teams + join CTA ---------- */

// Avatar positions around the logo, as % of the 280px orbit box
const orbit = [
  { x: 50, y: 4 },
  { x: 92, y: 30 },
  { x: 82, y: 82 },
  { x: 18, y: 82 },
  { x: 8, y: 30 },
];

// Where each company tile starts before it flies into the row (px and degrees)
const scatter = [
  { x: -420, y: -170, r: -18 },
  { x: 260, y: -230, r: 14 },
  { x: -140, y: 210, r: 10 },
  { x: 430, y: 130, r: -12 },
  { x: -380, y: 190, r: 16 },
];

function PartnerTile({ p, i, partner }: { p: MotionValue<number>; i: number; partner: Partner }) {
  const t = useBeat(p, 0.16 + i * 0.05, 0.42 + i * 0.05);
  const from = scatter[i % scatter.length];
  const x = useTransform(t, [0, 1], [from.x, 0]);
  const y = useTransform(t, [0, 1], [from.y, 0]);
  const rotate = useTransform(t, [0, 1], [from.r, 0]);
  const scale = useTransform(t, [0, 1], [0.6, 1]);
  return (
    <motion.li
      style={{ opacity: t, x, y, rotate, scale }}
      className="flex flex-col items-center justify-center rounded-2xl border border-hair bg-white/85 px-4 py-5 text-center shadow-[0_18px_40px_-30px_rgba(76,29,149,0.45)]"
    >
      <CompanyLogo company={partner.company} size={40} className="mb-2.5 !rounded-xl" />
      <span className="font-serif text-[22px] font-semibold tracking-tight text-[#1e1b4b]">{partner.company}</span>
      <span className="mt-1 text-[12px] text-dim">
        {partner.name} · {partner.role}
      </span>
    </motion.li>
  );
}

function OrbitAvatar({ p, i, spin, partner }: { p: MotionValue<number>; i: number; spin: MotionValue<number>; partner: Partner }) {
  const t = useBeat(p, 0.6 + i * 0.04, 0.72 + i * 0.04);
  const scale = useTransform(t, [0, 1], [0.4, 1]);
  const upright = useTransform(spin, (v) => -v); // cancel the ring's spin so logos stay level
  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${["float-a", "float-b", "float-c"][i % 3]}`}
      style={{ left: `${orbit[i].x}%`, top: `${orbit[i].y}%` }}
      title={partner.company}
    >
      <motion.span
        style={{ opacity: t, scale, rotate: upright }}
        className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_12px_28px_-10px_rgba(76,29,149,0.45)] ring-4 ring-white"
      >
        <CompanyLogo company={partner.company} size={40} className="!rounded-xl !border-0 !shadow-none" />
      </motion.span>
    </span>
  );
}

/**
 * Scene "Assemble": the partner tiles fly in from scattered positions and
 * lock into a row, then the join card rises and its ring of partner logos
 * spins into place around the Mindfries mark.
 */
export function JoinConversation() {
  return (
    <Scene id="join" length={2.4} className={stage}>
      <Fit>
        <div className="mx-auto max-w-6xl">
          <JoinConversationContent />
        </div>
      </Fit>
    </Scene>
  );
}

function JoinConversationContent() {
  const p = useScene();
  const eyebrow = useBeat(p, 0, 0.1);
  const head = useBeat(p, 0.02, 0.22);
  const card = useBeat(p, 0.48, 0.66);
  const ring = useBeat(p, 0.56, 0.86);
  const spin = useTransform(ring, [0, 1], [-140, 0]);
  const mark = useTransform(useBeat(p, 0.56, 0.7), [0, 1], [0.5, 1]);

  return (
    <>
      <div className="text-center">
        <Rise p={eyebrow} y={10}>
          <Eyebrow>Our design partners</Eyebrow>
        </Rise>
        <Heading className="mx-auto mt-4 max-w-5xl text-[clamp(2.1rem,4.2vw,3.75rem)]">
          <MaskLine p={head}>
            The teams <Accent>building it</Accent> with us
          </MaskLine>
        </Heading>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner, i) => (
          <PartnerTile key={partner.company} p={p} i={i} partner={partner} />
        ))}
      </ul>

      <Rise p={card} y={80} className="mt-8">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-50 via-white to-violet-100/80 p-8 shadow-[0_30px_60px_-36px_rgba(76,29,149,0.45)] sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <span className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" />
          <div className="relative">
            <Eyebrow>Join the conversation</Eyebrow>
            <Heading className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)]">
              Help us build a better way to <Accent>hire engineers.</Accent>
            </Heading>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-dim">
              We&rsquo;re always open to conversations with builders, hiring teams and researchers who care about
              real skills and fair opportunities.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#access"
                className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#0f172a] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(15,23,42,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Request access
                <Svg size={16}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
              </a>
              <a
                href="#access"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-hair-bright bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-surface-2"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* partners orbiting the logo; the ring spins into place */}
          <div className="relative mx-auto aspect-square w-full max-w-[280px]">
            <span className="absolute inset-[14%] rounded-full border border-dashed border-violet-300/70" />
            <motion.span
              style={{ scale: mark }}
              className="absolute left-1/2 top-1/2 -ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-white shadow-[0_20px_44px_-16px_rgba(124,58,237,0.55)] ring-8 ring-violet-100/70"
            >
              <Image src="/logo.png" alt="Mindfries" width={56} height={56} className="rounded-full" />
            </motion.span>
            <motion.div style={{ rotate: spin }} className="absolute inset-0">
              {partners.map((partner, i) => (
                <OrbitAvatar key={partner.name} p={p} i={i} spin={spin} partner={partner} />
              ))}
            </motion.div>
          </div>
        </div>
      </Rise>
    </>
  );
}
