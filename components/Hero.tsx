"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for individual letters to animate separately
  const letterCRef = useRef<HTMLDivElement>(null);
  const letterORef = useRef<HTMLDivElement>(null);
  const letterLRef = useRef<HTMLDivElement>(null);
  const letterARef = useRef<HTMLDivElement>(null);
  const letterBRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters = [
        letterCRef.current,
        letterORef.current,
        letterLRef.current,
        letterARef.current,
        letterBRef.current,
      ];

      // 1. Entrance Stagger Animation
      gsap.from(letters, {
        y: 100,
        opacity: 0,
        rotate: () => (Math.random() - 0.5) * 30,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // 2. Parallax Scroll Physics via GSAP ScrollTrigger
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // Adds inertia momentum to native scrolling
        },
      });

      // Move each letter at different speeds and angles as you scroll down
      scrollTl
        .to(letterCRef.current, { y: -160, rotate: -12, ease: "none" }, 0)
        .to(letterORef.current, { y: -220, rotate: 18, ease: "none" }, 0)
        .to(letterLRef.current, { y: -110, rotate: -22, ease: "none" }, 0)
        .to(letterARef.current, { y: -190, rotate: 14, ease: "none" }, 0)
        .to(letterBRef.current, { y: -90, rotate: 28, ease: "none" }, 0)
        .to(headlineRef.current, { y: -80, opacity: 0.2, ease: "none" }, 0);
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full pt-28 md:pt-32 pb-12 px-6 md:px-12 flex flex-col justify-between border-b border-colab-dark/20 overflow-hidden bg-colab-bg text-colab-dark select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full my-auto">
        {/* Left Side: Editorial Fragmented Artwork Letters */}
        <div className="lg:col-span-7 relative min-h-105 sm:min-h-125min-h-[600px] flex items-center justify-center">
          {/* Letter C */}
          <div
            ref={letterCRef}
            className="absolute top-0 left-[2%] text-[22vw] lg:text-[14rem] font-extrabold leading-none tracking-tighter -rotate-10deg] text-colab-dark"
          >
            C
          </div>

          {/* Letter O */}
          <div
            ref={letterORef}
            className="absolute top-[4%] left-[30%] text-[24vw] lg:text-[15rem] font-extrabold leading-none tracking-tighter rotate-6deg] text-colab-dark"
          >
            O
            <span className="absolute -top-2 -right-4 lg:-top-4 lg:-right-6 text-sm lg:text-xl font-normal border border-colab-dark rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-colab-dark">
              ®
            </span>
          </div>

          {/* Letter L */}
          <div
            ref={letterLRef}
            className="absolute top-[30%] left-[8%] text-[25vw] lg:text-[16rem] font-extrabold leading-none tracking-tighter -rotate-16deg] text-colab-dark"
          >
            L
          </div>

          {/* Letter A */}
          <div
            ref={letterARef}
            className="absolute top-[26%] left-[40%] text-[26vw] lg:text-[17rem] font-extrabold leading-none tracking-tighter rotate-12deg] text-colab-dark"
          >
            A
          </div>

          {/* Letter B */}
          <div
            ref={letterBRef}
            className="absolute bottom-0 left-[22%] text-[28vw] lg:text-[18rem] font-extrabold leading-none tracking-tighter -rotate-4deg] text-colab-dark"
          >
            B
          </div>
        </div>

        {/* Right Side: Primary Editorial Statement */}
        <div
          ref={headlineRef}
          className="lg:col-span-5 flex flex-col justify-center pt-6 lg:pt-16"
        >
          <span className="text-xs uppercase tracking-widest font-mono mb-4 text-colab-dark/70">
            (WE ARE)
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-colab-dark">
            “The digital-first partner for next-generation brands.”
          </h1>
        </div>
      </div>

      {/* Section Footer Bar */}
      <div className="flex justify-between items-end pt-8 text-[11px] font-mono uppercase tracking-wider text-colab-dark/60 border-t border-colab-dark/10">
        <div>(@) VR / EST. 2026</div>
        <div className="hidden sm:block">SCROLL TO EXPLORE ↓</div>
      </div>
    </section>
  );
}