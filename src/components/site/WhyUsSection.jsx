import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const bullets = [
  { word: "Premium", rest: "without being staged" },
  { word: "Emotional", rest: "without being cheesy" },
  { word: "Cinematic", rest: "without being overproduced" },
  { word: "Luxury", rest: "without being pretentious" },
];

export default function WhyUsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.p
          {...fadeUp}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
        >
          Why Arc
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight"
        >
          Why Brands Choose Arc
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-10 text-[#a09888] text-base md:text-lg font-light"
        >
          Because you want content that feels:
        </motion.p>

        <div className="mt-10 space-y-6">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="flex items-baseline gap-4"
            >
              <span className="text-[#c9a96e] text-xl md:text-2xl font-light italic">{b.word}</span>
              <span className="text-[#6b6156] text-base md:text-lg font-light">{b.rest}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.6 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent"
        />

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.7 }}
          className="mt-16 text-[#a09888] text-base md:text-lg font-light leading-relaxed"
        >
          Our work sits in the space between documentary and cinema. We create visuals that feel like a film, but still feel real.
        </motion.p>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.75 }}
          className="mt-6 text-[#f5f0e8] text-lg md:text-xl font-light"
        >
          That is why our clients don't just get content. They get a brand identity upgrade.
        </motion.p>
      </div>
    </section>
  );
}