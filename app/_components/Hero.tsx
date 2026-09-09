import Image from "next/image";
import dashboard from "@/app/assets/images/dashboard.png";
import validBadge from "@/app/assets/images/validBadge.png";
import cert1 from "@/app/assets/images/cert1.png";

const NOISE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink pt-16 pb-24 sm:pt-24 sm:pb-32 scroll-mt-16"
    >
      {/* dot-grid texture, fading out from the top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* layered warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-140px] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gold/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-gold-light/25 blur-[90px]"
      />

      {/* fine grain for texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_URL}")` }}
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-light" />
          </span>
          Early access is open — limited founding spots
        </span>

        <h1 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
          Trusted certificates, issued{" "}
          <span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
            in minutes.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
          Issue certificates in bulk. Distribute them instantly. Let anyone
          verify them in seconds.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#signup"
            style={{
              boxShadow:
                "0 0 0 1px rgba(184,150,46,0.4), 0 20px 45px -12px rgba(184,150,46,0.55)",
            }}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gold px-7 text-base font-semibold text-ink transition-all hover:bg-gold-light hover:brightness-105 sm:w-auto"
          >
            Get early access
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 text-base font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 sm:w-auto"
          >
            See how it works
          </a>
        </div>

//         <p className="mt-5 text-sm text-white/40">
//           Free 1-month trial · No credit card required
//         </p>
      </div>

      {/* product mockup */}
      <div className="relative mx-auto mt-16 max-w-4xl px-5 sm:px-8">
        <div className="relative">
          <div className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-[28px] bg-gradient-to-b from-gold/15 to-transparent blur-2xl sm:-inset-x-10" />

          <div
            style={{
              boxShadow: "0 50px 120px -20px rgba(184,150,46,0.35)",
            }}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] ring-1 ring-gold/10"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#111111] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <Image
              src={dashboard}
              alt="MarksCertify dashboard showing certificates issued, delivery status, and cohort activity"
              className="w-full h-auto"
              priority
            />
          </div>

          <div
            style={{ boxShadow: "0 20px 50px -10px rgba(184,150,46,0.4)" }}
            className="absolute -bottom-8 -right-4 hidden w-40 rotate-3 overflow-hidden rounded-lg border border-gold/30 sm:block md:-right-10 md:w-48"
          >
            <Image
              src={validBadge}
              alt="A verified certificate showing a valid status badge"
              className="w-full h-auto"
            />
          </div>

          <div
            style={{ boxShadow: "0 20px 50px -10px rgba(184,150,46,0.4)" }}
            className="absolute -bottom-6 -left-4 hidden w-28 -rotate-6 overflow-hidden rounded-lg border border-gold/30 md:-left-10 md:block md:w-32"
          >
            <Image
              src={cert1}
              alt="A MarksCertify certificate of completion"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
