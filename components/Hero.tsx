"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

const partners = ["AlgoScale", "GoQii", "ScInter", "VXT AI"];

// Node graph: a hub tile at center, satellites positioned by
// percentage. Same coords drive the SVG connectors (viewBox is
// 0..100 with non-uniform scaling so 1 unit == 1% on each axis).
type Node = {
  x: number;
  y: number;
  size: number;
  tile: string;
  glyph: React.ReactNode;
  float: string;
  hub?: boolean;
};

const HUB = { x: 50, y: 52 };

const nodes: Node[] = [
  { x: 50, y: 52, size: 76, tile: "tile-violet", glyph: <Check />, float: "float-b", hub: true },
  { x: 17, y: 40, size: 54, tile: "tile-cyan", glyph: <Code />, float: "float-a" },
  { x: 30, y: 82, size: 50, tile: "tile-yellow", glyph: "★", float: "float-c" },
  { x: 71, y: 24, size: 54, tile: "tile-coral", glyph: <Bolt />, float: "float-a" },
  { x: 84, y: 58, size: 50, tile: "tile-violet", glyph: "PN", float: "float-c" },
  { x: 66, y: 84, size: 46, tile: "tile-coral", glyph: "DO", float: "float-b" },
];

function Check() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function Code() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
function Bolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function NodeGraph() {
  return (
    <div className="relative mx-auto mb-10 h-64 w-full max-w-3xl sm:h-72">
      {/* connectors */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {nodes
          .filter((n) => !n.hub)
          .map((n, i) => (
            <motion.line
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke="rgba(20,22,30,0.14)"
              strokeWidth="0.35"
              strokeDasharray="1.4 1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: "easeInOut" }}
            />
          ))}
      </svg>

      {/* moving pulse dots along each connector */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {nodes
          .filter((n) => !n.hub)
          .map((n, i) => (
            <motion.circle
              key={i}
              r="0.7"
              fill="#7c3aed"
              initial={{ cx: HUB.x, cy: HUB.y, opacity: 0 }}
              animate={{ cx: [HUB.x, n.x], cy: [HUB.y, n.y], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: 1.4 + i * 0.3, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
            />
          ))}
      </svg>

      {/* tiles */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${n.x}%`, top: `${n.y}%`, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className={`tile ${n.tile} ${n.float} text-sm font-bold`}
            style={{ width: n.size, height: n.size }}
          >
            {n.glyph}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="ambient relative overflow-hidden px-6 pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-hair bg-surface/70 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="eyebrow !tracking-[0.18em]">AI hiring intelligence</span>
        </motion.div>

        <NodeGraph />

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-balance text-5xl text-ink sm:text-6xl lg:text-7xl"
        >
          We rank engineers on what they{" "}
          <span className="accent-text">actually built</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dim"
        >
          Mindfries reads real work — GitHub, portfolios, live code — then runs an
          adaptive assessment on a real codebase. You get a ranked shortlist with a
          plain-English reason for every name.{" "}
          <span className="font-medium text-ink">You decide.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-9 flex justify-center"
        >
          <WaitlistForm compact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <span className="mono text-xs uppercase tracking-widest text-faint">
            built with design partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {partners.map((p) => (
              <span key={p} className="text-sm font-medium text-dim">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
