const TIERS = [
  {
    name: "Free early access",
    price: "Free",
    period: "for 1 month",
    note: "Full access, no card required",
    featured: false,
    disabled: false,
  },
  {
    name: "Monthly",
    price: "$4",
    period: "/ month",
    note: "Founding member rate",
    featured: false,
    disabled: true,
  },
  {
    name: "Annual",
    price: "$30",
    period: "/ year",
    note: "Founding member rate — ~37% cheaper than paying monthly",
    featured: true,
    badge: "Best value",
    disabled: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Founding member pricing
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/60">
            Lock in these rates before public launch. Pricing isn&apos;t live
            for checkout yet — join early access and we&apos;ll bring you in
            at these rates.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {TIERS.map((tier) => {
            const isFeatured = tier.featured && !tier.disabled;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  isFeatured
                    ? "border-gold bg-gradient-to-b from-gold/15 to-transparent"
                    : "border-white/10 bg-white/[0.03]"
                } ${tier.disabled ? "opacity-50" : ""}`}
              >
                {tier.badge && (
                  <span
                    className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-semibold ${
                      isFeatured
                        ? "bg-gold text-ink"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-sm font-medium text-white/60">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold text-white">
                    {tier.price}
                  </span>
                  <span className="text-sm text-white/50">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  {tier.note}
                </p>
                {tier.disabled ? (
                  <span
                    aria-disabled="true"
                    className="mt-7 inline-flex h-11 cursor-not-allowed select-none items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/40"
                  >
                    Available after launch
                  </span>
                ) : (
                  <a
                    href="#signup"
                    className={`mt-7 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      isFeatured
                        ? "bg-gold text-ink hover:bg-gold-light"
                        : "border border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    Get early access
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
