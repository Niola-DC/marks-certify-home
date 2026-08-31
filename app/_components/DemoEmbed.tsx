"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

// Swap in the real Loom share URL when it's ready, e.g.
// "https://www.loom.com/embed/xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
const LOOM_EMBED_URL = "";

export default function DemoEmbed({
  poster,
  posterAlt,
}: {
  poster: StaticImageData;
  posterAlt: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && LOOM_EMBED_URL) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <div className="aspect-video w-full">
          <iframe
            src={LOOM_EMBED_URL}
            title="MarksCertify product walkthrough"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Play product walkthrough"
        className="group relative block w-full"
      >
        <Image
          src={poster}
          alt={posterAlt}
          className="h-auto w-full opacity-70 transition-opacity group-hover:opacity-55"
        />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink shadow-lg transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {!LOOM_EMBED_URL && (
            <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white/80">
              Demo video coming soon
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
