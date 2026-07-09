import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function FeaturedCampaign() {
  const [playing, setPlaying] = React.useState(false);

  return (
    <section className="bg-[#0d0c0a] py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6 text-center"
        >
          Our Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight text-center mb-16"
        >
          A Collection of Stories We've Told
        </motion.h2>

        {/* Video Embed Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-video bg-[#111] overflow-hidden"
        >
          <iframe
            src="https://www.youtube.com/embed/lJvdwTAyCr8?rel=0&modestbranding=1"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center text-[#a09888] text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          A cinematic glimpse into the kind of stories we tell (where light, landscape, and human connection become the narrative).
        </motion.p>
      </div>
    </section>
  );
}