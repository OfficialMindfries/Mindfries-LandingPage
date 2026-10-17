"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---- How it works: four steps from signals to a shortlist ----
   Serif display type over the same soft-violet product cards as the hero.
   All people and numbers are mock data. */

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

function Avatar({ initials, grad, size = "h-11 w-11 text-sm" }: { initials: string; grad: string; size?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${grad} ${size} font-semibold text-white ring-2 ring-white`}>
      {initials}
    </span>
  );
}

/* Score ring that fills when scrolled into view */
function Ring({ value, size = 44, width = 4, className = "" }: { value: number; size?: number; width?: number; className?: string }) {
  const r = (size - width) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className={`relative grid shrink-0 place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`ring-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ede9fe" strokeWidth={width} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${size})`}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
      </svg>
      <span className="relative font-serif font-semibold text-[#1e1b4b]">{value}</span>
    </span>
  );
}

function Bar({ w, className = "h-1.5" }: { w: number; className?: string }) {
  return (
    <span className={`block overflow-hidden rounded-full bg-violet-100 ${className}`}>
      <motion.span
        className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600"
        initial={{ width: 0 }}
        whileInView={{ width: `${w}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.2 }}
      />
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_30px_60px_-30px_rgba(76,29,149,0.28),0_8px_20px_-12px_rgba(20,22,30,0.12)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Step 1: Connect ---------- */

const sources = [
  {
    name: "GitHub",
    cls: "text-ink",
    icon: <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  },
  {
    name: "GitLab",
    cls: "text-orange-500",
    icon: <path d="m12 21-9-7 2.5-10L8 10h8l2.5-6L21 14l-9 7Z" fill="currentColor" stroke="none" />,
  },
  {
    name: "LinkedIn",
    cls: "text-white bg-[#0a66c2] rounded-md",
    icon: <path d="M7 10v7M7 7v.01M11 17v-7m0 3.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V17" strokeWidth={2.2} />,
  },
  {
    name: "X",
    cls: "text-white bg-ink rounded-md",
    icon: <path d="m6 6 12 12M18 6 6 18" strokeWidth={2.2} />,
  },
  {
    name: "Portfolio link",
    cls: "text-ink",
    icon: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  },
];

const tiles = [
  <path key="f" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  <path key="b" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v18m8-13.5-8 4.5-8-4.5" />,
  <path key="c" d="m9 7-5 5 5 5M15 7l5 5-5 5" />,
  <path key="d" d="M7 3h8l4 4v14H7V3Zm3 7h6m-6 4h6m-6 4h4" />,
];

function ConnectVisual() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2.5 rounded-3xl border border-white/80 bg-white/70 p-2 shadow-[0_20px_40px_-24px_rgba(76,29,149,0.3)]">
        {sources.map((s) => (
          <span key={s.name} title={s.name} className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
            <span className={`grid h-6 w-6 place-items-center ${s.cls}`}>
              <Svg size={s.cls.includes("bg-") ? 15 : 22}>{s.icon}</Svg>
            </span>
          </span>
        ))}
      </div>

      {/* wires into the profile */}
      <svg className="-mx-3 w-8 shrink-0 self-stretch text-violet-300" viewBox="0 0 32 300" preserveAspectRatio="none" aria-hidden>
        {[26, 86, 150, 214, 274].map((y) => (
          <path key={y} d={`M0 ${y} C 18 ${y}, 14 150, 32 150`} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <Card className="flex-1">
        <div className="flex items-center gap-3">
          <Avatar initials="AS" grad="from-violet-400 to-violet-600" size="h-12 w-12 text-sm" />
          <div>
            <p className="font-serif text-[17px] font-semibold leading-tight text-[#1e1b4b]">Aarav Sharma</p>
            <p className="text-[12px] text-dim">Software Engineer</p>
          </div>
        </div>
        {/* activity graph */}
        <div className="mt-4 flex items-end gap-1.5">
          {[3, 5, 2, 6, 4, 7, 5, 3, 6, 4].map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-sm bg-violet-300/80"
              initial={{ height: 0 }}
              whileInView={{ height: h * 5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {tiles.map((t, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-hair bg-white/80 p-2.5">
              <Svg size={15} className="shrink-0 text-ink/60">{t}</Svg>
              <span className="flex-1 space-y-1">
                <span className="block h-1.5 w-full rounded-full bg-slate-200" />
                <span className="block h-1.5 w-2/3 rounded-full bg-slate-100" />
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Step 2: Analyze & match ---------- */

const match = [
  { label: "Technical skills", w: 82 },
  { label: "Project depth", w: 58 },
  { label: "Open source", w: 70 },
  { label: "Experience", w: 68 },
];

function AnalyzeVisual() {
  return (
    <div className="space-y-3">
      <Card className="ml-auto flex w-[88%] items-center gap-3 !rounded-2xl !p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-accent">
          <Svg size={16}>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </Svg>
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-ink">Backend Engineer</p>
          <p className="truncate text-[11px] text-dim">Python · AWS · Distributed Systems</p>
        </div>
      </Card>
      <Card>
        <p className="font-serif text-[16px] font-semibold text-[#1e1b4b]">Role match</p>
        <div className="mt-3 flex items-center gap-4">
          <Ring value={86} size={104} width={10} className="text-[30px]" />
          <ul className="flex-1 space-y-3">
            {match.map((m) => (
              <li key={m.label}>
                <p className="mb-1 text-[11.5px] text-ink/80">{m.label}</p>
                <Bar w={m.w} />
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

/* ---------- Step 3: Assess & interview ---------- */

function Line({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex gap-3 whitespace-pre">
      <span className="w-4 shrink-0 text-right text-faint">{n}</span>
      <span>{children}</span>
    </div>
  );
}

const K = ({ children }: { children: string }) => <span className="text-violet-600">{children}</span>;
const S = ({ children }: { children: string }) => <span className="text-sky-600">{children}</span>;
const R = ({ children }: { children: string }) => <span className="text-rose-500">{children}</span>;

function AssessVisual() {
  return (
    <Card className="!p-3">
      <div className="flex gap-1 rounded-xl bg-surface-2 p-1 text-[11.5px]">
        <span className="flex-1 rounded-lg bg-[#1e1b4b] py-1.5 text-center font-medium text-white">Coding</span>
        <span className="flex-1 py-1.5 text-center text-ink/70">System design</span>
        <span className="flex-1 py-1.5 text-center text-ink/70">AI interview</span>
      </div>
      <div className="relative mt-2 overflow-hidden rounded-2xl border border-hair bg-white p-3 font-mono text-[10.5px] leading-[1.75] text-ink/85">
        <span className="absolute right-3 top-2.5 flex items-center gap-1 font-sans text-[11px] font-medium text-ink">
          <Svg size={12}>
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2" />
          </Svg>
          42:17
        </span>
        <Line n={1}><K>class</K> LRUCache:</Line>
        <Line n={2}>  <K>def</K> <S>__init__</S>(self, capacity: <K>int</K>):</Line>
        <Line n={3}>    self.capacity = capacity</Line>
        <Line n={4}>    self.cache = {"{}"}</Line>
        <Line n={5}>    self.order = []</Line>
        <Line n={6} />
        <Line n={7}>  <K>def</K> <S>get</S>(self, key: <K>int</K>) -&gt; <K>int</K>:</Line>
        <Line n={8}>    <K>if</K> key <K>not in</K> self.cache:</Line>
        <Line n={9}>      <K>return</K> <R>-1</R></Line>
        <Line n={10}>    <span className="text-faint"># ...</span></Line>
      </div>
      <div className="mt-3 flex items-center justify-center gap-5 pb-1">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-accent shadow-sm">
          <Svg size={18}><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /></Svg>
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-[0_12px_28px_-8px_rgba(124,58,237,0.7)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/30 [animation-duration:2.4s]" />
          <Svg size={20}>
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
          </Svg>
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-rose-50">
          <span className="h-3.5 w-3.5 rounded-[3px] bg-rose-500" />
        </span>
      </div>
    </Card>
  );
}

/* ---------- Step 4: Get a shortlist ---------- */

const ranked = [
  { initials: "AS", name: "Aarav Sharma", score: 86, grad: "from-violet-400 to-violet-600" },
  { initials: "PN", name: "Priya Nair", score: 78, grad: "from-pink-400 to-rose-500" },
  { initials: "RM", name: "Rohan Mehta", score: 74, grad: "from-sky-400 to-cyan-500" },
];

function ShortlistVisual() {
  return (
    <Card className="!p-3">
      <div className="flex justify-end px-1 text-ink/50">
        <Svg size={16}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4" /></Svg>
      </div>
      <ul className="mt-2 space-y-2.5">
        {ranked.map((c, i) => (
          <motion.li
            key={c.name}
            className="flex items-center gap-3 rounded-2xl border border-hair bg-white p-3 shadow-[0_10px_24px_-18px_rgba(20,22,30,0.4)]"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease }}
          >
            <Avatar initials={c.initials} grad={c.grad} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-ink">{c.name}</p>
              <div className="mt-1.5 w-4/5">
                <Bar w={c.score} className="h-1.5" />
              </div>
            </div>
            <Ring value={c.score} size={46} width={4} className="text-[15px]" />
          </motion.li>
        ))}
        <li className="flex items-center gap-3 rounded-2xl border border-hair bg-white/50 p-3 opacity-50">
          <span className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-1.5">
            <span className="block h-2 w-2/3 rounded-full bg-slate-200" />
            <span className="block h-1.5 w-1/2 rounded-full bg-slate-100" />
          </div>
          <span className="grid h-[46px] w-[46px] place-items-center rounded-full border-4 border-slate-100 font-serif text-[14px] text-slate-400">
            68
          </span>
        </li>
      </ul>
    </Card>
  );
}

/* Lays a visual out at least FIT_W wide; in narrower columns the whole
   visual scales down instead of reflowing, so it keeps its proportions. */
const FIT_W = 340;

function Fit({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: FIT_W, scale: 1, h: 0 });

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const cw = o.clientWidth;
      const scale = Math.min(1, cw / FIT_W);
      setBox({ w: Math.max(FIT_W, cw), scale, h: i.offsetHeight * scale });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="relative w-full" style={{ height: box.h || undefined }}>
      <div ref={inner} className="origin-top-left" style={{ width: box.w, transform: `scale(${box.scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const steps = [
  { n: 1, title: "Connect", body: "Pull in GitHub, GitLab, LinkedIn and portfolios.", visual: <ConnectVisual /> },
  { n: 2, title: "Analyze & match", body: "Score real work against what the role needs.", visual: <AnalyzeVisual /> },
  { n: 3, title: "Assess & interview", body: "Live coding, system design and an AI interview.", visual: <AssessVisual /> },
  { n: 4, title: "Get a shortlist", body: "A ranked list with evidence behind every name.", visual: <ShortlistVisual /> },
];

function Arrow() {
  return (
    <span className="pointer-events-none absolute -right-5 top-1/2 hidden -translate-y-1/2 text-violet-300 xl:block" aria-hidden>
      <Svg size={20}><path d="M4 12h15M14 6l6 6-6 6" /></Svg>
    </span>
  );
}

/* From xl up (four steps side by side) the section takes exactly the hero's
   height; if the content is taller it scales down to fit. Below xl the steps
   stack and the section keeps its natural height. */
const LOCK_QUERY = "(min-width: 1280px)";
const PAD_Y = 48; // xl:py-12, per side

function useHeroLock() {
  const content = useRef<HTMLDivElement>(null);
  const [lock, setLock] = useState<{ height: number; scale: number; natural: number } | null>(null);

  useEffect(() => {
    const hero = document.getElementById("top");
    const el = content.current;
    if (!hero || !el) return;
    const mq = window.matchMedia(LOCK_QUERY);
    const update = () => {
      if (!mq.matches) return setLock(null);
      const height = hero.offsetHeight;
      const natural = el.offsetHeight; // layout height, unaffected by transform
      setLock({ height, natural, scale: Math.min(1, (height - PAD_Y * 2) / natural) });
    };
    const ro = new ResizeObserver(update);
    ro.observe(hero);
    ro.observe(el);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { content, lock };
}

export default function HowItWorks() {
  const { content, lock } = useHeroLock();

  return (
    <section
      id="how-it-works"
      className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:py-20 lg:px-12 xl:py-12 [background:radial-gradient(50rem_30rem_at_50%_0%,rgba(124,58,237,0.08),transparent_65%),radial-gradient(40rem_30rem_at_0%_100%,rgba(124,58,237,0.06),transparent_60%)]"
      style={lock ? { height: lock.height } : undefined}
    >
      <div
        ref={content}
        className="mx-auto w-full max-w-[88rem] origin-top"
        style={
          lock && lock.scale < 1
            ? { transform: `scale(${lock.scale})`, marginBottom: -lock.natural * (1 - lock.scale) }
            : undefined
        }
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.32em] text-slate-500">How it works</p>
          <h2 className="mt-4 !font-serif text-[clamp(2.4rem,5.4vw,4.75rem)] !font-semibold !tracking-[-0.02em] !leading-[1.05] text-[#1e1b4b]">
            From signals to a{" "}
            <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-2 italic text-transparent">shortlist.</em>
          </h2>
        </motion.div>

        {/* step headers with the connecting wave */}
        <motion.div
          className="relative mt-12 -mb-24 hidden h-24 xl:block"
          initial={{ clipPath: "inset(-24px 100% -24px 0)" }}
          whileInView={{ clipPath: "inset(-24px 0% -24px 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
          aria-hidden
        >
          <svg className="absolute inset-x-0 top-0 h-24 w-full overflow-visible text-violet-300" viewBox="0 0 1000 96" preserveAspectRatio="none">
            <path
              d="M125 20 C 210 -14, 300 26, 375 34 C 440 40, 470 16, 500 16 C 530 16, 560 40, 625 34 C 700 26, 790 -14, 875 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:mt-0 xl:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="relative flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <div className={`text-center ${i === 1 || i === 2 ? "xl:mt-[14px]" : ""}`}>
                <span className="relative mx-auto grid h-10 w-10 place-items-center rounded-full bg-violet-100 font-serif text-[18px] font-semibold text-accent ring-8 ring-violet-50">
                  {s.n}
                </span>
                <h3 className="mt-3 font-serif text-[22px] font-semibold tracking-tight text-[#1e1b4b]">{s.title}</h3>
                <p className="mx-auto mt-1 max-w-[16rem] text-[13px] text-dim">{s.body}</p>
              </div>
              <div className="relative mt-6 flex-1">
                <Fit>{s.visual}</Fit>
                {i < steps.length - 1 && <Arrow />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
