import Link from "next/link";
import Nav from "@/components/Nav";

/* Page chrome for /blog routes: the site nav, one white panel, a slim footer */
export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="px-3 py-3 sm:px-5 sm:py-5">
        <div className="panel overflow-hidden [background:radial-gradient(60rem_30rem_at_50%_0%,rgba(124,58,237,0.07),transparent_65%),#fff]">
          {children}
          <footer className="mx-auto flex max-w-[80rem] flex-col gap-3 border-t border-hair px-6 py-7 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <span>© 2026 Mindfries. All rights reserved.</span>
            <Link href="/" className="transition-colors hover:text-accent">
              Back to mindfries.vercel.app
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}
