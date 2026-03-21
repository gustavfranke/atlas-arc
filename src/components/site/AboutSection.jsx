import React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

const team = [
  {
    name: "Gustav Franke",
    role: "Lead Cinematographer",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/845bf4100_Gustav.png",
    paragraphs: [
      "Gustav is a seasoned filmmaker whose cinematic vision has brought to life the stories of some of Africa's most exclusive destinations.",
      "With a portfolio spanning the Kruger, Seychelles, Botswana, and Namibia, he crafts immersive films that evoke emotion and inspire travel. His technical precision and narrative instinct make him an ideal creative for brands looking to showcase not just place — but feeling, depth, and identity.",
    ],
    socials: [
      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gustavfrankecinematography" },
    ],
  },
  {
    name: "Simon Watson",
    role: "Lead Photographer & Director",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/beba5e974_Simon.png",
    paragraphs: [
      "At the core of Simon's work is a deep sensitivity to the people he photographs. He focuses on building a comfortable environment where subjects feel at ease — because it's in those unguarded moments that something genuine and emotionally resonant can emerge.",
      "As trust builds, so does creative momentum, allowing Simon to capture honest, human imagery that connects far beyond the frame.",
    ],
    socials: [
      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/simon_watson_photo" },
    ],
  },
  {
    name: "Cameron Shefer-Boswell",
    role: "Social Media Manager",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/61eb6cd80_Cameron.png",
    paragraphs: [
      "Cameron maintains a balance of creativity and technical ability in everything he does. He is highly detail-oriented and holds his work to exceptionally high standards.",
      "Having amassed over 100K followers across his social media platforms he is uniquely qualified and experienced with social media marketing and its complexities.",
    ],
    socials: [
      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/cameronsheferboswell" },
      { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@MotionXP" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutSection() {
  const beliefs = [
    "Cinematic storytelling",
    "Real environments",
    "Authentic human moments",
    "Premium detail and composition",
    "A strong editorial look that feels timeless",
  ];

  return (
    <section id="about" className="bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Label */}
        <motion.p
          {...fadeUp}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
        >
          About
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] leading-[1.15] tracking-tight"
        >
          We're Not Here to "Create Content."
          <br />
          <span className="italic text-[#c9a96e]">We're Here to Capture a Feeling.</span>
        </motion.h2>

        {/* Body */}
        <div className="mt-16 space-y-6 text-[#a09888] text-base md:text-lg font-light leading-relaxed">
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            Anyone can shoot a pretty video. Anyone can slap a preset on a photo.
          </motion.p>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
            But very few teams can capture the one thing that actually sells.
          </motion.p>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="text-[#f5f0e8] text-xl md:text-2xl font-light italic">
            Emotion. Atmosphere. Story.
          </motion.p>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.35 }}>
            Arc exists for brands that want more than generic visuals. We work with hospitality, travel, and lifestyle companies who understand that their brand is not a product.
          </motion.p>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }} className="text-[#f5f0e8] font-light">
            It is an experience.
          </motion.p>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.45 }}>
            And your audience needs to feel it before they buy.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          {...fadeUp}
          className="mt-24 mb-24 h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent"
        />

        {/* What We Believe */}
        <motion.h3
          {...fadeUp}
          className="text-2xl md:text-3xl font-light text-[#f5f0e8] tracking-tight"
        >
          What We Believe
        </motion.h3>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-6 text-[#a09888] text-base md:text-lg font-light leading-relaxed"
        >
          A powerful brand isn't built on marketing tricks. It is built on moments people remember. That is why our work focuses on:
        </motion.p>

        <div className="mt-10 space-y-4">
          {beliefs.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.05 }}
              className="flex items-center gap-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] flex-shrink-0" />
              <span className="text-[#d4ccc0] font-light text-base md:text-lg">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.5 }}
          className="mt-16 text-[#a09888] text-base md:text-lg font-light leading-relaxed"
        >
          Whether you are launching a luxury lodge, a boutique hotel, a retreat, or a premium service brand — we help you build visuals that make your audience stop scrolling and start imagining themselves inside your world.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.55 }}
          className="mt-12"
        >
          <div className="flex flex-wrap gap-8 items-center">
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#c9a96e] text-sm uppercase tracking-[0.2em] font-light border-b border-[#c9a96e]/30 pb-1 hover:border-[#c9a96e] transition-all duration-500"
            >
              Explore Our Work
            </button>
            <Link
              to={createPageUrl("Team")}
              className="text-[#a09888] text-sm uppercase tracking-[0.2em] font-light border-b border-[#a09888]/30 pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all duration-500"
            >
              Meet the Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}