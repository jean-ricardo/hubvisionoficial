import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import galpaoFabricaImage from "@/assets/galpao-de-fabrica.jpg.asset.json";
import cientistaLaboratorioImage from "@/assets/cientista-laboratorio.jpg.asset.json";

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
    challenge: "Busca constante por segunda via de boletos, exigindo que a equipe realizasse o processo manualmente.",
    solution: "Chatbot automatizado para solicitar e enviar a segunda via do boleto de forma rápida e autônoma.",
    result: "+70% de automação na segunda via, com +3 mil boletos enviados por mês.",
    image: cientistaLaboratorioImage.url,
    hideButton: true,
    hideTag: true,
  },
];

export const Cases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section id="cases" className="bg-hv-bg-primary py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
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

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={prevCase}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-hv-white hover:bg-hv-blue-electric hover:border-hv-blue-electric transition-all duration-300 group"
            aria-label="Case anterior"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextCase}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-hv-white hover:bg-hv-blue-electric hover:border-hv-blue-electric transition-all duration-300 group"
            aria-label="Próximo case"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative h-[600px] md:h-[500px]">
        <AnimatePresence mode="wait">
          {cases[currentIndex] && (
            <motion.div
              key={cases[currentIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full relative rounded-2xl overflow-hidden group shadow-2xl"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${cases[currentIndex].image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-hv-bg-primary transition-opacity duration-500 opacity-50 group-hover:opacity-70 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-hv-bg-primary via-hv-bg-primary/40 to-transparent opacity-100 z-20" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end z-30">
                <div className="max-w-4xl">
                  {!cases[currentIndex].hideTag && (
                    <span className="inline-block px-4 py-1 rounded-full bg-hv-blue-electric/20 border border-hv-blue-electric/30 text-hv-blue-electric text-sm font-semibold mb-6">
                      Case: {cases[currentIndex].client}
                    </span>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="space-y-4">
                      <h4 className="text-hv-white text-sm uppercase tracking-widest font-bold border-b border-hv-blue-electric/30 pb-2 mb-2 w-fit">O Desafio</h4>
                      <p className="text-hv-white text-xl font-medium leading-relaxed drop-shadow-lg">{cases[currentIndex].challenge}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-hv-white text-sm uppercase tracking-widest font-bold border-b border-hv-blue-electric/30 pb-2 mb-2 w-fit">A Solução</h4>
                      <p className="text-hv-white text-xl font-medium leading-relaxed drop-shadow-lg">{cases[currentIndex].solution}</p>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pt-8 border-t border-white/10">
                    <div>
                      <h4 className="text-hv-white text-sm uppercase tracking-widest font-bold mb-2">Resultado</h4>
                      <p className="text-3xl md:text-4xl font-bold text-hv-blue-electric drop-shadow-lg">{cases[currentIndex].result}</p>
                    </div>
                    {!cases[currentIndex].hideButton && (
                      <Button variant="secondary" className="group/btn h-12 px-8 text-base">
                        Ver case completo
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center gap-3 mt-12">
        {cases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              currentIndex === idx ? "w-8 bg-hv-blue-electric" : "w-4 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
