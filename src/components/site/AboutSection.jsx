import React from "react";
import { motion } from "framer-motion";

const founder = {
  name: "Gustav Franke",
  image: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/5445378e5_gustav-portrait.jpg",
  bio: "Gustav Franke is a filmmaker whose cinematic vision has shaped the visual identity of some of Africa's most exceptional destinations. With a portfolio spanning Botswana, Namibia, Mozambique, the Seychelles, and South Africa, he founded Arc to bring quiet, considered storytelling to a hospitality industry too often filled with sameness.",
  closing: "Arc works with a hand-picked network of specialist photographers, editors, and producers, matched to each project."
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function AboutSection() {
  const beliefs = [
  "Cinematic storytelling",
  "Real environments",
  "Authentic human moments",
  "Premium detail and composition",
  "A strong editorial look that feels timeless"];

  return (
    <section id="about" className="bg-[#0a0a0a] pb-24 md:pb-40">

      {/* Hero-style intro block with background image */}
      <div className="relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/38c5b71a2_Still2026-05-22172539_1301.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/10 to-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-[#0a0a0a]/35" />
        {/* Blend fade from above */}
        <div className="absolute top-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
        {/* Blend fade into next image section */}
        <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-40 w-full">
          <motion.p
            {...fadeUp}
            className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6">
            About
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light text-[#f5f0e8] leading-[1.15] tracking-tight">
            We're Not Here to "Create Content."
            <br />
            <span className="italic text-[#c9a96e]">We're Here to Capture a Feeling.</span>
          </motion.h2>

          <div className="mt-16 space-y-6 text-[#FFFFFF] text-base md:text-lg font-light leading-relaxed">
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              Anyone can shoot a pretty video. Anyone can slap a preset on a photo.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
              But very few teams can capture the one thing that actually sells.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.275 }}>
              AI can now fake a lodge that doesn't exist. A review from someone who never visited. A 'cinematic' reel shot by no one.
              <br />
              We still show up. We still shoot it real.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="text-[#f5f0e8] text-xl md:text-2xl font-light italic">
              Emotion. Atmosphere. Story.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.35 }}>
              Arc exists for brands that want more than generic visuals. We work with travel brands and purpose-led businesses who understand that their brand is not a product.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }} className="text-[#f5f0e8] font-light">
              It is an experience.
            </motion.p>
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.45 }}>
              And your audience needs to feel it before they buy.
            </motion.p>
          </div>
        </div>
      </div>

      {/* What We Believe — with forest road background image */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/a061ff256_Still2026-05-22172531_1311.jpg')" }} />
        <div className="absolute inset-0 bg-[#0a0a0a]/45" />
        {/* Blend fade from first image section */}
        <div className="absolute top-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
        {/* Blend fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
          <motion.h3
            {...fadeUp}
            className="text-2xl md:text-3xl font-light text-[#f5f0e8] tracking-tight">
            What We Believe
          </motion.h3>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 text-[#a09888] text-base md:text-lg font-light leading-relaxed">
            A powerful brand isn't built on marketing tricks. It is built on moments people remember. That is why our work focuses on:
          </motion.p>

          <div className="mt-10 space-y-4">
            {beliefs.map((item, i) =>
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.05 }}
              className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] flex-shrink-0" />
              <span className="text-[#d4ccc0] font-light text-base md:text-lg">{item}</span>
            </motion.div>
            )}
          </div>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="mt-16 text-[#a09888] text-base md:text-lg font-light leading-relaxed">
            Whether you are a travel brand, a purpose-led business, or a premium service brand, we help you build visuals that make your audience stop scrolling and start imagining themselves inside your world.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.55 }}
            className="mt-12">
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#c9a96e] text-sm uppercase tracking-[0.2em] font-light border-b border-[#c9a96e]/30 pb-1 hover:border-[#c9a96e] transition-all duration-500">
              Explore Our Work
            </button>
          </motion.div>
        </div>
      </div>

      {/* Founder */}
      <div className="bg-[#0F0E0C]">
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          <motion.p
            {...fadeUp}
            className="text-[#C9A961] uppercase tracking-[0.35em] text-xs font-light mb-6">
            FOUNDER · LEAD CINEMATOGRAPHER
          </motion.p>
          <motion.h3
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-3xl md:text-5xl font-light text-[#F5F1EA] tracking-tight leading-[1.1] mb-16 md:mb-20">
            Meet the Founder
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="aspect-[4/5] bg-[#111] overflow-hidden">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="flex-1 pt-0 md:pt-4">
              <h4
                style={{ fontFamily: "Fraunces, serif" }}
                className="text-3xl md:text-4xl font-light text-[#F5F1EA] tracking-tight mb-8">
                {founder.name}
              </h4>
              <p className="text-[#D4CCC0] text-base md:text-lg font-light leading-relaxed">
                {founder.bio}
              </p>
              <p className="mt-8 text-[#A09888] text-sm md:text-base font-light leading-relaxed">
                {founder.closing}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}