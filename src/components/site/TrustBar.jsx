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
          className="text-[#6b6156] uppercase tracking-[0.3em] text-xs font-light"
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
          {["The Residence", "Willow & Sage", "Summit Lodge", "Olea Retreat", "Nomad House"].map((brand, i) => (
            <div key={i} className="text-[#3a3530] text-sm md:text-base uppercase tracking-[0.25em] font-light">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}