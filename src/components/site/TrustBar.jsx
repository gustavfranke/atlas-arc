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
          className="text-3xl md:text-5xl font-light text-[#c9a96e] tracking-tight"
        >
          Trusted by boutique hotels, lodges, retreats, and premium lifestyle brands worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-12 md:gap-16"
        >
          {[
            { name: "Relais & Châteaux", url: "https://www.relaischateaux.com" },
            { name: "Simbavati Lodge Collection", url: "https://www.simbavati.com" },
            { name: "One & Only", url: "https://www.oneandonlyresorts.com" },
            { name: "Perivoli Lagoon House", url: "https://www.perivoli.com" },
            { name: "The Residence Collection", url: "https://www.cenizaro.com/theresidence" },
            { name: "Wilderness Safaris", url: "https://www.wildernesssafaris.com" },
            { name: "Explore Sideways", url: "https://www.exploresideways.com" },
            { name: "RhinoAfrica", url: "https://www.rhinoafrica.com" },
            { name: "Mastercard", url: "https://www.mastercard.com" },
            { name: "SA Harvest", url: "https://www.saharvest.org" },
            { name: "Star for Life", url: "https://www.starforlife.org" },
            { name: "Flux Full Circle", url: "https://www.fluxfullcircle.com" },
            { name: "Triumph Travel", url: "https://www.triumphtravel.co.za" },
            { name: "Canopy by Hilton", url: "https://www.hilton.com/en/canopy" },
            { name: "21 Nettleton Hotel", url: "https://www.21nettleton.com" },
            { name: "YOCO", url: "https://www.yoco.com" },
          ].map((brand, i) => (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3a3530] text-sm md:text-base uppercase tracking-[0.25em] font-light hover:text-[#c9a96e] transition-colors duration-300"
            >
              {brand.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}