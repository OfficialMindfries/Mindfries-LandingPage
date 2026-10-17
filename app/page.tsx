"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { PartnersIntro, PartnerVoices, JoinConversation } from "@/components/DesignPartners";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";
import Pipeline from "@/components/Pipeline";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * StackPanel — pedagon-style stacked-deck scrolling.
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

export default function Home() {
  return (
    <>
      <Nav />
      <main className="space-y-4 px-3 py-3 sm:px-5 sm:py-5">
        {/* Deck: each panel pins and the next one slides up over it */}
        <StackPanel index={0}>
          <Hero />
        </StackPanel>

        <StackPanel index={1}>
          <HowItWorks />
        </StackPanel>

        <StackPanel index={2}>
          <PartnersIntro />
        </StackPanel>

        <StackPanel index={3}>
          <PartnerVoices />
        </StackPanel>

        <StackPanel index={4}>
          <JoinConversation />
        </StackPanel>

        <StackPanel index={5}>
          <Features />
        </StackPanel>

        {/* Scroll-driven pipeline story — pins itself (own sticky viewport),
            so it stays outside the StackPanel wrappers */}
        <Pipeline />

        <StackPanel index={6}>
          <Integrations />
        </StackPanel>

        <StackPanel index={7}>
          <Testimonials />
        </StackPanel>

        <StackPanel index={8}>
          <CTA />
        </StackPanel>

        <StackPanel index={9}>
          <Footer />
        </StackPanel>
      </main>
    </>
  );
}
