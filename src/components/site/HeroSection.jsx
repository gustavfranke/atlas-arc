import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      {/* Background Image / Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-[#0a0a0a] z-10" />
        <img
          src="https://media.base44.com/images/public/698dc9d481b400b640a22adf/0f49faf1f_IMG_31492.jpg"
          alt="Cinematic wildlife landscape"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Bottom fade blend */}
      <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-20" />

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 z-20 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs md:text-sm font-light mb-8">
            Arc, Creative Studio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-[#f5f0e8] leading-[1.1] tracking-tight"
        >
          Cinematic Visual Stories
          <br />
          <span className="italic font-extralight text-[#c9a96e]">That Make People Feel Something</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[#a09888] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          Arc is a boutique creative studio specializing in high-end photography, film, social media management, and branded storytelling for travel brands and purpose-led businesses.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 text-[#8a7e72] text-sm md:text-base font-light italic"
        >
          We don't just make content. We craft stories that build trust, emotion, and obsession.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("portfolio")}
            className="px-8 py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500"
          >
            View Portfolio
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-4 border border-[#f5f0e8]/20 text-[#f5f0e8] text-sm uppercase tracking-[0.2em] font-light hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500"
          >
            Book a Shoot
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={() => scrollTo("trust")}
        >
          <ChevronDown className="w-5 h-5 text-[#f5f0e8]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}