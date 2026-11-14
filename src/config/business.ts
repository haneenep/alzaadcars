// Single source of truth for Al Zaad Cars business details.
// Update values here only; components import from this file.
export type BusinessConfig = {
  readonly name: string;
  readonly locationLabel: string;
  readonly description: string;
  readonly phone: { readonly display: string; readonly href: string };
  readonly email: string;
  readonly whatsapp: string;
  readonly instagram: string;
  readonly facebook: string;
  readonly googleMaps: string;
  readonly legal: { readonly privacy: string; readonly terms: string };
};

export const business: BusinessConfig = {
  name: "Al Zaad Cars",
  locationLabel: "Ajman, United Arab Emirates",
  description:
    "Al Zaad Cars — Your trusted destination for quality used vehicles. Buy, Sell and Trade with confidence in Ajman, UAE.",
  phone: { display: "+971 50 792 4012", href: "tel:+971507924012" },
  email: "alafdhalgroupuae@gmail.com",
  whatsapp: "https://wa.me/971507924012",
  instagram: "https://www.instagram.com/alzaadcars.ae?obrf=MTB2cHlxYXd1czhxaw==",
  facebook: "https://www.facebook.com/share/19id28i2YX/",
  googleMaps: "https://maps.app.goo.gl/UCCkHAHCBX9JuDrG9",
  // No legal pages exist yet; "#" keeps the links inert until real URLs are supplied.
  legal: { privacy: "#", terms: "#" },
};

export const mailtoHref = `mailto:${business.email}`;
