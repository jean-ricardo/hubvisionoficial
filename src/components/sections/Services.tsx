import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Cpu, Share2, Lightbulb, BarChart3, MousePointer2 } from "lucide-react";
import integrationImage from "@/assets/integracao-processos.png.asset.json";

const services = [
  {
    title: "Automação",
    description: "Simplifique fluxos e reduza gargalos operacionais através de processos inteligentes.",
    icon: Cpu,
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Integração",
    description: "Conecte sistemas, dados e departamentos em um ecossistema digital fluido.",
    icon: Share2,
    bgImage: integrationImage.url,
  },
  {
    title: "Inteligência",
    description: "Transforme dados brutos em decisões estratégicas com IA e analytics.",
    icon: Lightbulb,
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Soluções Digitais",
    description: "Produtos digitais escaláveis desenhados para o crescimento do seu negócio.",
    icon: BarChart3,
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

const DWELL_MS = 2500;
const RESUME_MS = 4000;

export function Services() {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(gridRef, { amount: 0.3 });

  const [autoIndex, setAutoIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  const running = !reduceMotion && autoplay && inView && hoveredIndex === null;

  // Autoplay cycle
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % services.length);
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [running]);

  // Position the synthetic cursor over the active card
  const positionCursor = useCallback(() => {
    const grid = gridRef.current;
    const card = cardRefs.current[autoIndex];
    if (!grid || !card) return;
    const g = grid.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    setCursor({ x: c.left - g.left + c.width * 0.5, y: c.top - g.top + c.height * 0.62 });
  }, [autoIndex]);

  useEffect(() => {
    if (!running || isTouch) return;
    positionCursor();
    window.addEventListener("resize", positionCursor);
    return () => window.removeEventListener("resize", positionCursor);
  }, [running, isTouch, positionCursor]);

  const handleEnter = (index: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setHoveredIndex(index);
    setAutoplay(false);
  };

  const handleSectionLeave = () => {
    setHoveredIndex(null);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoplay(true), RESUME_MS);
  };

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const showCursor = running && !isTouch && cursor !== null;

  return (
    <section id="solucoes" className="relative w-full bg-hv-bg-primary py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-hv-white mb-6"
          >
            Tecnologia para desafios reais
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-hv-text-secondary"
          >
            Automação, Integração, Inteligência e Soluções Digitais.
          </motion.p>
        </div>

        <div
          ref={gridRef}
          onMouseLeave={handleSectionLeave}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-transparent md:bg-hv-border border-none md:border md:border-hv-border rounded-2xl md:overflow-visible"
        >
          {services.map((service, index) => {
            const isActive = reduceMotion
              ? true
              : hoveredIndex !== null
                ? hoveredIndex === index
                : running && autoIndex === index;

            return (
              <motion.div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => handleEnter(index)}
                className={`relative overflow-hidden p-8 md:p-12 transition-all duration-500 rounded-2xl md:rounded-none ${
                  isActive ? "bg-hv-bg-highlight" : "bg-hv-bg-surface"
                }`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 z-0 transition-all duration-700 bg-cover bg-center ${
                    isActive
                      ? "opacity-40 grayscale-0 brightness-110"
                      : "opacity-25 grayscale brightness-110 contrast-90"
                  }`}
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />

                <div className="relative z-10">
                  <service.icon
                    className={`w-10 h-10 text-hv-white mb-8 transition-transform duration-500 ${isActive ? "scale-110" : ""}`}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-2xl font-bold text-hv-white mb-4">{service.title}</h3>
                  <p
                    className={`leading-relaxed transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "text-hv-white md:max-h-24 md:opacity-100"
                        : "text-hv-text-secondary md:max-h-0 md:opacity-0"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Highlight line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-hv-blue-electric transition-all duration-500 z-20 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </motion.div>
            );
          })}

          {/* Synthetic cursor */}
          {showCursor && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute z-30 hidden md:block"
              initial={{ opacity: 0, x: cursor.x, y: cursor.y }}
              animate={{ opacity: 1, x: cursor.x, y: cursor.y }}
              exit={{ opacity: 0 }}
              transition={{ x: { duration: 0.7, ease: "easeInOut" }, y: { duration: 0.7, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
            >
              <span className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="absolute w-9 h-9 rounded-full bg-hv-blue-electric/25 animate-ping" />
                <span className="absolute w-6 h-6 rounded-full bg-hv-blue-electric/40 blur-[6px]" />
                <MousePointer2
                  className="relative w-5 h-5 text-hv-blue-electric drop-shadow-[0_0_10px_rgba(51,104,232,0.8)]"
                  strokeWidth={2}
                  fill="currentColor"
                />
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
