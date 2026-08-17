import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Transformation } from "@/components/sections/Transformation";
import { Services } from "@/components/sections/Services";

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
    </main>
  );
}
