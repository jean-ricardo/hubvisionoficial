import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Transformation } from "@/components/sections/Transformation";
import { Services } from "@/components/sections/Services";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { FeaturedSolutions } from "@/components/sections/FeaturedSolutions";
import { Integrations } from "@/components/sections/Integrations";
import { Impact } from "@/components/sections/Impact";

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
      <Ecosystem />
      <FeaturedSolutions />
      <Integrations />
      <Impact />
    </main>
  );
}
