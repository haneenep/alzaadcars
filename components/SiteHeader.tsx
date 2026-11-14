import type { CSSProperties, RefObject } from "react";
import { AdaptiveLogo } from "./Logo";
import SocialLinks from "./SocialLinks";

// Sticky zero-height wrapper: the bar overlays the hero at the top, then stays pinned while the
// page scrolls (inside the stage), keeping the header fully transparent. Only the company name of the logo animates away.
export default function SiteHeader({ menuOpen, scrolled, tone, onOpen, buttonRef }: {
  menuOpen: boolean;
  scrolled: boolean;
  tone: "light" | "dark";
  onOpen: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
}) {
  return (
    <div className="sticky top-0 z-30 h-0">
      <header
        style={{ color: tone === "light" ? "#005ACD" : "#F5FFFF", "--accent": tone === "light" ? "#0093CB" : "#6DD7FD" } as CSSProperties}
        className={`absolute inset-x-0 top-0 grid grid-cols-[1fr_auto_1fr] items-center bg-transparent px-5 py-6 transition-[transform,color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 ${
          scrolled ? "-translate-y-3" : "translate-y-0"
        }`}
      >
        <SocialLinks />
        <a href="/" aria-label="Al Zaad Cars home"><AdaptiveLogo compact={scrolled} mono={tone === "dark"} /></a>
        <button ref={buttonRef} type="button" onClick={onOpen} aria-haspopup="dialog" aria-expanded={menuOpen}
          className="group ml-auto flex items-center gap-2.5 font-display text-[10px] tracking-[0.22em] sm:gap-3">
          <span className="transition group-hover:text-[var(--accent)]">Navigate</span>
          <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
            <i className="h-px bg-current transition-all group-hover:w-3 group-hover:self-end" />
            <i className="h-px bg-current" />
            <i className="h-px bg-current transition-all group-hover:w-3 group-hover:self-end" />
          </span>
        </button>
      </header>
    </div>
  );
}
