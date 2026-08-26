import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const DEFAULT_CATEGORIES = ["Hotels & Lodges", "Retreats & Wellness", "Lifestyle Brands", "Short Form Reels", "Photography"];

const fallbackProjects = [
  {
    id: "1", title: "Gorongosa Safari Experience", category: "Hotels & Lodges", location: "Gorongosa National Park, Mozambique",
    description: "A cinematic campaign capturing the raw beauty of safari life, golden hour game drives, and intimate guest experiences at luxury tented camps.",
    deliverables: ["Brand Film (90 sec)", "8 Social Reels", "60 Edited Photos", "Aerial Footage"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/98cda59d7_GorongosaNationalPark037.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/79b1104d0_Chicari_038.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/71f23fc2d_GorongosaNationalPark001.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/c5211f542_GorongosaNationalPark025.jpg",
    ]
  },
  {
    id: "2", title: "Wilderness Treehouse Campaign", category: "Hotels & Lodges", location: "South Africa",
    description: "An epic night sky campaign featuring a unique treehouse lodge under the Milky Way. Focus on adventure, stargazing, and wild luxury.",
    deliverables: ["Brand Film (2 min)", "10 Social Reels", "50 Astrophotography Shots"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/f299de815__L1B1383-1.jpg",
  },
  {
    id: "3", title: "Coastal Retreat Architecture", category: "Hotels & Lodges", location: "Seychelles & Greece",
    description: "A premium visual campaign for a top tier luxury safari lodge in the Sabi Sand. Incidental moments framed by the beauty of the setting.",
    deliverables: ["Brand Film (60 sec)", "12 Social Reels", "350 Edited Photos", "Drone Footage"],
    cover_image: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/3c97aaf9a_Muzimo_331.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/1N8A6357.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/e6fecf3ec_Still2026-08-26094637_111.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/9bcd3ce0e_Still2026-02-13131247_221.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/6c93b607f_Still2026-05-22172531_1311.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/1a00d5471_Still2026-08-26094637_191.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/921d1a8f2_Still2025-10-08103221_12662.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/e932b00c6_Still2026-08-26094637_1111.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/d4a03e52d_Still2026-05-22172539_1301.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/50a673db7_Still2026-05-22172644_11101.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/e6fecf3ec_Still2026-08-26094637_111.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/9bcd3ce0e_Still2026-02-13131247_221.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/6c93b607f_Still2026-05-22172531_1311.jpg",
    ]
  },
  {
    id: "4", title: "Adventure Lifestyle Series", category: "Lifestyle Brands", location: "Coastal Locations",
    description: "Dynamic lifestyle content featuring surfing, water sports, and beach culture. Authentic, energetic, and cinematic.",
    deliverables: ["20 Lifestyle Reels", "60 Editorial Photos", "Social Content Package"],
    cover_image: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/1a00d5471_Still2026-08-26094637_191.jpg",
    media_urls: [
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/d4a03e52d_Still2026-05-22172539_1301.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/e6fecf3ec_Still2026-08-26094637_111.jpg",
    ]
  },
  {
    id: "5", title: "Wildlife Portrait Series", category: "Photography", location: "Africa",
    description: "Intimate wildlife portraits capturing leopards, elephants, lions, and gorillas in their natural habitat. Golden hour magic.",
    deliverables: ["100 Edited Wildlife Photos", "Print Gallery", "Conservation Story Film"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/cebfb04b7__L1B4364.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/4cfaa7e09__ONG1522.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/50a673db7_Still2026-05-22172644_11101.jpg",
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/9bcd3ce0e_Still2026-02-13131247_221.jpg",
    ]
  },
  {
    id: "6", title: "Family & Adventure Retreats", category: "Retreats & Wellness", location: "South Africa & Mozambique",
    description: "Heartfelt storytelling of family travel experiences, nature immersion, and the joy of discovery in premium retreat settings.",
    deliverables: ["Brand Film (3 min)", "15 Social Reels", "70 Photos"],
    cover_image: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/e932b00c6_Still2026-08-26094637_1111.jpg",
    media_urls: [
      "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/3c97aaf9a_Muzimo_331.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/12a69c392_1N8A6357.jpg",
    ]
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const { data: dbProjects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => base44.entities.PortfolioProject.list("order", 50),
    initialData: [],
  });

  const { data: catRecord } = useQuery({
    queryKey: ["portfolio-categories"],
    queryFn: async () => {
      const records = await base44.entities.SiteContent.filter({ section_key: "portfolio_categories" });
      return records.length > 0 ? records[0] : null;
    },
  });
  const categories = ["All", ...(catRecord?.content?.categories ?? DEFAULT_CATEGORIES)];

  const projects = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
        >
          Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight"
        >
          Our Work Speaks Before We Do.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-[#7a7068] text-base md:text-lg font-light"
        >
          Here's a selection of our latest work across travel, hospitality, lifestyle, and purpose-led brands.
        </motion.p>

        {/* Watch More Films Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <a
            href="https://gallery.gustavfranke.com/atlasandarc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500"
          >
            Watch More Films
          </a>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-light transition-all duration-300 ${
                activeCategory === cat
                  ? "text-[#0a0a0a] bg-[#c9a96e]"
                  : "text-[#6b6156] border border-[#2a2520] hover:border-[#c9a96e] hover:text-[#c9a96e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id || i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group cursor-pointer relative overflow-hidden aspect-[4/5]"
                onClick={() => navigate(createPageUrl("ProjectDetail") + `?id=${project.id}`)}
              >
                <img
                  src={project.cover_image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[#c9a96e] text-xs uppercase tracking-[0.2em] mb-1">{project.category}</p>
                  <h3 className="text-[#f5f0e8] text-lg font-light">{project.title}</h3>
                  <p className="text-[#8a7e72] text-sm font-light mt-1">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}