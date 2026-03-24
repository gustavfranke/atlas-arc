import React from "react";
import { motion } from "framer-motion";
import { Film, Camera, Layers, Compass, Play, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const services = [
{
  icon: Film,
  title: "Cinematic Brand Films",
  desc: "Short and long-form films designed to communicate the essence of your brand. Not ads. Not fluff. Real cinematic storytelling.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/a8cf00ca4_1.jpg"
},
{
  icon: Camera,
  title: "Photography & Editorial Shoots",
  desc: "Premium photography that elevates your brand into luxury territory. Perfect for websites, booking platforms, social media, and print.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/8a5f85ddb_2.jpg"
},
{
  icon: Layers,
  title: "Social Media Content Packages & Management",
  desc: "High-volume, high-quality content paired with hands-on management — giving your brand a consistent, elevated presence without sacrificing aesthetic.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/4bd624351_3.jpg"
},
{
  icon: Compass,
  title: "Creative Direction & Story Development",
  desc: "We help plan your shoot, script your narrative, build your shot list, and craft your brand story before we ever touch a camera.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/ccc20e2b0_4.JPG"
},
{
  icon: Play,
  title: "Reels & Short-Form Video",
  desc: "Cinematic vertical content for Instagram, TikTok, YouTube Shorts, and paid ads.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/f3413a5e2_5.jpg"
},
{
  icon: Zap,
  title: "Launch-Ready Ad Creatives",
  desc: "We design high-performing ad creatives you can plug directly into your campaigns—no extra setup, no guesswork.",
  image: "https://media.base44.com/images/public/698dc9d481b400b640a22adf/49d13cd29_6.JPG"
}];


export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0d0c0a] py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          {...fadeUp}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6">
          
          Services
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight">
          
          What We Create
        </motion.h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1816]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden p-8 md:p-10 group">
                
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0a0a0a]/75 group-hover:bg-[#0a0a0a]/65 transition-colors duration-700" />

                {/* Content */}
                <div className="relative z-10">
                  <Icon className="w-6 h-6 text-[#c9a96e] mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                  <h3 className="text-[#f5f0e8] text-lg font-light mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-[#b0a898] text-sm font-light leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>);

          })}
          
        </div>
      </div>
    </section>);

}