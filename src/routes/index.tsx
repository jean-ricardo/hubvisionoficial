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
import { Cases } from "@/components/sections/Cases";
import { Partners } from "@/components/sections/Partners";
import { Differentials } from "@/components/sections/Differentials";
import { Future } from "@/components/sections/Future";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
      <Cases />
      <Partners />
      <Differentials />
      <Future />
      <CTA />
      <Footer />
    </main>
  );
}
