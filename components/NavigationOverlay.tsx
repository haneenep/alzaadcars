"use client";
import { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import EmblemWatermark from "./EmblemWatermark";

const links = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Collection", id: "/cars" }, // a real page, not a scroll target
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

type Props = { open: boolean; reduced: boolean; onClose: () => void; onNavigate: (id: string) => void };

// Two layers: a flat deep-blue background BEHIND the (scaled) page, and a foreground
// (header, links, footer) above it that lets clicks pass through elsewhere.
export default function NavigationOverlay({ open, reduced, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <div aria-hidden onClick={onClose}
        className={`fixed inset-0 overflow-hidden bg-deep ${reduced ? `z-20 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}` : "z-0"}`}>
        <div className="pointer-events-none absolute inset-0">
          <EmblemWatermark color="#0093CB" opacity={0.55} className="absolute left-1/2 top-1/2 w-[200vw] max-w-none -translate-x-[46%] -translate-y-1/2 sm:w-[135vw] lg:w-[115vw]" />
        </div>
      </div>

      <div role="dialog" aria-modal="true" aria-label="Site navigation" aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
        className={`pointer-events-none fixed inset-0 z-30 transition-[opacity,visibility] ${open ? `visible opacity-100 duration-500 ${reduced ? "" : "delay-300"}` : "invisible opacity-0 duration-200"}`}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-6 sm:px-10">
          <div className="pointer-events-auto w-fit text-paper"><SocialLinks /></div>
          <a href="#top" onClick={(e) => { e.preventDefault(); onNavigate("top"); }}
            aria-label="Al Zaad Cars home" className="pointer-events-auto"><Logo mono /></a>
          <button ref={closeRef} type="button" onClick={onClose}
            className="group pointer-events-auto ml-auto flex items-center gap-3 font-display text-[10px] tracking-[0.22em] text-paper transition hover:text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">
            Close <X size={20} strokeWidth={1.5} className="transition group-hover:rotate-90" />
          </button>
        </div>

        <nav aria-label="Primary" className="absolute inset-x-0 top-24 bottom-16 flex items-center justify-center">
          <ul className="group/nav flex flex-col items-start gap-[0.6vh]">
            {links.map((l, i) => (
              <li key={l.id} className="overflow-hidden transition-opacity duration-500 group-hover/nav:opacity-40 hover:!opacity-100">
                <div style={{ transitionDelay: open && !reduced ? `${350 + i * 80}ms` : "0ms" }}
                  className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <a href={l.id.startsWith("/") ? l.id : `/#${l.id}`} onClick={(e) => { e.preventDefault(); onNavigate(l.id); }}
                    className="group/item pointer-events-auto relative flex items-center gap-4 py-1 pr-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper sm:gap-8">
                    <span className="w-8 -translate-x-3 font-display text-[10px] tracking-[0.2em] text-sky opacity-60 transition-all duration-500 group-hover/item:translate-x-0 group-hover/item:opacity-100 sm:w-10">0{i + 1}</span>
                    <span className="relative block font-display text-[clamp(1.6rem,min(6.4vw,8.5svh),4.6rem)] uppercase leading-[1.12] transition-transform duration-500 ease-out group-hover/item:translate-x-3">
                      <span className="outline-paper block transition-opacity duration-500 group-hover/item:opacity-0">{l.label}</span>
                      <span aria-hidden className="absolute inset-0 block text-sky opacity-0 transition-opacity duration-500 group-hover/item:opacity-100">{l.label}</span>
                    </span>
                    <ArrowUpRight className="h-7 w-7 -translate-x-6 text-sky opacity-0 transition-all duration-500 group-hover/item:translate-x-0 group-hover/item:opacity-100 sm:h-10 sm:w-10" strokeWidth={1.25} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <p className="absolute bottom-6 left-5 font-display text-[9px] tracking-[0.18em] text-mist sm:left-10">© {new Date().getFullYear()} Al Zaad Cars</p>
        <p className="absolute bottom-6 right-5 font-display text-[9px] tracking-[0.18em] text-mist sm:right-10">Ajman, UAE</p>
      </div>
    </>
  );
}
