import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsShowcase from "@/components/StatsShowcase";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
      <CursorGlow />
      <Navbar />
      <Hero />
      <StatsShowcase />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  );
}