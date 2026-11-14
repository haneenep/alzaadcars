"use client";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ScanSearch, ShieldCheck, HeartHandshake, Wallet, FileCheck2, Repeat, LayoutGrid, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, useMotion } from "@/lib/motion";
import FolderFloat from "./FolderFloat";

const items = [
  { icon: BadgeCheck, t: "50+ Cars Sold", d: "A growing track record of successful vehicle sales." },
  { icon: ScanSearch, t: "Two-Stage Inspection", d: "Technical assessment before purchase, then a comprehensive garage inspection." },
  { icon: ShieldCheck, t: "Quality-Focused Selection", d: "We avoid vehicles with major accidents and major mechanical issues." },
  { icon: HeartHandshake, t: "Customer-Focused", d: "We understand your requirements before recommending a vehicle." },
  { icon: Wallet, t: "Budget-Friendly Choices", d: "We help you find a vehicle that suits your financial comfort." },
  { icon: FileCheck2, t: "Complete Assistance", d: "Support with paperwork, ownership transfer and related formalities." },
  { icon: Repeat, t: "Returning Customers", d: "Repeat business and referrals reflect the relationships we build." },
  { icon: LayoutGrid, t: "All-in-One Services", d: "Buying, selling, inspections, rentals and Park & Sell." },
];

// Short labels for the floating folder pills (same order as `items`)
const pills = ["50+ Cars Sold", "Two-Stage Inspection", "Quality Selection", "Customer-Focused", "Budget-Friendly", "Complete Assistance", "Returning Customers", "All-in-One Services"];

export default function WhySection() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [trigger, setTrigger] = useState<"hover" | "click">("hover");
  const Icon = items[active].icon;
  const total = items.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  // touch screens have no hover: tap the folder to open it instead
  useEffect(() => {
    setTrigger(window.matchMedia("(hover: hover)").matches ? "hover" : "click");
  }, []);

  // every time the selected reason changes, its card "slides out of the folder"
  useEffect(() => {
    const el = panel.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pd-in", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
      gsap.fromTo(".pd-title", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.inOut" });
      gsap.fromTo(".pd-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" });
      gsap.fromTo(".pd-num", { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.4, duration: 1.1, ease: "power3.out" });
      gsap.fromTo(".pd-icon", { rotate: -90, scale: 0.4, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: "back.out(1.7)" });
    }, el);
    return () => ctx.revert();
  }, [active]);

  const show = (i: number, scroll = false) => {
    setActive((i + total) % total);
    if (scroll) panel.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useMotion(root, (c) => {
    if (!c.full) return;
    const q = gsap.utils.selector(root);
    gsap.from(q(".head > *"), { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current!, start: "top 75%" } });
  });

  return (
    <section ref={root} data-tone="light" className="s-mist">
      <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-36">
        <div className="head mb-10 max-w-3xl">
          <p className="mb-6 font-display text-[10px] tracking-[0.22em]">Why Choose Al Zaad Cars</p>
          <h2 className="font-display text-[clamp(1.6rem,3.6vw,3.2rem)]">Eight reasons buyers <span className="text-azure">come back.</span></h2>
        </div>

        {/* stage: folder centred on the left, spotlight card on the right */}
        <div className="head grid items-stretch gap-10 lg:grid-cols-[360px_1fr] lg:gap-12">
          <div className="flex items-center justify-center pt-[15rem] lg:min-h-[28rem] lg:pt-32">
            <FolderFloat
              items={pills}
              label="Our 8 reasons"
              sublabel={trigger === "hover" ? "Hover, then pick one" : "Tap, then pick one"}
              trigger={trigger}
              closeOnSelect
              physics
              drift={0.5}
              onSelect={(_, i) => show(i)}
              folderColor="#0093CB"
              frontColor="#005ACD"
              paperColor="#F5FFFF"
              itemColor="#005ACD"
              itemTextColor="#F5FFFF"
              labelColor="#F5FFFF"
              width={200}
              height={148}
              radius={14}
              spread={180}
              lift={26}
              tilt={8}
              flapAngle={34}
              restAngle={16}
              openDuration={520}
              stagger={45}
              bounce={0.3}
            />
          </div>

          {/* flat deep-blue spotlight card with a gentle 3D tilt */}
          <div
            className="relative [perspective:1200px]"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
              (e.currentTarget.firstElementChild as HTMLElement).style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
            }}
            onMouseLeave={(e) => { (e.currentTarget.firstElementChild as HTMLElement).style.transform = ""; }}
          >
            <div className="relative h-full border-b-[10px] border-azure transition-transform duration-300 ease-out [transform-style:preserve-3d]">
              <div ref={panel} className="relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden bg-deep p-8 text-paper sm:p-12 lg:min-h-[28rem]">
                <span aria-hidden className="pd-num outline-sky pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[clamp(7rem,17vw,13rem)] leading-none opacity-40">{pad(active + 1)}</span>

                <div className="relative">
                  <div className="pd-in flex flex-wrap items-center gap-5">
                    <span className="pd-icon grid h-14 w-14 place-items-center bg-paper text-deep"><Icon size={24} strokeWidth={1.6} /></span>
                    <p className="border-2 border-sky px-4 py-2 font-display text-[10px] tracking-[0.2em] text-sky">Reason {pad(active + 1)} <span className="text-mist">/ {pad(total)}</span></p>
                  </div>
                  <h3 className="pd-title mt-10 font-display text-[clamp(1.4rem,2.9vw,2.5rem)] leading-[1.2]">{items[active].t}</h3>
                  <div className="pd-line mt-6 h-[3px] w-28 origin-left bg-sky" />
                  <p className="pd-in mt-6 max-w-md text-[1.05rem] leading-relaxed text-mist">{items[active].d}</p>
                </div>

                <div className="relative mt-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-1.5" role="tablist" aria-label="Reasons">
                    {items.map((it, i) => (
                      <button key={it.t} type="button" role="tab" aria-selected={i === active} aria-label={it.t} onClick={() => show(i)}
                        className={`h-1.5 transition-all duration-500 ${i === active ? "w-10 bg-paper" : "w-4 bg-azure hover:bg-sky"}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" aria-label="Previous reason" onClick={() => show(active - 1)} className="grid h-11 w-11 place-items-center border-2 border-paper text-paper transition hover:bg-paper hover:text-deep"><ArrowLeft size={16} /></button>
                    <button type="button" aria-label="Next reason" onClick={() => show(active + 1)} className="grid h-11 w-11 place-items-center border-2 border-paper text-paper transition hover:bg-paper hover:text-deep"><ArrowRight size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
