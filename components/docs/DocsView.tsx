"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* ---- Docs: Mindfries CLI v2 ----
   One page: a numbered quick start (install tabs per OS, copyable commands)
   followed by the full reference. The sidebar highlights the section you are
   reading; the search box (Ctrl/Cmd+K) jumps to any section, command or flag.
   `mindfries git-credential` (called by git itself) and the developer-only
   overrides are deliberately left out; they live in v2/cli/README.md. */

const INSTALL_HOST = "https://mindfries-cli.onrender.com";
const INSTALL = {
  windows: `irm ${INSTALL_HOST}/install.ps1 | iex`,
  unix: `curl -fsSL ${INSTALL_HOST}/install.sh | sh`,
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ d, size = 18, className = "" }: { d: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} className={className} aria-hidden>
      {d}
    </svg>
  );
}

/* ---------- sections (sidebar order) ---------- */

const sections = [
  { id: "quick-start", label: "Quick start", icon: <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" /> },
  { id: "install", label: "Installation", icon: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" /> },
  { id: "commands", label: "CLI commands", icon: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="m7 9 3 3-3 3M12 15h5" /></> },
  { id: "flags", label: "Flags", icon: <path d="M5 21V4m0 0h11l-2 4 2 4H5" /> },
  { id: "agent", label: "Inside the agent", icon: <><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H6a2 2 0 0 1-2-2V6Z" /><path d="M9 10h6" /></> },
  { id: "session", label: "A typical session", icon: <><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5 3.5-5 3.5v-7Z" /></> },
] as const;

/* ---------- small building blocks ---------- */

/* Inline code */
function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md border border-violet-100 bg-violet-50/70 px-1.5 py-0.5 font-mono text-[0.86em] text-[#4c1d95]">{children}</code>;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-hair-bright bg-white px-1.5 py-0.5 font-mono text-[12px] text-ink shadow-[0_1px_0_rgba(20,22,30,0.12)]">
      {children}
    </kbd>
  );
}

function CopyButton({ text, dark = true }: { text: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? "Copied" : `Copy: ${text}`}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
        dark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-dim hover:bg-surface-2 hover:text-ink"
      }`}
    >
      {done ? (
        <Icon size={17} d={<path d="m5 12.5 4.5 4.5L19 7.5" />} className="text-emerald-400" />
      ) : (
        <Icon size={17} d={<><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>} />
      )}
    </button>
  );
}

/* A dark command block; the first word is tinted like a shell keyword */
function Code({ cmd }: { cmd: string }) {
  const [head, ...rest] = cmd.split(" ");
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#1e1b4b] py-2 pl-5 pr-2 shadow-[0_18px_40px_-26px_rgba(30,27,75,0.8)]">
      <pre className="min-w-0 flex-1 overflow-x-auto py-2.5 font-mono text-[14.5px] text-white/90 [scrollbar-width:none]">
        <span className="select-none text-violet-300/60">$ </span>
        <span className="text-violet-300">{head}</span>
        {rest.length > 0 && " " + rest.join(" ")}
      </pre>
      <CopyButton text={cmd} />
    </div>
  );
}

function Table({ head, rows }: { head: [string, string]; rows: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-hair bg-white">
      <table className="w-full border-collapse text-left text-[14.5px]">
        <thead>
          <tr className="bg-surface-2/70 text-[12px] uppercase tracking-[0.12em] text-dim">
            <th className="w-[38%] px-5 py-3 font-medium">{head[0]}</th>
            <th className="px-5 py-3 font-medium">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className="border-t border-hair align-top">
              <td className="px-5 py-3.5">{a}</td>
              <td className="px-5 py-3.5 leading-relaxed text-ink/80">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H2({ id, children, lead }: { id: string; children: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28">
      <h2 className="!font-serif text-[clamp(1.7rem,2.6vw,2.2rem)] !font-semibold !tracking-[-0.015em] text-[#1e1b4b]">{children}</h2>
      {lead && <p className="mt-2 max-w-3xl text-[15.5px] leading-relaxed text-dim">{lead}</p>}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative pl-14">
      <span className="absolute left-0 top-0.5 grid h-9 w-9 place-items-center rounded-full bg-[#1e1b4b] font-serif text-[16px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(30,27,75,0.7)]">
        {n}
      </span>
      <h3 className="!font-serif text-[clamp(1.35rem,2vw,1.65rem)] !font-semibold !tracking-[-0.01em] text-[#1e1b4b]">{title}</h3>
      <div className="mt-2 space-y-4 text-[15.5px] leading-relaxed text-dim">{children}</div>
    </div>
  );
}

/* ---------- install tabs ---------- */

const oses = [
  {
    id: "windows",
    label: "Windows",
    hint: "In PowerShell",
    cmd: INSTALL.windows,
    icon: <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm8.5-1.2L21 3v8.5h-9.5V4.3ZM3 12.5h7.5v7.1L3 18.5v-6Zm8.5 0H21V21l-9.5-1.3v-7.2Z" fill="currentColor" stroke="none" />,
  },
  {
    id: "macos",
    label: "macOS",
    hint: "In Terminal",
    cmd: INSTALL.unix,
    icon: <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7ZM14.1 5.8c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z" fill="currentColor" stroke="none" />,
  },
  {
    id: "linux",
    label: "Linux",
    hint: "In your shell",
    cmd: INSTALL.unix,
    icon: <><path d="M12 3c-2 0-3 1.7-3 4 0 1.6-.6 2.6-1.6 4.2C6.4 12.8 5.5 14.6 6 17c.4 2 2.7 3 6 3s5.6-1 6-3c.5-2.4-.4-4.2-1.4-5.8C15.6 9.6 15 8.6 15 7c0-2.3-1-4-3-4Z" /><path d="M10.5 8h.01M13.5 8h.01M10.5 10.5c.9.6 2.1.6 3 0" /></>,
  },
] as const;

type Os = (typeof oses)[number]["id"];

/* The visitor's own OS (the server renders Windows, then the browser corrects it) */
function detectOs(): Os {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua)) return "macos";
  if (/Linux|X11/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return "windows";
}
const noSubscribe = () => () => {};

function InstallTabs() {
  const detected = useSyncExternalStore(noSubscribe, detectOs, () => "windows" as Os);
  const [picked, setOs] = useState<Os | null>(null);
  const os = picked ?? detected;

  const current = oses.find((o) => o.id === os)!;
  return (
    <div>
      <div role="tablist" aria-label="Operating system" className="inline-flex rounded-2xl border border-hair bg-surface-2/70 p-1">
        {oses.map((o) => {
          const active = o.id === os;
          return (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setOs(o.id)}
              className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[14.5px] font-medium transition-all ${
                active ? "bg-white text-accent shadow-[0_6px_16px_-8px_rgba(76,29,149,0.45)] ring-1 ring-violet-200" : "text-ink/65 hover:text-ink"
              }`}
            >
              <Icon size={17} d={o.icon} />
              {o.label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.14em] text-faint">{current.hint}</p>
      <div className="mt-2">
        <Code cmd={current.cmd} />
      </div>
    </div>
  );
}

/* ---------- reference data ---------- */

const commands: [string, React.ReactNode][] = [
  ["mindfries start", <>Signs you in through the browser, connects GitHub, sets up the workspace, opens your editor and runs the session watcher. Run it again to carry on after a restart or to reopen the editor.</>],
  ["mindfries agent", <>Opens the coding and research assistant in the terminal. Use a second terminal while <C>start</C> keeps running.</>],
  ["mindfries status", <>Shows the session, time left, assistant budget, workspace, GitHub repo, watcher and Git state.</>],
  ["mindfries submit", <>Runs the task&rsquo;s checks, shows your changes, commits, pushes to your GitHub and hands in.</>],
  ["mindfries stop", <>Ends the assessment without submitting and removes this computer&rsquo;s credentials. Your code stays.</>],
  ["mindfries doctor", <>Checks this computer is ready (OS, Git, disk, connection, editor, runtimes). Changes nothing.</>],
  ["mindfries --version", <>Shows the version.</>],
  ["mindfries help", <>Lists the commands. <C>mindfries &lt;command&gt; --help</C> shows a command&rsquo;s flags.</>],
];

const ides = ["vscode", "intellij", "pycharm", "webstorm", "goland", "clion", "rider", "phpstorm", "rubymine", "rustrover", "zed", "manual"];

const flags: { cmd: string; rows: [string, React.ReactNode][] }[] = [
  {
    cmd: "mindfries start",
    rows: [
      ["--dir <folder>", <>Where the workspace goes (default: it asks)</>],
      ["--ide <id>", <>Editor to open: {ides.map((id, i) => <span key={id}><C>{id}</C>{i < ides.length - 2 ? ", " : i === ides.length - 2 ? ", or " : ""}</span>)}</>],
      ["--no-browser", <>Print the sign-in address instead of opening the browser</>],
      ["--yes", <>Accept the defaults instead of asking</>],
      ["<setup-code>", <>Optional: a code from the dashboard instead of signing in</>],
    ],
  },
  { cmd: "mindfries agent", rows: [["--new", <>Start a new conversation instead of carrying on the last one</>]] },
  {
    cmd: "mindfries submit",
    rows: [
      ['-m "<message>"', <>Commit message (default: it asks)</>],
      ["--url <address>", <>Where you deployed it, if the task asks (default: it asks)</>],
      ["--yes", <>Don&rsquo;t ask; hand in with the defaults</>],
    ],
  },
  { cmd: "mindfries stop", rows: [["--yes", <>Don&rsquo;t ask for confirmation</>]] },
  { cmd: "mindfries doctor", rows: [["--dir <folder>", <>The folder the workspace will go in (default: your home folder)</>]] },
];

const slash: [string, React.ReactNode][] = [
  ["/help", <>Show the commands and keys</>],
  ["/new", <>Start a new conversation</>],
  ["/budget", <>Show the tokens left</>],
  ["/clear", <>Clear the screen</>],
  ["/exit", <>Leave (typing <C>exit</C> works too). Your session carries on.</>],
];

const keys: [React.ReactNode, React.ReactNode][] = [
  [<Kbd key="k">Enter</Kbd>, <>Send</>],
  [<span key="k" className="inline-flex gap-1"><Kbd>Ctrl</Kbd><Kbd>J</Kbd></span>, <>New line (pasting several lines works too)</>],
  [<span key="k" className="inline-flex gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd></span>, <>Earlier messages</>],
  [<Kbd key="k">Tab</Kbd>, <>Complete a <C>/command</C></>],
  [<Kbd key="k">Esc</Kbd>, <>Stop the agent while it&rsquo;s working; otherwise clear the box</>],
  [<span key="k" className="inline-flex gap-1"><Kbd>Ctrl</Kbd><Kbd>C</Kbd></span>, <>Clear the box; press twice to exit</>],
];

/* ---------- search ---------- */

type Hit = { label: string; hint: string; id: string };

const searchIndex: Hit[] = [
  ...sections.map((s) => ({ label: s.label, hint: "Section", id: s.id })),
  ...commands.map(([c]) => ({ label: c, hint: "Command", id: "commands" })),
  ...flags.flatMap((f) => f.rows.map(([flag]) => ({ label: `${f.cmd.replace("mindfries ", "")} ${flag}`, hint: "Flag", id: `flags-${f.cmd.split(" ")[1]}` }))),
  ...slash.map(([c]) => ({ label: c, hint: "Agent command", id: "agent" })),
  { label: "Keyboard shortcuts", hint: "Agent", id: "agent-keys" },
  { label: "Windows install (PowerShell)", hint: "Install", id: "install" },
  { label: "macOS / Linux install", hint: "Install", id: "install" },
];

function Search({ onPick }: { onPick: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K focuses the search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return searchIndex.slice(0, 6);
    return searchIndex.filter((h) => h.label.toLowerCase().includes(term) || h.hint.toLowerCase().includes(term)).slice(0, 8);
  }, [q]);

  const pick = (h: Hit) => {
    onPick(h.id);
    setOpen(false);
    setQ("");
    input.current?.blur();
  };

  return (
    <div className="relative">
      <label className="flex items-center gap-2.5 rounded-xl border border-hair bg-white px-3 py-2.5 shadow-sm transition-colors focus-within:border-violet-300">
        <Icon size={16} d={<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>} className="shrink-0 text-faint" />
        <input
          ref={input}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(hits.length - 1, a + 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
            if (e.key === "Enter" && hits[active]) pick(hits[active]);
            if (e.key === "Escape") { setOpen(false); input.current?.blur(); }
          }}
          placeholder="Search the docs…"
          aria-label="Search the docs"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
        />
        <span className="hidden shrink-0 items-center gap-1 sm:flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </span>
      </label>
      {open && (
        <ul className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-hair bg-white py-1.5 shadow-[0_24px_50px_-24px_rgba(30,27,75,0.45)]">
          {hits.length ? (
            hits.map((h, i) => (
              <li key={h.label + h.id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(h)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[13.5px] ${i === active ? "bg-violet-50 text-accent" : "text-ink/85"}`}
                >
                  <span className="truncate font-mono text-[13px]">{h.label}</span>
                  <span className="shrink-0 text-[11.5px] text-faint">{h.hint}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-3.5 py-2.5 text-[13.5px] text-dim">No matches for &ldquo;{q}&rdquo;</li>
          )}
        </ul>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function DocsView() {
  const [current, setCurrent] = useState<string>(sections[0].id);
  const [menu, setMenu] = useState(false);

  // Highlight the section being read
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setMenu(false);
  };

  const sidebar = (
    <>
      <div className="flex items-center gap-2.5">
        <p className="text-[17px] font-semibold tracking-tight text-[#1e1b4b]">Mindfries CLI</p>
        <span className="rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-2 py-0.5 text-[11px] font-semibold text-white">v2</span>
      </div>
      <div className="mt-5">
        <Search onPick={go} />
      </div>
      <nav aria-label="Docs sections" className="mt-6 space-y-1">
        {sections.map((s) => {
          const active = current === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(s.id);
              }}
              aria-current={active ? "location" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14.5px] transition-colors ${
                active ? "bg-violet-50 font-medium text-accent" : "text-ink/70 hover:bg-surface-2 hover:text-ink"
              }`}
            >
              <Icon size={18} d={s.icon} className={active ? "text-accent" : "text-ink/45"} />
              {s.label}
            </a>
          );
        })}
      </nav>
      <div className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 text-[13px] leading-relaxed text-dim">
        <p className="font-medium text-[#1e1b4b]">Stuck?</p>
        <p className="mt-1">
          Run <C>mindfries doctor</C> to check this computer is ready. It changes nothing.
        </p>
      </div>
    </>
  );

  return (
    <main className="mx-auto max-w-[90rem] px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      {/* phones: sections behind a button */}
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-expanded={menu}
          className="flex w-full items-center justify-between rounded-xl border border-hair bg-white px-4 py-3 text-[14.5px] font-medium text-ink shadow-sm"
        >
          <span className="flex items-center gap-2">
            Mindfries CLI <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[11px] font-semibold text-white">v2</span>
            <span className="text-dim">· {sections.find((s) => s.id === current)?.label}</span>
          </span>
          <Icon size={18} d={menu ? <path d="m6 15 6-6 6 6" /> : <path d="m6 9 6 6 6-6" />} />
        </button>
        {menu && <div className="mt-3 rounded-2xl border border-hair bg-white p-4 shadow-sm">{sidebar}</div>}
      </div>

      <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{sidebar}</div>
        </aside>

        <article className="min-w-0 max-w-[60rem]">
          {/* header */}
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.3em] text-slate-500">Docs · Mindfries CLI</p>
          <h1 className="mt-3 !font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] !font-semibold !leading-[1.05] !tracking-[-0.02em] text-[#1e1b4b]">
            Take an assessment from{" "}
            <em className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text pr-1 italic text-transparent">your own terminal.</em>
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-dim">
            The Mindfries CLI signs you in, sets up the task workspace in your editor, gives you an assistant in the terminal, and hands your work in.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50/60 px-4 py-3.5 text-[14.5px] text-[#3b0764]">
            <span className="mt-0.5 rounded-full bg-violet-600 px-2 py-0.5 text-[11px] font-semibold text-white">v2</span>
            <p className="leading-relaxed">
              These docs are for <strong className="font-semibold">version 2</strong> of the Mindfries CLI. Run <C>mindfries --version</C> to check which one you have.
            </p>
          </div>

          {/* quick start */}
          <section className="mt-16 space-y-12">
            <H2 id="quick-start" lead="Four steps, start to hand-in.">
              Quick start
            </H2>

            <Step n={1} title="Install the CLI">
              <p>Install Mindfries with a single command. It puts <C>mindfries</C> on your PATH.</p>
              <InstallTabs />
              <p className="text-[14px]">
                If a terminal that was already open doesn&rsquo;t find <C>mindfries</C>, open a new one.
              </p>
            </Step>

            <Step n={2} title="Start a session">
              <p>
                Sign in through the browser and confirm the code, then authorise GitHub (first time only). Mindfries sets up the workspace and opens your editor.
              </p>
              <Code cmd="mindfries start" />
            </Step>

            <Step n={3} title="Work in your environment">
              <p>
                Work in your editor and commit and <C>git push</C> as usual. Whenever you want help, open the assistant in a second terminal while <C>start</C> keeps running.
              </p>
              <Code cmd="mindfries agent" />
              <p className="text-[14px]">
                Check the time left, your assistant budget and your Git state at any time with <C>mindfries status</C>.
              </p>
            </Step>

            <Step n={4} title="Submit or stop">
              <p>
                When you&rsquo;re done, <C>submit</C> runs the task&rsquo;s checks, shows your changes, commits, pushes to your GitHub and hands in. <C>stop</C> ends the assessment without submitting.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Code cmd="mindfries submit" />
                <Code cmd="mindfries stop" />
              </div>
            </Step>
          </section>

          <hr className="my-16 border-hair" />

          {/* reference */}
          <section className="space-y-16">
            <div>
              <H2 id="install" lead="Run once. This puts mindfries on your PATH.">
                Installation
              </H2>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-hair bg-white">
                <table className="w-full table-fixed border-collapse text-left text-[14.5px]">
                  <thead>
                    <tr className="bg-surface-2/70 text-[12px] uppercase tracking-[0.12em] text-dim">
                      <th className="w-[34%] px-5 py-3 font-medium sm:w-[30%]">OS</th>
                      <th className="px-5 py-3 font-medium">Command</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Windows (PowerShell)", INSTALL.windows],
                      ["macOS / Linux", INSTALL.unix],
                    ].map(([os, cmd]) => (
                      <tr key={os} className="border-t border-hair">
                        <td className="px-5 py-3.5 font-medium text-ink">{os}</td>
                        <td className="px-5 py-2">
                          <span className="flex items-center gap-2">
                            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13.5px] text-[#4c1d95] [scrollbar-width:none]">{cmd}</code>
                            <CopyButton text={cmd} dark={false} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[14.5px] text-dim">
                If a terminal that was already open doesn&rsquo;t find <C>mindfries</C>, open a new one.
              </p>
            </div>

            <div>
              <H2 id="commands" lead="Everything the CLI does.">
                CLI commands
              </H2>
              <Table head={["Command", "What it does"]} rows={commands.map(([c, d]) => [<C key="c">{c}</C>, d])} />
            </div>

            <div>
              <H2 id="flags" lead={<>Every flag, by command. <C>mindfries &lt;command&gt; --help</C> shows the same list in the terminal.</>}>
                Flags
              </H2>
              <div className="mt-2 space-y-8">
                {flags.map((f) => (
                  <div key={f.cmd} id={`flags-${f.cmd.split(" ")[1]}`} className="scroll-mt-28">
                    <h3 className="mt-6 font-mono text-[15px] font-semibold text-[#1e1b4b]">{f.cmd}</h3>
                    <Table head={["Flag", "Meaning"]} rows={f.rows.map(([flag, d]) => [<C key="f">{flag}</C>, d])} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H2 id="agent" lead={<>Once <C>mindfries agent</C> is open, type a slash command or use these keys.</>}>
                Inside the agent
              </H2>
              <Table head={["Command", "What it does"]} rows={slash.map(([c, d]) => [<C key="s">{c}</C>, d])} />
              <div id="agent-keys" className="scroll-mt-28">
                <h3 className="mt-10 !font-serif text-[1.25rem] !font-semibold text-[#1e1b4b]">Keys</h3>
                <Table head={["Key", "What it does"]} rows={keys} />
              </div>
              <div className="mt-6 rounded-2xl border border-hair bg-surface-2/50 px-5 py-4 text-[14.5px] leading-relaxed text-ink/80">
                <p className="font-medium text-[#1e1b4b]">Approving edits and commands</p>
                <p className="mt-1">
                  When the agent proposes an edit or a command, choose <strong className="font-semibold">1. Yes</strong> or{" "}
                  <strong className="font-semibold">2. No</strong>: use the arrows and <Kbd>Enter</Kbd>, a number, <Kbd>y</Kbd> or <Kbd>n</Kbd>, or <Kbd>Esc</Kbd> for No.
                </p>
              </div>
            </div>

            <div>
              <H2 id="session" lead="What a full assessment looks like.">
                A typical session
              </H2>
              <ol className="mt-6 space-y-4">
                {[
                  <><C>mindfries start</C>: confirm the code in the browser, then authorise GitHub (first time only).</>,
                  <>Work in your editor. Commit and <C>git push</C> as usual.</>,
                  <><C>mindfries agent</C> in a second terminal, whenever you want help.</>,
                  <><C>mindfries status</C> at any time.</>,
                  <><C>mindfries submit</C> when you&rsquo;re done, or <C>mindfries stop</C> to end without submitting.</>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-hair bg-white px-5 py-4 text-[15px] leading-relaxed text-ink/85">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-100 font-serif text-[14px] font-semibold text-accent">{i + 1}</span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
