import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";
import type { Author, PostCard } from "@/sanity/queries";

/* Small building blocks shared by the blog index and article pages. */

export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

export const readMins = (n?: number | null) => `${Math.max(1, n ?? 1)} min read`;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* Soft violet scene used when a post has no cover image; varies by slug */
function PlaceholderArt({ seed }: { seed: string }) {
  const v = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#ede9fe] via-[#e4ddfb] to-[#d8cff7]">
      <span className="absolute -right-[15%] -top-[30%] h-[120%] w-[70%] rounded-full bg-white/50 blur-2xl" />
      <svg className="absolute inset-x-0 bottom-0 h-[70%] w-full" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
        {v === 0 && (
          <>
            <path d="M0 140 C 80 80, 140 90, 210 130 C 260 100, 330 70, 400 110 L400 200 L0 200 Z" fill="#c4b5fd" fillOpacity="0.55" />
            <path d="M0 165 C 120 140, 260 150, 400 160 L400 200 L0 200 Z" fill="#f5f3ff" />
          </>
        )}
        {v === 1 && (
          <>
            <path d="M120 170 L200 50 L280 170 Z" fill="#8b5cf6" fillOpacity="0.55" />
            <path d="M200 50 L225 90 L210 85 L195 100 L180 80 Z" fill="#fff" fillOpacity="0.8" />
            <path d="M0 170 C 120 150, 280 150, 400 170 L400 200 L0 200 Z" fill="#f5f3ff" />
          </>
        )}
        {v === 2 && (
          <>
            <circle cx="150" cy="110" r="22" fill="#7c3aed" fillOpacity="0.55" />
            <circle cx="250" cy="95" r="38" fill="#a78bfa" fillOpacity="0.6" />
            <path d="M0 160 C 100 140, 300 140, 400 160 L400 200 L0 200 Z" fill="#f5f3ff" />
          </>
        )}
        {v === 3 && (
          <>
            <path d="M230 170 L230 70 A 60 60 0 0 1 350 70 L350 170 Z" fill="#fff" fillOpacity="0.7" />
            <path d="M0 150 C 90 120, 150 130, 220 150 L220 170 L0 170 Z" fill="#c4b5fd" fillOpacity="0.5" />
            <path d="M0 170 C 120 160, 280 160, 400 170 L400 200 L0 200 Z" fill="#f5f3ff" />
          </>
        )}
      </svg>
    </div>
  );
}

export function Cover({
  post,
  sizes,
  priority,
  className = "",
}: {
  post: Pick<PostCard, "mainImage" | "slug" | "title">;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {post.mainImage ? (
        <Image
          src={urlFor(post.mainImage).width(1600).url()}
          alt={post.mainImage.alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <PlaceholderArt seed={post.slug} />
      )}
    </div>
  );
}

export function AuthorAvatar({ author, size = 28 }: { author?: Author | null; size?: number }) {
  if (!author) return null;
  const box = { width: size, height: size };
  return author.image ? (
    <Image
      src={urlFor(author.image as SanityImageSource).width(size * 2).height(size * 2).url()}
      alt={author.name}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover ring-2 ring-white"
      style={box}
    />
  ) : (
    <span
      style={{ ...box, fontSize: size * 0.38 }}
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-600 font-semibold text-white ring-2 ring-white"
    >
      {initials(author.name)}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{children}</p>;
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
