import React from "react";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070707] border-t border-[#141210] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <p className="text-[#f5f0e8] text-lg font-light tracking-tight">Arc</p>
            <p className="mt-3 text-[#5a5248] text-sm font-light leading-relaxed">
              A boutique creative studio crafting cinematic storytelling for travel, hospitality, and premium lifestyle brands worldwide.
            </p>
          </div>

          <div className="flex gap-8">
            {[
              { label: "About", id: "about" },
              { label: "Portfolio", id: "portfolio" },
              { label: "Contact", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[#5a5248] text-xs uppercase tracking-[0.2em] font-light hover:text-[#c9a96e] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#141210] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#3a3530] text-xs font-light">
            © {new Date().getFullYear()} Arc. All rights reserved.
          </p>
          <p className="text-[#3a3530] text-xs font-light">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}