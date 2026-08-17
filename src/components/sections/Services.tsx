import { motion } from "framer-motion";
import { Cpu, Share2, Lightbulb, BarChart3 } from "lucide-react";

const services = [
  {
    title: "Automação",
    description: "Simplifique fluxos e reduza gargalos operacionais através de processos inteligentes.",
    icon: Cpu,
  },
  {
    title: "Integração",
    description: "Conecte sistemas, dados e departamentos em um ecossistema digital fluido.",
    icon: Share2,
  },
  {
    title: "Inteligência",
    description: "Transforme dados brutos em decisões estratégicas com IA e analytics.",
    icon: Lightbulb,
  },
  {
    title: "Soluções Digitais",
    description: "Produtos digitais escaláveis desenhados para o crescimento do seu negócio.",
    icon: BarChart3,
  },
];

export function Services() {
  return (
    <section className="relative w-full bg-hv-bg-primary py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-hv-white mb-6"
          >
            Tecnologia para desafios reais.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hv-border border border-hv-border rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-hv-bg-surface p-12 transition-all duration-500 hover:bg-hv-bg-highlight"
            >
              <div className="relative z-10">
                <service.icon className="w-10 h-10 text-hv-blue-electric mb-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-hv-white mb-4">
                  {service.title}
                </h3>
                <p className="text-hv-text-secondary leading-relaxed transition-all duration-500 group-hover:text-hv-white max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden">
                  {service.description}
                </p>
                {/* Visual cue for mobile/non-hover */}
                <p className="text-hv-text-secondary leading-relaxed group-hover:hidden block">
                  {service.description.split('.')[0]}.
                </p>
              </div>

              {/* Hover highlight line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-hv-blue-electric transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
