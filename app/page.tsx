"use client";

import { useState } from "react";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Colabbs from "@/components/Colabbs";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-colab-bg text-colab-dark overflow-x-hidden selection:bg-colab-dark selection:text-colab-bg">
      {/* Intro Preloader Overlay */}
      <IntroLoader onComplete={() => setIntroFinished(true)} />

      {/* Main Site Content */}
      <Navbar />
      <Hero introFinished={introFinished} />
      <Colabbs />
      <About />
      <Contact />
    </main>
  );
}