import dashboard from "@/app/assets/images/dashboard.png";
import DemoEmbed from "./DemoEmbed";

const STEPS = [
  {
    number: "01",
    title: "Issue",
    description:
      "Upload your student or graduate list and generate certificates for an entire cohort in one pass — no manual copy-and-paste.",
  },
  {
    number: "02",
    title: "Distribute",
    description:
      "Certificates go straight to graduates by email and WhatsApp, so no one has to wait on an attachment.",
  },
  {
    number: "03",
    title: "Verify",
    description:
      "Every certificate carries a unique link and QR code, so employers can confirm it's real in seconds.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60">
            One place to take a cohort from finished course to trusted,
            checkable credential.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.number}>
              <span className="text-sm font-semibold text-gold">
                {step.number}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <DemoEmbed
            poster={dashboard}
            posterAlt="Preview of the MarksCertify product walkthrough"
          />
        </div>
      </div>
    </section>
  );
}
