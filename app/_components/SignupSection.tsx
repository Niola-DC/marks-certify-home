"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function SignupSection() {
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orgName }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="signup" className="scroll-mt-16 bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to issue certificates people can trust?
        </h2>
        <p className="mt-4 text-lg leading-8 text-white/60">
          Join the early access waitlist and lock in founding member pricing
          before public launch.
        </p>

        {status === "success" ? (
          <div className="mt-9 rounded-2xl border border-gold/30 bg-gold/10 px-6 py-8">
            <p className="text-lg font-medium text-gold-light">
              You&apos;re on the list.
            </p>
            <p className="mt-2 text-sm text-white/60">
              We&apos;ll reach out as early access spots open up.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-9 flex flex-col gap-3 text-left"
          >
            <div>
              <label htmlFor="orgName" className="sr-only">
                Organization name
              </label>
              <input
                id="orgName"
                type="text"
                required
                minLength={2}
                maxLength={200}
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Organization name"
                className="h-12 w-full rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/40 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="h-12 w-full rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/40 outline-none focus:border-gold"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-invalid-tint">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold text-base font-semibold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              {status === "submitting" ? "Joining..." : "Get early access"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
