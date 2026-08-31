const CARDS = [
  {
    title: "Create faster",
    description:
      "Generate 500 certificates without creating 500 documents manually.",
  },
  {
    title: "Verify instantly",
    description:
      "QR-powered verification makes authenticity checkable in seconds.",
  },
  {
    title: "Distribute effortlessly",
    description:
      "Email and WhatsApp delivery gets certificates into graduates' hands.",
  },
  {
    title: "Look professional",
    description:
      "Give every graduate a polished, verifiable credential they can confidently share.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Why Us?
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60">
            Everything you need to issue certificates that are easy to trust,
            share, and verify.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-ink/10 bg-mist p-8"
            >
              <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/60">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-lg font-medium text-ink">
            Your graduates earned the certificate. Make sure everyone can
            trust it.
          </p>
          <a
            href="#signup"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-base font-semibold text-white transition-colors hover:bg-ink/85"
          >
            Get early access
          </a>
        </div>
      </div>
    </section>
  );
}
