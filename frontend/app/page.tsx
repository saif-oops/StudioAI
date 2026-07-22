import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsShowcase from "@/components/landing/StatsShowcase";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import CursorGlow from "@/components/landing/CursorGlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <StatsShowcase />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
