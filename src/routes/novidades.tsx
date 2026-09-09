import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { Button } from "@/components/ui/button";
import {
  fetchNovidadesPublicadas,
  formatarMesAno,
  type AutorNovidade,
  type Novidade,
} from "@/lib/novidades";


export const Route = createFileRoute("/novidades")({
  component: NovidadesPage,
  head: () => ({
    meta: [
      { title: "Novidades HubVision | Bastidores, resultados e tecnologia" },
      {
        name: "description",
        content:
          "Feed de novidades da HubVision: bastidores dos projetos, resultados de automação e leituras do time sobre tecnologia aplicada ao negócio.",
      },
      { property: "og:title", content: "Novidades HubVision" },
      {
        property: "og:description",
        content:
          "Acompanhe as publicações da HubVision sobre automação, integrações TOTVS e inteligência aplicada ao negócio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Filtro = "Todas" | AutorNovidade;
const FILTROS: Filtro[] = ["Todas", "Empresa", "Diretor"];

function NovidadesPage() {
  const [filtro, setFiltro] = useState<Filtro>("Todas");

  const { data } = useQuery({
    queryKey: ["novidades", "publicadas"],
    queryFn: fetchNovidadesPublicadas,
  });

  const grupos = useMemo(() => {
    const todas = data ?? [];
    const lista =
      filtro === "Todas" ? todas : todas.filter((n) => n.autor === filtro);

    const map = new Map<string, Novidade[]>();
    for (const item of lista) {
      const key = formatarMesAno(item.data);
      const bucket = map.get(key);
      if (bucket) bucket.push(item);
      else map.set(key, [item]);
    }
    return Array.from(map.entries());
  }, [filtro, data]);

  return (
    <main className="relative min-h-screen bg-hv-bg-primary">
      <Header />

      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-hv-text-secondary">
              No radar
            </p>
            <h1 className="mb-4 font-space-grotesk text-4xl font-bold text-hv-white md:text-5xl">
              Novidades HubVision
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-hv-text-secondary">
              Um feed contínuo com o que publicamos: projetos, resultados reais e
              a visão do nosso time sobre tecnologia aplicada ao negócio.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Filtrar novidades">
            {FILTROS.map((item) => {
              const ativo = filtro === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setFiltro(item)}
                  className={clsx(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-[250ms] motion-reduce:transition-none",
                    ativo
                      ? item === "Diretor"
                        ? "border-transparent bg-hv-blue-electric text-hv-white"
                        : item === "Empresa"
                          ? "border-transparent bg-hv-blue text-hv-white"
                          : "border-transparent bg-hv-bg-highlight text-hv-white"
                      : "border-hv-border text-hv-text-secondary hover:text-hv-white"
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          {grupos.length === 0 ? (
            <p className="rounded-2xl border border-hv-border bg-hv-bg-surface p-12 text-center text-hv-text-secondary">
              Novas atualizações em breve
            </p>
          ) : (
            <div className="space-y-16">
              {grupos.map(([mes, itens]) => (
                <div key={mes}>
                  <div className="mb-8 flex items-center gap-4">
                    <h2 className="font-space-grotesk text-lg font-bold text-hv-white">
                      {mes}
                    </h2>
                    <span className="h-px flex-1 bg-hv-border" />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {itens.map((novidade, index) => (
                      <NewsCard
                        key={novidade.id}
                        novidade={novidade}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
