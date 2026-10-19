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

/* A full-screen page section: from lg up it takes its page's height (set by
   the page wrapper) and scales its content down to fit via Fit. Below lg it
   keeps its natural height. */
export function PageSection({
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
  return (
    <section id={id} className={`relative flex flex-col justify-center overflow-hidden ${className}`}>
      <Fit>
        <div className={`w-full ${contentClassName}`}>{children}</div>
      </Fit>
    </section>
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

export { motion, useTransform };
