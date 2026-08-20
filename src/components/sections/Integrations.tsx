import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Database, ShieldCheck, Share2, Smartphone, BarChart3, Users } from "lucide-react";
import seloTotvs from "@/assets/selo-canal-homologado-totvs.png.asset.json";

const nodes = [
  { id: "hubvision", label: "Hubvision", icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "totvs", label: "TOTVS", icon: <Database className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "crm", label: "CRM", icon: <Users className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "dados", label: "Dados", icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" /> },
  { id: "operacao", label: "Operação", icon: <Share2 className="w-6 h-6 md:w-8 md:h-8" /> },
];

export const Integrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodePositions, setNodePositions] = useState<{ x: number, y: number }[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: containerRect.width, height: containerRect.height });

        const cards = containerRef.current.querySelectorAll('.node-card');
        const positions = Array.from(cards).map(card => {
          const rect = card.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          };
        });
        setNodePositions(positions);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="bg-hv-bg-secondary py-24 px-6 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-hv-white"
          >
            Tecnologia que conversa com o seu negócio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-hv-text-secondary max-w-3xl mx-auto"
          >
            Somos canal homologado TOTVS, conectando tecnologia e gestão para otimizar processos, automatizar operações e ampliar o controle sobre o negócio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-12 flex justify-center"
          >
            <div className="group relative inline-flex items-center gap-5 rounded-2xl border border-hv-blue-electric/30 bg-hv-bg-surface/70 px-6 py-5 backdrop-blur-sm shadow-[0_0_40px_var(--hv-glow)] transition-colors hover:border-hv-blue-electric/60">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-hv-blue-electric/10 via-transparent to-hv-blue-electric/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img
                src={seloTotvs.url}
                alt="Hubvision é Canal Homologado TOTVS"
                loading="lazy"
                className="relative z-10 h-16 md:h-20 w-auto rounded-lg"
              />
              <div className="relative z-10 hidden sm:block text-left border-l border-white/10 pl-5">
                <p className="text-hv-blue-electric text-xs font-semibold tracking-[0.18em] uppercase">
                  Parceria oficial
                </p>
                <p className="text-hv-white font-semibold mt-1">
                  Canal Homologado TOTVS
                </p>
                <p className="text-hv-text-muted text-sm mt-0.5">
                  Implantação e integração certificadas
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative py-12 min-h-[400px] md:min-h-[200px]">
          {/* SVG Connection System */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--hv-blue-electric)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--hv-blue-electric)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--hv-blue-electric)" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {nodePositions.length > 1 && nodePositions.map((pos, i) => {
              if (i === nodePositions.length - 1) return null;
              const nextPos = nodePositions[i + 1];
              
              return (
                <g key={`connection-${i}`}>
                  {/* Static connection path */}
                  <motion.path
                    d={`M ${pos.x} ${pos.y} L ${nextPos.x} ${nextPos.y}`}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-hv-blue-electric/20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                  />
                  
                  {/* Animated "data flow" pulse */}
                  <motion.circle
                    r="2.5"
                    fill="var(--hv-blue-electric)"
                    filter="blur(1px)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.6
                    }}
                    style={{
                      offsetPath: `path('M ${pos.x} ${pos.y} L ${nextPos.x} ${nextPos.y}')`,
                      boxShadow: "0 0 10px var(--hv-blue-electric)"
                    }}
                  />
                </g>
              );
            })}
          </svg>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 relative z-10">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1 
                }}
                className="flex flex-col items-center group"
              >
                <div className="node-card w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-hv-bg-surface/80 border border-white/10 flex items-center justify-center text-hv-blue-electric mb-4 group-hover:border-hv-blue-electric/50 transition-all duration-500 shadow-2xl relative overflow-hidden backdrop-blur-md hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-hv-blue-electric/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    {node.icon}
                  </div>
                  
                  {/* Inner ring */}
                  <div className="absolute inset-2 border border-white/5 rounded-[1.25rem] pointer-events-none" />
                </div>
                
                <span className="text-hv-white font-medium text-sm md:text-base tracking-wide group-hover:text-hv-blue-electric transition-colors duration-300">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
