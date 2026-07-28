export default function Footer() {
  return (
    <footer className="border-t border-hair py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="mono text-sm text-ink">mindfries</span>
          <span className="text-sm text-faint">— hiring intelligence</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
          <a href="#problem" className="transition-colors hover:text-ink">Problem</a>
          <a href="#how" className="transition-colors hover:text-ink">How it works</a>
          <a href="#difference" className="transition-colors hover:text-ink">Difference</a>
          <a href="#team" className="transition-colors hover:text-ink">Team</a>
          <a href="#access" className="transition-colors hover:text-ink">Request access</a>
        </nav>
        <div className="mono text-xs text-faint">© 2026 Mindfries</div>
      </div>
    </footer>
  );
}
