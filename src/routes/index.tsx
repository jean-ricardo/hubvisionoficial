import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Transformation } from "@/components/sections/Transformation";
import { Services } from "@/components/sections/Services";

import { FeaturedSolutions } from "@/components/sections/FeaturedSolutions";
import { Integrations } from "@/components/sections/Integrations";
import { Impact } from "@/components/sections/Impact";
import { Partners } from "@/components/sections/Partners";
import { Cases } from "@/components/sections/Cases";
import { News } from "@/components/sections/News";

import { Differentials } from "@/components/sections/Differentials";
import { Future } from "@/components/sections/Future";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

const HEADER_OFFSET = 80;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    const target = window.sessionStorage.getItem("hv-scroll-to");
    if (!target) return;
    window.sessionStorage.removeItem("hv-scroll-to");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scroll = () => {
      const el = document.getElementById(target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    };

    // Aguarda a primeira pintura completa para garantir posições corretas
    requestAnimationFrame(() => setTimeout(scroll, 100));
  }, []);

  return (
    <main className="relative min-h-screen bg-hv-bg-primary">
      <Header />
      <Hero />
      <Manifesto />
      <WhoWeAre />
      <Transformation />
      <Services />
      
      <FeaturedSolutions />
      <Integrations />
      <Impact />
      <Partners />
      <Cases />
      <News />
      <Differentials />
      <Future />
      <CTA />
      <Footer />
    </main>
  );
}

