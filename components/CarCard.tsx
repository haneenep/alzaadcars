import Link from "next/link";
import { ArrowUpRight, Calendar, Gauge, Fuel, Settings2 } from "lucide-react";
import { aed, km, type Car } from "@/src/data/cars";

// Flat car card. The photo's lower edge is cut on the brand's slant. `onOpen` opens the detail view;
// without it the whole card links to the Collection page (home page preview).
export default function CarCard({ car, onOpen, className = "" }: { car: Car; onOpen?: (c: Car) => void; className?: string }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-deep [clip-path:polygon(0_0,100%_0,100%_90%,86%_100%,0_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={car.image} alt={`${car.make} ${car.model} ${car.year}`} loading="lazy" style={{ objectPosition: car.pos }}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
        <span className="absolute left-0 top-4 bg-deep px-3 py-2 font-display text-[9px] tracking-[0.15em] text-paper">{car.year}</span>
        {car.sample && <span className="absolute right-3 top-4 bg-paper px-2.5 py-1.5 font-display text-[8px] tracking-[0.15em] text-deep">Sample</span>}
      </div>
      <div className="flex flex-1 flex-col p-5 pt-4">
        <p className="text-[12px] font-semibold">{car.make}</p>
        <h3 className="mt-1 font-display text-[0.95rem] leading-[1.35]">{car.model}</h3>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[12.5px]">
          <li className="flex items-center gap-2"><Gauge size={15} strokeWidth={1.8} />{km(car.km)}</li>
          <li className="flex items-center gap-2"><Settings2 size={15} strokeWidth={1.8} />{car.gearbox}</li>
          <li className="flex items-center gap-2"><Fuel size={15} strokeWidth={1.8} />{car.fuel}</li>
          <li className="flex items-center gap-2"><Calendar size={15} strokeWidth={1.8} />{car.specs} specs</li>
        </ul>
        <div className="mt-auto flex items-end justify-between border-t-2 border-deep pt-4 mt-5">
          <p className="font-display text-[0.95rem]">{aed(car.price)}</p>
          <span className="grid h-10 w-10 place-items-center bg-deep text-paper transition duration-300 group-hover:bg-azure group-hover:rotate-45"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
        </div>
      </div>
    </>
  );
  const cls = `group flex flex-col overflow-hidden border-2 border-deep bg-paper text-left text-deep transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep ${className}`;
  return onOpen
    ? <button type="button" onClick={() => onOpen(car)} className={cls} aria-label={`${car.make} ${car.model} ${car.year}, ${aed(car.price)}. View details`}>{inner}</button>
    : <Link href="/cars" className={cls}>{inner}</Link>;
}
