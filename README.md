# Mindfries — Landing Page

Marketing landing page for **Mindfries**, an AI hiring-intelligence platform that ranks
engineers on real work (GitHub, portfolios, live code) instead of resume keywords, runs an
adaptive assessment on a real codebase, and hands over an explainable, human-final shortlist.

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and the
**Geist** type family. Design: dark "instrument-panel" aesthetic with a single signal
accent and a scroll-scrubbed candidate-pipeline visualization.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Waitlist

The `/api/waitlist` route validates submissions and logs them. To forward signups to a real
destination (Slack / Google Sheet / Zapier), set `WAITLIST_WEBHOOK_URL` in the environment —
or swap in Resend / a database in `app/api/waitlist/route.ts`.

## Deploy

Deploys on Vercel with zero config (`framework: nextjs`).
