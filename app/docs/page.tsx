import type { Metadata } from "next";
import Nav from "@/components/Nav";
import DocsView from "@/components/docs/DocsView";

export const metadata: Metadata = {
  title: "CLI v2 docs",
  description:
    "Install the Mindfries CLI v2, start an assessment session, work with the agent, and submit. Every command, flag and key in one place.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <>
      <Nav />
      <DocsView />
    </>
  );
}
