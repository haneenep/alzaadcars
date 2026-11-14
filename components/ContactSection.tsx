"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";
import Button from "./Button";
import EmblemWatermark from "./EmblemWatermark";
import { business } from "@/src/config/business";

const lines = ["The Right Car.", "The Right Budget.", "The Right Experience."];

export default function ContactSection() {
  const root = useRef<HTMLElement>(null);
  const mag = useRef<HTMLDivElement>(null);

  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.fromTo(q(".ln"), { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.4, ease: "power4.out", stagger: 0.16, scrollTrigger: { trigger: root.current!, start: "top 65%" } });
    gsap.from(q(".fade"), { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current!, start: "top 45%" } });
    gsap.to(q(".wm"), { rotate: 360, duration: 120, ease: "none", repeat: -1 });
    gsap.to(q(".ping"), { scale: 1.5, autoAlpha: 0, duration: 2, ease: "power2.out", repeat: -1 });
    if (c.desktop && window.matchMedia("(pointer: fine)").matches && mag.current) {
      const el = mag.current;
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3 " .trim() });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.35); y((e.clientY - (r.top + r.height / 2)) * 0.35); };
      const leave = () => { x(0); y(0); };
      const host = el.parentElement!;
      host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
      return () => { host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); };
    }
  });

  return (
    <section ref={root} id="contact" data-tone="light" className="s-mist relative overflow-hidden">
      <div aria-hidden className="wm pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EmblemWatermark color="#6DD7FD" opacity={0.55} className="w-[150vw] max-w-none sm:w-[80vw]" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center sm:px-10 sm:py-44">
        <p className="fade mb-10 font-display text-[10px] tracking-[0.22em]">Contact</p>
        <h2 className="font-display text-[clamp(1rem,3.6vw,3.2rem)]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.12em]"><span className={`ln block whitespace-nowrap ${i === 1 ? "text-azure" : ""}`}>{l}</span></span>
          ))}
        </h2>
        <p className="fade mt-10 max-w-md text-[15px] leading-relaxed">Tell us your budget, preferred model and requirements. We will help you find the car that fits your life.</p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            <span aria-hidden className="ping absolute inset-0 border-2 border-deep" />
            <div ref={mag} className="fade relative"><Button href={business.whatsapp} external variant="primary">Chat on WhatsApp</Button></div>
          </div>
          <div className="fade"><Button href={business.phone.href} variant="secondary" tone="light">Call {business.phone.display}</Button></div>
        </div>
      </div>
    </section>
  );
}
