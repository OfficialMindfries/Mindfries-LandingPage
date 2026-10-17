"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cols = [
  { title: "Product", links: ["How it works", "Evidence ranking", "Live assessment", "Shortlist"] },
  { title: "Company", links: ["Design partners", "Careers"] },
  { title: "Resources", links: ["Waitlist", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-4 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Mindfries logo"
                width={24}
                height={24}
                className="rounded-full overflow-hidden"
              />
              <span className="font-semibold text-ink">Mindfries</span>
            </div>
            <p className="text-sm leading-relaxed text-dim">
              Hiring intelligence that ranks engineers on real work — not another ATS.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="mono text-xs uppercase tracking-widest text-faint">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#access" className="text-sm text-dim transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-hair pt-6">
          <span className="mono text-xs text-faint">© 2026 Mindfries</span>
          <div className="flex gap-2">
            {["in", "X", "gh"].map((s) => (
              <span
                key={s}
                className="grid h-9 w-9 place-items-center rounded-xl border border-hair bg-surface text-xs text-dim"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* giant blur-in wordmark */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(24px)" }}
        whileInView={{ opacity: 1, filter: "blur(6px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none select-none pt-8 text-center"
        aria-hidden
      >
        <span
          className="block bg-gradient-to-b from-accent to-accent-2 bg-clip-text text-[22vw] font-extrabold leading-none tracking-tighter text-transparent"
        >
          Mindfries
        </span>
      </motion.div>
    </footer>
  );
}
