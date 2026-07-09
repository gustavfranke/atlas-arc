import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const fallbackTestimonials = [
  {
    quote: "Simon and I look back to a long collaboration, across our joined time at Rhino Africa and as a freelancer at Yoco. Simon was an integral part of our content strategy, in production as well as direction. Yoco's unique merchant centric photography is Simon's doing, portraying our customers' success as part of our companies purpose. His undefeated access to every human makes them look as good as it makes them look natural and authentic.",
    author: "Robin W. Wolters",
    company: "Chief Growth Officer, We Are Move",
  },
  {
    quote: "I use Gustav as my go-to videographer and photographer. His work is of an extremely high quality and he is a pleasure to work with. On a recent shoot for Relais & Chateaux, he went out of his way to meet very quick deadlines on my behalf.",
    author: "Mitch Terry",
    company: "Co-Founder, Torch Consult",
  },
  {
    quote: "Simon has been instrumental in establishing the visual identity of the Flux brand, and is well versed in storytelling via media for luxury travel brands.",
    author: "Stuart Lewis",
    company: "Founder and CEO, Flux Full Circle",
  },
];

const CARD_WIDTH = 420;
const CARD_GAP = 24;
const STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED = 0.4; // px per frame

export default function TestimonialsSection() {
  const { data: dbTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => base44.entities.Testimonial.list("order", 10),
    initialData: [],
  });

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;
  // Triple the list for seamless infinite loop
  const items = [...testimonials, ...testimonials, ...testimonials];

  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const totalWidth = testimonials.length * STEP;

  useEffect(() => {
    // Start at the second copy so we can loop both ways
    offsetRef.current = totalWidth;
    setOffset(totalWidth);
  }, [totalWidth]);

  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current) {
        offsetRef.current += AUTO_SPEED;
        if (offsetRef.current >= totalWidth * 2) {
          offsetRef.current -= totalWidth;
        }
        setOffset(offsetRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  const slide = (dir) => {
    pausedRef.current = true;
    setIsSliding(true);
    offsetRef.current += dir * STEP;
    // Keep within the middle copy range
    if (offsetRef.current >= totalWidth * 2) offsetRef.current -= totalWidth;
    if (offsetRef.current < totalWidth) offsetRef.current += totalWidth;
    setOffset(offsetRef.current);
    // Remove transition after animation completes, then resume auto-scroll
    setTimeout(() => { setIsSliding(false); }, 550);
    setTimeout(() => { pausedRef.current = false; }, 2000);
  };

  return (
    <section className="bg-[#0d0c0a] py-24 md:py-40 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6 text-center"
      >
        Testimonials
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl md:text-4xl font-light text-[#f5f0e8] tracking-tight text-center px-6"
      >
        The Results Speak Louder Than Any Pitch
      </motion.h2>

      {/* Carousel */}
      <div className="mt-16 md:mt-24 max-w-6xl mx-auto px-6 relative">
        {/* Left Arrow */}
        <button
          onClick={() => slide(-1)}
          className="absolute left-6 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#2a2520] bg-[#0a0a0a]/80 text-[#a09888] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: `${CARD_GAP}px`,
              transform: `translateX(-${offset}px)`,
              willChange: "transform",
              transition: isSliding ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          >
            {items.map((t, i) => (
              <div
                key={i}
                style={{ minWidth: `${CARD_WIDTH}px` }}
                className="bg-[#111009] border border-[#1a1816] p-8 flex flex-col"
              >
                <Quote className="w-5 h-5 text-[#c9a96e]/30 mb-6 flex-shrink-0" />
                <p className="text-[#d4ccc0] font-light leading-relaxed text-sm md:text-base flex-1 italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-[#1a1816]">
                  <p className="text-[#a09888] text-xs uppercase tracking-[0.15em]">{t.author}</p>
                  {t.company && (
                    <p className="text-[#6b6156] text-xs uppercase tracking-[0.15em] mt-1">{t.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => slide(1)}
          className="absolute right-6 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#2a2520] bg-[#0a0a0a]/80 text-[#a09888] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-6 w-24 bg-gradient-to-r from-[#0d0c0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-6 w-24 bg-gradient-to-l from-[#0d0c0a] to-transparent" />
      </div>
    </section>
  );
}