import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { fetchNovidadesPublicadas } from "@/lib/novidades";

export function News() {
  const { data } = useQuery({
    queryKey: ["novidades", "publicadas"],
    queryFn: fetchNovidadesPublicadas,
  });

  const destaques = (data ?? []).slice(0, 8);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    updateScrollState();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [destaques.length]);

  const scrollBy = (direction: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = 24;
    const step = card.offsetWidth + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

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
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="max-w-md text-base leading-relaxed text-hv-text-secondary">
              Bastidores, resultados e leituras do nosso time sobre tecnologia
              aplicada ao negócio.
            </p>
            {destaques.length > 1 && (
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <button
                  type="button"
                  aria-label="Anterior"
                  disabled={!canScrollLeft}
                  onClick={() => scrollBy(-1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hv-border-strong bg-hv-bg-surface text-hv-white transition-all duration-[250ms] hover:border-hv-blue-electric hover:bg-hv-bg-highlight disabled:cursor-not-allowed disabled:opacity-30 motion-reduce:transition-none"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Próximo"
                  disabled={!canScrollRight}
                  onClick={() => scrollBy(1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hv-border-strong bg-hv-bg-surface text-hv-white transition-all duration-[250ms] hover:border-hv-blue-electric hover:bg-hv-bg-highlight disabled:cursor-not-allowed disabled:opacity-30 motion-reduce:transition-none"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {destaques.length === 0 ? (
          <p className="rounded-2xl border border-hv-border bg-hv-bg-surface p-10 text-center text-hv-text-secondary">
            Novas atualizações em breve
          </p>
        ) : (
          <div
            ref={sliderRef}
            className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:-mx-0 md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {destaques.map((novidade, index) => (
              <div
                key={novidade.id}
                className="w-[85vw] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <NewsCard novidade={novidade} index={index} />
              </div>
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
