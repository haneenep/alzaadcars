"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useMotion } from "@/lib/motion";
import { cars } from "@/src/data/cars";
import CarCard from "./CarCard";
import Button from "./Button";

const picks = cars.slice(0, 3);

// Small teaser on the home page. Phones get a swipeable row; desktop gets three cards plus a "see all" tile.
export default function CollectionPreview() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.from(q(".head > *"), { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current!, start: "top 70%" } });
    gsap.from(q(".tile"), { y: 70, autoAlpha: 0, duration: 1.1, stagger: 0.13, ease: "power3.out", scrollTrigger: { trigger: q(".row")[0], start: "top 85%" } });
    gsap.fromTo(q(".giant"), { xPercent: 6 }, { xPercent: -20, ease: "none", scrollTrigger: { trigger: root.current!, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });

  return (
    <section ref={root} id="collection" data-tone="light" className="s-paper relative overflow-hidden">
      <div aria-hidden className="giant outline-mist pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,14rem)] leading-none">COLLECTION COLLECTION</div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-36">
        <div className="head mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 font-display text-[10px] tracking-[0.22em]">Our Collection</p>
            <h2 className="max-w-2xl font-display text-[clamp(1.5rem,3.4vw,3rem)]">Fresh in the showroom. <span className="text-azure">Inspected twice.</span></h2>
          </div>
          <Button href="/cars" variant="primary" className="self-start md:self-auto">View full collection</Button>
        </div>

        <div className="row -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {picks.map((car) => (
            <div key={car.id} className="tile flex w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-auto"><CarCard car={car} className="w-full" /></div>
          ))}
          <div className="tile flex w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-auto">
            <Link href="/cars" className="group relative flex min-h-[22rem] w-full flex-col justify-between overflow-hidden bg-deep p-7 text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/services/showroom.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-[900ms] group-hover:scale-110" />
              <p className="relative font-display text-[10px] tracking-[0.2em] text-mist">{cars.length} vehicles</p>
              <div className="relative">
                <p className="font-display text-[1.25rem] leading-[1.3]">See every car in the showroom</p>
                <span className="mt-6 inline-grid h-14 w-14 place-items-center bg-paper text-deep transition duration-300 group-hover:translate-x-2 group-hover:bg-sky"><ArrowRight size={22} /></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
