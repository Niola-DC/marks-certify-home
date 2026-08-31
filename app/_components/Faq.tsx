"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is MarksCertify?",
    a: "MarksCertify is a digital certificate platform for training academies, bootcamps, and institutions. You can create, issue, distribute, and verify certificates from one place.",
  },
  {
    q: "How does certificate verification work?",
    a: "Every certificate receives a unique verification link and QR code. Anyone can scan the QR code or use the verification link to confirm whether the certificate is authentic.",
  },
  {
    q: "Can I issue certificates in bulk?",
    a: "Yes. Upload your student or graduate list and generate certificates for an entire cohort without creating each certificate manually.",
  },
  {
    q: "How do I distribute certificates to graduates?",
    a: "Certificates can be distributed digitally, including through email and WhatsApp, so graduates don't have to wait for a physical copy.",
  },
  {
    q: "Can I revoke a certificate?",
    a: "Yes. If a certificate was issued incorrectly or needs to be invalidated, you can revoke it. A verification attempt will then reflect its revoked status.",
  },
  {
    q: "Can graduates download their certificates?",
    a: "Yes. Graduates can access and download their digital certificates while retaining their verification link.",
  },
  {
    q: "What types of certificates can I issue?",
    a: "MarksCertify is designed for certificates of completion, training certificates, bootcamp certificates, professional development certificates, and other digital credentials issued by training providers.",
  },
  {
    q: "Is my institution's data secure?",
    a: "MarksCertify uses secure authentication and database controls to protect institution and certificate data. Access is restricted based on authorized permissions.",
  },
  {
    q: "Do graduates need a MarksCertify account to verify a certificate?",
    a: "No. Verification is designed to be accessible through the certificate's unique verification link or QR code.",
  },
  {
    q: "Can I customize my certificates?",
    a: "Yes. Institutions can create certificates that reflect their branding and program details.",
  },
  {
    q: "How much does MarksCertify cost?",
    a: "MarksCertify offers a free 1-month trial, then Founding member rates of $4/month or $30/year. See Pricing above for details.",
  },
  {
    q: "Who is MarksCertify for?",
    a: "MarksCertify is built primarily for African training academies, bootcamps, professional training providers, and institutions that issue certificates to learners.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* left column stretches to match the right column's height (grid
              default), so the sticky child below can stick within it and
              release right as the questions run out */}
          <div>
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2">
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-base leading-7 text-ink/60">
                Can&apos;t find what you&apos;re looking for? Reach out and
                we&apos;ll get back to you.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 lg:mt-0">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-ink/10 bg-mist"
                >
                  <div className="flex flex-col-reverse">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-medium text-ink">{item.q}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                        className="h-5 w-5 shrink-0 text-gold transition-transform duration-200"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                    {isOpen && (
                      <p className="px-6 pt-5 pb-1 text-sm leading-6 text-ink/60">
                        {item.a}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
