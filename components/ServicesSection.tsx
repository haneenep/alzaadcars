"use client";
import { useRef } from "react";
import { KeyRound, CarFront, ScanSearch, CalendarClock, ParkingSquare, FileCheck2, Compass } from "lucide-react";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion";

// `photo` = file in /public/services (real photo used as the card background)
const services = [
  { icon: KeyRound, title: "Used Car Buying", photo: "buying", text: "Selling your car, made straightforward and convenient.", pts: ["Fair, competitive evaluations", "Professional technical assessment", "Ownership transfer handled"] },
  { icon: CarFront, title: "Used Car Selling", photo: "selling", text: "A carefully selected collection of pre-inspected used cars.", pts: ["Quality-checked vehicles", "Options across every budget", "Registration & transfer help"] },
  { icon: ScanSearch, title: "Professional Inspection", photo: "inspection", text: "Know exactly what you are buying, before you buy it.", pts: ["Engine, transmission, suspension", "Brakes and electrical systems", "Exterior and interior condition"] },
  { icon: CalendarClock, title: "Car Rental", photo: "rental", text: "A day, a week or longer, with flexible vehicle choices.", pts: ["Flexible vehicle choices", "Straightforward arrangements", "Suited to your travel needs"] },
  { icon: ParkingSquare, title: "Park & Sell", photo: "park", text: "Your car, our showroom. We find the right buyer for you.", pts: ["No parking or display fee", "You keep ownership until sold", "Terms and conditions apply"] },
  { icon: FileCheck2, title: "Documentation Assistance", photo: "docs", text: "Paperwork and ownership formalities, taken off your hands.", pts: ["Ownership transfer", "Registration formalities", "Guidance at every step"] },
  { icon: Compass, title: "Personalised Assistance", photo: "personal", text: "Tell us your budget and needs. We help you choose practically.", pts: ["Budget-first guidance", "Models matched to your lifestyle", "The right car, not the priciest"] },
];

export default function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    let cleanup: (() => void) | undefined;
    if (c.desktop) {
      // Tall wrapper scrolls normally, inner panel is CSS `position: sticky`; GSAP only moves the track.
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      const setH = () => { pin.current!.style.height = `${dist() * 1.15 + window.innerHeight}px`; };
      setH();
      ScrollTrigger.addEventListener("refreshInit", setH);
      gsap.to(track.current!, { x: () => -dist(), ease: "none", force3D: true,
        scrollTrigger: { trigger: pin.current!, scrub: 1.1, start: "top top", end: "bottom bottom", invalidateOnRefresh: true } });
      gsap.to(q(".bar"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: pin.current!, start: "top top", end: "bottom bottom", scrub: 1.1 } });
      cleanup = () => { ScrollTrigger.removeEventListener("refreshInit", setH); if (pin.current) pin.current.style.height = ""; };
    } else {
      ScrollTrigger.batch(q(".card"), { start: "top 88%", onEnter: (els) => gsap.from(els, { y: 60, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "power3.out", overwrite: true }) });
    }
    gsap.from(q(".intro > *"), { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current!, start: "top 70%" } });
    return cleanup;
  });

  return (
    <section ref={root} id="services" data-tone="light" className="s-paper">
      <div ref={pin} className="relative">
        <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:overflow-hidden">
          <div ref={track} className="flex flex-col gap-5 px-6 py-24 will-change-transform md:flex-row md:items-center md:gap-6 md:px-[6vw] md:py-0">
            <div className="intro shrink-0 md:w-[34vw] md:pr-10">
              <p className="mb-6 font-display text-[10px] tracking-[0.22em]">Our Services</p>
              <h2 className="font-display text-[clamp(1.6rem,3.4vw,3.2rem)]">
                Complete solutions, <span className="text-azure">under one roof.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed">Seven ways we make buying, selling and owning a car simpler.</p>
              <p className="mt-10 hidden items-center gap-3 font-display text-[9px] tracking-[0.25em] md:flex">Keep scrolling <span className="h-[2px] w-12 bg-deep" /></p>
            </div>
            {services.map((s, i) => (
              <article key={s.title}
                className="card group relative flex min-h-[34rem] shrink-0 flex-col justify-between overflow-hidden bg-deep text-paper md:h-[66svh] md:max-h-[36rem] md:w-[25rem]">
                {/* real photo = the card background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/services/${s.photo}.jpg`} alt="" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />

                <div className="relative flex items-start justify-between p-6">
                  <span className="grid h-12 w-12 place-items-center bg-paper text-deep"><s.icon size={22} strokeWidth={1.6} /></span>
                  <span aria-hidden className="outline-paper font-display text-[2.6rem] leading-none">{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* flat deep-blue panel keeps the text readable and lets the photo show above it */}
                <div className="relative bg-deep/90 p-6 pb-7">
                  <h3 className="font-display text-[1.05rem] leading-[1.35] sm:text-[1.15rem]">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mist">{s.text}</p>
                  <ul className="mt-5 space-y-2 border-t-2 border-sky pt-4 text-[13px]">
                    {s.pts.map((p) => <li key={p} className="flex gap-3"><i className="mt-[0.7em] block h-[2px] w-3 shrink-0 bg-sky" />{p}</li>)}
                  </ul>
                </div>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-sky transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            ))}
            <div className="hidden w-[6vw] shrink-0 md:block" />
          </div>
          <div aria-hidden className="absolute inset-x-[6vw] bottom-10 hidden h-[3px] bg-mist md:block"><i className="bar block h-full origin-left scale-x-0 bg-deep" /></div>
        </div>
      </div>
    </section>
  );
}
