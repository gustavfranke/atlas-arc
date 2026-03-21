import React from "react";
import Navbar from "@/components/site/Navbar";
import HeroSection from "@/components/site/HeroSection";
import TrustBar from "@/components/site/TrustBar";
import AboutSection from "@/components/site/AboutSection";
import ServicesSection from "@/components/site/ServicesSection";
import WhyUsSection from "@/components/site/WhyUsSection";
import FeaturedCampaign from "@/components/site/FeaturedCampaign";
import PortfolioSection from "@/components/site/PortfolioSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import CTABanner from "@/components/site/CTABanner";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <TestimonialsSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <FeaturedCampaign />
      <PortfolioSection />
      <CTABanner />
      <ContactSection />
      <Footer />
    </div>
  );
}