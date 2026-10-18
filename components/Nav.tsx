"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Absolute paths so the nav also works from /blog pages
const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#design-partners", label: "Design partners" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4">
      <div
        className={`flex items-center gap-1 rounded-full border border-hair bg-surface/85 px-2 py-2 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled
            ? "shadow-[0_12px_34px_-14px_rgba(20,22,30,0.28)]"
            : "shadow-[0_6px_20px_-12px_rgba(20,22,30,0.2)]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 px-3">
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
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-dim transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#access"
          className="ml-1 rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition-transform hover:-translate-y-0.5"
        >
          Request access
        </Link>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <motion.path
              initial={{ d: "M2.5 5.5 L15.5 5.5" }}
              animate={open ? { d: "M4 4 L14 14" } : { d: "M2.5 5.5 L15.5 5.5" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              initial={{ d: "M2.5 12.5 L15.5 12.5" }}
              animate={open ? { d: "M14 4 L4 14" } : { d: "M2.5 12.5 L15.5 12.5" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </button>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 w-full max-w-xs overflow-hidden rounded-3xl border border-hair bg-surface/95 p-2 shadow-[0_24px_60px_-20px_rgba(20,22,30,0.3)] backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-dim transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
