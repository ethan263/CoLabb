"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
        opacity: 0.15,
        y: 40,
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section Label */}
        <div className="lg:col-span-3">
          <span className="text-xs font-mono uppercase tracking-widest text-colab-dark/60 block">
            [ ABOUT US ]
          </span>
        </div>

        {/* Right Editorial Statement */}
        <div className="lg:col-span-9">
          <p
            ref={textRef}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.15] text-colab-dark"
          >
            Shared ambition leads to unparalleled results.{" "}
            <span className="font-sans font-extrabold text-colab-dark underline decoration-colab-secondary decoration-2 underline-offset-8">
              CO LAB
            </span>{" "}
            is a unique collective of designers, engineers, and strategists working in true partnership with visionary founders.
          </p>
        </div>
      </div>
    </section>
  );
}