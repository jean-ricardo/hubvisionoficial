import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-hv-bg-primary pt-20">
      {/* Background Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(135deg, #071329 0%, #0D1F45 45%, #2858D8 100%)",
          }}
        />
        <motion.div
          animate={shouldReduceMotion ? { opacity: 0.4 } : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(51,104,232,0.45) 0%, rgba(51,104,232,0.15) 35%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-[clamp(2.5rem,8vw,100px)] font-bold tracking-tight text-hv-white leading-[1.1]"
        >
          IDEIAS QUE MOVEM NEGÓCIOS.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-lg text-hv-text-secondary md:text-xl lg:text-2xl"
        >
          Transformamos ideias em soluções de tecnologia que conectam pessoas,
          processos e negócios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => window.location.hash = 'contact'}>
            Fale conosco
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => window.location.hash = 'solutions'}>
            Explorar
          </Button>
        </motion.div>
      </div>

      {/* Decorative lines or particles can be added here for more depth */}
    </section>
  );
}
