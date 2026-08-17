import { motion } from "framer-motion";

const partners = [
  { name: "TOTVS", logo: "[ Logo ]" },
  { name: "AWS", logo: "[ Logo ]" },
  { name: "Google Cloud", logo: "[ Logo ]" },
  { name: "RD Station", logo: "[ Logo ]" },
  { name: "Meta", logo: "[ Logo ]" },
  { name: "OpenAI", logo: "[ Logo ]" },
  { name: "Microsoft", logo: "[ Logo ]" },
  { name: "Vtex", logo: "[ Logo ]" },
];

export const Partners = () => {
  return (
    <section className="bg-hv-bg-secondary py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-hv-white"
          >
            Construímos conexões que ampliam possibilidades.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-hv-text-secondary max-w-2xl mx-auto"
          >
            Nossa rede de parceiros e associados amplia nossa capacidade de criar, integrar e levar soluções ao mercado.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-32 rounded-xl bg-hv-bg-surface border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all group relative overflow-hidden"
            >
              {/* Logo Placeholder */}
              <span className="text-hv-text-muted text-sm font-bold group-hover:text-hv-white transition-colors relative z-10">
                {partner.name}
              </span>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-hv-blue-electric scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
