const sources = [
  "GitHub",
  "Pull requests",
  "Commit history",
  "Test coverage",
  "Code review",
  "Portfolios",
  "Technical blogs",
  "Open source",
  "Hackathons",
  "Issue resolution",
  "LeetCode",
  "Live assessment",
];

export default function Marquee() {
  return (
    <section className="relative overflow-hidden border-b border-hair py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {sources.map((s) => (
              <div key={s} className="flex items-center gap-3 px-6">
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                <span className="mono text-sm text-dim">{s}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
