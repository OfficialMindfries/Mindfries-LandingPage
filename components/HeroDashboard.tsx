"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---- Hero product mockup: the hiring team's dashboard ----
   Mirrors the real app's look (serif headings, soft stat cards, dark
   banner) from the company's side, filled with mock data. Built at a
   fixed 880px design width and scaled to its container. */

const W = 880;
const H = 600;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  jobs: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 7v13M16 7v13" />
    </>
  ),
  candidates: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  assessments: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  reports: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bell: <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  review: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M9 2h6" />
    </>
  ),
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" />,
  arrows: <path d="m6 7 5 5-5 5M13 7l5 5-5 5" />,
  sparkle: <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" fill="currentColor" stroke="none" />,
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

function Svg({ children, size = 16, className }: { children: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      {children}
    </svg>
  );
}

const nav = [
  { label: "Dashboard", icon: Icon.home, active: true },
  { label: "Jobs", icon: Icon.jobs },
  { label: "Candidates", icon: Icon.candidates },
  { label: "Assessments", icon: Icon.assessments },
  { label: "Reports", icon: Icon.reports },
  { label: "Settings", icon: Icon.settings },
];

const stats = [
  { label: "Open roles", value: "4", icon: Icon.briefcase, tile: "bg-violet-100 text-violet-600", card: "from-white to-violet-50/60", wave: "#c4b5fd" },
  { label: "In review", value: "12", icon: Icon.review, tile: "bg-pink-100 text-pink-500", card: "from-white to-pink-50/70", wave: "#f9a8d4" },
  { label: "Shortlisted", value: "6", icon: Icon.star, tile: "bg-emerald-100 text-emerald-600", card: "from-white to-violet-50/60", wave: "#c4b5fd" },
];

const shortlist = [
  { initials: "AS", name: "Aarav Sharma", score: 92, grad: "from-violet-400 to-violet-600" },
  { initials: "PN", name: "Priya Nair", score: 88, grad: "from-pink-400 to-rose-500" },
  { initials: "RK", name: "Rohan Kapoor", score: 85, grad: "from-sky-400 to-cyan-500" },
];

function Wave({ color }: { color: string }) {
  return (
    <svg className="absolute inset-x-0 bottom-0 h-12 w-full" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden>
      <path d="M0 48 C 70 46, 120 10, 200 4 L 200 48 Z" fill={color} fillOpacity="0.55" />
    </svg>
  );
}

function Window() {
  return (
    <div className="flex h-full overflow-hidden rounded-[22px] border border-white/70 bg-[#f7f6fb] shadow-[0_50px_100px_-30px_rgba(76,29,149,0.35),0_20px_40px_-20px_rgba(20,22,30,0.25)]">
      {/* sidebar */}
      <aside className="flex w-[176px] shrink-0 flex-col border-r border-hair bg-white/70 px-3 pb-3 pt-5">
        <div className="flex items-center gap-2 px-2">
          <Image src="/logo.png" alt="" width={26} height={26} className="rounded-full" />
          <span className="font-serif text-[19px] font-semibold tracking-tight text-[#1e1b4b]">Mindfries</span>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] ${
                n.active ? "bg-violet-100/80 font-medium text-violet-700" : "text-ink/75"
              }`}
            >
              <Svg size={15}>{n.icon}</Svg>
              {n.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-hair bg-white/80 p-3.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
          <p className="mt-2 font-serif text-[14px] leading-snug text-ink/70">
            Evidence over
            <br />
            keywords.
          </p>
          <span className="mt-2 block h-px w-8 bg-hair-bright" />
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-4">
        {/* top bar */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-hair bg-white px-3 py-2 text-[11.5px] text-faint">
            <Svg size={13} className="text-ink/60">{Icon.search}</Svg>
            Search candidates, roles…
            <span className="ml-auto rounded-md border border-hair px-1.5 py-0.5 text-[9.5px]">Ctrl K</span>
          </div>
          <span className="relative text-ink/70">
            <Svg size={16}>{Icon.bell}</Svg>
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1e1b4b] text-[12px] font-medium text-white">N</span>
        </div>

        {/* welcome */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.28em] text-dim">Welcome back</p>
            <h3 className="mt-1 flex items-center gap-2 font-serif text-[30px] font-semibold leading-none tracking-tight text-[#1e1b4b]">
              Northwind Labs
              <span className="h-2 w-2 rounded-full bg-violet-400" />
            </h3>
            <p className="mt-2 text-[9.5px] font-medium uppercase tracking-[0.28em] text-dim">Hiring team · Bengaluru</p>
          </div>
          <div className="max-w-[190px] text-right">
            <p className="text-[11px] text-dim">Sun, 18 Oct 2026</p>
            <span className="ml-auto mt-1.5 block h-px w-6 bg-hair-bright" />
            <p className="mt-1.5 font-serif text-[12.5px] leading-snug text-ink/75">
              “Hire on what they built, not what they claim.”
            </p>
          </div>
        </div>

        {/* stat cards */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div key={s.label} className={`relative h-[92px] overflow-hidden rounded-2xl border border-hair bg-gradient-to-br ${s.card} p-3`}>
              <Wave color={s.wave} />
              <div className="relative flex items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${s.tile}`}>
                  <Svg size={17}>{s.icon}</Svg>
                </span>
                <div className="flex-1">
                  <p className="text-[11px] text-ink/70">{s.label}</p>
                  <motion.p
                    className="font-serif text-[28px] font-semibold leading-none text-[#1e1b4b]"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                  >
                    {s.value}
                  </motion.p>
                </div>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-ink/70 shadow-sm">
                  <Svg size={11}>{Icon.chevron}</Svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* shortlist banner */}
        <div className="relative mt-3 flex flex-1 overflow-hidden rounded-2xl bg-[#1e1b4b] p-5 text-white">
          <span className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-violet-500/40 to-violet-300/10" />
          <div className="relative flex flex-1 flex-col">
            <p className="flex items-center gap-3 text-[9.5px] font-medium uppercase tracking-[0.28em] text-white/70">
              New shortlist <span className="h-px w-6 bg-white/40" />
            </p>
            <h4 className="mt-2 font-serif text-[24px] font-semibold leading-tight">Backend SDE · 6 ranked</h4>
            <p className="mt-1.5 max-w-[240px] text-[11px] leading-relaxed text-white/70">
              Scored on real code, tests and reasoning. Every rank comes with evidence.
            </p>
            <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-violet-300 px-4 py-2 text-[11.5px] font-medium text-[#1e1b4b]">
              Review shortlist
              <Svg size={12}>{Icon.arrows}</Svg>
            </span>
          </div>
          <ul className="relative w-[230px] space-y-1.5 self-center">
            {shortlist.map((c, i) => (
              <motion.li
                key={c.name}
                className="flex items-center gap-2.5 rounded-xl bg-white/10 px-2.5 py-2 backdrop-blur"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="w-3 text-[10px] text-white/50">{i + 1}</span>
                <span className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${c.grad} text-[9px] font-semibold`}>
                  {c.initials}
                </span>
                <span className="flex-1 truncate text-[11.5px]">{c.name}</span>
                <span className="rounded-full bg-violet-300/20 px-2 py-0.5 text-[10.5px] font-medium text-violet-200">{c.score}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Chip({ icon, children, className }: { icon: React.ReactNode; children: string; className: string }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-[13px] font-medium text-ink shadow-[0_18px_40px_-16px_rgba(76,29,149,0.35)] backdrop-blur-xl ${className}`}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-100 text-accent">
        <Svg size={14}>{icon}</Svg>
      </span>
      {children}
    </div>
  );
}

export default function HeroDashboard() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative w-full" style={{ height: H * scale }}>
      <motion.div
        className="absolute left-0 top-0 origin-top-left [perspective:2000px]"
        style={{ width: W, height: H, scale }}
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-6 top-10 bottom-4 [transform:rotateY(-7deg)_rotateX(2deg)] [transform-style:preserve-3d]">
          <Window />
        </div>

        <motion.div
          className="float-a"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Chip icon={Icon.sparkle} className="right-0 top-0">Ranked on real work</Chip>
        </motion.div>
        <motion.div
          className="float-b"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Chip icon={Icon.shield} className="right-2 top-[560px]">Evidence behind every rank</Chip>
        </motion.div>
      </motion.div>
    </div>
  );
}
