"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Fade & slide intro line
      gsap.from(".about-intro", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Word-by-word mask reveal
      gsap.from(".animate-word", {
        scrollTrigger: {
          trigger: ".words-container",
          start: "top 85%",
        },
        y: "110%",
        rotate: 3,
        duration: 0.9,
        stagger: 0.16,
        ease: "power4.out",
      });

      // 3. Fade & slide closing sentence
      gsap.from(".about-outro", {
        scrollTrigger: {
          trigger: ".words-container",
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
      });

      // 4. CEO Image Reveal
      gsap.from(".ceo-card", {
        scrollTrigger: {
          trigger: ".ceo-card",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 border-b border-colab-dark bg-colab-bg text-colab-dark"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Section Label (Cols 1-2) */}
        <div className="lg:col-span-2">
          <span className="text-xs font-mono uppercase tracking-widest text-colab-dark/60 block">
            [ ABOUT US ]
          </span>
        </div>

        {/* Middle Editorial Text (Cols 3-8) */}
        <div className="lg:col-span-6">
          <div className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.2] text-colab-dark">
            {/* Intro Sentence */}
            <p className="about-intro mb-6">
              At{" "}
              <span className="font-sans font-extrabold text-colab-dark underline decoration-colab-secondary decoration-2 underline-offset-8">
                CO LAB
              </span>{" "}
              we help your brand build:
            </p>

            {/* Word-by-Word Colored Animated Section */}
            <div className="words-container font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight my-6 flex flex-wrap gap-x-[0.3em] gap-y-2">
              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#0D0D0D]">
                  Engagement,
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#FFFFFF]">
                  Growth,
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#5C2321]">
                  and
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#4A1817] underline decoration-[#0D0D0D] decoration-4 underline-offset-8">
                  Loyalty.
                </span>
              </span>
            </div>

            {/* Closing Outro Sentence */}
            <p className="about-outro text-xl sm:text-3xl text-colab-dark/80 font-serif mt-6">
              Deliver real, impactful results.
            </p>
          </div>
        </div>

        {/* Right CEO Image Card (Cols 9-12) */}
        <div className="lg:col-span-4 ceo-card w-full mt-6 lg:mt-0">
          <div className="relative aspect-3/4 w-full border border-colab-dark bg-colab-dark/5 overflow-hidden group">
            {/* Next.js Optimized Image */}
            <Image
              src="/colabb.jpg"
              alt="Founder"
              fill
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />

            {/* Floating Title Caption */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-colab-bg/90 backdrop-blur-md border-t border-colab-dark flex justify-between items-center text-xs font-mono uppercase tracking-wider text-colab-dark">
              <div>
                <p className="font-extrabold text-sm">CO-LAB</p>
                <p className="text-[10px] text-colab-dark/70">Najwa Engledoe</p>
              </div>
              <span className="text-colab-secondary text-lg font-bold">®</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}