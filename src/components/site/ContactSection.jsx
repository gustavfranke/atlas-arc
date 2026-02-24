import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Send, Mail, Instagram, CheckCircle } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "", brand_name: "", email: "", phone: "", location: "",
    service_needed: "", shoot_date: "", budget_range: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ContactSubmission.create(form);
    setSending(false);
    setSent(true);
  };

  const inputClass = "w-full bg-transparent border-b border-[#2a2520] text-[#f5f0e8] py-3 px-0 font-light text-sm placeholder:text-[#4a4038] focus:outline-none focus:border-[#c9a96e] transition-colors duration-300";
  const selectClass = "w-full bg-[#0a0a0a] border-b border-[#2a2520] text-[#f5f0e8] py-3 px-0 font-light text-sm focus:outline-none focus:border-[#c9a96e] transition-colors duration-300 appearance-none cursor-pointer";

  if (sent) {
    return (
      <section id="contact" className="bg-[#0a0a0a] py-24 md:py-40">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-12 h-12 text-[#c9a96e] mx-auto mb-6" />
            <h2 className="text-3xl font-light text-[#f5f0e8] tracking-tight">Thank You</h2>
            <p className="mt-4 text-[#a09888] font-light">
              We've received your enquiry and will be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <motion.p
              {...fadeUp}
              className="text-[#c9a96e] uppercase tracking-[0.35em] text-xs font-light mb-6"
            >
              Contact
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light text-[#f5f0e8] tracking-tight leading-tight"
            >
              Let's Create Something
              <span className="italic text-[#c9a96e]"> Cinematic</span>
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="mt-6 text-[#7a7068] text-sm font-light leading-relaxed"
            >
              Tell us what you're building and we'll come back with ideas, availability, and the best approach for your shoot.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="mt-12 space-y-4"
            >
              <a href="mailto:hello@arc.com" className="flex items-center gap-3 text-[#a09888] hover:text-[#c9a96e] transition-colors duration-300 text-sm font-light">
                <Mail className="w-4 h-4" />
                hello@arc.com
              </a>
              <a href="https://instagram.com/arc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#a09888] hover:text-[#c9a96e] transition-colors duration-300 text-sm font-light">
                <Instagram className="w-4 h-4" />
                @arc
              </a>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.form
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" required className={inputClass} />
              <input name="brand_name" value={form.brand_name} onChange={handleChange} placeholder="Business / Brand Name" className={inputClass} />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inputClass} />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className={inputClass} />
              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className={inputClass} />
              <select name="service_needed" value={form.service_needed} onChange={handleChange} className={selectClass}>
                <option value="">What do you need?</option>
                <option value="Brand Film">Brand Film</option>
                <option value="Photography">Photography</option>
                <option value="Social Content Package">Social Content Package</option>
                <option value="Full Campaign">Full Campaign</option>
              </select>
              <input name="shoot_date" type="date" value={form.shoot_date} onChange={handleChange} className={`${inputClass} ${!form.shoot_date ? 'text-[#4a4038]' : ''}`} placeholder="Shoot Date (optional)" />
              <select name="budget_range" value={form.budget_range} onChange={handleChange} className={selectClass}>
                <option value="">Budget Range (optional)</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $10,000">$5,000 – $10,000</option>
                <option value="$10,000 - $25,000">$10,000 – $25,000</option>
                <option value="$25,000 - $50,000">$25,000 – $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-10 py-4 bg-[#c9a96e] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#d4b87d] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Enquiry"}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}