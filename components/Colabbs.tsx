"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const BRAND_LOGOS = [
  {
    id: "01",
    name: "AURA BEAUTY",
    image: "/brands/adidas.svg",
  },
  {
    id: "02",
    name: "MONOLITH",
    image: "/brands/knorr.svg",
  },
  {
    id: "03",
    name: "KINETIC",
    image: "/brands/maybelline.svg",
  },
  {
    id: "04",
    name: "VOGUE LAB",
    image: "/brands/rajah.svg",
  },
  {
    id: "05",
    name: "AETHER",
    image: "/brands/santam.svg",
  },
  {
    id: "06",
    name: "AETHER",
    image: "/brands/shein.svg",
  },
  {id: "07",
    name: "AETHER",
    image: "/brands/robertsons.svg",
  }
];

// Duplicate array for infinite seamless looping
const DOUBLE_LOGOS = [...BRAND_LOGOS, ...BRAND_LOGOS];

export default function Colabbs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // Infinite horizontal translation
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20, // Adjust speed (lower = faster)
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  // Smooth decelerate on hover
  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
    }
  };

  // Resume normal speed on mouse leave
  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <section
      id="colabbs"
      ref={sectionRef}
      className="w-full border-b border-colab-dark bg-colab-bg text-colab-dark overflow-hidden select-none py-16"
    >
      {/* Section Header */}
      <div className="px-6 md:px-12 pb-8 flex justify-between items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter font-display">
          COLABBS
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-colab-dark/60">
          [ BRAND PARTNERSHIPS ]
        </span>
      </div>

      {/* Floating Borderless SVG Marquee Track */}
      <div
        className="py-8 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="flex items-center gap-16 md:gap-28 w-max px-6">
          {DOUBLE_LOGOS.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="group relative h-10 sm:h-14 w-32 sm:w-44 shrink-0 flex items-center justify-center border-none bg-transparent"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                /* 
                  1. object-contain prevents cropping.
                  2. 'filter brightness-0 dark:invert' forces all SVGs to adapt automatically to Light and Dark mode.
                  3. Zero borders or background frames around the logos.
                */
                className="object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter brightness-0 dark:invert"
                sizes="(max-width: 768px) 128px, 176px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}