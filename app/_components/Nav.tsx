"use client";

import { useState } from "react";
import Image from "next/image";
import mcLogo from "@/app/assets/images/logos/MCLogo.jpg";

const LINKS = [
  { href: "#who-its-for", label: "Who it's for" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-us", label: "Why us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80 border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <Image
            src={mcLogo}
            alt="MarksCertify"
            className="h-8 w-8 rounded object-cover"
            priority
          />
          <span className="text-white font-semibold tracking-tight">
            MarksCertify
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#signup"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-colors"
          >
            Get early access
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-white active:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink px-5 pb-6 pt-2">
          <nav className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-white/80 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#signup"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-gold text-base font-semibold text-ink"
          >
            Get early access
          </a>
        </div>
      )}
    </header>
  );
}
