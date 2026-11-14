"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import NavigationOverlay from "./NavigationOverlay";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const DURATION = 900;

// Layer 1 (the stage): the whole homepage, scaled toward its centre and faded out when the
// menu is open, so no preview of it remains. It stays mounted (and keeps its scroll position)
// so it can grow back out of the centre on close.
// Layer 2 (NavigationMenu): fixed, full-viewport, outside the stage so its transforms never apply.
// Both are plain CSS transitions on state, so rapid toggling simply reverses mid-flight.
export default function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("dark");
  const stageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  // Passive scroll listener; state only changes when the threshold is crossed.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let last = el.scrollTop > 20;
    let lastTone: "light" | "dark" = "dark";
    // Which section sits under the header controls decides their colour (no header background).
    const sections = Array.from(el.querySelectorAll<HTMLElement>("[data-tone]"));
    const measure = () => {
      const y = el.scrollTop + 40;
      const s = sections.find((n) => y >= n.offsetTop && y < n.offsetTop + n.offsetHeight);
      const t = (s?.dataset.tone as "light" | "dark" | undefined) ?? lastTone;
      if (t !== lastTone) { lastTone = t; setTone(t); }
    };
    setScrolled(last);
    measure();
    const onScroll = () => {
      const next = el.scrollTop > 20;
      if (next !== last) { last = next; setScrolled(next); }
      measure();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Return focus to NAVIGATE once the menu has closed.
  useEffect(() => {
    if (!open && wasOpen.current) openerRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  // Links: "/cars" is a page; "top" / "services" / ... are sections of the home page. From another page a
  // section link goes to "/#section" and the home page scrolls there on arrival (see effect below).
  const navigate = useCallback((id: string) => {
    if (id.startsWith("/")) { setOpen(false); router.push(id); return; }
    if (pathname !== "/") { setOpen(false); router.push(id === "top" ? "/" : `/#${id}`); return; }
    const target = id === "top" ? null : document.getElementById(id);
    stageRef.current?.scrollTo({ top: target ? target.offsetTop : 0 });
    setOpen(false);
  }, [router, pathname]);

  // arriving on "/#services" etc. from another page: the stage (not the window) does the scrolling
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) stageRef.current?.scrollTo({ top: target.offsetTop });
    }, 400);
    return () => window.clearTimeout(t);
  }, []);

  // Opening: scale 1 -> 0 and opacity 1 -> 0 together over DURATION, then `visibility: hidden`
  // flips on at the very end (delayed by DURATION), so nothing of the page can remain.
  // Closing: visibility flips back on immediately, then scale 0 -> 1 and opacity 0 -> 1.
  // All of this is plain CSS transitions on one flag, so interrupting mid-flight just reverses.
  const stageStyle: CSSProperties = reduced
    ? { visibility: open ? "hidden" : "visible", transition: `visibility 0s linear ${open ? 350 : 0}ms` }
    : {
        transform: open ? "scale(0)" : "none",
        opacity: open ? 0 : 1,
        visibility: open ? "hidden" : "visible",
        transformOrigin: "center center",
        transition: `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, visibility 0s linear ${open ? DURATION : 0}ms`,
      };

  return (
    <>
      <NavigationOverlay open={open} reduced={reduced} onClose={close} onNavigate={navigate} />
      <div
        ref={stageRef}
        aria-hidden={open}
        {...(open ? { inert: "" as unknown as boolean } : {})}
        style={stageStyle}
        className={`page-scroller fixed inset-0 z-10 overflow-x-hidden bg-paper ${open ? "pointer-events-none overflow-y-hidden" : "overflow-y-auto"}`}
      >
        <SiteHeader menuOpen={open} scrolled={scrolled} tone={tone} onOpen={() => setOpen(true)} buttonRef={openerRef} />
        {children}
      </div>
    </>
  );
}
