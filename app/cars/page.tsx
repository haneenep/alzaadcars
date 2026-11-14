import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import SiteFooter from "@/components/SiteFooter";
import CarsHero from "@/components/CarsHero";
import CarsExplorer from "@/components/CarsExplorer";
import Button from "@/components/Button";
import { business } from "@/src/config/business";

export const metadata: Metadata = {
  title: "Car Collection | Al Zaad Cars, Ajman",
  description: "Browse the Al Zaad Cars collection of inspected pre-owned vehicles. Filter by make, body type, price, year and mileage.",
};

export default function CarsPage() {
  return (
    <SiteShell>
      <main>
        <CarsHero />
        <CarsExplorer />
        <section data-tone="light" className="s-mist">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center sm:px-10 sm:py-32">
            <h2 className="font-display text-[clamp(1.3rem,3vw,2.6rem)]">Cannot see <span className="text-azure">your car?</span></h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed">Tell us your budget, model and requirements. We will search for it and tell you what is coming into the showroom.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={business.whatsapp} external variant="primary">Chat on WhatsApp</Button>
              <Button href={business.phone.href} variant="secondary" tone="light">Call {business.phone.display}</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  );
}
