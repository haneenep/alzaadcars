import type { ReactNode } from "react";

// One button system. `variant` picks the look; `tone` says what surface it sits on.
type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "white";
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-12 items-center justify-center border-2 px-6 font-display text-[10.5px] tracking-[0.12em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-[11px]";

const styles = {
  primary: "border-deep bg-deep text-paper hover:bg-paper hover:text-deep focus-visible:outline-deep",
  white: "border-paper bg-paper text-deep hover:bg-deep hover:text-paper focus-visible:outline-paper",
  "secondary-light": "border-deep text-deep hover:bg-deep hover:text-paper focus-visible:outline-deep",
  "secondary-dark": "border-paper text-paper hover:bg-paper hover:text-deep focus-visible:outline-paper",
};

export default function Button({ href, children, variant = "primary", tone = "light", external, className = "" }: Props) {
  const look = variant === "primary" ? styles.primary : variant === "white" ? styles.white : styles[`secondary-${tone}`];
  return (
    <a href={href} className={`${base} ${look} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
