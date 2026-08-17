import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, Layout, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    id: "hubot",
    name: "HUBOT",
    benefit: "Atendimento inteligente que nunca para",
    description: "Automação de diálogos com inteligência artificial para escalar seu suporte e vendas 24/7.",
    icon: <Layout className="w-6 h-6" />,
    features: ["IA Conversacional", "Omnichannel", "Integração CRM"],
  },
  {
    id: "horapoint",
    name: "HORAPOINT",
    benefit: "Gestão de tempo com precisão estratégica",
    description: "Controle de ponto e gestão de jornada com foco em conformidade e produtividade.",
    icon: <Clock className="w-6 h-6" />,
    features: ["Reconhecimento Facial", "Geolocalização", "Relatórios Fiscais"],
  },
  {
    id: "hubvendas",
    name: "Hub Vendas",
    benefit: "Potencialize sua conversão comercial",
    description: "Ferramentas integradas para gerenciar leads, acelerar o funil e fechar mais negócios.",
    icon: <TrendingUp className="w-6 h-6" />,
    features: ["Automação de Leads", "Dashboard Real-time", "Pipeline Flexível"],
  },
];

export const FeaturedSolutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-hv-bg-surface py-24 px-6 overflow-hidden">
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
            <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
              {solutions.map((sol, idx) => (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(idx)}
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
                  <div className="w-12 h-12 rounded-xl bg-hv-blue/20 flex items-center justify-center text-hv-blue-electric">
                    {solutions[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-hv-white mb-2">
                      {solutions[activeTab].name}
                    </h3>
                    <p className="text-hv-blue-electric text-xl font-medium mb-4">
                      {solutions[activeTab].benefit}
                    </p>
                    <p className="text-hv-text-secondary text-lg leading-relaxed">
                      {solutions[activeTab].description}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {solutions[activeTab].features.map((feature, i) => (
                      <li key={i} className="flex items-center text-hv-white">
                        <ChevronRight className="w-4 h-4 text-hv-blue-electric mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary" size="lg" className="mt-8">
                    Saiba mais
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mockup Column */}
          <div className="relative aspect-[4/3] rounded-2xl bg-hv-bg-secondary border border-white/10 p-4 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-8 flex items-center px-4 gap-2 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            
            <div className="mt-8 w-full h-full bg-hv-bg-surface/50 rounded-lg overflow-hidden relative flex items-center justify-center border border-white/5">
              <AnimatePresence mode="wait">
                {solutions[activeTab] && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="text-hv-text-muted text-sm font-mono flex flex-col items-center gap-4"
                  >
                    <div className="w-48 h-32 bg-hv-bg-highlight/50 rounded flex items-center justify-center">
                       [ Mockup {solutions[activeTab].name} ] {/* TODO: Content - Replace with real product screenshot */}
                    </div>
                    <div className="space-y-2 w-full max-w-xs">
                      <div className="h-2 w-3/4 bg-white/5 rounded" />
                      <div className="h-2 w-1/2 bg-white/5 rounded" />
                      <div className="h-2 w-2/3 bg-white/5 rounded" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/4 w-24 h-24 rounded-lg bg-hv-blue/20 backdrop-blur-sm border border-hv-blue/30 z-20 flex items-center justify-center"
              >
                <div className="w-12 h-2 bg-hv-blue-electric/40 rounded" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 left-1/4 w-32 h-16 rounded-lg bg-hv-bg-highlight/40 backdrop-blur-sm border border-white/10 z-20 flex flex-col gap-2 p-3"
              >
                <div className="w-full h-1 bg-white/10 rounded" />
                <div className="w-2/3 h-1 bg-white/10 rounded" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
