import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const desktopNodes = [
  { id: "hubvision", label: "Hubvision", x: 50, y: 50, size: 80, isMain: true },
  { id: "hubot", label: "HUBOT", x: 25, y: 25, size: 60 },
  { id: "horapoint", label: "HORAPOINT", x: 75, y: 25, size: 60 },
  { id: "hubvendas", label: "Hub Vendas", x: 80, y: 70, size: 60 },
  { id: "totvs", label: "TOTVS", x: 20, y: 70, size: 60 },
  { id: "cloud", label: "Cloud", x: 50, y: 15, size: 50 },
  { id: "api", label: "API", x: 50, y: 85, size: 50 },
];

const mobileNodes = [
  { id: "hubvision", label: "Hubvision", x: 50, y: 50, size: 80, isMain: true },
  { id: "hubot", label: "HUBOT", x: 15, y: 30, size: 60 },
  { id: "horapoint", label: "HORAPOINT", x: 85, y: 30, size: 60 },
  { id: "hubvendas", label: "Hub Vendas", x: 85, y: 70, size: 60 },
  { id: "totvs", label: "TOTVS", x: 15, y: 70, size: 60 },
  { id: "cloud", label: "Cloud", x: 50, y: 10, size: 50 },
  { id: "api", label: "API", x: 50, y: 90, size: 50 },
];

const connections = [
  { from: "hubvision", to: "hubot" },
  { from: "hubvision", to: "horapoint" },
  { from: "hubvision", to: "hubvendas" },
  { from: "hubvision", to: "totvs" },
  { from: "hubvision", to: "cloud" },
  { from: "hubvision", to: "api" },
];

export const Ecosystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile.current = window.innerWidth < 768;
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nodes = isMobile.current ? mobileNodes : desktopNodes;

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-hv-bg-primary py-24 px-6 overflow-hidden">
      <div className="max-w-7xl w-full text-center z-10 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-hv-white"
        >
          Um ecossistema. Diversas possibilidades.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-hv-text-secondary max-w-2xl mx-auto"
        >
          Conectamos tecnologia, parceiros e soluções para criar novas possibilidades para nossos clientes.
        </motion.p>
      </div>

      <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Connections */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(51, 104, 232, 0.35)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: node.isMain ? 0.3 : 0.8 + index * 0.1 
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size / 15}
                fill={node.isMain ? "var(--hv-blue)" : "var(--hv-bg-surface)"}
                stroke={node.isMain ? "var(--hv-blue-electric)" : "rgba(255,255,255,0.1)"}
                strokeWidth="0.5"
                className={node.isMain ? "shadow-[0_0_20px_rgba(51,104,232,0.5)]" : ""}
              />
              {node.isMain && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 10}
                  fill="none"
                  stroke="var(--hv-blue-electric)"
                  strokeWidth="0.2"
                  className="animate-pulse"
                />
              )}
              <text
                x={node.x}
                y={node.y + (node.size / 10) + 2}
                textAnchor="middle"
                fill="var(--hv-white)"
                fontSize="2.5"
                className="font-bold pointer-events-none"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl aspect-square pointer-events-none bg-[radial-gradient(circle,rgba(51,104,232,0.1)_0%,transparent_70%)] z-0" />
    </section>
  );
};
