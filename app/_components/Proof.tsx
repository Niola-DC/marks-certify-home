"use client";

import { useEffect, useState } from "react";

const FALLBACK_COUNT = 12;

export default function Proof() {
  const [count, setCount] = useState(FALLBACK_COUNT);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        // keep fallback count
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-5xl font-semibold tracking-tight text-gold-light sm:text-6xl">
          {count.toLocaleString()}+
        </p>
        <p className="mt-3 text-lg text-white/70">
          training institutions already on the early access waitlist
        </p>

        <div className="mx-auto mt-12 max-w-xl border-t border-white/10 pt-10">
          <p className="text-lg italic leading-8 text-white/80 sm:text-xl">
            &ldquo;I built MarksCertify because certificates should be more
            than PDFs — they should be credentials people can trust and
            verify.&rdquo;
          </p>
          <p className="mt-4 text-sm font-medium text-white/50">
            Eniola Chinemerem, Founder — MarksCertify
          </p>
        </div>
      </div>
    </section>
  );
}
