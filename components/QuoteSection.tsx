"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";
import Words from "./Words";

export default function QuoteSection() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.fromTo(q(".w"), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: "power4.out", stagger: 0.08, scrollTrigger: { trigger: q(".big")[0], start: "top 80%" } });
    gsap.from(q(".fade"), { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: q(".rest")[0], start: "top 85%" } });
    gsap.from(q(".line"), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "power3.inOut", scrollTrigger: { trigger: q(".rest")[0], start: "top 85%" } });
  });

  return (
    <section ref={root} data-tone="dark" className="s-deep relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-28 sm:px-10 sm:py-40">
        <p className="mb-10 font-display text-[10px] tracking-[0.22em] text-mist">A word on budgets</p>
        <h2 className="big font-display text-[clamp(1.6rem,4.6vw,4rem)] leading-[1.2]">
          {"Buy your dream car.".split(" ").map((w, i) => <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em]"><span className="w inline-block">{w}&nbsp;</span></span>)}
          <br />
          <span className="text-sky">
            {"Not a financial burden.".split(" ").map((w, i) => <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em]"><span className="w inline-block">{w}&nbsp;</span></span>)}
          </span>
        </h2>
        <div className="rest mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <p className="fade max-w-xl text-[16px] leading-relaxed text-mist">
            A car should make your life more comfortable, not create financial pressure. Consider your monthly commitments, maintenance, insurance and other ownership costs before you decide, and choose the vehicle that matches your actual budget, lifestyle and requirements.
          </p>
          <div className="fade">
            <div className="line mb-5 h-[3px] w-full bg-sky" />
            <p className="font-display text-[1.1rem]">Shamnad Khalid</p>
            <p className="mt-2 text-[13px] font-semibold text-mist">Managing Partner, Al Zaad Cars</p>
          </div>
        </div>
        <p className="fade mt-14 font-display text-[0.95rem] leading-[1.6] sm:text-[1.2rem]">Choose wisely. Drive happily. <span className="text-sky">Enjoy ownership without financial stress.</span></p>
      </div>
    </section>
  );
}
