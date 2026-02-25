import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";

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
    description: "A premium visual series showcasing stunning resort architecture, infinity pools, and luxury coastal living across multiple properties.",
    deliverables: ["Brand Film (60 sec)", "12 Social Reels", "80 Edited Photos", "Drone Footage"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/1ae031230_canopy-hilton-seychelles-simonwatsonimages-2435.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/1N8A6357.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/56c0e7778_Perivoli-flux-simonwatsonimages-3786.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/simonwatsonimages-2295.jpg",
    ]
  },
  {
    id: "4", title: "Adventure Lifestyle Series", category: "Lifestyle Brands", location: "Coastal Locations",
    description: "Dynamic lifestyle content featuring surfing, water sports, and beach culture. Authentic, energetic, and cinematic.",
    deliverables: ["20 Lifestyle Reels", "60 Editorial Photos", "Social Content Package"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/480d00ac8_DEMI-WAWA-simonwatsonimages-3667.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/65b598601_DEMI-WAWA-simonwatsonimages-3881.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/066c6be2e_onedigital-simonwatsonimages-copy.jpg",
    ]
  },
  {
    id: "5", title: "Wildlife Portrait Series", category: "Photography", location: "Africa",
    description: "Intimate wildlife portraits capturing leopards, elephants, lions, and gorillas in their natural habitat. Golden hour magic.",
    deliverables: ["100 Edited Wildlife Photos", "Print Gallery", "Conservation Story Film"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/cebfb04b7__L1B4364.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/4cfaa7e09__ONG1522.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/simonwatsonimages-1101.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/simonwatsonimages-8611.jpg",
    ]
  },
  {
    id: "6", title: "Family & Adventure Retreats", category: "Retreats & Wellness", location: "South Africa & Mozambique",
    description: "Heartfelt storytelling of family travel experiences, nature immersion, and the joy of discovery in premium retreat settings.",
    deliverables: ["Brand Film (3 min)", "15 Social Reels", "70 Photos"],
    cover_image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/simonwatsonimages-1457.jpg",
    media_urls: [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/Perivoli-flux-simonwatsonimages-8186.jpg",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698dc9d481b400b640a22adf/12a69c392_1N8A6357.jpg",
    ]
  },
];

export default function ProjectDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");
  const navigate = useNavigate();

  const { data: dbProjects } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => base44.entities.PortfolioProject.list("order", 50),
    initialData: [],
  });

  const projects = dbProjects.length > 0 ? dbProjects : fallbackProjects;
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const project = projects[currentIndex];

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // All images for this project (cover + gallery)
  const allImages = [
    ...(project ? [project.cover_image].filter(Boolean) : []),
    ...(project?.media_urls ?? []),
  ];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const lightboxPrev = () => setLightboxIndex((i) => (i > 0 ? i - 1 : allImages.length - 1));
  const lightboxNext = () => setLightboxIndex((i) => (i < allImages.length - 1 ? i + 1 : 0));

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  if (!project) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <p className="text-[#6b6156]">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />

      {/* Hero Image */}
      <div className="w-full aspect-video max-h-[70vh] overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
        <motion.img
          key={project.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to={createPageUrl("Home") + "#portfolio"}
            className="inline-flex items-center gap-2 text-[#6b6156] hover:text-[#c9a96e] text-xs uppercase tracking-[0.2em] font-light transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] font-light mb-3">{project.category}</p>
          <h1 className="text-3xl md:text-5xl font-light text-[#f5f0e8] tracking-tight leading-[1.1]">{project.title}</h1>
          {project.location && (
            <p className="mt-3 text-[#6b6156] text-sm font-light">{project.location}</p>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-[#a09888] font-light leading-relaxed text-base md:text-lg"
        >
          {project.description}
        </motion.p>

        {/* Deliverables */}
        {project.deliverables?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <p className="text-[#8a7e72] uppercase tracking-[0.25em] text-xs mb-5">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((d, i) => (
                <span key={i} className="px-3 py-1.5 text-xs text-[#c9a96e] border border-[#2a2520] font-light">
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Video */}
        {project.video_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 aspect-video w-full"
          >
            <iframe
              src={project.video_url}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </motion.div>
        )}

        {/* Gallery */}
        {project.media_urls?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {project.media_urls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full aspect-[4/3] object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                onClick={() => openLightbox(i + 1)}
              />
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <button
            onClick={() => {
              navigate(createPageUrl("Home"));
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 400);
            }}
            className="block w-full py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500 text-center"
          >
            Work With Us
          </button>
        </motion.div>

        {/* Prev / Next Navigation */}
        <div className="mt-20 pt-10 border-t border-[#1a1710] flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={createPageUrl("ProjectDetail") + `?id=${prevProject.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex items-center gap-3 text-left"
            >
              <ArrowLeft className="w-4 h-4 text-[#6b6156] group-hover:text-[#c9a96e] transition-colors duration-300 flex-shrink-0" />
              <div>
                <p className="text-[#6b6156] text-xs uppercase tracking-[0.2em] font-light mb-1">Previous</p>
                <p className="text-[#d4ccc0] text-sm font-light group-hover:text-[#c9a96e] transition-colors duration-300">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={createPageUrl("ProjectDetail") + `?id=${nextProject.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex items-center gap-3 text-right"
            >
              <div>
                <p className="text-[#6b6156] text-xs uppercase tracking-[0.2em] font-light mb-1">Next</p>
                <p className="text-[#d4ccc0] text-sm font-light group-hover:text-[#c9a96e] transition-colors duration-300">{nextProject.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6b6156] group-hover:text-[#c9a96e] transition-colors duration-300 flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-[#6b6156] hover:text-[#f5f0e8] transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                className="absolute left-4 md:left-8 text-[#6b6156] hover:text-[#c9a96e] transition-colors z-10 p-2"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={allImages[lightboxIndex]}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                className="absolute right-4 md:right-8 text-[#6b6156] hover:text-[#c9a96e] transition-colors z-10 p-2"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            )}

            {/* Counter */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#6b6156] text-xs uppercase tracking-[0.2em]">
              {lightboxIndex + 1} / {allImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}