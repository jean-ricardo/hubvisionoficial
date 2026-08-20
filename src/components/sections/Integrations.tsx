import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import seloTotvs from "@/assets/selo-canal-homologado-totvs.png.asset.json";

export const Integrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

        <div className="relative py-12 flex justify-center">
          <div className="text-hv-text-muted text-sm italic">
            Visualização de ecossistema em atualização
          </div>
        </div>
      </div>
    </section>
  );
};
