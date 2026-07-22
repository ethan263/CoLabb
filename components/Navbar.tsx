"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [time, setTime] = useState<string>("");

  // Update live clock on the client side
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-SA", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 border-b border-colab-dark/20 bg-colab-bg/80 backdrop-blur-md flex items-center justify-between text-colab-dark">
      {/* Brand Logo */}
      <Link href="/" className="font-extrabold text-xl md:text-2xl tracking-tighter hover:opacity-70 transition-opacity">
        CO LAB
      </Link>

      {/* Editorial Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-widest font-semibold">
        <Link href="#hero" className="hover:opacity-50 transition-opacity">
          Hero
        </Link>
        <span className="text-colab-secondary">•</span>
        <Link href="#colabbs" className="hover:opacity-50 transition-opacity">
          Colabbs
        </Link>
        <span className="text-colab-secondary">•</span>
        <Link href="#about" className="hover:opacity-50 transition-opacity">
          About
        </Link>
        <span className="text-colab-secondary">•</span>
        <Link href="#contact" className="hover:opacity-50 transition-opacity">
          Contact
        </Link>
      </nav>

      {/* Live Studio Time Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-wider font-medium">
        <span>LA</span>
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
        <span>{time || "--:-- --"}</span>
      </div>
    </header>
  );
}