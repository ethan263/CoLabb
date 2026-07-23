"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register the plugin for smooth section transitions
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Services",
      href: "#colabbs",
      bgColor: "#71D19E",
      textColor: "#0D0D0D",
    },
    {
      label: "Expertise",
      href: "#about",
      bgColor: "#7B5EE0",
      textColor: "#FFFFFF",
    },
    {
      label: "Contact",
      href: "#contact",
      bgColor: "#701B5B",
      textColor: "#FFFFFF",
    },
  ];

  // GSAP Smooth Scroll Transition Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 80 }, // offsetY accounts for the sticky navbar height
      ease: "power4.inOut",
    });
  };

  return (
    // Removed border-b and border-colab-dark/15
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 bg-colab-bg/90 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-colab-dark font-sans">
        
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display font-extrabold text-2xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer"
        >
          CO LAB
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ backgroundColor: link.bgColor, color: link.textColor }}
              className="px-5 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/27815119602" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-mono tracking-wider font-semibold uppercase px-4 py-2 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="hidden sm:inline">WHATSAPP</span>
            <span className="sm:hidden">WA</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 border border-colab-dark/30 rounded-full gap-[5px] focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            <span
              className={`w-4 h-[2px] bg-colab-dark transition-all duration-300 origin-center ${
                mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[2px] bg-colab-dark transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4 h-[2px] bg-colab-dark transition-all duration-300 origin-center ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        // Removed border-b here as well
        <div className="md:hidden absolute top-full left-0 w-full bg-colab-bg/95 backdrop-blur-2xl p-6 flex flex-col gap-3 shadow-2xl transition-all">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ backgroundColor: link.bgColor, color: link.textColor }}
              className="w-full text-center py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}