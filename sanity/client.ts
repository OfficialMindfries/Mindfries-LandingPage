import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

/* Runs a GROQ query, or returns `fallback` when Sanity isn't configured or the request fails. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    return (await client.fetch<T>(query, params)) ?? fallback;
  } catch (err) {
    console.error("[sanity]", err);
    return fallback;
  }
}
