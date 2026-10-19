"use client";

import { useEffect, useRef, useState } from "react";
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
 * The landing page is a run of full-screen pages.
 *
 * - The opening two (Hero, How it works) are rounded cards in a stacked
 *   deck: each is position:sticky, so How it works slides up and covers
 *   the pinned hero, whose top edge peeks out behind it.
 * - Every page after that is square, edge to edge, and a pinned scene
 *   (Scene in components/primitives.tsx): the screen holds still while
 *   the scroll plays that page's own choreography, the way the "Let's talk
 *   engineering." CTA does. Demo "Cinema", Design partners "Word by word",
 *   Partner voices "Horizontal ride", Join "Assemble", Pricing "Card deal",
 *   FAQ "Guided tour", CTA, Footer "Sunrise".
 *
 * Below lg, and for reduced-motion users, nothing pins: pages keep their
 * natural height and show their finished state.
 */

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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Opening deck: How it works slides up over the pinned hero. The
            wrapper bounds the sticky cards, so the deck scrolls away as a
            unit before the scenes below. */}
        <div className="space-y-4 px-3 pb-3 pt-3 sm:px-5">
          <DeckPage index={0}>
            <Hero />
          </DeckPage>
          <DeckPage index={1}>
            <HowItWorks />
          </DeckPage>
        </div>

        <div className="bg-white">
          <DemoVideo />
          <PartnersIntro />
          <PartnerVoices />
          <JoinConversation />
          <Pricing />
          <FAQ />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
