import Studio from "./Studio";
import { isSanityConfigured } from "../../../sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="grid min-h-screen place-items-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl text-ink">Sanity isn&rsquo;t connected yet</h1>
          <p className="mt-3 text-dim">
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally <code>NEXT_PUBLIC_SANITY_DATASET</code>) in
            your environment, then reload this page to open the Studio.
          </p>
        </div>
      </main>
    );
  }
  return <Studio />;
}
