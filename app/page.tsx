"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DemoVideo from "@/components/DemoVideo";
import { PartnersIntro, PartnerVoices, JoinConversation } from "@/components/DesignPartners";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * StackPanel — pedagon-style stacked-deck scrolling (opening panels only).
 *
 * Every panel is position:sticky, so as you scroll each new panel slides up
 * and COVERS the pinned one before it; earlier panels' top edges peek out
 * behind by a few px per index (the deck effect).
 *
 * Pin offset: panels shorter than the viewport pin near the top; taller
 * panels pin only once their bottom edge is on screen, so no content is
 * ever trapped under the fold.
 *
 * On top of the stack, each panel keeps a spring-smoothed entrance glide
 * (slide up + fade in) while it travels into view.
 */
function StackPanel({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  const peek = 16 + index * 10; // where this card pins; later cards sit lower → earlier edges peek

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () =>
      setTop(Math.min(peek, window.innerHeight - el.offsetHeight - 16));
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    compute();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [peek]);

  // Entrance glide while the panel travels up into view (before it pins)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [48, 0]);
  const opacity = useTransform(smooth, [0, 0.6], [0.4, 1]);

  return (
    <div className="sticky" style={{ top: top ?? peek }}>
      <motion.div
        ref={ref}
        style={index === 0 ? undefined : { y, opacity }}
        className="panel overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scene — a classy scroll transition for each panel.
 *
 * Panels sit in normal flow (no sticky deck). As a panel rises into view it
 * eases up from a slightly smaller, tilted-back, faded state into place; as
 * it leaves past the top it recedes a touch (scales down and dims) so the
 * next panel takes focus. Everything is driven by scroll position through a
 * spring, so it scrubs smoothly in both directions. Reduced-motion users get
 * static panels.
 */
function Scene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Entering: from the panel's top touching the viewport bottom until it is a third of the way up
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  // Leaving: from its bottom reaching mid-screen until it has left the top
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["end 0.55", "end start"] });

  const spring = { stiffness: 110, damping: 24, mass: 0.5 };
  const inP = useSpring(enter, spring);
  const outP = useSpring(leave, spring);

  const scaleIn = useTransform(inP, [0, 1], [0.9, 1]);
  const scaleOut = useTransform(outP, [0, 1], [1, 0.95]);
  const scale = useTransform(() => scaleIn.get() * scaleOut.get());
  const y = useTransform(inP, [0, 1], [90, 0]);
  const rotateX = useTransform(inP, [0, 1], [8, 0]);
  const opacityIn = useTransform(inP, [0, 0.7], [0, 1]);
  const opacityOut = useTransform(outP, [0, 1], [1, 0.35]);
  const opacity = useTransform(() => opacityIn.get() * opacityOut.get());

  return (
    <div ref={ref} className="[perspective:1600px]">
      <motion.div
        style={reduce ? undefined : { scale, y, rotateX, opacity, transformOrigin: "50% 0%" }}
        className="panel overflow-hidden will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="space-y-4 px-3 py-3 sm:px-5 sm:py-5">
        {/* Opening deck: How it works slides up over the pinned hero. The
            wrapper bounds the sticky panels, so the deck scrolls away as a
            unit before the transition panels below. */}
        <div className="space-y-4">
          <StackPanel index={0}>
            <Hero />
          </StackPanel>

          <StackPanel index={1}>
            <HowItWorks />
          </StackPanel>
        </div>

        {/* From here on, each panel eases into view and recedes as it scrolls away */}

        <Scene>
          <DemoVideo />
        </Scene>

        <Scene>
          <PartnersIntro />
        </Scene>

        <Scene>
          <PartnerVoices />
        </Scene>

        <Scene>
          <JoinConversation />
        </Scene>

        {/* Pricing deals its plan cards out on scroll, so it skips the Scene transition */}
        <div className="panel overflow-hidden">
          <Pricing />
        </div>

        {/* "Let's talk engineering." runs its own pinned reveal, so no Scene */}
        <CTA />

        <Scene>
          <Footer />
        </Scene>
      </main>
    </>
  );
}
