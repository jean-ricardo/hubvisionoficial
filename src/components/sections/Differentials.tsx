import { motion } from "framer-motion";

const differentials = [
  {
    title: "Visão de negócio",
    description: "Entendemos a dor antes de propor a tecnologia. Soluções que falam a língua do ROI.",
  },
  {
    title: "Tecnologia aplicada",
    description: "Não usamos tech por modismo, mas por impacto real. Escalabilidade e segurança como base.",
  },
  {
    title: "Ecossistema",
    description: "Conexões reais com players como TOTVS, ampliando o poder de fogo de cada solução.",
  },
  {
    title: "Execução",
    description: "Ideias são commodity, execução é o diferencial. Entregamos o que prometemos, no tempo certo.",
  },
];

export const Differentials = () => {
  return (
    <section className="bg-hv-bg-light py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-hv-text-on-light"
          >
            O que nos torna diferentes?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-hv-bg-surface/70 max-w-2xl"
          >
            Nossa abordagem une profundidade técnica e pragmatismo comercial para gerar valor contínuo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-hv-text-on-light mb-6 group-hover:text-hv-blue transition-colors">
                {item.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>
              <p className="text-hv-bg-surface/80 text-lg leading-relaxed max-w-sm border-l-2 border-hv-blue pl-6 group-hover:border-hv-blue-electric transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
