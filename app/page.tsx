import SiteShell from "@/components/SiteShell";
import HeroSection from "@/components/HeroSection";
import StatsBand from "@/components/StatsBand";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhySection from "@/components/WhySection";
import CollectionPreview from "@/components/CollectionPreview";
import QuoteSection from "@/components/QuoteSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

// Flat colour rhythm: hero (paper -> photo) · stats (mist) · about (deep) · services (paper) · process (deep)
// · why (mist) · collection (paper) · quote (deep) · contact (mist) · footer (deep)
export default function Home() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <StatsBand />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WhySection />
        <CollectionPreview />
        <QuoteSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </SiteShell>
  );
}
