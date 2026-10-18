import { NextResponse } from "next/server";

// ponytail: stub sink — validates + logs the signup and returns ok.
// Wire a real destination by setting WAITLIST_WEBHOOK_URL (Slack/Sheet/Zapier)
// or swap in Resend/Postgres here. Kept a one-liner swap on purpose.
export async function POST(req: Request) {
  let body: { email?: string; designPartner?: boolean; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 422 });
  }

  const entry = {
    email,
    designPartner: Boolean(body.designPartner),
    source: typeof body.source === "string" ? body.source.slice(0, 40) : "waitlist",
    at: new Date().toISOString(),
  };
  console.log("[waitlist]", entry);

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      // non-fatal: still confirm to the user, we have the log line
    }
  }

  return NextResponse.json({ ok: true });
}
