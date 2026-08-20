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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex flex-col items-center"
          >
            <div className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-10 rounded-[2rem] border border-hv-blue-electric/40 bg-hv-bg-surface/80 p-8 md:p-12 backdrop-blur-md shadow-[0_0_60px_rgba(0,210,255,0.15)] transition-all duration-500 hover:border-hv-blue-electric/70 hover:shadow-[0_0_80px_rgba(0,210,255,0.25)] hover:scale-[1.02]">
              <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-hv-blue-electric/20 via-transparent to-hv-blue-electric/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                <img
                  src={seloTotvs.url}
                  alt="Hubvision é Canal Homologado TOTVS"
                  loading="lazy"
                  className="h-28 md:h-40 w-auto rounded-xl shadow-2xl"
                />
              </div>

              <div className="relative z-10 text-center md:text-left md:border-l md:border-white/10 md:pl-10">
                <p className="text-hv-blue-electric text-sm md:text-base font-bold tracking-[0.25em] uppercase mb-3">
                  Parceria Estratégica
                </p>
                <h3 className="text-hv-white text-2xl md:text-4xl font-bold mb-4">
                  Canal Homologado TOTVS
                </h3>
                <p className="text-hv-text-secondary text-base md:text-lg max-w-md leading-relaxed">
                  Experiência certificada em implantação, consultoria e integrações complexas para elevar o patamar da sua operação.
                </p>
                
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                  {["Implantação", "Integração", "Consultoria"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-hv-blue-electric/10 border border-hv-blue-electric/20 text-hv-blue-electric text-xs font-semibold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 text-hv-blue-electric/30 text-xs tracking-[0.5em] uppercase font-bold animate-pulse">
              Conectividade Hubvision
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
