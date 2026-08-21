import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = ["IDEIA", "TECNOLOGIA", "SOLUÇÃO", "RESULTADO"];

  return (
    <div ref={containerRef} className="relative h-[300vh] md:h-[400vh]">
      <section className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-hv-bg-secondary">
        {/* Decorative dots */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Particle dots */}
          <div className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, var(--hv-text-muted) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="relative h-40 flex items-center justify-center">
            {steps.map((step, index) => {
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, 
                [start, start + 0.1, end - 0.1, end], 
                [0, 1, 1, 0]
              );
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0.8, 1, 1, 0.8]
              );

              return (
                <motion.h2
                  key={step}
                  style={{ opacity, scale }}
                  className="absolute text-[clamp(2.5rem,12vw,9rem)] font-bold tracking-tighter text-hv-white whitespace-nowrap uppercase"
                >
                  {step}
                </motion.h2>
              );
            })}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-xl md:text-2xl text-hv-text-secondary max-w-2xl mx-auto"
          >
            Desenvolvemos ideias e transformamos possibilidades em soluções aplicáveis, escaláveis e comercializáveis.
          </motion.p>
          
          {/* Connection Line */}
          <div className="mt-12 flex justify-center items-center gap-4">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <motion.div 
                  style={{ 
                    backgroundColor: useTransform(
                      scrollYProgress, 
                      [i/steps.length, (i+0.5)/steps.length], 
                      ["rgba(255,255,255,0.1)", "var(--hv-blue-electric)"]
                    )
                  }}
                  className="w-3 h-3 rounded-full" 
                />
                {i < steps.length - 1 && (
                  <div className="w-8 h-[1px] bg-hv-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
