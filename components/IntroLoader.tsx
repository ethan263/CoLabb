"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export default function IntroLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDone, setIsDone] = useState(false);
  const touchStartY = useRef<number | null>(null);

  // Transition sequence out of the intro video
  const handleFinish = useCallback(() => {
    if (isDone) return;
    setIsDone(true);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100, // Slides up like a shutter curtain
        duration: 1.1,
        ease: "power4.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }
  }, [isDone, onComplete]);

  // Listen for Scroll & Touch Swipe Gesture Events
  useEffect(() => {
    if (isDone) return;

    // 1. Mouse Wheel / Trackpad Scroll Down Detection
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        handleFinish();
      }
    };

    // 2. Touch Swipe Up Detection for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      // User swiped up by more than 30px
      if (deltaY > 30) {
        handleFinish();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [isDone, handleFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="w-full h-full object-cover"
      />

      {/* Visual Scroll Hint Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest animate-pulse">
          [ SCROLL TO ENTER ]
        </span>
        <span className="text-white/60 text-xs animate-bounce">↓</span>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 z-10 px-4 py-2 border border-white/30 bg-black/50 backdrop-blur-md text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
      >
        [ Continue  → ]
      </button>
    </div>
  );
}