import Image from "next/image";

// Official artwork. The SVG's visible mark sits ~2.25% right of its box centre
// (transparent padding is uneven), so it is nudged back to sit truly centred.
export default function Logo({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  return (
    <Image
      src="/al_zaad_cars_logo.svg"
      alt="Al Zaad Cars"
      width={1774}
      height={887}
      priority
      unoptimized
      className={`h-14 w-auto -translate-x-[2.25%] object-contain sm:h-[4.5rem] ${mono ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

// Scroll-responsive logo built from ONE official artwork file, used as two stationary clip layers
// that together reproduce the original exactly (the gap at ~58.4% of the height is transparent).
//  - emblem layer: the top part, never moves.
//  - name layer: a fixed clip window over the bottom part; the image inside slides up and fades,
//    so the name is pulled up behind the emblem area. No second logo, no cross-fade of the whole mark.
const SPLIT = 58.4; // % of artwork height where emblem ends and the name window begins
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function AdaptiveLogo({ compact, mono = false }: { compact: boolean; mono?: boolean }) {
  return (
    <span className="relative block h-14 w-28 -translate-x-[2.25%] sm:h-[4.5rem] sm:w-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/al_zaad_cars_logo.svg" alt="Al Zaad Cars" width={1774} height={887}
        className={`absolute inset-0 h-full w-full select-none ${mono ? "brightness-0 invert" : ""}`}
        style={{ clipPath: `inset(0 0 ${100 - SPLIT}% 0)` }} />
      <span aria-hidden="true" className="absolute inset-0" style={{ clipPath: `inset(${SPLIT}% 0 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/al_zaad_cars_logo.svg" alt="" width={1774} height={887}
          className={`h-full w-full select-none will-change-transform ${mono ? "brightness-0 invert" : ""}`}
          style={{
            transform: compact ? `translateY(-${100 - SPLIT}%)` : "translateY(0)",
            opacity: compact ? 0 : 1,
            transition: `transform 450ms ${EASE}, opacity 450ms ${EASE}`,
          }} />
      </span>
    </span>
  );
}
