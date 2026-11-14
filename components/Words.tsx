import type { ReactNode } from "react";
// Splits a sentence into word spans so GSAP can animate each word (class "w").
export default function Words({ text, className = "", wordClass = "" }: { text: string; className?: string; wordClass?: string }): ReactNode {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`w inline-block ${wordClass}`}>{w}&nbsp;</span>
      ))}
    </span>
  );
}
