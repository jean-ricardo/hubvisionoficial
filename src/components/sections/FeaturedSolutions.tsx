import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import hubotDashboardAsset from "@/assets/tela-hubot.png.asset.json";
import reguaCobrancaAsset from "@/assets/tela-regua.png.asset.json";
import horapointAsset from "@/assets/tela-horapoint.png.asset.json";
import hubotIconAsset from "@/assets/hubot-icon.png.asset.json";
import horapointIconAsset from "@/assets/horapoint-icon.png.asset.json";
import reguaIconAsset from "@/assets/regua-cobranca-white.png.asset.json";

const solutions = [
  {
    id: "hubot",
    name: "CHATBOT",
    iconUrl: hubotIconAsset.url,
    iconAlt: "Ícone HUBOT",
    benefit: "Chabot - A estrutura por trás de empresas que querem crescer.",
    description: "Muito mais que um chatbot. Centraliza o atendimento no WhatsApp, organiza equipes, automatiza processos e conecta sua operação a sistemas como TOTVS Protheus, CRMs e planilhas. Tudo em uma única plataforma.",
    features: [
      "Atendimento multi-atendente no WhatsApp",
      "Kanban e gestão de equipe",
      "Dashboard de métricas",
      "Integração com TOTVS Protheus",
      "Emissão de boletos e notas fiscais"
    ],
  },
  {
    id: "horapoint",
    name: "HoraPoint",
    iconUrl: horapointIconAsset.url,
    iconAlt: "Ícone HoraPoint",
    benefit: "HoraPoint - Controle real sobre horas, OS e faturamento.",
    description: "Plataforma multi-tenant que unifica o ciclo de serviços, do apontamento de horas ao faturamento. O cliente aprova ou rejeita horas diretamente no portal, eliminando divergências, enquanto o sistema protege cada ordem de serviço contra alterações indevidas.",
    features: [
      "Aprovação de horas pelo cliente",
      "Bloqueio anti-fraude na OS",
      "Isolamento seguro multiempresa",
      "Aceite automático por prazo",
      "Exportação em lote para ERP"
    ],
  },
  {
    id: "regua",
    name: "Régua de Cobrança",
    iconUrl: reguaIconAsset.url,
    iconAlt: "Ícone Régua de Cobrança",
    benefit: "Régua de Cobrança - O dinheiro entra no caixa no tempo certo.",
    description: "Um assistente financeiro automatizado que cobra por você. Você define os pontos exatos da régua\u00a0 3, 10, 15 dias de atraso, por exemplo\u00a0 e o sistema dispara a cobrança no WhatsApp com a 2ª via do boleto já em anexo, sempre em dias úteis.",
    features: [
      "Régua 100% personalizável",
      "Disparo automático no ponto exato",
      "2ª via de boleto em PDF anexada",
      "Operação só em dias úteis",
      "Torre de Controle com histórico completo"
    ],
  },
];

const ParticleBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-hv-blue-electric/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AUTOPLAY_MS = 9000;

export const FeaturedSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToTab = useCallback((idx: number) => {
    setActiveTab(idx);
    setCycleKey((k) => k + 1);
  }, []);

  const handleManualClick = (idx: number) => {
    goToTab(idx);
  };

  useEffect(() => {
    if (reduceMotion) return;
    if (!isInView) return;

    autoplayTimer.current = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % solutions.length);
      setCycleKey((k) => k + 1);
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    };
  }, [activeTab, cycleKey, isInView, reduceMotion]);

  return (
    <section id="plataformas" ref={sectionRef} className="bg-hv-bg-surface py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-hv-white"
          >
            Tecnologia que já está em movimento.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-hv-text-secondary max-w-2xl"
          >
            Conheça as plataformas que estão transformando a realidade de grandes operações B2B.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-8" role="tablist" aria-label="Plataformas Hubvision">
              {solutions.map((sol, idx) => (
                <button
                  key={sol.id}
                  role="tab"
                  aria-selected={activeTab === idx}
                  aria-controls={`tabpanel-${sol.id}`}
                  id={`tab-${sol.id}`}
                  onClick={() => handleManualClick(idx)}
                  className={`flex-1 min-w-[100px] md:flex-none px-4 md:px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeTab === idx
                      ? "bg-hv-blue border-hv-blue-electric text-hv-white shadow-[0_0_20px_rgba(40,88,216,0.3)]"
                      : "bg-transparent border-white/10 text-hv-text-secondary hover:border-white/30"
                  }`}
                >
                  {sol.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {solutions[activeTab] && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-hv-blue/20 flex items-center justify-center text-hv-blue-electric overflow-hidden">
                    <img
                      src={solutions[activeTab].iconUrl}
                      alt={solutions[activeTab].iconAlt}
                      loading="lazy"
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-hv-white mb-4">
                      {solutions[activeTab].name}
                    </h3>
                    <p className="text-hv-blue-electric text-xl font-medium mb-4">
                      {solutions[activeTab].benefit}
                    </p>
                    <p className="text-hv-text-secondary text-lg leading-relaxed mb-6">
                      {solutions[activeTab].description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {solutions[activeTab].features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs font-medium bg-hv-bg-highlight/50 text-hv-white rounded-full border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mockup Column */}
          <div className="relative aspect-[4/3] rounded-2xl bg-hv-bg-secondary border border-white/10 p-4 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 flex items-center px-4 gap-2 border-b border-white/5 z-10">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            
            <div className="mt-8 w-full h-[calc(100%-2rem)] bg-hv-bg-surface/50 rounded-lg overflow-hidden relative flex items-center justify-center border border-white/5">
              {/* Particles Animation */}
              <ParticleBackground />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  src={
                    activeTab === 0
                      ? hubotDashboardAsset.url
                      : activeTab === 1
                        ? horapointAsset.url
                        : reguaCobrancaAsset.url
                  }
                  alt={
                    activeTab === 0
                      ? "Dashboard do HUBOT mostrando estatísticas e atendimentos em tempo real"
                      : activeTab === 1
                        ? "Dashboard do HoraPoint mostrando apontamento de horas e projetos"
                        : "Dashboard da Régua de Cobrança mostrando disparos e valor de cobrança do dia"
                  }
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-left-top relative z-10"
                />
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
