import React from "react";
import { motion } from "framer-motion";

export default function TrustBar() {
  return (
    <section id="trust" className="bg-[#0a0a0a] py-16 md:py-24 border-t border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
        >
          Trusted By
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight"
        >
          Boutique hotels, lodges, retreats,
          <br />
          <span className="italic text-[#c9a96e]">and premium lifestyle brands worldwide.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-12 md:gap-16"
        >
          {[
            { name: "Relais & Châteaux", url: "https://www.relaischateaux.com" },
            { name: "Simbavati Lodge Collection", url: "https://www.simbavati.com" },
            { name: "One & Only", url: "https://www.oneandonlyresorts.com" },
            { name: "La Residence", url: "https://www.theroyalportfolio.com/la-residence/" },
            { name: "Wilderness Safaris", url: "https://www.wildernesssafaris.com" },
            { name: "RhinoAfrica", url: "https://www.rhinoafrica.com" },
            { name: "Triumph Travel", url: "https://www.triumphtravel.co.za" },
            { name: "Canopy Hilton Seychelles", url: "https://www.hilton.com/en/hotels/sezmapy-canopy-seychelles-resort/" },
          ].map((brand, i) => (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a09888] text-sm md:text-base uppercase tracking-[0.25em] font-light hover:text-[#c9a96e] transition-colors duration-300"
            >
              {brand.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}