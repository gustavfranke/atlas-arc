import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import PortfolioModal from "./PortfolioModal";

const categories = ["All", "Hotels & Lodges", "Retreats & Wellness", "Lifestyle Brands", "Short Form Reels", "Photography"];

const fallbackProjects = [
  {
    id: "1", title: "Boutique Lodge Campaign", category: "Hotels & Lodges", location: "Western Cape, South Africa",
    description: "A cinematic campaign designed to highlight the lodge's experience, atmosphere, and luxury detail. The focus was on golden hour storytelling, guest immersion, and emotional pacing.",
    deliverables: ["Brand Film (90 sec)", "6 Social Reels", "40 Edited Photos", "Website Hero Video"],
    cover_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "2", title: "Retreat Brand Story", category: "Retreats & Wellness", location: "Bali, Indonesia",
    description: "An immersive visual narrative capturing the essence of a wellness retreat surrounded by rice fields and sacred rivers.",
    deliverables: ["Brand Film (2 min)", "12 Social Reels", "80 Edited Photos"],
    cover_image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
  },
  {
    id: "3", title: "Luxury Hotel Launch", category: "Hotels & Lodges", location: "Santorini, Greece",
    description: "A premium visual campaign for a newly launched boutique hotel overlooking the Aegean Sea.",
    deliverables: ["Brand Film (60 sec)", "8 Social Reels", "60 Edited Photos", "Drone Footage"],
    cover_image: "https://images.unsplash.com/photo-1602343168175-d6e3d tried?w=800&q=80",
  },
  {
    id: "4", title: "Lifestyle Brand Editorial", category: "Lifestyle Brands", location: "Cape Town, South Africa",
    description: "Editorial photography and short-form content for a premium lifestyle brand rooted in slow living.",
    deliverables: ["Editorial Shoot (50 Photos)", "4 Social Reels", "Look Book"],
    cover_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    id: "5", title: "Vertical Content Series", category: "Short Form Reels", location: "Various Locations",
    description: "A curated series of cinematic vertical reels for social media campaigns across multiple hospitality brands.",
    deliverables: ["15 Cinematic Reels", "Social Strategy Guide"],
    cover_image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  },
  {
    id: "6", title: "Wilderness Lodge Photography", category: "Photography", location: "Kruger, South Africa",
    description: "A golden-hour photography series capturing the wild beauty and intimate luxury of a safari lodge.",
    deliverables: ["100 Edited Photos", "Print-Ready Gallery", "Website Content"],
    cover_image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: dbProjects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => base44.entities.PortfolioProject.list("order", 50),
    initialData: [],
  });

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

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
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
                onClick={() => setSelectedProject(project)}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}