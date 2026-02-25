import React from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";

const fallbackTestimonials = [
  {
    quote: "Atlas & Arc didn't just shoot content. They captured the entire soul of our lodge. Our bookings increased immediately after launch.",
    author: "Lodge Owner, Western Cape",
  },
  {
    quote: "The best creative team we've worked with. Everything felt effortless, professional, and the final output was world class.",
    author: "Retreat Founder",
  },
  {
    quote: "We finally have visuals that match the premium experience we offer. Worth every cent.",
    author: "Hotel Marketing Director",
  },
];

export default function TestimonialsSection() {
  const { data: dbTestimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => base44.entities.Testimonial.list("order", 10),
    initialData: [],
  });

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <section className="bg-[#0d0c0a] py-24 md:py-40">
      <div className="max-w-5xl mx-auto px-6">
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
          className="text-3xl md:text-4xl font-light text-[#f5f0e8] tracking-tight text-center"
        >
          The Results Speak Louder Than Any Pitch
        </motion.h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1816]">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#0d0c0a] p-8 md:p-10 flex flex-col"
            >
              <Quote className="w-5 h-5 text-[#c9a96e]/30 mb-6" />
              <p className="text-[#d4ccc0] font-light leading-relaxed text-sm md:text-base flex-1 italic">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-6 border-t border-[#1a1816]">
                <p className="text-[#a09888] text-xs uppercase tracking-[0.15em]">— {t.author}</p>
                {t.company && (
                  <p className="text-[#6b6156] text-xs uppercase tracking-[0.15em] mt-1">{t.company}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}