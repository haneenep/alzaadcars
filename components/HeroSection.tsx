"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useMotion } from "@/lib/motion";
import Button from "./Button";
import { business } from "@/src/config/business";

const SLANT = 16; // slab edge slant (%), same angle as the logo's parallelograms
const WORDS = ["buy", "sell", "inspect", "rent"];
const PHOTO = "/services/showroom.jpg";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const seenIntro = () => { try { return sessionStorage.getItem("az-intro") === "1"; } catch { return false; } };
const shouldPreload = () => !reducedMotion() && !seenIntro();

/* ---------- Opening sequence: the emblem is built from its three shapes, then the curtain lifts ---------- */
function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!shouldPreload()) { setShow(false); return; }
    try { sessionStorage.setItem("az-intro", "1"); } catch { /* private mode: fine */ }
    const el = ref.current!;
    const q = gsap.utils.selector(el);
    const count = { v: 0 };
    const num = q<HTMLElement>(".pct")[0];
    const tl = gsap.timeline({ onComplete: () => { setShow(false); onDone(); } });
    tl.fromTo(q(".shape"), { xPercent: -140, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.out", stagger: 0.16 }, 0.1)
      .fromTo(q(".word"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out" }, 0.5)
      .fromTo(q(".sub"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.9)
      .to(count, { v: 100, duration: 1.7, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(count.v)); } }, 0.2)
      .fromTo(q(".bar"), { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.2)
      .to(q(".inner"), { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" }, 2.1)
      .to(el, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, 2.3)
      .add(onDone, 2.75); // hero starts while the curtain is still lifting
    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;
  return (
    <div ref={ref} aria-hidden className="fixed inset-0 z-[60] flex items-center justify-center bg-deep text-paper">
      <div className="inner flex w-[min(86vw,30rem)] flex-col items-center">
        <svg viewBox="0 0 970 420" className="w-[54%] overflow-hidden" aria-hidden>
          <polygon className="shape" points="624,1 389,2 1,417 248,417" fill="#F5FFFF" />
          <polygon className="shape" points="892,1 652,2 274,417 529,417" fill="#6DD7FD" />
          <polygon className="shape" points="580,392 846,392 969,251 705,251" fill="#0093CB" />
        </svg>
        <p className="mt-7 overflow-hidden pb-1 font-display text-[clamp(1.1rem,4.6vw,1.9rem)] tracking-[0.12em]"><span className="word block">AL ZAAD CARS</span></p>
        <p className="sub mt-2 font-display text-[9px] tracking-[0.3em] text-mist">AJMAN &middot; UAE</p>
        <div className="mt-10 flex w-full items-center gap-4">
          <span className="h-[2px] flex-1 bg-azure"><i className="bar block h-full origin-left bg-paper" /></span>
          <span className="w-12 text-right font-display text-[11px] tabular-nums"><span className="pct">0</span>%</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- One copy of the hero. Two identical copies (deep-on-paper, paper-on-photo) are revealed
   through a slanted slab, so every letter changes colour exactly where the slab crosses it. ---------- */
function Scene({ tone }: { tone: "blue" | "white" }) {
  const white = tone === "white";
  return (
    <div className={`absolute inset-0 ${white ? "text-paper" : "text-deep"}`} aria-hidden={white || undefined}>
      <div className="absolute inset-x-[6vw] bottom-[5svh] top-[15svh] flex flex-col justify-between sm:top-[19svh]">
        <div>
          <p className="tag js-hide flex items-center gap-3 font-display text-[8.5px] tracking-[0.2em] sm:text-[10px]">
            <i className="block h-[2px] w-8 bg-current" /> Quality pre-owned &middot; Ajman
          </p>
          <h1 className="mt-5 font-display text-[clamp(2rem,9.4vw,3rem)] sm:mt-7 sm:text-[clamp(2.4rem,4.8vw,5.2rem)]">
            <span className="block overflow-hidden pb-[0.1em]"><span className="hl js-hide block">Find Your</span></span>
            <span className="block overflow-hidden pb-[0.1em]"><span className="hl js-hide block">Drive.</span></span>
          </h1>
          <p className="cycline js-hide mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[10px] sm:mt-7 sm:text-[clamp(.7rem,1.25vw,1.15rem)]">
            We
            <span className={`cyc relative grid overflow-hidden px-3 py-2 ${white ? "bg-paper text-deep" : "bg-deep text-paper"}`}>
              {WORDS.map((w) => <span key={w} className="cw [grid-area:1/1] text-center opacity-0">{w}</span>)}
            </span>
            cars with confidence.
          </p>
        </div>
        <div className="bar max-w-md">
          <p className={`js-hide max-sm:hidden text-[13px] leading-relaxed sm:text-[15px] ${white ? "text-paper" : "text-deep"}`}>
            <span className="mb-2 block font-display text-[12px] sm:text-[14px]">Define your journey.</span>
            Buy, sell and inspect with confidence. Every car is checked twice before it reaches you.
          </p>
          <div className="js-hide mt-5 flex flex-row gap-2.5 sm:gap-3">
            {white ? (
              <><Button href={business.whatsapp} external variant="white" className="pointer-events-none flex-1 !px-2 sm:flex-none sm:!px-6">WhatsApp us</Button>
                <Button href="#services" variant="secondary" tone="dark" className="pointer-events-none flex-1 !px-2 sm:flex-none sm:!px-6">Our services</Button></>
            ) : (
              <><Button href={business.whatsapp} external variant="primary" className="flex-1 !px-2 sm:flex-none sm:!px-6">WhatsApp us</Button>
                <Button href="#services" variant="secondary" tone="light" className="flex-1 !px-2 sm:flex-none sm:!px-6">Our services</Button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const slabEls = useRef<HTMLDivElement[]>([]);
  const heroTl = useRef<gsap.core.Timeline | null>(null);
  const start = () => heroTl.current?.play();

  useMotion(root, (c) => {
    const q = gsap.utils.selector(root);
    // desktop: tall slanted window on the right. phone: a wide slanted photo band across the lower part,
    // with the headline above it, so nothing ever sits half-hidden behind a slab.
    const rest = c.desktop ? 46 : -20;
    const S = { x: c.desktop ? -90 : -150, w: c.desktop ? 44 : 125, top: c.desktop ? 14 : 54, g: 0, px: 0 };
    const layers = c.desktop
      ? [{ dx: 0, dw: 0, dy: 0 }, { dx: -6, dw: -26, dy: 0 }, { dx: -11, dw: -36, dy: 0 }]
      : [{ dx: 0, dw: 0, dy: 0 }, { dx: 0, dw: 0, dy: -4 }, { dx: 0, dw: 0, dy: -8 }];
    const poly = (x: number, w: number, top: number) => `polygon(${x + SLANT}% ${top}%, ${x + SLANT + w}% ${top}%, ${x + w}% 100%, ${x}% 100%)`;
    const apply = () => {
      layers.forEach((l, i) => {
        const el = slabEls.current[i]; if (!el) return;
        const w = Math.max(4, S.w + l.dw + S.g * 170), x = S.x + S.px + l.dx - S.g * 70, top = Math.max(0, (S.top + l.dy) * (1 - S.g));
        el.style.clipPath = poly(x, w, top);
      });
      // header + logo colour follows what is underneath. Tell the shell when it changes, because scrubbed
      // scrolling lags behind the scroll event (this is what left a white logo on a white page).
      const t = S.g > 0.5 ? "dark" : "light";
      if (root.current && root.current.dataset.tone !== t) {
        root.current.dataset.tone = t;
        document.querySelector(".page-scroller")?.dispatchEvent(new Event("scroll"));
      }
    };
    if (c.reduce) { S.x = rest; apply(); gsap.set(q(".cw:first-child"), { autoAlpha: 1 }); return; }
    apply();

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    heroTl.current = tl;
    tl.to(S, { x: rest, duration: 1.9, ease: "power4.inOut", onUpdate: apply }, 0)
      .fromTo(q(".hl"), { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.4, stagger: 0.14, ease: "power4.out" }, 0.3)
      .fromTo(q(".tag"), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 1 }, 0.6)
      .fromTo(q(".cycline"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.1)
      .fromTo(q(".bar .js-hide"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14 }, 1.2)
      .fromTo(q(".badge"), { autoAlpha: 0, scale: 0.4, rotate: -120 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.4, ease: "back.out(1.5)" }, 1.4)
      .add(() => {
        // the verb in "We ___ cars" cycles: buy, sell, inspect, rent
        q<HTMLElement>(".cyc").forEach((el) => {
          const ws = Array.from(el.children);
          const loop = gsap.timeline({ repeat: -1 });
          ws.forEach((w, i) => {
            loop.fromTo(w, { yPercent: 90, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, i * 1.8)
              .to(w, { yPercent: -90, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, i * 1.8 + 1.4);
          });
        });
      }, 1.2);
    gsap.to(q(".badge-spin"), { rotate: 360, duration: 16, ease: "none", repeat: -1 });
    if (!shouldPreload()) tl.play();

    // pointer: the slab slides with the cursor
    const off: Array<() => void> = [];
    if (c.desktop && window.matchMedia("(pointer: fine)").matches) {
      const px = gsap.quickTo(S, "px", { duration: 1.2, ease: "power3", onUpdate: apply });
      const move = (e: PointerEvent) => { px((e.clientX / window.innerWidth - 0.5) * 24); };
      root.current!.addEventListener("pointermove", move);
      off.push(() => root.current?.removeEventListener("pointermove", move));
    }

    // scroll: the slab widens until the showroom photo floods the whole screen
    gsap.to(S, { g: 1, ease: "none", onUpdate: apply, scrollTrigger: { trigger: root.current!, start: "top top", end: "bottom bottom", scrub: 1 } });
    gsap.to(q(".badge"), { y: -80, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: root.current!, start: "top top", end: "18% top", scrub: 1 } });
    gsap.to(q(".hint"), { autoAlpha: 0, ease: "none", scrollTrigger: { trigger: root.current!, start: "top top", end: "8% top", scrub: true } });
    return () => off.forEach((f) => f());
  });

  return (
    <section ref={root} id="top" data-tone="light" className="relative h-[230svh] bg-paper">
      <Preloader onDone={start} />
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-paper">
        <Scene tone="blue" />

        {/* slim solid slabs (the logo's shapes) */}
        <div ref={(el) => { if (el) slabEls.current[2] = el; }} aria-hidden className="pointer-events-none absolute inset-0 bg-azure" style={{ clipPath: "polygon(-100% 0,-100% 0,-100% 100%,-100% 100%)" }} />
        <div ref={(el) => { if (el) slabEls.current[1] = el; }} aria-hidden className="pointer-events-none absolute inset-0 bg-sky" style={{ clipPath: "polygon(-100% 0,-100% 0,-100% 100%,-100% 100%)" }} />
        {/* main slab: the real showroom photo, with the paper-on-photo copy of the text on top */}
        <div ref={(el) => { if (el) slabEls.current[0] = el; }} aria-hidden className="pointer-events-none absolute inset-0 bg-deep" style={{ clipPath: "polygon(-100% 0,-100% 0,-100% 100%,-100% 100%)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover object-[62%_50%]" />
          <div className="absolute inset-0 bg-deep/45" />
          <Scene tone="white" />
        </div>

        <div className="badge js-hide absolute right-[6vw] top-[19svh] z-20 hidden h-36 w-36 items-center justify-center rounded-full border-2 border-deep bg-paper text-deep sm:flex">
          <svg viewBox="0 0 200 200" className="badge-spin absolute inset-0 h-full w-full" aria-hidden>
            <defs><path id="bc" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
            <text fontSize="12" letterSpacing="3" fill="currentColor" className="font-display"><textPath href="#bc" textLength="495" lengthAdjust="spacing">VEHICLES SOLD &#8226;</textPath></text>
          </svg>
          <span className="font-display text-3xl">50+</span>
        </div>

        <p className="hint pointer-events-none absolute bottom-[5svh] right-[6vw] z-20 hidden items-center gap-3 font-display text-[9px] tracking-[0.25em] text-deep sm:flex">
          Scroll to step inside <span className="relative block h-10 w-px overflow-hidden bg-azure"><i className="absolute inset-x-0 top-0 block h-1/2 bg-deep" style={{ animation: "cue 1.8s ease-in-out infinite" }} /></span>
        </p>
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 flex h-1.5"><i className="block flex-[3] bg-deep" /><i className="block flex-[2] bg-azure" /><i className="block flex-1 bg-sky" /></div>
      </div>
    </section>
  );
}
