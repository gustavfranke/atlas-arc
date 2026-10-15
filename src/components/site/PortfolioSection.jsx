import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

const films = [
  {
    id: "silvan",
    title: "Silvan",
    location: "Sabi Sands, Kruger Park",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/091d3a3d8_womanelephantsdeck.jpg",
    embed: "https://galleries.vidflow.co/videos/voex2tx8",
  },
  {
    id: "chicari",
    title: "Chicari",
    location: "Gorongosa, Mozambique",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/07b062576_DJI_20250925140028_0325_D.jpg",
    embed: "https://galleries.vidflow.co/videos/2f042328",
  },
  {
    id: "simbavati",
    title: "Simbavati Hero Film",
    location: "Lodge Group",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/d405d0e5d_SimbavatiHeroFilmCover.png",
    embed: "https://www.youtube.com/embed/XL7jw3gx2rw?autoplay=1&rel=0",
  },
  {
    id: "la-residence",
    title: "La Residence",
    location: "Franschhoek, South Africa",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/7bee51f98_LaResidenceCover.png",
    embed: "https://galleries.vidflow.co/videos/48407f01",
  },
  {
    id: "vea",
    title: "VEA Legacy Aviation",
    location: "Cape Town, South Africa",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/62fc05e18_Screenshot2026-10-15at154656.png",
    embed: "https://galleries.vidflow.co/videos/mr6zvxax",
  },
  {
    id: "elgin",
    title: "Elgin River Lodge",
    location: "Elgin Valley, South Africa",
    still: "https://media.base44.com/images/public/6a0ca2931598507c35cbc6c6/f44ec6d1f_ElginRiverLodge.jpg",
    embed: "https://galleries.vidflow.co/videos/wi3xo6x0",
  },
];

function FilmModal({ film, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95" />
      <button
        onClick={onClose}
        aria-label="Close film"
        className="absolute top-5 right-5 z-20 p-2 text-[#a09888] hover:text-[#f5f0e8] transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="relative z-10 w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={film.embed}
            title={film.title}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-5">
          <h3 className="text-[#f5f0e8] text-xl font-light">{film.title}</h3>
          <p className="text-[#8a7e72] text-sm font-light mt-1">{film.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilm, setActiveFilm] = useState(null);

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
          Selected Work
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

        {/* Film Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {films.map((film, i) => (
            <motion.button
              key={film.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setActiveFilm(film)}
              className="group cursor-pointer relative overflow-hidden aspect-[16/10] text-left"
              aria-label={`Play ${film.title}`}
            >
              <img
                src={film.still}
                alt={film.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-14 h-14 rounded-full border border-[#f5f0e8]/70 flex items-center justify-center">
                  <Play className="w-5 h-5 text-[#f5f0e8] ml-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-[#f5f0e8] text-lg font-light">{film.title}</h3>
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.2em] mt-1">{film.location}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeFilm && <FilmModal film={activeFilm} onClose={() => setActiveFilm(null)} />}
      </AnimatePresence>
    </section>
  );
}
