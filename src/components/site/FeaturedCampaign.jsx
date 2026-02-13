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
          Featured Campaign
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight text-center mb-16"
        >
          Featured Campaign Film
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
          {!playing ? (
            <>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/7533955e7_simonwatsonimages-8960.jpg"
                alt="Featured campaign"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-[#f5f0e8]/30 flex items-center justify-center group-hover:border-[#c9a96e] group-hover:scale-110 transition-all duration-500">
                  <Play className="w-8 h-8 text-[#f5f0e8] ml-1" fill="currentColor" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#111] text-[#6b6156] text-sm font-light">
              <p>Video player — add your campaign film URL</p>
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center text-[#a09888] text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto italic"
        >
          A cinematic glimpse into the kind of stories we tell — where light, landscape, and human connection become the narrative.
        </motion.p>
      </div>
    </section>
  );
}