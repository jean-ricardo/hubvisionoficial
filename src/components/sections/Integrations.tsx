import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, ShieldCheck, Share2, Smartphone, BarChart3, Users } from "lucide-react";

const nodes = [
  { id: "hubvision", label: "Hubvision", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: "totvs", label: "TOTVS", icon: <Database className="w-6 h-6" /> },
  { id: "crm", label: "CRM", icon: <Users className="w-6 h-6" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <Smartphone className="w-6 h-6" /> },
  { id: "dados", label: "Dados", icon: <BarChart3 className="w-6 h-6" /> },
  { id: "operacao", label: "Operação", icon: <Share2 className="w-6 h-6" /> },
];

export const Integrations = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
            Tecnologia que conversa com o seu negócio.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-hv-text-secondary max-w-3xl mx-auto"
          >
            Somos canal homologado TOTVS, conectando tecnologia e gestão para otimizar processos, automatizar operações e ampliar o controle sobre o negócio.
          </motion.p>
        </div>

        <div className="relative py-12">
          {/* Connection Lines Background */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-hv-blue/20 to-transparent -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 relative z-10">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-hv-bg-surface border border-white/10 flex items-center justify-center text-hv-blue-electric mb-4 group-hover:border-hv-blue-electric/50 transition-colors shadow-xl relative overflow-hidden">
                  {node.icon}
                  
                  {/* Data packet animation */}
                  {index < nodes.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                      className="absolute top-1/2 right-0 w-1 h-1 bg-hv-blue-electric rounded-full shadow-[0_0_8px_var(--hv-blue-electric)] hidden md:block"
                    />
                  )}
                </div>
                <span className="text-hv-white font-semibold text-sm md:text-base">
                  {node.label}
                </span>
                {index < nodes.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 left-[calc(100%/12+(index*100%/6))] w-[calc(100%/6)] h-[2px] pointer-events-none">
                     <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="w-full h-full bg-hv-blue-electric/30 origin-left"
                     />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
