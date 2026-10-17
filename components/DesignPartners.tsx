"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroHeightSection } from "./primitives";

/* ---- Design partners: three stacked panels ----
   1. PartnersIntro    – who we're building with, by sector
   2. PartnerVoices    – what each design partner told us (carousel)
   3. JoinConversation – the partner teams + a call to join them
   Everything here comes from real design-partner conversations. */

const ease = [0.22, 1, 0.36, 1] as const;

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

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

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

export function PartnersIntro() {
  return (
    <HeroHeightSection
      id="design-partners"
      className={`px-6 py-16 sm:py-20 lg:px-12 xl:py-12 ${panelBg}`}
      contentClassName="mx-auto max-w-6xl"
    >
      <FadeUp className="text-center">
        <Eyebrow>Design partners</Eyebrow>
        <Heading className="mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">
          Built with the people hiring <Accent>engineers</Accent> now.
        </Heading>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-dim sm:text-base">
          Conversations with founders and hiring leaders across health-tech, infrastructure and AI are
          helping shape Mindfries.
        </p>
      </FadeUp>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {sectors.map((s, i) => (
          <FadeUp key={s.title} delay={0.1 + i * 0.1}>
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
              <p className="relative mt-0.5 text-[13px] text-dim">
                Design partner · <span className="font-medium text-ink/80">{s.company}</span>
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </HeroHeightSection>
  );
}

/* ---------- Panel 2: what they told us ---------- */

function CompanyBadge({ company }: { company: string }) {
  return (
    <span className="grid h-8 min-w-8 place-items-center rounded-lg bg-[#1e1b4b] px-1.5 text-[11px] font-semibold text-white shadow-sm">
      {initials(company)}
    </span>
  );
}

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

export function PartnerVoices() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <HeroHeightSection
      id="partner-voices"
      className={`px-6 py-16 sm:py-20 lg:px-12 xl:py-12 ${panelBg}`}
      contentClassName="mx-auto max-w-6xl"
    >
      <FadeUp className="text-center">
        <Eyebrow>Conversations that shape Mindfries</Eyebrow>
        <Heading className="mx-auto mt-4 max-w-5xl text-[clamp(2.1rem,3.8vw,3.4rem)]">
          Founders and leaders <Accent>we&rsquo;ve spoken with</Accent>
        </Heading>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-dim sm:text-base">
          We&rsquo;re grateful to the builders who shared their time and feedback on engineering hiring and
          assessment. Here&rsquo;s what each of them told us.
        </p>
      </FadeUp>

      <div className="mt-12 flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:block">
          <ArrowButton dir="prev" onClick={() => scroll(-1)} />
        </div>

        <div
          ref={track}
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {partners.map((p, i) => (
            <motion.article
              key={p.name}
              data-card
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-hair bg-white/85 p-6 shadow-[0_24px_50px_-34px_rgba(76,29,149,0.45)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <div className="flex items-end justify-between">
                <Avatar name={p.name} grad={p.grad} />
                <CompanyBadge company={p.company} />
              </div>
              <p className="mt-5 font-serif text-[19px] font-semibold leading-tight text-[#1e1b4b]">{p.name}</p>
              <p className="mt-1 text-[13px] text-dim">
                {p.role} · <span className="font-medium text-ink/80">{p.company}</span>
              </p>
              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-ink/75">{p.note}</p>
              <span className="mt-5 w-fit rounded-full bg-violet-50 px-3 py-1 text-[12px] font-medium text-violet-700">
                Design partner
              </span>
            </motion.article>
          ))}
        </div>

        <div className="hidden sm:block">
          <ArrowButton dir="next" onClick={() => scroll(1)} />
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-3 sm:hidden">
        <ArrowButton dir="prev" onClick={() => scroll(-1)} />
        <ArrowButton dir="next" onClick={() => scroll(1)} />
      </div>
    </HeroHeightSection>
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

export function JoinConversation() {
  return (
    <HeroHeightSection
      id="join"
      className={`px-6 py-16 sm:py-20 lg:px-12 xl:py-12 ${panelBg}`}
      contentClassName="mx-auto max-w-6xl"
    >
      <FadeUp className="text-center">
        <Eyebrow>Our design partners</Eyebrow>
        <Heading className="mx-auto mt-4 max-w-5xl text-[clamp(2.1rem,4.2vw,3.75rem)]">
          The teams <Accent>building it</Accent> with us
        </Heading>
      </FadeUp>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((p, i) => (
          <motion.li
            key={p.company}
            className="flex flex-col items-center justify-center rounded-2xl border border-hair bg-white/85 px-4 py-5 text-center shadow-[0_18px_40px_-30px_rgba(76,29,149,0.45)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease }}
          >
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[#1e1b4b]">{p.company}</span>
            <span className="mt-1 text-[12px] text-dim">
              {p.name} · {p.role}
            </span>
          </motion.li>
        ))}
      </ul>

      <FadeUp delay={0.15} className="mt-8">
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

          {/* partners orbiting the logo */}
          <div className="relative mx-auto aspect-square w-full max-w-[280px]">
            <span className="absolute inset-[14%] rounded-full border border-dashed border-violet-300/70" />
            <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_20px_44px_-16px_rgba(124,58,237,0.55)] ring-8 ring-violet-100/70">
              <Image src="/logo.png" alt="Mindfries" width={56} height={56} className="rounded-full" />
            </span>
            {partners.map((p, i) => (
              <motion.span
                key={p.name}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${["float-a", "float-b", "float-c"][i % 3]}`}
                style={{ left: `${orbit[i].x}%`, top: `${orbit[i].y}%` }}
                title={`${p.name}, ${p.company}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Avatar name={p.name} grad={p.grad} className="h-14 w-14 text-[15px]" />
              </motion.span>
            ))}
          </div>
        </div>
      </FadeUp>
    </HeroHeightSection>
  );
}
