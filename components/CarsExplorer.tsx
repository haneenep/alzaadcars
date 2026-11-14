"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, SlidersHorizontal, Search, Gauge, Calendar, Fuel, Settings2, Palette, BadgeCheck } from "lucide-react";
import { cars, aed, km, type Car } from "@/src/data/cars";
import CarCard from "./CarCard";
import Button from "./Button";
import { business } from "@/src/config/business";

type Sort = "new" | "low" | "high" | "km";
const uniq = <T,>(a: T[]) => Array.from(new Set(a)).sort() as T[];
const PRICE_MAX = Math.ceil(Math.max(...cars.map((c) => c.price)) / 10000) * 10000;
const YEAR_MIN = Math.min(...cars.map((c) => c.year));
const KM_MAX = Math.ceil(Math.max(...cars.map((c) => c.km)) / 10000) * 10000;
const enquiry = (c: Car) => `${business.whatsapp}?text=${encodeURIComponent(`Hi Al Zaad Cars, I'm interested in the ${c.year} ${c.make} ${c.model} (${aed(c.price)}). Is it still available?`)}`;

type F = { q: string; body: string[]; make: string[]; fuel: string[]; gearbox: string[]; price: number; year: number; km: number };
const empty: F = { q: "", body: [], make: [], fuel: [], gearbox: [], price: PRICE_MAX, year: YEAR_MIN, km: KM_MAX };

const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={`min-h-10 border-2 border-deep px-3 font-display text-[9px] tracking-[0.1em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep ${on ? "bg-deep text-paper" : "bg-paper text-deep hover:bg-mist"}`}>
      {children}
    </button>
  );
}
const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <fieldset className="border-t-2 border-mist pt-5 first:border-0 first:pt-0">
    <legend className="mb-3 font-display text-[10px] tracking-[0.18em]">{title}</legend>
    {children}
  </fieldset>
);

function FilterPanel({ f, set, reset }: { f: F; set: (p: Partial<F>) => void; reset: () => void }) {
  const makes = useMemo(() => uniq(cars.map((c) => c.make)), []);
  const bodies = useMemo(() => uniq(cars.map((c) => c.body)), []);
  const fuels = useMemo(() => uniq(cars.map((c) => c.fuel)), []);
  const gears = useMemo(() => uniq(cars.map((c) => c.gearbox)), []);
  return (
    <div className="space-y-6">
      <label className="relative block">
        <span className="sr-only">Search make or model</span>
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={f.q} onChange={(e) => set({ q: e.target.value })} placeholder="Search make or model"
          className="h-12 w-full border-2 border-deep bg-paper pl-10 pr-3 text-[14px] text-deep placeholder:text-azure focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-deep" />
      </label>
      <Group title="Body type"><div className="flex flex-wrap gap-2">{bodies.map((b) => <Chip key={b} on={f.body.includes(b)} onClick={() => set({ body: toggle(f.body, b) })}>{b}</Chip>)}</div></Group>
      <Group title="Make"><div className="flex flex-wrap gap-2">{makes.map((m) => <Chip key={m} on={f.make.includes(m)} onClick={() => set({ make: toggle(f.make, m) })}>{m}</Chip>)}</div></Group>
      <Group title="Max price">
        <p className="mb-2 font-display text-[12px]">{aed(f.price)}</p>
        <input type="range" aria-label="Maximum price" min={30000} max={PRICE_MAX} step={5000} value={f.price} onChange={(e) => set({ price: +e.target.value })} className="w-full" />
      </Group>
      <Group title="Min year">
        <p className="mb-2 font-display text-[12px]">{f.year} +</p>
        <input type="range" aria-label="Minimum year" min={YEAR_MIN} max={new Date().getFullYear()} step={1} value={f.year} onChange={(e) => set({ year: +e.target.value })} className="w-full" />
      </Group>
      <Group title="Max mileage">
        <p className="mb-2 font-display text-[12px]">{km(f.km)}</p>
        <input type="range" aria-label="Maximum mileage" min={10000} max={KM_MAX} step={5000} value={f.km} onChange={(e) => set({ km: +e.target.value })} className="w-full" />
      </Group>
      <Group title="Fuel"><div className="flex flex-wrap gap-2">{fuels.map((x) => <Chip key={x} on={f.fuel.includes(x)} onClick={() => set({ fuel: toggle(f.fuel, x) })}>{x}</Chip>)}</div></Group>
      <Group title="Gearbox"><div className="flex flex-wrap gap-2">{gears.map((x) => <Chip key={x} on={f.gearbox.includes(x)} onClick={() => set({ gearbox: toggle(f.gearbox, x) })}>{x}</Chip>)}</div></Group>
      <button type="button" onClick={reset} className="min-h-11 w-full border-2 border-deep font-display text-[10px] tracking-[0.15em] transition hover:bg-deep hover:text-paper">Reset filters</button>
    </div>
  );
}

function Detail({ car, onClose }: { car: Car; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const rows: [React.ReactNode, string, string][] = [
    [<Calendar key="1" size={16} />, "Year", String(car.year)], [<Gauge key="2" size={16} />, "Mileage", km(car.km)],
    [<Settings2 key="3" size={16} />, "Gearbox", car.gearbox], [<Fuel key="4" size={16} />, "Fuel", car.fuel],
    [<Palette key="5" size={16} />, "Colour", car.color], [<BadgeCheck key="6" size={16} />, "Specs", car.specs],
  ];
  return (
    <div className="fade-in fixed inset-0 z-50 flex items-end justify-center bg-deep/80 sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${car.make} ${car.model}`}>
      <div onClick={(e) => e.stopPropagation()} className="sheet-up relative grid max-h-[94svh] w-full max-w-5xl overflow-y-auto overscroll-contain bg-paper text-deep md:grid-cols-[1.1fr_1fr]">
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center bg-paper text-deep transition hover:bg-deep hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-deep"><X size={20} /></button>
        <div className="relative min-h-[16rem] bg-deep md:min-h-[32rem] md:[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={car.image} alt={`${car.make} ${car.model}`} style={{ objectPosition: car.pos }} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-6 sm:p-9">
          {car.sample && <p className="mb-3 inline-block bg-mist px-2.5 py-1.5 font-display text-[8px] tracking-[0.15em]">Sample listing</p>}
          <p className="text-[13px] font-semibold">{car.make}</p>
          <h3 className="mt-1 font-display text-[clamp(1.2rem,2.4vw,1.8rem)] leading-[1.25]">{car.model}</h3>
          <p className="mt-4 font-display text-[1.3rem] text-azure">{aed(car.price)}</p>
          <dl className="mt-6 grid grid-cols-2 gap-px bg-mist">
            {rows.map(([i, k, v]) => (
              <div key={k} className="bg-paper py-3 pr-3"><dt className="flex items-center gap-2 text-[12px] font-semibold">{i}{k}</dt><dd className="mt-1 text-[15px]">{v}</dd></div>
            ))}
          </dl>
          <p className="mt-6 text-[15px] leading-relaxed">{car.note}</p>
          <p className="mt-2 text-[13px]">Every car is checked before purchase and again in our garage. Ownership transfer handled.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={enquiry(car)} external variant="primary">Enquire on WhatsApp</Button>
            <Button href={business.phone.href} variant="secondary" tone="light">Call us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarsExplorer() {
  const [f, setF] = useState<F>(empty);
  const [sort, setSort] = useState<Sort>("new");
  const [open, setOpen] = useState<Car | null>(null);
  const [drawer, setDrawer] = useState(false);
  const set = (p: Partial<F>) => setF((o) => ({ ...o, ...p }));
  const reset = () => setF(empty);

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const r = cars.filter((c) =>
      (!q || `${c.make} ${c.model} ${c.year}`.toLowerCase().includes(q)) &&
      (!f.body.length || f.body.includes(c.body)) && (!f.make.length || f.make.includes(c.make)) &&
      (!f.fuel.length || f.fuel.includes(c.fuel)) && (!f.gearbox.length || f.gearbox.includes(c.gearbox)) &&
      c.price <= f.price && c.year >= f.year && c.km <= f.km);
    return r.sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "km" ? a.km - b.km : b.year - a.year || a.price - b.price);
  }, [f, sort]);

  const active = f.body.length + f.make.length + f.fuel.length + f.gearbox.length + (f.q ? 1 : 0) + (f.price < PRICE_MAX ? 1 : 0) + (f.year > YEAR_MIN ? 1 : 0) + (f.km < KM_MAX ? 1 : 0);
  const key = JSON.stringify([f, sort]);

  return (
    <section id="browse" data-tone="light" className="s-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-display text-[10px] tracking-[0.22em]">Browse</p>
            <h2 className="font-display text-[clamp(1.4rem,3vw,2.6rem)]">Find your <span className="text-azure">next car.</span></h2>
          </div>
          <label className="flex items-center gap-3 text-[13px] font-semibold">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-12 border-2 border-deep bg-paper px-3 text-[14px] font-normal text-deep focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-deep">
              <option value="new">Newest first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="km">Lowest mileage</option>
            </select>
          </label>
        </div>

        {/* phones: sticky bar that opens the filter sheet */}
        <div className="sticky top-[5.75rem] z-20 -mx-6 mb-6 flex items-center justify-between gap-3 border-y-2 border-deep bg-paper px-6 py-3 lg:hidden">
          <button type="button" onClick={() => setDrawer(true)} className="flex min-h-11 items-center gap-3 bg-deep px-4 font-display text-[10px] tracking-[0.15em] text-paper">
            <SlidersHorizontal size={16} /> Filters{active ? ` (${active})` : ""}
          </button>
          <p className="font-display text-[10px] tracking-[0.1em]" aria-live="polite">{list.length} / {cars.length} cars</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
          <aside aria-label="Filters" className="sticky top-28 hidden h-fit max-h-[calc(100svh-8rem)] overflow-y-auto border-2 border-deep p-6 lg:block [scrollbar-width:thin]">
            <div className="mb-6 flex items-center justify-between"><p className="font-display text-[11px] tracking-[0.15em]">Filters</p><p className="font-display text-[10px]" aria-live="polite">{list.length} / {cars.length}</p></div>
            <FilterPanel f={f} set={set} reset={reset} />
          </aside>

          <div>
            {list.length ? (
              <div key={key} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((c, i) => (
                  <div key={c.id} className="tile-in flex" style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}><CarCard car={c} onOpen={setOpen} className="w-full" /></div>
                ))}
              </div>
            ) : (
              <div className="fade-in border-2 border-dashed border-deep p-10 text-center">
                <p className="font-display text-[1.1rem] leading-[1.4]">No cars match those filters.</p>
                <p className="mx-auto mt-3 max-w-sm text-[15px]">Loosen a filter, or tell us what you are after and we will look for it.</p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={reset} className="inline-flex min-h-12 items-center border-2 border-deep bg-deep px-6 font-display text-[10.5px] tracking-[0.12em] text-paper transition hover:bg-paper hover:text-deep">Reset filters</button>
                  <Button href={business.whatsapp} external variant="secondary" tone="light">Request a car</Button>
                </div>
              </div>
            )}
            <p className="mt-8 text-[13px]">Listings shown are for reference. Availability and prices can change, so please confirm with us.</p>
          </div>
        </div>
      </div>

      {drawer && (
        <div className="fade-in fixed inset-0 z-50 flex items-end bg-deep/80 lg:hidden" onClick={() => setDrawer(false)} role="dialog" aria-modal="true" aria-label="Filters">
          <div onClick={(e) => e.stopPropagation()} className="sheet-up flex max-h-[88svh] w-full flex-col border-t-4 border-azure bg-paper text-deep">
            <div className="flex items-center justify-between border-b-2 border-mist px-6 py-4">
              <p className="font-display text-[11px] tracking-[0.15em]">Filters</p>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-11 w-11 place-items-center"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 py-6"><FilterPanel f={f} set={set} reset={reset} /></div>
            <div className="border-t-2 border-mist p-4"><button type="button" onClick={() => setDrawer(false)} className="min-h-12 w-full bg-deep font-display text-[10.5px] tracking-[0.12em] text-paper">Show {list.length} {list.length === 1 ? "car" : "cars"}</button></div>
          </div>
        </div>
      )}
      {open && <Detail car={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
