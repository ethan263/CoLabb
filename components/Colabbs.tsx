"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    id: "01",
    title: "Strategic Design",
    description:
      "Brand identity, UI/UX systems, visual direction, and digital typography built for market dominance.",
  },
  {
    id: "02",
    title: "Tech Development",
    description:
      "High-performance Next.js web applications, full-stack microservices, and interactive web experiences.",
  },
  {
    id: "03",
    title: "Performance Marketing",
    description:
      "Data-backed campaign orchestration, growth engineering, conversion optimization, and brand positioning.",
  },
  {
    id: "04",
    title: "Content Creation",
    description:
      "Editorial visuals, 3D motion design, copy creation, and digital brand storytelling.",
  },
];

export default function Colabbs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="colabbs"
      ref={sectionRef}
      className="w-full border-b border-colab-dark bg-colab-bg text-colab-dark"
    >
      {/* Header Bar */}
      <div className="p-6 md:p-12 border-b border-colab-dark flex justify-between items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tighter">
          COLABBS
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-colab-dark/60">
          [ OUR CAPABILITIES ]
        </span>
      </div>

      {/* 4-Column Bordered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-colab-dark">
        {SERVICES.map((item) => (
          <div
            key={item.id}
            className="service-card p-6 md:p-8 flex flex-col justify-between group hover:bg-colab-dark hover:text-colab-bg transition-colors duration-300 min-h-[320px]"
          >
            <div>
              <span className="font-extrabold text-3xl font-mono block mb-6 text-colab-secondary group-hover:text-colab-bg transition-colors">
                {item.id}
              </span>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                {item.title}
              </h3>
            </div>
            <p className="text-sm font-sans opacity-80 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}