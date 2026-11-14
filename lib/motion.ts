"use client";
import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One-time setup. The page scrolls inside the fixed `.page-scroller` stage (see SiteShell),
// not the window, so every ScrollTrigger must use it as its scroller.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", () => { refresh(); setTimeout(refresh, 600); });
  document.fonts?.ready.then(refresh);
}

export type Cond = { full?: boolean; desktop?: boolean; reduce?: boolean };
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Runs `setup` inside a scoped gsap.matchMedia: everything is reverted on unmount / breakpoint change.
// `full` = motion allowed, `desktop` = motion allowed and >= 768px, `reduce` = prefers-reduced-motion.
export function useMotion(ref: RefObject<HTMLElement>, setup: (c: Cond) => void | (() => void)) {
  useIso(() => {
    // Pass the real element, never a ".page-scroller" string: inside gsap.context/matchMedia GSAP
    // resolves selector strings only INSIDE the section, and the scroller is an ancestor of it.
    const scroller = document.querySelector<HTMLElement>(".page-scroller");
    if (scroller) ScrollTrigger.defaults({ scroller });
    const mm = gsap.matchMedia();
    mm.add(
      {
        full: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => setup((ctx.conditions ?? {}) as Cond),
      ref.current ?? undefined
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
