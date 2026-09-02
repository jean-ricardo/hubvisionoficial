import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { fetchNovidadesPublicadas } from "@/lib/novidades";

export function News() {
  const { data } = useQuery({
    queryKey: ["novidades", "publicadas"],
    queryFn: fetchNovidadesPublicadas,
  });

  const destaques = (data ?? []).slice(0, 4);

  return (
    <section
      id="novidades"
      className="relative overflow-hidden bg-hv-bg-secondary px-6 py-24"
    >
      {/* Motivo de rede/pontos conectados em baixa opacidade */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      >
        <defs>
          <pattern id="news-net" width="56" height="56" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#3368E8" />
            <path d="M2 2 L56 2 M2 2 L2 56" stroke="#3368E8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#news-net)" />
      </svg>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-hv-text-secondary">
              No radar
            </p>
            <h2 className="font-space-grotesk text-4xl font-bold text-hv-white md:text-5xl">
              O que está rolando na HubVision
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-hv-text-secondary">
            Bastidores, resultados e leituras do nosso time sobre tecnologia
            aplicada ao negócio.
          </p>
        </motion.div>

        {destaques.length === 0 ? (
          <p className="rounded-2xl border border-hv-border bg-hv-bg-surface p-10 text-center text-hv-text-secondary">
            Novas atualizações em breve
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((novidade, index) => (
              <NewsCard key={novidade.id} novidade={novidade} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/novidades"
            className="inline-flex items-center gap-2 rounded-full border border-hv-border-strong px-6 py-3 text-sm font-semibold text-hv-white transition-colors duration-[250ms] hover:bg-hv-bg-highlight motion-reduce:transition-none"
          >
            Ver todas as novidades
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
