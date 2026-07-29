"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./primitives";

/* Real, recognizable logos — same fanned-tile treatment as the video, but the
   sources Mindfries actually reads (dev work), not a generic office suite. */

const GitHubLogo = (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="#181717" aria-hidden>
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.1.82-.25.82-.56v-2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.8 1.27 3.49.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.65 1.66.24 2.88.12 3.18.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.09.81 2.2v3.26c0 .31.22.67.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
  </svg>
);

const GitLabLogo = (
  <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden>
    <path fill="#E24329" d="m12 21.42 3.68-11.33H8.32L12 21.42Z" />
    <path fill="#FC6D26" d="M12 21.42 8.32 10.09H3.16L12 21.42Z" />
    <path fill="#FCA326" d="M3.16 10.09.7 17.64a.55.55 0 0 0 .2.62L12 21.42 3.16 10.09Z" />
    <path fill="#E24329" d="M3.16 10.09h5.16L6.1 3.24a.28.28 0 0 0-.53 0L3.16 10.09Z" />
    <path fill="#FC6D26" d="M12 21.42 15.68 10.09h5.16L12 21.42Z" />
    <path fill="#FCA326" d="M20.84 10.09 23.3 17.64a.55.55 0 0 1-.2.62L12 21.42l8.84-11.33Z" />
    <path fill="#E24329" d="M20.84 10.09h-5.16l2.22-6.85a.28.28 0 0 1 .53 0l2.41 6.85Z" />
  </svg>
);

const StackOverflowLogo = (
  <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden>
    <path fill="#BCBBBB" d="M17.36 20.2v-5.38h1.79V22H3v-7.18h1.79v5.38z" />
    <path fill="#F48024" d="m6.77 14.32 8.78 1.84.37-1.76-8.78-1.84zm1.16-4.2 8.14 3.79.76-1.62-8.14-3.8zm2.25-3.99 6.9 5.74 1.14-1.37-6.9-5.74zM14.64 1l-1.45 1.08 5.35 7.2 1.45-1.08zM6.59 18.41h8.98v-1.78H6.59z" />
  </svg>
);

const HuggingFaceLogo = (
  <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden>
    <circle cx="12" cy="12" r="9" fill="#FFD21E" />
    <circle cx="9" cy="11" r="1.3" fill="#3A3B45" />
    <circle cx="15" cy="11" r="1.3" fill="#3A3B45" />
    <path d="M8.4 14.4c1.1 1.3 6.1 1.3 7.2 0" fill="none" stroke="#3A3B45" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4.8 12.6c-.9-.4-1.9.5-1.4 1.4M19.2 12.6c.9-.4 1.9.5 1.4 1.4" fill="none" stroke="#FFD21E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LiveCodeLogo = (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
  </svg>
);

const sources = [
  { key: "gl", name: "GitLab", note: "pipelines & merge requests", logo: GitLabLogo },
  { key: "hf", name: "Hugging Face", note: "shipped models & spaces", logo: HuggingFaceLogo },
  { key: "live", name: "Live code", note: "sandboxed assessment", logo: LiveCodeLogo },
  { key: "gh", name: "GitHub", note: "commits, PRs & code review", logo: GitHubLogo },
  { key: "so", name: "Stack Overflow", note: "answers & reputation", logo: StackOverflowLogo },
];

const MID = 2;

export default function Integrations() {
  const [active, setActive] = useState(MID);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % sources.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-hair bg-surface shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f4502f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
            </svg>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl text-ink sm:text-5xl">
            It reads the work engineers already do.
          </h2>
        </Reveal>

        <div className="relative mt-16 flex items-end justify-center">
          {sources.map((s, i) => {
            const off = i - MID;
            const isActive = i === active;
            return (
              <motion.button
                key={s.key}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: off * 9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * Math.abs(off), ease: [0.22, 1, 0.36, 1] }}
                animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -14 : Math.abs(off) * 16 }}
                style={{ marginLeft: i === 0 ? 0 : -12, zIndex: isActive ? 10 : 5 - Math.abs(off) }}
                className={`grid h-24 w-24 shrink-0 place-items-center rounded-3xl border shadow-lg transition-colors ${
                  isActive
                    ? "border-hair-bright bg-surface shadow-[0_18px_40px_-16px_rgba(124,58,237,0.5)]"
                    : "border-hair bg-surface/80"
                }`}
                aria-label={s.name}
              >
                {s.logo}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 h-12">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-lg font-semibold text-ink">{sources[active].name}</div>
            <div className="mt-0.5 text-sm text-dim">{sources[active].note}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
