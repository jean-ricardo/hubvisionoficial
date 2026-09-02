import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { formatarDataCurta, type Novidade } from "@/lib/novidades";

interface NewsCardProps {
  novidade: Novidade;
  index?: number;
}

export function NewsCard({ novidade, index = 0 }: NewsCardProps) {
  const isEmpresa = novidade.autor === "Empresa";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08 }}
      className="group h-full motion-reduce:transition-none"
    >
      <a
        href={novidade.linkLinkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-hv-border bg-hv-bg-surface transition-all duration-[250ms] hover:-translate-y-1 hover:border-hv-border-strong hover:bg-hv-bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hv-blue-electric motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-hv-bg-secondary">
          {novidade.imagemCapa ? (
            <img
              src={novidade.imagemCapa}
              alt={novidade.titulo}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity duration-[250ms] group-hover:opacity-100"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-hv-white",
                isEmpresa ? "bg-hv-blue" : "bg-hv-blue-electric"
              )}
            >
              {novidade.autor}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-hv-text-muted">
              {formatarDataCurta(novidade.data)}
            </span>
          </div>

          <h3 className="mb-3 font-space-grotesk text-lg font-bold leading-snug text-hv-white">
            {novidade.titulo}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-hv-text-secondary">
            {novidade.resumo}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-hv-blue-electric">
            Ver publicação completa
            <ArrowRight
              size={16}
              className="transition-transform duration-[250ms] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </span>
        </div>
      </a>
    </motion.article>
  );
}
