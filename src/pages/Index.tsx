import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Reviews from "@/components/site/Reviews";
import Services from "@/components/site/Services";
import Gallery from "@/components/site/Gallery";
import About from "@/components/site/About";
import Booking from "@/components/site/Booking";
import CustomerTestimonials from "@/components/site/CustomerTestimonials";
import Footer from "@/components/site/Footer";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: "Fade & Co.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      address: { "@type": "PostalAddress", streetAddress: "218 Berry Street", addressLocality: "Brooklyn", addressRegion: "NY", postalCode: "11211" },
      telephone: "+1-718-555-1234",
      priceRange: "$$",
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Nav />
      <Hero />
      <Reviews />
      <Services />
      <Gallery />
      <About />
      <Booking />
      <CustomerTestimonials />
      <Footer />
    </main>
  );
};

export default Index;
