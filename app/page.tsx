import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Colabbs from "@/components/Colabbs";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-colab-bg text-colab-dark overflow-x-hidden selection:bg-colab-dark selection:text-colab-bg">
      <Navbar />
      <Hero />
      <Colabbs />
      <About />
      <Contact />
    </main>
  );
}