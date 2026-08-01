"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * GlidePanel — scroll-linked gliding effect.
 *
 * Each section tracks its own scroll progress through the viewport:
 *   0  → section bottom just enters viewport from below
 *   1  → section top has left viewport above
 *
 * As it enters  (progress 0 → 0.12): slides up + fades in
 * While visible (progress 0.12 → 0.88): fully opaque, no transform
 * As it exits   (progress 0.88 → 1):  scales down slightly + fades out
 *                                       (simulates being "covered" by next panel)
 *
 * Works on EVERY scroll — both down and up.
 * To revert: replace <GlidePanel> with <div className="panel overflow-hidden">
 */
function GlidePanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Track this element's scroll progress through the viewport window
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start when bottom hits viewport bottom, end when top exits viewport top
  });

  // ── Enter: slide up from 56px below, fade from 0
  // ── Exit:  drift up -20px, scale down to 0.96, fade to 0 (being "covered")
  const y = useTransform(
    scrollYProgress,
    [0, 0.33, 0.95, 1],
    [56, 0, 0, -20]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.95, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.33, 0.95, 1],
    [0.98, 1, 1, 0.97]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="panel overflow-hidden will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="space-y-4 px-3 py-3 sm:px-5 sm:py-5">
        {/* Hero — static, always visible at the top */}
        <div className="panel overflow-hidden">
          <Hero />
        </div>

        {/* Each section glides in on scroll, fades back as the next covers it */}
        <GlidePanel>
          <Features />
        </GlidePanel>

        <GlidePanel>
          <Integrations />
        </GlidePanel>

        <GlidePanel>
          <Testimonials />
        </GlidePanel>

        <GlidePanel>
          <Team />
        </GlidePanel>

        <GlidePanel>
          <CTA />
        </GlidePanel>

        <GlidePanel>
          <Footer />
        </GlidePanel>
      </main>
    </>
  );
}
