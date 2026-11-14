import { Mail, MapPin, Phone } from "lucide-react";
import { business, mailtoHref } from "@/src/config/business";
import { WhatsAppIcon } from "./SocialLinks";

const row =
  "group flex min-h-11 items-center gap-3 py-1.5 text-[14px] text-mist transition hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper";
const icon = "shrink-0 text-sky";

export default function ContactLinks() {
  return (
    <ul className="space-y-1">
      <li><a href={business.phone.href} className={row}><Phone size={16} strokeWidth={1.75} className={icon} />{business.phone.display}</a></li>
      <li><a href={mailtoHref} className={`${row} break-all`}><Mail size={16} strokeWidth={1.75} className={icon} />{business.email}</a></li>
      <li><a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className={row}><span className={icon}><WhatsAppIcon size={16} /></span>Chat on WhatsApp</a></li>
      <li>
        <a href={business.googleMaps} target="_blank" rel="noopener noreferrer" className={row}>
          <MapPin size={16} strokeWidth={1.75} className={icon} />
          <span>View on Google Maps<span className="block text-[12px] text-mist">{business.locationLabel}</span></span>
        </a>
      </li>
    </ul>
  );
}
