import { NextResponse } from "next/server";
import { addWaitlistEntry, getWaitlistCount } from "@/app/_lib/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[waitlist] failed to read count:", err);
    // Non-fatal for the UI: the Proof section falls back to its own default.
    return NextResponse.json({ count: null });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, orgName } = (body ?? {}) as {
    email?: unknown;
    orgName?: unknown;
  };

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (typeof orgName !== "string" || orgName.trim().length < 2 || orgName.length > 200) {
    return NextResponse.json({ error: "Enter your organization's name." }, { status: 400 });
  }

  try {
    const { count, alreadyJoined } = await addWaitlistEntry(email, orgName);
    return NextResponse.json({ count, alreadyJoined });
  } catch (err) {
    console.error("[waitlist] failed to store signup:", err);
    return NextResponse.json(
      { error: "We couldn't save your spot just now. Please try again in a moment." },
      { status: 502 }
    );
  }
}
