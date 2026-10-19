"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

/* Scroll-into-view reveal: subtle rise + fade, scrubbed once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Number that snaps to whole values as it counts up on view. */
export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      );
    });
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* Section index label: "01 / THE PROBLEM" with an accent tick. */
export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="eyebrow">
        {index} <span className="text-faint">/</span> {children}
      </span>
    </div>
  );
}

/* Full-screen pages: from lg up, Fit fills the rest of its section and
   scales its content down (never up) when the content is taller than the
   space, so a page always fits one desktop screen. The section must be a
   flex column with a definite height. Below lg it is a plain wrapper. */
const FIT_QUERY = "(min-width: 1024px)";

export function Fit({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const b = box.current;
    const el = inner.current;
    if (!b || !el) return;
    const mq = window.matchMedia(FIT_QUERY);
    // offsetHeight is the layout height, unaffected by the transform
    const update = () => setScale(mq.matches ? Math.min(1, b.clientHeight / el.offsetHeight) : 1);
    const ro = new ResizeObserver(update);
    ro.observe(b);
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

  return (
    <div ref={box} className={`lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center ${className}`}>
      <div ref={inner} className="w-full shrink-0 origin-center" style={scale < 1 ? { transform: `scale(${scale})` } : undefined}>
        {children}
      </div>
    </div>
  );
}

/* ---------- Pinned scenes ----------
   Scene pins a full-screen stage while the page scrolls through a taller
   runway (`length` screens), and hands its children one progress value,
   0 → 1, through useScene(). Each page turns that into its own
   choreography, the way the "Let's talk engineering." CTA does.

   Progress starts while the page is still rising into view (its top at 60%
   of the screen), so by the time the stage pins, the opening beat (usually
   the headline) has already played; a link that jumps to the page never
   lands on an empty stage. Roughly: 0 to 0.3 plays during the entry, 0.3 to
   0.9 while pinned, and the last stretch holds the finished page.

   Below lg, and for reduced-motion users, nothing pins: the stage is a
   normal section and progress is fixed at 1, the finished state. */

const SceneProgress = createContext<MotionValue<number> | null>(null);

export function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(FIT_QUERY);
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export function Scene({
  id,
  length = 2.2,
  inset = 0,
  className = "",
  as: Tag = "section",
  children,
}: {
  id?: string;
  length?: number;
  /* Pin the stage this many px below the top (and 14px above the bottom),
     for a scene that is a card in the stacked deck rather than full bleed */
  inset?: number;
  className?: string;
  as?: "section" | "footer";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pinned = useDesktop() && !reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const finished = useMotionValue(1);

  return (
    <Tag id={id} ref={ref as React.RefObject<HTMLElement & HTMLDivElement>} className="relative" style={pinned ? { height: `${length * 100}svh` } : undefined}>
      <div
        className={`relative overflow-hidden ${pinned ? "sticky top-0 flex h-svh flex-col" : ""} ${className}`}
        style={pinned && inset ? { top: inset, height: `calc(100svh - ${inset + 14}px)` } : undefined}
      >
        <SceneProgress.Provider value={pinned ? smooth : finished}>{children}</SceneProgress.Provider>
      </div>
    </Tag>
  );
}

/* The current scene's progress (1 outside a scene) */
export function useScene() {
  const p = useContext(SceneProgress);
  const one = useMotionValue(1);
  return p ?? one;
}

/* 0 → 1 as `p` moves from `from` to `to` (clamped) */
export function useBeat(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [from, to], [0, 1], { clamp: true });
}

/* A headline line that rises out of its own mask as `p` goes 0 → 1 */
export function MaskLine({ p, children, className = "" }: { p: MotionValue<number>; children: React.ReactNode; className?: string }) {
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

/* Rises and fades in as `p` goes 0 → 1 */
export function Rise({ p, y = 40, className, children }: { p: MotionValue<number>; y?: number; className?: string; children: React.ReactNode }) {
  const ty = useTransform(p, [0, 1], [y, 0]);
  return (
    <motion.div className={className} style={{ opacity: p, y: ty }}>
      {children}
    </motion.div>
  );
}

export { motion, useTransform };
