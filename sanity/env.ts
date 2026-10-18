/* Sanity connection settings, read from env vars (see .env.example). */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01";

/* False until a project ID is set; the blog then shows its empty state. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
