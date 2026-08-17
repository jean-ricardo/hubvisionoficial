import { motion } from "framer-motion";

const floatingWords = ["IA", "AUTOMATION", "DATA", "CLOUD", "SCALABILITY", "FUTURE", "INNOVATION"];

export const Future = () => {
  return (
    <section className="bg-hv-bg-primary py-32 md:py-48 px-6 overflow-hidden relative">
      {/* Cinematic Background Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {floatingWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.05
            }}
            animate={{ 
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-hv-white font-bold text-6xl md:text-9xl tracking-tighter whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
        
        {/* Glow Spheres */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-hv-blue-electric/20 rounded-full blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-hv-white tracking-tight leading-[1.1]">
            O futuro não espera. <br className="hidden md:block" />
            <span className="text-hv-blue-electric">Nós também não.</span>
          </h2>
          <p className="text-xl md:text-2xl text-hv-text-secondary max-w-3xl mx-auto leading-relaxed">
            Continuamos explorando novas tecnologias, novos modelos e novas possibilidades para transformar negócios.
          </p>
        </motion.div>
      </div>

      {/* Cinematic Perspective Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-hv-bg-primary z-10" />
    </section>
  );
};
