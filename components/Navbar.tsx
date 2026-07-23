"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav links mapped strictly to your custom hex colors
  const navLinks = [
    {
      label: "Services",
      href: "#colabbs",
      bgColor: "#71D19E", // Mint Green
      textColor: "#0D0D0D", // Dark Text for high contrast
    },
    {
      label: "Expertise",
      href: "#about",
      bgColor: "#7B5EE0", // Vibrant Purple
      textColor: "#FFFFFF", // White Text
    },
    {
      label: "Contact",
      href: "#contact",
      bgColor: "#701B5B", // Deep Magenta/Plum
      textColor: "#FFFFFF", // White Text
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 border-b border-colab-dark/15 bg-colab-bg/90 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-colab-dark font-sans">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-display font-extrabold text-2xl tracking-tighter hover:opacity-80 transition-opacity"
        >
          CO LAB
        </Link>

        {/* Desktop Navigation: Smooth Colored Pill Buttons */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ backgroundColor: link.bgColor, color: link.textColor }}
              className="px-5 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar: WhatsApp & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          
          {/* WhatsApp Direct Link Button */}
          {/* Replace '1234567890' with your actual country code + phone number */}
          <a
            href="https://wa.me/1234567890" 
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

          {/* Mobile Hamburger Toggle Button */}
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

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-colab-bg/95 backdrop-blur-2xl border-b border-colab-dark/20 p-6 flex flex-col gap-3 shadow-2xl transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ backgroundColor: link.bgColor, color: link.textColor }}
              className="w-full text-center py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-md transition-transform active:scale-95"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}