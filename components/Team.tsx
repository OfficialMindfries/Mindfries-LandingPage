"use client";

import { motion } from "framer-motion";
import { Reveal, stagger, item } from "./primitives";

const founders = [
  { name: "Hiranya Patil", role: "Co-founder · CEO", now: "AI Intern, Amipi", img: "/team/hiranya.jpeg" },
  { name: "Himanshu Chundawat", role: "Co-founder · COO", now: "Open-source contributor", img: "/team/himanshu.png" },
  { name: "Chandan Giri", role: "Co-founder · CMO", now: "AI Engineer, MAMA", img: "/team/chandan.jpeg" },
  { name: "Disha Sahu", role: "Co-founder · CTO", now: "SDE Intern, GoQii", img: "/team/disha.jpeg" },
];

const backers = [
  { name: "Ankit Mehta", role: "Faculty mentor", detail: "ex-WhatsApp · Google · Amazon · ThoughtSpot · Flipkart" },
  { name: "Dr. Amit Singhal", role: "Programme backer", detail: "Founder, Sitare University · ex-SVP Google Search" },
];

function Avatar({ name, img, size = "h-11 w-11" }: { name: string; img?: string; size?: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  if (img) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={img}
        alt={name}
        className={`${size} shrink-0 rounded-full border border-hair-bright object-cover`}
      />
    );
  }
  return (
    <div className={`${size} grid shrink-0 place-items-center rounded-full border border-hair-bright bg-surface-2`}>
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

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {founders.map((f) => (
            <motion.div
              key={f.name}
              variants={item}
              className="hair-card flex flex-col items-center rounded-2xl p-6 text-center"
            >
              <Avatar name={f.name} img={f.img} size="h-24 w-24" />
              <div className="mt-4 text-lg font-medium text-ink">{f.name}</div>
              <div className="mono mt-1 text-xs text-accent">{f.role}</div>
              <div className="mt-2 text-sm text-faint">{f.now}</div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {backers.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-4 rounded-2xl border border-hair bg-surface/40 p-6"
              >
                <Avatar name={b.name} />
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
