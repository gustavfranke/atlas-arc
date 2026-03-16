import React from "react";
import { motion } from "framer-motion";

export default function CTABanner() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/e6c38ca7d_simonwatsonimages-1457.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight leading-tight"
        >
          If Your Brand Is Premium,
          <br />
          <span className="italic text-[#c9a96e]">Your Content Should Be Too.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-[#8a7e72] text-base md:text-lg font-light"
        >
          Let's create visuals that make people stop, stare, and book.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/27728168004"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500"
          >
            WhatsApp
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-4 border border-[#f5f0e8]/20 text-[#f5f0e8] text-sm uppercase tracking-[0.2em] font-light hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500"
          >
            Send an Enquiry
          </button>
        </motion.div>
      </div>
    </section>
  );
}