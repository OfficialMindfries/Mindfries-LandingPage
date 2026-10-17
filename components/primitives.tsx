"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
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

/* Stack panels that should match the hero: from xl up the section takes
   exactly the hero's height (#top) and scales its content down to fit if
   needed. Below xl it keeps its natural height. */
const LOCK_QUERY = "(min-width: 1280px)";
const LOCK_PAD_Y = 48; // xl:py-12, per side

export function HeroHeightSection({
  id,
  className = "",
  contentClassName = "",
  children,
}: {
  id?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
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
      setLock({ height, natural, scale: Math.min(1, (height - LOCK_PAD_Y * 2) / natural) });
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

  return (
    <section
      id={id}
      className={`relative flex flex-col justify-center overflow-hidden ${className}`}
      style={lock ? { height: lock.height } : undefined}
    >
      <div
        ref={content}
        className={`w-full origin-top ${contentClassName}`}
        style={
          lock && lock.scale < 1
            ? { transform: `scale(${lock.scale})`, marginBottom: -lock.natural * (1 - lock.scale) }
            : undefined
        }
      >
        {children}
      </div>
    </section>
  );
}

export { motion, useTransform };
