"use client";

import { motion } from "framer-motion";

/* ---- Node-graph hero (matches the video's opening/closing frame) ----
   A central violet "verified" tile wired by thin connectors — each with a
   pulsing violet dot — out to satellite source tiles and candidate cards. */

type Node = {
  id: string;
  x: number; // px in the 720×300 graph box
  y: number;
  float: string;
  render: React.ReactNode;
};

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Tile({ cls, children }: { cls: string; children: React.ReactNode }) {
  return <div className={`tile ${cls} h-16 w-16`}>{children}</div>;
}

function Portrait({ grad, initials }: { grad: string; initials: string }) {
  return (
    <div
      className={`grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${grad} shadow-[0_12px_28px_-12px_rgba(20,22,30,0.5)] ring-2 ring-white`}
    >
      <span className="text-lg font-bold text-white/95">{initials}</span>
    </div>
  );
}

// 720×300 box, centre tile at (360,150). Nodes mirror across x=360.
const CENTER = { x: 360, y: 150 };

const nodes: Node[] = [
  {
    id: "bulb",
    x: 244,
    y: 66,
    float: "float-a",
    render: (
      <Tile cls="tile-yellow">
        <svg width="26" height="26" viewBox="0 0 24 24" {...iconStroke}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
        </svg>
      </Tile>
    ),
  },
  { id: "pa", x: 108, y: 150, float: "float-b", render: <Portrait grad="from-violet-400 to-violet-600" initials="PN" /> },
  {
    id: "cyan",
    x: 244,
    y: 234,
    float: "float-c",
    render: (
      <Tile cls="tile-cyan">
        {/* two balloons */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="8.5" cy="8" rx="4" ry="5" />
          <ellipse cx="15.5" cy="10" rx="4" ry="5" />
          <path d="M8.5 13v3M15.5 15v3" />
        </svg>
      </Tile>
    ),
  },
  {
    id: "bolt",
    x: 476,
    y: 66,
    float: "float-c",
    render: (
      <Tile cls="tile-coral">
        {/* shield with a bolt */}
        <svg width="26" height="26" viewBox="0 0 24 24" {...iconStroke}>
          <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
          <path d="M12.5 7 9.5 12h3l-1 5 4-6h-3l.5-4Z" fill="currentColor" stroke="none" />
        </svg>
      </Tile>
    ),
  },
  {
    id: "eyes",
    x: 612,
    y: 150,
    float: "float-a",
    render: (
      <div className="grid h-16 w-16 place-items-center rounded-2xl border border-hair-bright bg-surface shadow-[0_12px_28px_-14px_rgba(20,22,30,0.4)]">
        <svg width="34" height="22" viewBox="0 0 30 20">
          <ellipse cx="9" cy="10" rx="6" ry="8" fill="#fff" stroke="#16171b" strokeWidth="1.4" />
          <ellipse cx="21" cy="10" rx="6" ry="8" fill="#fff" stroke="#16171b" strokeWidth="1.4" />
          <circle cx="10.5" cy="11" r="2.4" fill="#16171b" />
          <circle cx="22.5" cy="11" r="2.4" fill="#16171b" />
        </svg>
      </div>
    ),
  },
  { id: "pb", x: 476, y: 234, float: "float-b", render: <Portrait grad="from-sky-300 to-cyan-500" initials="LW" /> },
];

const dotT = 0.58; // how far along each connector the pulsing dot sits

function Graph() {
  return (
    <div className="relative mx-auto hidden h-[300px] w-[720px] max-w-full lg:block">
      {/* connectors — 1:1 px geometry so the diagonals stay true */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 300" fill="none" aria-hidden>
        {nodes.map((n, i) => (
          <motion.line
            key={n.id}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="#c4c5cd"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.08, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* pulsing dots on the wires */}
      {nodes.map((n, i) => (
        <motion.span
          key={`dot-${n.id}`}
          className="pulse-dot absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: CENTER.x + dotT * (n.x - CENTER.x), top: CENTER.y + dotT * (n.y - CENTER.y) }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 400, damping: 16 }}
        />
      ))}

      {/* satellite nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={`node-${n.id}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${n.float}`}
          style={{ left: n.x, top: n.y }}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {n.render}
        </motion.div>
      ))}

      {/* central verified tile */}
      <motion.div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: CENTER.x, top: CENTER.y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="tile tile-violet float-b h-24 w-24 !rounded-[1.5rem] shadow-[0_28px_56px_-18px_rgba(124,58,237,0.7)]">
          <svg width="40" height="40" viewBox="0 0 24 24" {...iconStroke} strokeWidth={2.25}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12l2.5 2.5 4.5-5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="ambient relative overflow-hidden px-6 pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <Graph />

        {/* mobile: just the central tile */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto mb-7 lg:hidden"
        >
          <div className="tile tile-violet float-b mx-auto h-16 w-16 !rounded-3xl">
            <svg width="30" height="30" viewBox="0 0 24 24" {...iconStroke} strokeWidth={2.25}>
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 12l2.5 2.5 4.5-5" />
            </svg>
          </div>
        </motion.div>

        <div className="mx-auto max-w-2xl text-center lg:-mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-5xl text-ink sm:text-6xl"
          >
            We rank engineers on what they{" "}
            <span className="accent-text">actually built</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-5 max-w-md text-base leading-relaxed text-dim"
          >
            Mindfries reads real work — GitHub, portfolios, live code — then scores an
            adaptive assessment on a real codebase. A ranked shortlist with a reason for
            every name.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="#access"
              className="rounded-full bg-accent-2 px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_-10px_rgba(244,80,47,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Request early access
            </a>
            <a
              href="#how"
              className="rounded-full border border-hair-bright bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
            >
              See how it works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
