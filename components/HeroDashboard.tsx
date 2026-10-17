"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---- Hero product mockup: a live-coded session report ----
   Built at a fixed 880px design width and scaled to its container,
   so the dense dashboard keeps its proportions on every screen. */

const W = 880;
const H = 600;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  code: <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />,
  tests: <path d="M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16" />,
  reasoning: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  activity: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
  report: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  play: <path d="M7 5v14l11-7L7 5Z" fill="currentColor" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  warn: <path d="M12 3 2 20h20L12 3Zm0 6v5m0 3v.01" />,
  flag: <path d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  check: <path d="m6 12 4 4 8-8" />,
  sparkle: <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" fill="currentColor" stroke="none" />,
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" fill="currentColor" stroke="none" />
      <path d="m16 10 5-3v10l-5-3" fill="currentColor" stroke="none" />
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
  { label: "Overview", icon: Icon.home, active: true },
  { label: "Code", icon: Icon.code },
  { label: "Tests", icon: Icon.tests },
  { label: "Reasoning", icon: Icon.reasoning },
  { label: "Activity", icon: Icon.activity },
  { label: "Report", icon: Icon.report },
];

const stats = [
  { icon: Icon.code, tone: "bg-violet-100 text-violet-600", label: "Files modified", value: "3", sub: "parser.py +2", subCls: "text-dim" },
  { icon: Icon.play, tone: "bg-emerald-100 text-emerald-600", label: "Tests", value: "7 / 7", sub: "Passed", subCls: "text-emerald-600" },
  { icon: Icon.clock, tone: "bg-violet-100 text-violet-600", label: "Time in IDE", value: "42 min" },
  { icon: Icon.warn, tone: "bg-rose-100 text-rose-600", label: "Suspicious activity", value: "1", sub: "Detected", subCls: "text-rose-600" },
];

const removed = ["def parse_command(cmd):", "    ...", "    return []", "", ""];
const added = ["def parse_command(cmd):", "    import shlex", "    import re", "    def _split_pipeline(s):", "        ..."];

const timeline = [
  { t: "05:45", text: "Pasted 198 lines into parser.py", dot: "bg-rose-500" },
  { t: "06:10", text: "Re-ran tests (7/7 passed)", dot: "bg-slate-400" },
  { t: "08:20", text: "Asked assistant to confirm results", dot: "bg-slate-400" },
];

function Window() {
  return (
    <div className="flex h-full overflow-hidden rounded-[22px] border border-white/70 bg-white/90 shadow-[0_50px_100px_-30px_rgba(76,29,149,0.35),0_20px_40px_-20px_rgba(20,22,30,0.25)] backdrop-blur-xl">
      {/* sidebar */}
      <aside className="flex w-[168px] shrink-0 flex-col border-r border-hair bg-surface-2/60 px-3 pt-4">
        <div className="flex gap-1.5 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mt-6 flex items-center gap-2 px-1">
          <Image src="/logo.png" alt="" width={24} height={24} className="rounded-full" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Mindfries</span>
        </div>
        <nav className="mt-6 space-y-1">
          {nav.map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] ${
                n.active ? "bg-white font-medium text-accent shadow-sm" : "text-dim"
              }`}
            >
              <Svg size={15}>{n.icon}</Svg>
              {n.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] text-dim">
              Candidates <span className="mx-1 text-faint">/</span> Aarav Sharma{" "}
              <span className="mx-1 text-faint">/</span> Session 2026-10-17
            </p>
            <h3 className="mt-2 text-[19px] font-semibold tracking-tight text-ink">Session 2026-10-17</h3>
            <p className="mt-0.5 text-[12px] text-dim">45 min · SDE (Backend) · Python</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-[12px] font-medium text-rose-600">
            <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-rose-500">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
            No hire
          </span>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-4 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-hair bg-white p-3">
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${s.tone}`}>
                <Svg size={14}>{s.icon}</Svg>
              </span>
              <p className="mt-2 text-[11px] text-dim">{s.label}</p>
              <p className="text-[18px] font-semibold leading-tight text-ink">{s.value}</p>
              {s.sub && <p className={`text-[10.5px] ${s.subCls}`}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* paste alert + diff */}
        <div className="overflow-hidden rounded-xl border border-rose-100">
          <div className="flex items-center justify-between bg-rose-50 px-3 py-2 text-[12px]">
            <span className="flex items-center gap-2 font-medium text-rose-600">
              <Svg size={14} className="text-rose-500">{Icon.flag}</Svg>
              Large external paste detected
            </span>
            <span className="text-dim">
              <span className="font-medium text-rose-600">198 lines</span> · 05:45
            </span>
          </div>
          <div className="mono grid grid-cols-2 gap-1.5 bg-white p-1.5 text-[10.5px] leading-[1.75]">
            <div className="rounded-md bg-rose-50/80 px-2 py-1">
              {removed.map((l, i) => (
                <div key={i} className="flex gap-3 whitespace-pre">
                  <span className="w-3 text-right text-faint">{i + 1}</span>
                  <span className="text-rose-500">{i < 3 ? "-" : " "}</span>
                  <span className="text-rose-700">{l}</span>
                </div>
              ))}
            </div>
            <div className="rounded-md bg-emerald-50/80 px-2 py-1">
              {added.map((l, i) => (
                <div key={i} className="flex gap-3 whitespace-pre">
                  <span className="text-emerald-500">+</span>
                  <span className="text-emerald-800">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* timeline + results */}
        <div className="grid grid-cols-[1.25fr_1fr] gap-2.5">
          <div className="rounded-xl border border-hair bg-white p-3">
            <p className="text-[12px] font-semibold text-ink">Session timeline</p>
            <ul className="relative mt-2 space-y-1.5 before:absolute before:bottom-1.5 before:left-[3.5px] before:top-1.5 before:w-px before:bg-hair-bright">
              {timeline.map((e) => (
                <li key={e.t} className="relative flex items-center gap-3 text-[11px]">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${e.dot}`} />
                  <span className="w-9 text-dim">{e.t}</span>
                  <span className="truncate text-ink/80">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3 rounded-xl border border-hair bg-white p-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <Svg size={14}>{Icon.check}</Svg>
            </span>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-ink">Test results</p>
              <p className="mt-1 text-[20px] font-semibold leading-none text-ink">
                7 / 7 <span className="text-[12px] font-normal text-dim">passed</span>
              </p>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 flex-1 rounded-full bg-emerald-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
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
          <Chip icon={Icon.sparkle} className="right-0 top-0">Code, tests, reasoning</Chip>
        </motion.div>
        <motion.div
          className="float-b"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Chip icon={Icon.video} className="right-2 top-[560px]">Session recording &amp; activity</Chip>
        </motion.div>
      </motion.div>
    </div>
  );
}
