"use client";
import Logo from "./Logo";
import { business, mailtoHref } from "@/src/config/business";
import { Instagram, Facebook } from "lucide-react";
import { WhatsAppIcon } from "./SocialLinks";

const quick = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Collection", id: "/cars" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const social = [
  { label: "Instagram", href: business.instagram, icon: <Instagram size={18} strokeWidth={1.75} /> },
  { label: "Facebook", href: business.facebook, icon: <Facebook size={18} strokeWidth={1.75} /> },
  { label: "WhatsApp", href: business.whatsapp, icon: <WhatsAppIcon size={18} /> },
];

const col = "border-t-2 border-sky pt-6";
const heading = "font-display text-[0.8rem] text-paper";
const link = "inline-flex min-h-9 items-center text-[1.02rem] text-mist transition hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper";

// The page scrolls inside the fixed stage (see SiteShell), so anchors scroll that container.
function go(e: React.MouseEvent, id: string) {
  if (id.startsWith("/")) return; // real page link: let the browser navigate
  const stage = document.querySelector<HTMLElement>(".page-scroller");
  const target = id === "top" ? null : document.getElementById(id);
  // on another page there is nothing to scroll to: fall through to the "/#id" link
  if (!stage || (id !== "top" && !target)) return;
  e.preventDefault();
  stage.scrollTo({ top: target ? target.offsetTop : 0, behavior: "smooth" });
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-deep text-paper" data-tone="dark">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div>
            <Logo mono className="!h-16 sm:!h-20" />
            <p className="mt-5 max-w-sm text-[1.05rem] leading-relaxed text-mist">{business.description}</p>
            <ul className="mt-7 flex items-center gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="grid h-11 w-11 place-items-center border-2 border-sky text-paper transition duration-300 hover:-translate-y-0.5 hover:bg-paper hover:text-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            <nav aria-label="Quick links" className={col}>
              <h2 className={heading}>Explore</h2>
              <ul className="mt-3">
                {quick.map((q) => (
                  <li key={q.id}><a href={q.id.startsWith("/") ? q.id : `/#${q.id}`} onClick={(e) => go(e, q.id)} className={link}>{q.label}</a></li>
                ))}
              </ul>
            </nav>
            <div className={col}>
              <h2 className={heading}>Contact</h2>
              <ul className="mt-3">
                <li><a href={business.phone.href} className={link}>{business.phone.display}</a></li>
                <li><a href={mailtoHref} className={`${link} break-all`}>{business.email}</a></li>
                <li><a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>Chat on WhatsApp</a></li>
              </ul>
            </div>
            <div className={col}>
              <h2 className={heading}>Visit Us</h2>
              <ul className="mt-3">
                <li><a href={business.googleMaps} target="_blank" rel="noopener noreferrer" className={link}>View on Google Maps</a></li>
                <li className="inline-flex min-h-9 items-center text-[1.02rem] text-mist">{business.locationLabel}</li>
                <li className="inline-flex min-h-9 items-center"><span className="border-2 border-sky px-2.5 py-1 font-display text-[8px] tracking-[0.15em] text-sky">Open for buyers</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* giant outlined wordmark that fades into the footer, like the reference */}
      <div aria-hidden className="mx-auto mt-10 max-w-7xl select-none px-6 sm:px-10 lg:mt-14">
        <svg viewBox="0 0 1200 190" className="block h-auto w-full" preserveAspectRatio="xMidYMid meet">
          <text x="0" y="170" textLength="1200" lengthAdjust="spacingAndGlyphs"
            fill="none" stroke="#6DD7FD" strokeWidth="1.6"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif", fontSize: 170 }}>
            AL ZAAD CARS
          </text>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 border-t-2 border-sky py-7 text-[14px] text-mist sm:flex-row sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li><a href={business.legal.privacy} className="py-2 transition hover:text-paper">Privacy Policy</a></li>
            <li><a href={business.legal.terms} className="py-2 transition hover:text-paper">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
