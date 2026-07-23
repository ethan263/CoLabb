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

  const handleFinish = useCallback(() => {
    if (isDone) return;
    setIsDone(true);

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: "power4.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    }
  }, [isDone, onComplete]);

  useEffect(() => {
    if (isDone) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) handleFinish();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.touches[0].clientY;
      if (touchStartY.current - touchEndY > 30) handleFinish();
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
      // Added w-screen and h-[100dvh] to perfectly fit mobile dimensions
      className="fixed inset-0 z-[100] bg-black overflow-hidden select-none w-screen h-[100dvh]"
    >
      {/* Absolute positioning trick to ensure the video always covers the screen without stretching */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest animate-pulse drop-shadow-md">
          [ SCROLL TO ENTER ]
        </span>
        <span className="text-white/60 text-xs animate-bounce drop-shadow-md">↓</span>
      </div>

      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 z-10 px-4 py-2 border border-white/30 bg-black/50 backdrop-blur-md text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
      >
        [ SKIP INTRO → ]
      </button>
    </div>
  );
}