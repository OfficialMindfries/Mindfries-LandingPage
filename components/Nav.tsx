"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#how", label: "How it works" },
  { href: "#difference", label: "Difference" },
  { href: "#team", label: "Team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="mono text-sm font-medium tracking-tight text-ink">
            mindfries
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-dim transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#access"
          className="group flex items-center gap-2 rounded-full border border-hair-bright bg-surface px-4 py-2 text-sm text-ink transition-colors hover:bg-surface-2"
        >
          Request access
          <span className="text-accent transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </header>
  );
}
