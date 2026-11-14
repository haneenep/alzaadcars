import { Instagram, Facebook } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/src/config/business";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 8.5c0 3.3 2.7 6 6 6l1.2-1.3-2-1-.9.7c-.9-.4-1.7-1.2-2.1-2.1l.7-.9-1-2L9 8.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

type Item = { label: string; href: string; icon: ReactNode };

const items: Item[] = [
  { label: "Instagram", href: business.instagram, icon: <Instagram size={18} strokeWidth={1.75} /> },
  { label: "Facebook", href: business.facebook, icon: <Facebook size={18} strokeWidth={1.75} /> },
  { label: "WhatsApp", href: business.whatsapp, icon: <WhatsAppIcon /> },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3.5 sm:gap-5 ${className}`}>
      {items.map(({ label, href, icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="block transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

export { WhatsAppIcon };
