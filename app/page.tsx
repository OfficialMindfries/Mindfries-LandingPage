"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DemoVideo from "@/components/DemoVideo";
import { PartnersIntro, PartnerVoices, JoinConversation } from "@/components/DesignPartners";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * The landing page is a run of full-screen pages, each with the scroll
 * effect that suits it:
 *
 * - DeckPage: the opening two (Hero, How it works) are rounded cards in a
 *   stacked deck. Each is position:sticky, so How it works slides up and
 *   covers the pinned hero, whose top edge peeks out behind it.
 * - Page "parallax": the page's content drifts against the scroll, so it
 *   settles into place as the page reaches the top of the screen.
 * - Page "reveal": the content fades and rises in when the page lands, and
 *   eases back out as it leaves, every time.
 * - Page "still": the section runs its own scroll animation (Pricing).
 *
 * Every page after the deck is square and edge to edge, exactly one screen
 * tall on desktop (lg+), and a gentle scroll-snap (proximity, see
 * globals.css) settles the page you stop near. Below lg pages keep their
 * natural height and nothing snaps. Reduced-motion users get static pages.
 */

const spring = { stiffness: 110, damping: 24, mass: 0.5 };

function DeckPage({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const peek = 12 + index * 10; // where this card pins; later cards sit lower, so earlier edges peek
  const [top, setTop] = useState(peek);

  // A card taller than the screen (below lg, where cards keep their natural
  // height) pins only once its bottom is on screen, so nothing is trapped under the fold.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => setTop(Math.min(peek, window.innerHeight - el.offsetHeight - 12));
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    compute();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [peek]);

  return (
    <div className="sticky" style={{ top }}>
      {/* Same height for both cards (screen minus the deepest peek and a margin), so they line up */}
      <div ref={ref} className="panel overflow-hidden lg:h-[calc(100svh-2.25rem)] [&>section]:lg:h-full">
        {children}
      </div>
    </div>
  );
}

function Page({ children, effect }: { children: React.ReactNode; effect: "parallax" | "reveal" | "still" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // parallax: from the page entering at the bottom to leaving at the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(useSpring(scrollYProgress, spring), [0, 1], [90, -90]);

  // reveal: in when at least 35% of the page is on screen
  const inView = useInView(ref, { amount: 0.35 });

  const motionProps =
    reduce || effect === "still"
      ? {}
      : effect === "parallax"
        ? { style: { y: drift } }
        : {
            initial: false,
            animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.2, y: 56, scale: 0.98 },
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
          };

  return (
    <div ref={ref} className="relative overflow-clip bg-white lg:h-svh lg:snap-start">
      <motion.div {...motionProps} className="h-full will-change-transform [&>*]:lg:h-full">
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main data-snap>
        {/* Opening deck: How it works slides up over the pinned hero. The
            wrapper bounds the sticky cards, so the deck scrolls away as a
            unit before the full-screen pages below. */}
        <div className="space-y-4 px-3 pb-3 pt-3 sm:px-5 lg:snap-start">
          <DeckPage index={0}>
            <Hero />
          </DeckPage>
          <DeckPage index={1}>
            <HowItWorks />
          </DeckPage>
        </div>

        <Page effect="parallax">
          <DemoVideo />
        </Page>
        <Page effect="reveal">
          <PartnersIntro />
        </Page>
        <Page effect="parallax">
          <PartnerVoices />
        </Page>
        <Page effect="reveal">
          <JoinConversation />
        </Page>
        {/* Pricing deals its plan cards out on scroll, so it skips the page effect */}
        <Page effect="still">
          <Pricing />
        </Page>
        <Page effect="parallax">
          <FAQ />
        </Page>

        {/* "Let's talk engineering." runs its own pinned reveal (a rounded card opening to full bleed) */}
        <div className="lg:snap-start">
          <CTA />
        </div>

        <Page effect="reveal">
          <Footer />
        </Page>
      </main>
    </>
  );
}
