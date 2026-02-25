import React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

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
      { icon: Instagram, label: "Instagram", href: "#" },
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
      { icon: Instagram, label: "Instagram", href: "#" },
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
      { icon: Instagram, label: "Instagram", href: "#" },
      { icon: Youtube, label: "YouTube", href: "#" },
    ],
  },
];

export default function Team() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            {...fadeUp}
            className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
          >
            The People Behind the Work
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-[#f5f0e8] tracking-tight leading-[1.1]"
          >
            Meet the Team
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-8 text-[#a09888] text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            Arc is built on the talent of individuals who bring obsessive craft, genuine curiosity, and creative integrity to every project.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent" />
      </div>

      {/* Team Members */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-32">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-16 items-start`}
            >
              {/* Image */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="aspect-[4/5] bg-[#111] overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 pt-0 md:pt-4">
                <p className="text-[#c9a96e] uppercase tracking-[0.3em] text-xs font-light mb-4">
                  {member.role}
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-[#f5f0e8] tracking-tight mb-8">
                  {member.name}
                </h2>
                <div className="space-y-5">
                  {member.paragraphs.map((p, j) => (
                    <p key={j} className="text-[#a09888] text-base md:text-lg font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Socials */}
                <div className="flex gap-5 mt-10">
                  {member.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#6b6156] hover:text-[#c9a96e] transition-colors duration-300 text-sm font-light uppercase tracking-[0.2em]"
                    >
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2a2520] to-transparent mb-16" />
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-3 text-[#c9a96e] text-sm uppercase tracking-[0.2em] font-light border-b border-[#c9a96e]/30 pb-1 hover:border-[#c9a96e] transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}