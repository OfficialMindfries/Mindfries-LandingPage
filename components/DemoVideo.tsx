"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

/* Point these at the demo video when it's ready. `src` can be a file in
   /public (e.g. "/demo.mp4") or a hosted .mp4/.webm URL; `poster` is an
   optional still shown before it plays. While `src` is empty, the play
   button offers a live demo instead. */
const DEMO_VIDEO = {
  src: "",
  poster: "",
};

const ease = [0.22, 1, 0.36, 1] as const;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const chapters = ["Connect", "Analyze & match", "Assess & interview", "Get a shortlist"];

/* What sits in the frame before the video plays: soft product-style canvas */
function Poster() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4c1d95]">
      <span className="absolute -left-[10%] -top-[20%] h-[70%] w-[55%] rounded-full bg-violet-500/40 blur-[90px]" />
      <span className="absolute -bottom-[25%] -right-[10%] h-[75%] w-[55%] rounded-full bg-fuchsia-400/25 blur-[100px]" />
      {/* faint product grid */}
      <div className="absolute inset-[8%] grid grid-cols-[22%_1fr] gap-4 opacity-[0.16]">
        <div className="space-y-3 rounded-2xl border border-white/40 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-3 rounded-full bg-white" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
          ))}
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="h-20 rounded-2xl border border-white/40" />
            ))}
          </div>
          <span className="rounded-2xl border border-white/40" />
        </div>
      </div>
    </div>
  );
}

export default function DemoVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  // The frame widens and flattens its corners as it scrolls into view
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.5 });
  const scale = useTransform(p, [0, 1], [0.88, 1]);
  const radius = useTransform(p, [0, 1], [56, 28]);

  const play = () => {
    if (!DEMO_VIDEO.src) {
      setComingSoon(true);
      return;
    }
    setStarted(true);
    requestAnimationFrame(() => video.current?.play());
  };

  return (
    <section
      id="demo"
      className="relative overflow-hidden px-6 py-16 sm:py-20 lg:px-12 [background:radial-gradient(50rem_30rem_at_50%_0%,rgba(124,58,237,0.1),transparent_65%),radial-gradient(36rem_28rem_at_0%_100%,rgba(124,58,237,0.07),transparent_60%),radial-gradient(36rem_28rem_at_100%_100%,rgba(244,80,47,0.05),transparent_60%)]"
    >
      <div className="mx-auto max-w-[80rem]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/70 px-4 py-1.5 backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink/70">Product demo</span>
          </span>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(2.3rem,4.8vw,4.25rem)] !font-serif !font-semibold !leading-[1.04] !tracking-[-0.02em] text-[#1e1b4b]">
            Watch Mindfries{" "}
            <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-2 italic text-transparent">
              in action.
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-dim sm:text-[17px]">
            See a hiring team go from scattered signals to a ranked, explainable shortlist.
          </p>
        </motion.div>

        {/* video panel */}
        <motion.div
          ref={ref}
          style={{ scale, borderRadius: radius }}
          className="relative mx-auto mt-10 aspect-video w-full overflow-hidden border border-white/70 bg-[#1e1b4b] shadow-[0_60px_120px_-40px_rgba(76,29,149,0.55),0_0_0_8px_rgba(167,139,250,0.12)]"
        >
          {started && DEMO_VIDEO.src ? (
            <video
              ref={video}
              className="absolute inset-0 h-full w-full bg-black object-cover"
              src={DEMO_VIDEO.src}
              poster={DEMO_VIDEO.poster || undefined}
              controls
              playsInline
            />
          ) : (
            <>
              {DEMO_VIDEO.poster ? (
                // eslint-disable-next-line @next/next/no-img-element -- poster may be a remote URL
                <img src={DEMO_VIDEO.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <Poster />
              )}

              <button
                type="button"
                onClick={play}
                aria-label="Play the Mindfries demo video"
                className="group absolute inset-0 grid place-items-center"
              >
                <span className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.6s]" />
                  <span className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40" />
                  <span className="relative grid h-[72%] w-[72%] place-items-center rounded-full bg-white text-[#4c1d95] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-110">
                    <svg width="30" height="30" viewBox="0 0 24 24" className="ml-1" aria-hidden>
                      <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/45 to-transparent px-6 pb-5 pt-16 text-white sm:px-8 sm:pb-7">
                <div>
                  <p className="font-serif text-[clamp(1.1rem,2vw,1.6rem)] font-semibold">Mindfries product walkthrough</p>
                  <p className="mt-1 text-[13px] text-white/70">From signals to a shortlist</p>
                </div>
                <span className="hidden rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium backdrop-blur sm:inline">
                  Demo
                </span>
              </div>
            </>
          )}

          {/* no video yet */}
          <AnimatePresence>
            {comingSoon && (
              <motion.div
                className="absolute inset-0 grid place-items-center bg-[#1e1b4b]/80 p-4 text-center text-white backdrop-blur-md sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
              >
                <div>
                  <p className="font-serif text-[clamp(1rem,3vw,2.25rem)] font-semibold">The demo video is on its way.</p>
                  <p className="mx-auto mt-3 hidden max-w-md text-[15px] text-white/75 sm:block">
                    Until then, we&rsquo;ll happily walk you through Mindfries live.
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 sm:mt-6 sm:gap-3">
                    <a
                      href="#access"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] sm:px-6 sm:py-3 sm:text-[14px] font-medium text-[#1e1b4b] transition-transform hover:-translate-y-0.5"
                    >
                      Book a live demo
                      <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => setComingSoon(false)}
                      className="rounded-full px-3 py-2 text-[13px] text-white/80 transition-colors hover:text-white sm:px-5 sm:py-3 sm:text-[14px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* chapters */}
        <ol className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {chapters.map((c, i) => (
            <li key={c} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/80 px-4 py-2 text-[13.5px] text-ink/80 shadow-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-100 font-serif text-[11px] font-semibold text-accent">
                  {i + 1}
                </span>
                {c}
              </span>
              {i < chapters.length - 1 && <span className="hidden h-px w-6 bg-violet-200 sm:block" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
