const SEGMENTS = [
  {
    title: "Coding bootcamps",
    description:
      "Certify every cohort that finishes your program — from part-time tracks to intensive builds.",
  },
  {
    title: "Vocational & skills-training centers",
    description:
      "Trade, technical, and hands-on skills programs that need a credible way to prove completion.",
  },
  {
    title: "Online course platforms",
    description:
      "Give remote learners a verifiable credential the moment they finish, wherever they are.",
  },
  {
    title: "Corporate & upskilling programs",
    description:
      "Internal training and upskilling tracks that need a professional record of completion.",
  },
];

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for the people training Africa&apos;s next workforce.
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/60">
            MarksCertify is built for training academies and bootcamps issuing
            completion certificates — not universities or professional exam
            boards. If you run a program and hand out course credentials,
            this is for you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="rounded-2xl border border-ink/10 bg-mist p-6"
            >
              <h3 className="font-semibold text-ink">{segment.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
