import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Clientes atendidos", value: 500000, suffix: "+" },
  { label: "Projetos entregues", value: 200, suffix: "+" },
  { label: "Economia gerada", value: 45, suffix: "%" },
  { label: "Empresas parceiras", value: 30, suffix: "+" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });
  
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [spring]);

  const formattedValue = displayValue >= 1000 
    ? (displayValue / 1000).toFixed(displayValue % 1000 === 0 ? 0 : 1) + "k"
    : displayValue;

  return (
    <span ref={ref} className="tabular-nums">
      {formattedValue}{suffix}
    </span>
  );
};

export const Impact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="bg-hv-bg-primary py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-hv-white"
          >
            Tecnologia que gera impacto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-hv-text-secondary max-w-2xl mx-auto"
          >
            Resultados mensuráveis que impulsionam o crescimento e a eficiência de nossos parceiros.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-hv-bg-surface/30 border border-white/5 backdrop-blur-sm"
            >
              <div className="text-4xl md:text-6xl font-bold text-hv-white mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-hv-text-secondary font-medium tracking-wide uppercase text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hv-blue-electric/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hv-blue/20 rounded-full blur-[120px]" />
      </div>
    </section>
  );
};
