"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Scroll-triggered entrance animations for section elements
  useGSAP(
    () => {
      // Intro line
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

      // Word-by-word mask reveal
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

      // Outro line & Learn More Button
      gsap.from([".about-outro", ".learn-more-btn"], {
        scrollTrigger: {
          trigger: ".words-container",
          start: "top 75%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.15,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
      });

      // CEO Image Card
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

  // 2. GSAP Modal Entrance Animation
  useGSAP(
    () => {
      if (isModalOpen && modalOverlayRef.current && modalCardRef.current) {
        // Overlay fade in
        gsap.fromTo(
          modalOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );

        // Modal card slide-up & spring scale
        gsap.fromTo(
          modalCardRef.current,
          { y: 35, scale: 0.92, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
            delay: 0.08,
          }
        );
      }
    },
    { dependencies: [isModalOpen] }
  );

  // 3. GSAP Modal Exit Animation
  const closeModal = () => {
    if (modalOverlayRef.current && modalCardRef.current) {
      const exitTl = gsap.timeline({
        onComplete: () => setIsModalOpen(false),
      });

      exitTl
        .to(modalCardRef.current, {
          y: 20,
          scale: 0.95,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })
        .to(
          modalOverlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.1"
        );
    } else {
      setIsModalOpen(false);
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 md:px-12 border-b border-colab-dark bg-colab-bg text-colab-dark"
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
                <span className="animate-word inline-block text-[#0D0D0D] dark:text-[#EBE7E1]">
                  Engagement,
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#FFFFFF] dark:text-[#CF908F]">
                  Growth,
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#5C2321] dark:text-[#EBE7E1]">
                  and
                </span>
              </span>

              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-word inline-block text-[#4A1817] dark:text-[#CF908F] underline decoration-[#0D0D0D] dark:decoration-[#EBE7E1] decoration-4 underline-offset-8">
                  Loyalty.
                </span>
              </span>
            </div>

            {/* Closing Outro Sentence */}
            <p className="about-outro text-xl sm:text-3xl text-colab-dark/80 font-serif mt-6">
              Deliver real, impactful results.
            </p>

            {/* Animated Learn More Button */}
            <div className="learn-more-btn mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-6 py-3 border border-colab-dark bg-transparent font-mono text-xs font-bold uppercase tracking-widest text-colab-dark overflow-hidden transition-all duration-300 hover:bg-colab-dark hover:text-colab-bg"
              >
                <span>LEARN MORE</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right CEO Image Card (Cols 9-12) */}
        <div className="lg:col-span-4 ceo-card w-full mt-6 lg:mt-0">
          <div className="relative aspect-3/4 w-full border border-colab-dark bg-colab-dark/5 overflow-hidden group">
            <Image
              src="/colabb.jpg"
              alt="CEO & Founder"
              fill
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />

            <div className="absolute bottom-0 left-0 w-full p-4 bg-colab-bg/90 backdrop-blur-md border-t border-colab-dark flex justify-between items-center text-xs font-mono uppercase tracking-wider text-colab-dark">
              <div>
                <p className="font-extrabold text-sm">CO-LAB CEO</p>
                <p className="text-[10px] text-colab-dark/70">
                  Executive Leadership
                </p>
              </div>
              <span className="text-colab-secondary text-lg font-bold">®</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div
          ref={modalOverlayRef}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          {/* Modal Card */}
          <div
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()} // Prevents overlay click when clicking card body
            className="relative w-full max-w-lg border border-colab-dark bg-colab-bg text-colab-dark p-6 sm:p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-colab-dark/20 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-colab-dark/60">
                [ STUDIO OVERVIEW ]
              </span>
              <button
                onClick={closeModal}
                className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-1 border border-colab-dark/30 hover:bg-colab-dark hover:text-colab-bg transition-colors"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Body Content */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-colab-dark">
                Architecting digital prestige since 2026.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-colab-dark/80 leading-relaxed">
                We combine modern web technologies, fluid GSAP animations, and
                high-fashion editorial typography to build unforgettable
                interactive experiences for visionary brands worldwide.
              </p>
            </div>

            {/* Card Footer Metadata */}
            <div className="mt-8 pt-4 border-t border-colab-dark/20 flex justify-between items-center font-mono text-[10px] uppercase text-colab-dark/60">
              <span>CO LAB CREATIVE STUDIO</span>
              <span>SAN FRANCISCO • LA</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}