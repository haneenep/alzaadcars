"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";

const steps = [
  { t: "Vehicle Selection", d: "We choose vehicles by market demand, condition, specifications and overall suitability. Never on looks or price alone." },
  { t: "Initial Technical Inspection", d: "Before buying, our technicians assess mechanics, accident history, engine, transmission, suspension and electrics. Major accident damage or major mechanical issues? We walk away." },
  { t: "Vehicle Purchase", d: "Only a car that passes the assessment is bought, after weighing its condition against its market value." },
  { t: "Comprehensive Garage Inspection", d: "Every purchased car goes to our garage for a second, detailed inspection to uncover anything that needs attention." },
  { t: "Repairs & Quality Rectification", d: "Any replacement or repair is done with genuine or original-quality parts, as applicable, until the car meets our standard." },
  { t: "Final Verification & Showroom", d: "One last verification, then the car is prepared for display and offered to you with confidence." },
];

export default function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);

  useMotion(root, (c) => {
    const q = gsap.utils.selector(root);
    if (c.reduce) {
      // static fallback: show every step as a plain list
      gsap.set(pin.current!, { height: "auto" });
      gsap.set(stick.current!, { position: "relative", height: "auto" });
      gsap.set(q(".stack"), { display: "flex", flexDirection: "column", gap: "2.5rem", height: "auto" });
      gsap.set(q(".step"), { gridArea: "auto", autoAlpha: 1, position: "relative" });
      return;
    }
    const n = steps.length;
    gsap.set(q(".step"), { autoAlpha: 0, y: 50 });
    gsap.set(q(".bignum"), { autoAlpha: 0, yPercent: 40 });
    gsap.set(q(".step")[0], { autoAlpha: 1, y: 0 });
    gsap.set(q(".bignum")[0], { autoAlpha: 1, yPercent: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" },
      scrollTrigger: { trigger: pin.current!, start: "top top", end: "bottom bottom", scrub: 1.1 } }); // sticky wrapper, no JS pin: no shaking
    tl.to(q(".fill"), { scaleX: 1, ease: "none", duration: n - 1 }, 0);
    tl.to(q(".orb"), { left: "100%", ease: "none", duration: n - 1 }, 0);
    for (let i = 0; i < n; i++) {
      tl.to(q(".dot")[i], { backgroundColor: "#F5FFFF", scale: 1.5, duration: 0.2 }, Math.max(0, i - 0.1));
      tl.to(q(".label")[i], { color: "#F5FFFF", duration: 0.2 }, Math.max(0, i - 0.1));
      if (i === 0) continue;
      const at = i - 0.55;
      tl.to(q(".step")[i - 1], { autoAlpha: 0, y: -50, duration: 0.45 }, at)
        .to(q(".bignum")[i - 1], { autoAlpha: 0, yPercent: -40, duration: 0.45 }, at)
        .fromTo(q(".step")[i], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, immediateRender: false }, at + 0.35)
        .fromTo(q(".bignum")[i], { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, immediateRender: false }, at + 0.35);
    }
    tl.to({}, { duration: 0.4 });
    gsap.from(q(".head > *"), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current!, start: "top 70%" } });
  });

  return (
    <section ref={root} id="process" data-tone="dark" className="s-deep">
      <div ref={pin} className="relative" style={{ height: `${100 + steps.length * 85}svh` }}>
      <div ref={stick} className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-6 py-16 sm:px-10">
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="head mb-10 sm:mb-14">
            <p className="mb-4 font-display text-[10px] tracking-[0.22em] text-mist">Our Vehicle Quality Process</p>
            <h2 className="max-w-5xl font-display text-[clamp(1.3rem,2.8vw,2.6rem)]">Quality is not an afterthought. <span className="text-sky">It starts before we buy.</span></h2>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-16">
            <div className="relative h-[7rem] w-[8.5rem] sm:h-[13rem] sm:w-[16rem]" aria-hidden>
              {steps.map((_, i) => (
                <span key={i} className="bignum outline-sky absolute inset-0 flex items-center font-display text-[5rem] leading-none sm:text-[9.5rem]">{String(i + 1).padStart(2, "0")}</span>
              ))}
            </div>
            <div className="stack grid min-h-[13rem]">
              {steps.map((s, i) => (
                <div key={s.t} className="step [grid-area:1/1] self-center">
                  <p className="font-display text-[10px] tracking-[0.22em] text-sky">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.25rem,2.4vw,2.2rem)] leading-[1.25]">{s.t}</h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-16" aria-hidden>
            <div className="relative h-[3px] bg-azure">
              <i className="fill absolute inset-0 block origin-left scale-x-0 bg-paper" />
              <i className="orb absolute left-0 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-sky" />
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                {steps.map((s) => <i key={s.t} className="dot block h-2 w-2 rounded-full bg-azure" />)}
              </div>
            </div>
            <div className="mt-5 hidden justify-between font-display text-[8px] tracking-[0.15em] lg:flex">
              {steps.map((s) => <span key={s.t} className="label w-28 text-sky first:text-left last:text-right [&:not(:first-child):not(:last-child)]:text-center">{s.t.split(" ")[0]}</span>)}
            </div>
          </div>
          <p className="mt-12 font-display text-[0.95rem] leading-[1.6] sm:text-[1.2rem]">Select carefully. Inspect thoroughly. Rectify responsibly. <span className="text-sky">Deliver confidently.</span></p>
        </div>
      </div>
      </div>
    </section>
  );
}
