import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PortfolioModal({ project, onClose }) {
  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-[#111] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#6b6156] hover:text-[#f5f0e8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image */}
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.25em] mb-3">{project.category}</p>
          <h2 className="text-2xl md:text-3xl text-[#f5f0e8] font-light tracking-tight">{project.title}</h2>
          <p className="mt-2 text-[#6b6156] text-sm font-light">{project.location}</p>

          <p className="mt-8 text-[#a09888] font-light leading-relaxed">{project.description}</p>

          {/* Deliverables */}
          {project.deliverables?.length > 0 && (
            <div className="mt-10">
              <p className="text-[#8a7e72] uppercase tracking-[0.2em] text-xs mb-4">Deliverables</p>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((d, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs text-[#c9a96e] border border-[#2a2520] font-light"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.media_urls?.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-2">
              {project.media_urls.map((url, i) => (
                <img key={i} src={url} alt="" className="w-full aspect-square object-cover" />
              ))}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={scrollToContact}
            className="mt-10 w-full py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500"
          >
            Work With Us
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}