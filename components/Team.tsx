"use client";

import { motion } from "framer-motion";
import { Reveal } from "./primitives";

const founders = [
  { name: "Hiranya Patil", tag: "CEO", role: "Co-founder · CEO", now: "AI Intern, Amipi", img: "/team/hiranya.jpeg" },
  { name: "Himanshu Chundawat", tag: "COO", role: "Co-founder · COO", now: "Open-source contributor", img: "/team/himanshu.png" },
  { name: "Chandan Giri", tag: "CMO", role: "Co-founder · CMO", now: "AI Engineer, MAMA", img: "/team/chandan.jpeg" },
  { name: "Disha Sahu", tag: "CTO", role: "Co-founder · CTO", now: "SDE Intern, GoQii", img: "/team/disha.jpeg" },
];

const backers = [
  { name: "Ankit Mehta", role: "Faculty mentor", detail: "ex-WhatsApp · Google · Amazon · ThoughtSpot · Flipkart" },
  { name: "Dr. Amit Singhal", role: "Programme backer", detail: "Founder, Sitare University · ex-SVP Google Search" },
];

function Monogram({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hair-bright bg-surface-2">
      <span className="mono text-sm text-accent">{initials}</span>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">the team</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl text-ink sm:text-5xl">
              Engineers building the hiring tool they wished existed.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-dim">
              A four-person founding team out of the Sitare University company-building
              programme, backed by operators who&apos;ve built at real scale.
            </p>
          </Reveal>
        </div>

        {/* floating portrait cards — staggered so they read like the video's fanned photos */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {founders.map((f, idx) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 36, rotate: idx % 2 ? 4 : -4, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotate: idx % 2 ? 1.5 : -1.5 }}
              className={`group ${idx % 2 ? "lg:mt-10" : ""}`}
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-hair bg-surface shadow-[0_24px_60px_-28px_rgba(20,22,30,0.4)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.img}
                    alt={f.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="mono absolute left-3 top-3 rounded-full bg-surface/85 px-2.5 py-1 text-[10px] font-medium text-accent backdrop-blur">
                    {f.tag}
                  </span>
                </div>
                <div className="px-5 py-4 text-left">
                  <div className="text-lg font-medium text-ink">{f.name}</div>
                  <div className="mono mt-1 text-xs text-accent">{f.role}</div>
                  <div className="mt-1.5 text-sm text-faint">{f.now}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {backers.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-4 rounded-2xl border border-hair bg-surface/40 p-6"
              >
                <Monogram name={b.name} />
                <div>
                  <div className="text-lg font-medium text-ink">{b.name}</div>
                  <div className="mono text-xs text-accent">{b.role}</div>
                  <div className="mt-1 text-sm text-faint">{b.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
