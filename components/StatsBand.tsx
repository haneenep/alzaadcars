"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";

const stats = [
  { n: 50, suffix: "+", label: "Vehicles sold" },
  { n: 2, suffix: "", label: "Stage inspection" },
  { n: 6, suffix: "", label: "Step quality cycle" },
  { n: 7, suffix: "", label: "Services, one roof" },
];
const phrase = "Select carefully \u2014 Inspect thoroughly \u2014 Rectify responsibly \u2014 Deliver confidently \u2014 ";

export default function StatsBand() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.from(q(".stat"), { y: 50, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: root.current!, start: "top 75%" } });
    q<HTMLElement>(".count").forEach((el) => {
      const o = { v: 0 }; const end = Number(el.dataset.n);
      gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: root.current!, start: "top 75%" } });
    });
    gsap.from(q(".rule"), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "power3.inOut", stagger: 0.1, scrollTrigger: { trigger: root.current!, start: "top 75%" } });
    gsap.to(q(".marquee"), { xPercent: -50, ease: "none", scrollTrigger: { trigger: root.current!, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });

  return (
    <section ref={root} data-tone="light" className="s-mist relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 pb-10 pt-24 sm:px-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="rule mb-5 h-[3px] w-full bg-azure" />
            <p className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-none">
              <span className="count" data-n={s.n}>{s.n}</span><span className="text-azure">{s.suffix}</span>
            </p>
            <p className="mt-4 text-[13px] font-semibold">{s.label}</p>
          </div>
        ))}
      </div>
      <div aria-hidden className="select-none overflow-hidden pb-16 pt-8">
        <div className="marquee flex w-max whitespace-nowrap font-display text-[clamp(1.8rem,5.6vw,4.8rem)] leading-none">
          {[0, 1, 2, 3].map((i) => <span key={i} className={i % 2 ? "outline-deep" : ""}>{phrase}</span>)}
        </div>
      </div>
    </section>
  );
}
