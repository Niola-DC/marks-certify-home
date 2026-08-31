import Image from "next/image";
import mcLogo from "@/app/assets/images/logos/MCLogo.jpg";

const LINKS = [
  { href: "#who-its-for", label: "Who it's for" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-us", label: "Why us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src={mcLogo}
              alt="MarksCertify"
              className="h-7 w-7 rounded object-cover"
            />
            <span className="font-semibold text-white">MarksCertify</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="mailto:eniolachinemerem74@gmail.com"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} MarksCertify. All rights reserved.</p>
          <p>Privacy Policy &amp; Terms — coming soon</p>
        </div>
      </div>
    </footer>
  );
}
