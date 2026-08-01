"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-1 rounded-full border border-hair bg-surface/85 px-2 py-2 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled
            ? "shadow-[0_12px_34px_-14px_rgba(20,22,30,0.28)]"
            : "shadow-[0_6px_20px_-12px_rgba(20,22,30,0.2)]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 px-3">
          <Image
            src="/logo.png"
            alt="Mindfries logo"
            width={26}
            height={26}
            className="rounded-full overflow-hidden"
            priority
          />
          <span className="text-sm font-semibold tracking-tight text-ink">
            Mindfries
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-dim transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#access"
          className="ml-1 rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition-transform hover:-translate-y-0.5"
        >
          Request access
        </a>
      </div>
    </header>
  );
}
