"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  motionValue,
  type MotionValue,
} from "framer-motion";

const zero = motionValue(0);

/* ---- Pricing: three plans with a monthly / annual toggle ----
   Annual billing takes 20% off the monthly price.

   Scroll effect — "deal out": while the section scrolls up into view, the
   three plan cards start gathered in the centre like a fanned deck (side
   cards tucked behind Growth, tilted and lowered) and deal out into their
   columns as the section settles. Scroll back up and they gather again.
   On narrow screens, where the cards stack, and for reduced motion, the
   cards simply fade in. */

const ease = [0.22, 1, 0.36, 1] as const;
const ANNUAL_DISCOUNT = 0.2;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, size = 16, className }: { children: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      {children}
    </svg>
  );
}

type Plan = {
  name: string;
  blurb: string;
  monthly: number | null; // null → custom pricing
  features: string[];
  cta: string;
  featured?: boolean;
  icon: React.ReactNode;
};

const plans: Plan[] = [
  {
    name: "Starter",
    blurb: "For small teams getting started",
    monthly: 199,
    features: [
      "Up to 5 active roles",
      "Evidence-based assessments",
      "AI interview reports",
      "Basic candidate shortlist",
      "Email support",
    ],
    cta: "Get started",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
      </>
    ),
  },
  {
    name: "Growth",
    blurb: "For scaling teams",
    monthly: 499,
    features: [
      "Up to 20 active roles",
      "Advanced assessments (role-specific)",
      "AI interviews + code insights",
      "Prioritized candidate shortlist",
      "Team collaboration & analytics",
      "Dedicated success manager",
    ],
    cta: "Get started",
    featured: true,
    icon: <path d="M5 20V12M10 20V6M15 20v-9M20 20V9M3 20h18" />,
  },
  {
    name: "Enterprise",
    blurb: "For high-volume hiring",
    monthly: null,
    features: [
      "Unlimited roles",
      "Custom assessments & workflows",
      "Integration with your tools",
      "Advanced analytics & reporting",
      "On-prem / VPC options (on request)",
      "Dedicated support & SLA",
    ],
    cta: "Contact sales",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3" />
      </>
    ),
  },
];

const assurances = [
  {
    title: "Transparent pricing",
    body: "No hidden fees.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
  {
    title: "Your data stays private",
    body: "Secure and compliant.",
    icon: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
  },
  {
    title: "Dedicated support",
    body: "We're here to help.",
    icon: <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Zm-3 2v1a3 3 0 0 1-3 3h-2" />,
  },
  {
    title: "Cancel anytime",
    body: "No long-term lock-in.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function Price({ plan, annual }: { plan: Plan; annual: boolean }) {
  if (plan.monthly === null) {
    return (
      <div className="flex items-end gap-2">
        <span className="font-serif text-[48px] font-semibold leading-none tracking-tight text-[#1e1b4b]">Custom</span>
        <span className="pb-1 text-[13px] text-dim">pricing</span>
      </div>
    );
  }
  const perMonth = annual ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly;
  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="relative inline-block h-[50px] min-w-[3.2ch] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={perMonth}
              className="block font-serif text-[48px] font-semibold leading-none tracking-tight text-[#1e1b4b]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              {usd(perMonth)}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="pb-1 text-[13px] text-dim">/ month</span>
      </div>
      <p className="mt-1.5 h-4 text-[12px] text-dim">
        {annual ? `Billed annually · ${usd(perMonth * 12)} / year` : "Billed monthly"}
      </p>
    </div>
  );
}

/* Where each card sits in the gathered deck: x as % of its own width, tilt, drop */
const deck = [
  { x: 108, rotate: -9, y: 40, z: 1 },
  { x: 0, rotate: 0, y: 0, z: 3 },
  { x: -108, rotate: 9, y: 40, z: 2 },
];

function PlanCard({
  plan,
  annual,
  index,
  deal,
}: {
  plan: Plan;
  annual: boolean;
  index: number;
  deal: MotionValue<number> | null;
}) {
  const featured = plan.featured;
  const d = deck[index];
  const gathered = useTransform(deal ?? zero, (v) => 1 - v);
  const x = useTransform(gathered, (g) => `${g * d.x}%`);
  const rotate = useTransform(gathered, (g) => g * d.rotate);
  const y = useTransform(gathered, (g) => g * d.y);
  const scale = useTransform(gathered, (g) => 1 - g * (featured ? 0 : 0.06));

  return (
    <motion.div
      style={deal ? { x, y, rotate, scale, zIndex: d.z } : undefined}
      className={`relative flex flex-col rounded-[2rem] p-8 xl:p-9 ${
        featured
          ? "border-2 border-violet-400/80 bg-white shadow-[0_40px_80px_-30px_rgba(124,58,237,0.55),0_0_0_6px_rgba(167,139,250,0.12)] lg:-my-3 lg:py-10"
          : "border border-white/80 bg-white/75 shadow-[0_30px_60px_-36px_rgba(76,29,149,0.4)] backdrop-blur-xl"
      }`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.7)]">
          Most popular
        </span>
      )}

      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet-100 text-accent">
          <Svg size={24}>{plan.icon}</Svg>
        </span>
        <div>
          <p className="font-serif text-[24px] font-semibold leading-tight text-[#1e1b4b]">{plan.name}</p>
          <p className="text-[14px] text-dim">{plan.blurb}</p>
        </div>
      </div>

      <span className="my-6 block h-px bg-hair" />

      <Price plan={plan} annual={annual} />

      <ul className="mt-7 flex-1 space-y-3.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink/80">
            <Svg size={16} className="mt-0.5 shrink-0 text-violet-500">
              <path d="m5 12 4.5 4.5L19 7" strokeWidth={2.4} />
            </Svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#access"
        className={`group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[16px] font-medium transition-transform hover:-translate-y-0.5 ${
          featured
            ? "bg-[#0f172a] text-white shadow-[0_16px_34px_-14px_rgba(76,29,149,0.7)]"
            : "border border-hair-bright bg-white text-ink hover:bg-surface-2"
        }`}
      >
        {plan.cta}
        <Svg size={16} className="transition-transform group-hover:translate-x-0.5">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </Svg>
      </a>
    </motion.div>
  );
}

function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (annual: boolean) => void }) {
  return (
    <div className="relative mt-9 flex items-center justify-center">
      <div role="radiogroup" aria-label="Billing period" className="relative flex rounded-full border border-hair bg-surface-2/80 p-1.5">
        {[false, true].map((isAnnual) => {
          const active = annual === isAnnual;
          return (
            <button
              key={String(isAnnual)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(isAnnual)}
              className={`relative z-10 rounded-full px-7 py-2.5 text-[14px] font-medium transition-colors ${
                active ? "text-ink" : "text-dim hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(20,22,30,0.35)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {isAnnual ? "Annual" : "Monthly"}
            </button>
          );
        })}
      </div>

      {/* hand-drawn "save" note */}
      <div className="absolute left-1/2 top-1/2 ml-[150px] hidden -translate-y-1/2 items-center gap-2 text-violet-500 sm:flex">
        <svg width="58" height="26" viewBox="0 0 58 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
          <path d="M56 8C40 0 18 2 4 16" />
          <path d="M4 16 5 8M4 16l8-1" />
        </svg>
        <span className="-rotate-6 font-serif text-[15px] italic leading-tight">
          Save {Math.round(ANNUAL_DISCOUNT * 100)}%
          <br />
          with annual
        </span>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)"); // cards sit in three columns

  // 0 while the section's top enters the viewport → 1 once it is a fifth of the way down from the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.15"] });
  const deal = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });
  const dealing = wide && !reduce;

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative overflow-hidden px-6 py-16 sm:py-20 lg:px-12 [background:radial-gradient(52rem_30rem_at_50%_0%,rgba(124,58,237,0.1),transparent_65%),radial-gradient(30rem_30rem_at_0%_60%,rgba(124,58,237,0.08),transparent_60%),radial-gradient(30rem_30rem_at_100%_60%,rgba(124,58,237,0.08),transparent_60%)]"
    >
      <div className="mx-auto max-w-[78rem]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease }}
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/70 px-4 py-2 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink/70">Pricing</span>
        </span>
        <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)] !font-serif !font-semibold !leading-[1.04] !tracking-[-0.02em] text-[#1e1b4b]">
          Invest in better
          <br />
          <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-2 italic text-transparent">
            hiring decisions.
          </em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-dim sm:text-[17px]">
          Simple, transparent plans to help you hire engineers with confidence.
        </p>
      </motion.div>

      <BillingToggle annual={annual} onChange={setAnnual} />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 xl:gap-8">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} plan={plan} annual={annual} index={i} deal={dealing ? deal : null} />
        ))}
      </div>

      <ul className="mt-12 grid gap-6 border-t border-hair pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-hair">
        {assurances.map((a) => (
          <li key={a.title} className="flex items-center gap-4 lg:px-6 lg:first:pl-0">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-100 text-accent">
              <Svg size={20}>{a.icon}</Svg>
            </span>
            <div>
              <p className="text-[14px] font-medium text-ink">{a.title}</p>
              <p className="text-[13px] text-dim">{a.body}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
