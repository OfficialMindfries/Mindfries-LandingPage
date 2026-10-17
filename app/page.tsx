"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
 * Scene — a classy scroll transition for each panel.
 *
 * Panels sit in normal flow (no sticky deck). As a panel rises into view it
 * eases up from a slightly smaller, tilted-back, faded state into place; as
 * it leaves past the top it recedes a touch (scales down and dims) so the
 * next panel takes focus. Everything is driven by scroll position through a
 * spring, so it scrubs smoothly in both directions. Reduced-motion users get
 * static panels.
 */
function Scene({ children, first = false }: { children: React.ReactNode; first?: boolean }) {
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
  const scale = useTransform(() => (first ? 1 : scaleIn.get()) * scaleOut.get());
  const y = useTransform(inP, [0, 1], [first ? 0 : 90, 0]);
  const rotateX = useTransform(inP, [0, 1], [first ? 0 : 8, 0]);
  const opacityIn = useTransform(inP, [0, 0.7], [first ? 1 : 0, 1]);
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
        {/* Each panel eases into view and recedes as it scrolls away */}
        <Scene first>
          <Hero />
        </Scene>

        <Scene>
          <HowItWorks />
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

        <Scene>
          <Features />
        </Scene>

        {/* Scroll-driven pipeline story — pins itself (own sticky viewport),
            so it stays outside the Scene wrappers */}
        <Pipeline />

        <Scene>
          <Integrations />
        </Scene>

        <Scene>
          <Testimonials />
        </Scene>

        <Scene>
          <CTA />
        </Scene>

        <Scene>
          <Footer />
        </Scene>
      </main>
    </>
  );
}
