import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function FeaturedCampaign() {
  const [playing, setPlaying] = React.useState(false);

  return (
    <section className="bg-[#0F0E0C] py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#C9A961] uppercase tracking-[0.35em] text-xs font-light mb-6 text-center"
        >
          Our Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: "Fraunces, serif" }}
          className="text-3xl md:text-5xl font-light text-[#F5F1EA] tracking-tight text-center mb-16"
        >
          Muzimo Lodge | Gorongosa, Mozambique.
        </motion.h2>

        {/* Video Embed Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-video bg-[#111] overflow-hidden group cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          {playing ? (
            <iframe
              src="https://galleries.vidflow.co/videos/kyfmyllm"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              frameBorder="0"
            />
          ) : (
            <>
              <img
                src="https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/bfeaeda83_Muzimo_331.jpg"
                alt="Muzimo Lodge, Gorongosa, Mozambique"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#C9A961]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 text-[#0F0E0C] ml-1" fill="currentColor" />
                </div>
              </div>
            </>
          )}
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