"use client";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/motion";
import { cars, aed } from "@/src/data/cars";
import Button from "./Button";
import { business } from "@/src/config/business";

const from = Math.min(...cars.map((c) => c.price));

// Same visual language as the home hero: three slanted slabs (the logo's shapes), the last one a real photo.
// Desktop: slabs stand on the right. Phone: they become bands across the lower part, text stays above.
export default function CarsHero() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (c) => {
    const q = gsap.utils.selector(root);
    if (c.reduce) { gsap.set(q(".js-hide"), { autoAlpha: 1 }); return; }
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(q(".slab"), { xPercent: 105, duration: 1.5, stagger: 0.14, ease: "power4.inOut" }, 0.1)
      .fromTo(q(".photo"), { scale: 1.25 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0.1)
      .fromTo(q(".hl"), { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.3, stagger: 0.14 }, 0.5)
      .fromTo(q(".fade"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "power3.out" }, 0.9);
    q<HTMLElement>(".count").forEach((el) => {
      const o = { v: 0 }; const end = Number(el.dataset.n);
      gsap.to(o, { v: end, duration: 2, delay: 1.1, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
    });
  });

  return (
    <section ref={root} data-tone="dark" className="s-deep relative min-h-[100svh] overflow-hidden md:min-h-[88svh]">
      <div aria-hidden className="slab absolute inset-0 bg-azure [clip-path:polygon(0_58%,100%_48%,100%_51%,0_61%)] md:[clip-path:polygon(50%_0,56%_0,40%_100%,34%_100%)]" />
      <div aria-hidden className="slab absolute inset-0 bg-sky [clip-path:polygon(0_61%,100%_51%,100%_54%,0_64%)] md:[clip-path:polygon(56%_0,62%_0,46%_100%,40%_100%)]" />
      <div aria-hidden className="slab absolute inset-0 overflow-hidden bg-azure [clip-path:polygon(0_64%,100%_54%,100%_100%,0_100%)] md:[clip-path:polygon(62%_0,100%_0,100%_100%,46%_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/services/selling.jpg" alt="" className="photo absolute inset-0 h-full w-full object-cover object-[70%_60%]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl flex-col px-6 pb-10 pt-32 sm:px-10 md:pb-16 md:pt-40">
        <div className="max-w-[40rem] md:max-w-[min(44vw,40rem)]">
          <p className="fade js-hide mb-6 flex items-center gap-3 font-display text-[9px] tracking-[0.2em] text-mist sm:text-[10px]"><i className="block h-[2px] w-8 bg-sky" />Al Zaad Cars &middot; Ajman</p>
          <h1 className="font-display text-[clamp(1.9rem,9vw,2.6rem)] md:text-[clamp(1.8rem,3.8vw,4.2rem)]">
            <span className="block overflow-hidden pb-[0.1em]"><span className="hl js-hide block">Our</span></span>
            <span className="block overflow-hidden pb-[0.1em]"><span className="hl js-hide block text-sky">Collection.</span></span>
          </h1>
          <p className="fade js-hide mt-5 max-w-md text-[14px] leading-relaxed text-mist sm:text-[15px]">
            Hand-picked pre-owned cars, inspected before we buy and again in our garage. Filter by what matters to you, then message us about the ones you like.
          </p>
          <div className="fade js-hide mt-7 flex flex-wrap gap-3">
            <Button href="#browse" variant="white">Browse cars</Button>
            <Button href={business.whatsapp} external variant="secondary" tone="dark">Ask on WhatsApp</Button>
          </div>
        </div>

        <dl className="fade js-hide mt-auto hidden max-w-xl grid-cols-3 gap-px bg-sky pt-0 md:mt-16 md:grid">
          {[
            [<span key="a" className="count" data-n={cars.length}>{cars.length}</span>, "Cars in the showroom"],
            ["2", "Stage inspection"],
            [aed(from).replace("AED ", ""), "Prices from, AED"],
          ].map(([v, l], i) => (
            <div key={i} className="bg-deep p-4 pt-5">
              <dd className="font-display text-[1.2rem] leading-none">{v}</dd>
              <dt className="mt-3 text-[12px] text-mist">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
