"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";
import EmblemWatermark from "./EmblemWatermark";
import Words from "./Words";

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.fromTo(q(".w"), { opacity: 0.18 }, { opacity: 1, ease: "none", stagger: 0.6,
      scrollTrigger: { trigger: q(".statement")[0], start: "top 80%", end: "bottom 45%", scrub: 0.6 } });
    gsap.from(q(".fade"), { y: 40, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.15,
      scrollTrigger: { trigger: q(".after")[0], start: "top 85%" } });
    gsap.fromTo(q(".wm"), { yPercent: -10, rotate: -4 }, { yPercent: 10, rotate: 4, ease: "none",
      scrollTrigger: { trigger: root.current!, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} id="about" data-tone="dark" className="s-deep relative overflow-hidden">
      <div className="wm pointer-events-none absolute inset-0 flex items-center justify-center">
        <EmblemWatermark color="#0093CB" opacity={0.6} className="w-[160vw] max-w-none sm:w-[90vw]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-40">
        <p className="mb-10 font-display text-[10px] tracking-[0.22em] text-mist">About Us</p>
        <h2 className="statement font-display text-[clamp(1.2rem,2.9vw,2.6rem)] leading-[1.4]">
          <Words text="More than cars. Every vehicle is evaluated, inspected, repaired and verified before it ever reaches you, so the only thing left to do is drive away with confidence." />
        </h2>
        <div className="after mt-16 grid gap-10 border-t-2 border-sky pt-10 md:grid-cols-2">
          <p className="fade max-w-md text-[15px] leading-relaxed text-mist">
            Al Zaad Cars was established with a clear vision: to make buying, selling and owning a used car easier, safer and more convenient &mdash; with support through the entire ownership transfer.
          </p>
          <p className="fade max-w-md text-[15px] leading-relaxed text-mist">
            Having sold over 50 vehicles, a significant part of our business now comes from returning customers and referrals. Customer satisfaction is not a goal. It is the foundation.
          </p>
        </div>
      </div>
    </section>
  );
}
