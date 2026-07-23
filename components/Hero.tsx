"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HeroProps {
  introFinished?: boolean;
}

export default function Hero({ introFinished }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersTrackRef = useRef<HTMLDivElement>(null);
  const letterCRef = useRef<HTMLSpanElement>(null);
  const letterORef = useRef<HTMLSpanElement>(null);
  const letterLRef = useRef<HTMLSpanElement>(null);
  const letterARef = useRef<HTMLSpanElement>(null);
  const letterBRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
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

      // Entrance Animation Sequence
      const mainTl = gsap.timeline();

      mainTl
        // 1. Letters drop in sequentially with gravity impact
        .fromTo(
          letters,
          {
            y: -220,
            opacity: 0,
            scale: 1.2,
            rotate: (i) => (i % 2 === 0 ? -6 : 6),
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "back.out(1.5)",
          }
        )
        // 2. Horizontal gap stretch expansion
        .to(
          lettersTrackRef.current,
          {
            gap: "clamp(0.5rem, 3vw, 2.5rem)",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "+=0.15"
        )
        // 3. Subtitle reveal ("BRAND MANAGEMENT")
        .fromTo(
          subtextRef.current,
          {
            y: 20,
            opacity: 0,
            letterSpacing: "0.1em",
          },
          {
            y: 0,
            opacity: 1,
            letterSpacing: "0.35em",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // 4. Top editorial headline reveal
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Clean Responsive Scroll Parallax
      const mm = gsap.matchMedia();

      // Desktop & Tablet
      mm.add("(min-width: 768px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(lettersTrackRef.current, { y: -50, opacity: 0.85, ease: "none" }, 0)
          .to(subtextRef.current, { y: -30, opacity: 0.7, ease: "none" }, 0)
          .to(headlineRef.current, { y: -40, opacity: 0.3, ease: "none" }, 0);
      });

      // Mobile (< 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
          .to(lettersTrackRef.current, { y: -25, opacity: 0.85, ease: "none" }, 0)
          .to(subtextRef.current, { y: -15, opacity: 0.7, ease: "none" }, 0)
          .to(headlineRef.current, { y: -20, opacity: 0.4, ease: "none" }, 0);
      });
    },
    { scope: containerRef, dependencies: [introFinished] }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full pt-28 sm:pt-32 md:pt-36 pb-16 px-6 md:px-12 flex flex-col justify-between bg-colab-bg text-colab-dark overflow-hidden select-none"
    >
      {/* Top Section: Right-aligned Editorial Headline */}
      <div className="w-full flex justify-end">
        <div
          ref={headlineRef}
          className="w-full sm:w-4/5 lg:w-1/2 xl:w-5/12 text-left"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-colab-dark/70 block mb-2 sm:mb-3">
            (WE ARE)
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-colab-dark">
            The digital-first partner for next-generation brands.
          </h1>
        </div>
      </div>

      {/* Center Section: Stretched CO LAB + BRAND MANAGEMENT */}
      <div className="w-full my-auto py-12 flex flex-col items-center justify-center text-center">
        {/* Horizontal Stretched Container */}
        <div
          ref={lettersTrackRef}
          className="flex items-center justify-center gap-0 font-display font-extrabold text-colab-dark leading-none tracking-tighter"
        >
          <span
            ref={letterCRef}
            style={{ fontSize: "clamp(3.5rem, 14vw, 15rem)" }}
            className="inline-block"
          >
            C
          </span>
          <span
            ref={letterORef}
            style={{ fontSize: "clamp(3.5rem, 14vw, 15rem)" }}
            className="inline-block relative"
          >
            O
            <span className="absolute -top-1 -right-3 sm:top-2 sm:-right-6 text-[9px] sm:text-xs font-sans font-normal border border-colab-dark rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center">
              ®
            </span>
          </span>

          {/* Spacer between CO and LAB */}
          <span className="w-2 sm:w-6 lg:w-12" />

          <span
            ref={letterLRef}
            style={{ fontSize: "clamp(3.5rem, 14vw, 15rem)" }}
            className="inline-block"
          >
            L
          </span>
          <span
            ref={letterARef}
            style={{ fontSize: "clamp(3.5rem, 14vw, 15rem)" }}
            className="inline-block"
          >
            A
          </span>
          <span
            ref={letterBRef}
            style={{ fontSize: "clamp(3.5rem, 14vw, 15rem)" }}
            className="inline-block"
          >
            B
          </span>
        </div>

        {/* Centered Subtitle */}
        <div
          ref={subtextRef}
          className="mt-4 sm:mt-6 font-mono text-xs sm:text-base md:text-xl font-extrabold uppercase tracking-[0.35em] text-colab-dark/80"
        >
          BRAND MANAGEMENT
        </div>
      </div>
    </section>
  );
}