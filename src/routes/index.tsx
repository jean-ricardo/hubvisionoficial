import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-hv-bg-primary">
      <Header />
      <Hero />
      
      {/* Additional sections will be added here */}
      <section className="h-[50vh] bg-hv-bg-primary" />
    </main>
  );
}
