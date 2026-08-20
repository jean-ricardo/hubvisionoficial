import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import galpaoFabricaImage from "@/assets/galpao-de-fabrica.jpg.asset.json";

const cases = [
  {
    id: "amigotech",
    client: "Amigotech",
    challenge: "Dificuldade em controlar cobranças e identificar quais boletos deveriam ser cobrados em cada data.",
    solution: "Régua de Cobranças: disparos automáticos para centenas de clientes, no dia e horário programados.",
    result: "35% de aumento nas baixas de títulos, com mais eficiência e menos processos manuais.",
    image: galpaoFabricaImage.url,
    hideButton: true,
    hideTag: true,
  },
  {
    id: "asalocadora",
    client: "ASA Locadora",
    challenge: "Dificuldade no controle de jornada e conformidade fiscal para uma frota distribuída nacionalmente.",
    solution: "Adoção do HORAPOINT com geolocalização e reconhecimento facial, centralizando a gestão em tempo real.",
    result: "Redução de 90% em inconsistências de folha de pagamento.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
  },
];

export const Cases = () => {
  const containerRef = useRef(null);

  return (
    <section id="cases" className="bg-hv-bg-primary py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-hv-white"
        >
          Quando tecnologia encontra o desafio certo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-hv-text-secondary max-w-2xl"
        >
          Acompanhe como transformamos complexidade em resultados reais para nossos clientes.
        </motion.p>
      </div>

      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar px-6 -mx-6 md:px-0 md:mx-0">
        {cases.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="min-w-[90vw] md:min-w-[70vw] lg:min-w-[800px] aspect-[4/5] md:aspect-[16/9] relative rounded-2xl overflow-hidden snap-center group"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-hv-bg-primary via-hv-bg-primary/95 to-hv-bg-primary/40 opacity-100 transition-opacity" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end">
              <div className="max-w-3xl">
                {!item.hideTag && (
                  <span className="inline-block px-4 py-1 rounded-full bg-hv-blue-electric/20 border border-hv-blue-electric/30 text-hv-blue-electric text-sm font-semibold mb-6">
                    Case: {item.client}
                  </span>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                  <div className="space-y-4">
                    <h4 className="text-hv-text-muted text-xs uppercase tracking-widest font-bold">O Desafio</h4>
                    <p className="text-hv-white text-lg font-medium leading-relaxed">{item.challenge}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-hv-text-muted text-xs uppercase tracking-widest font-bold">A Solução</h4>
                    <p className="text-hv-white text-lg font-medium leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pt-8 border-t border-white/10">
                  <div>
                    <h4 className="text-hv-text-muted text-xs uppercase tracking-widest font-bold mb-2">Resultado</h4>
                    <p className="text-2xl md:text-3xl font-bold text-hv-blue-electric">{item.result}</p>
                  </div>
                  {!item.hideButton && (
                    <Button variant="secondary" className="group/btn">
                      Ver case completo
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
