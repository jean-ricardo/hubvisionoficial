import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-hv-bg-primary pt-20">
      {/* Background Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">

      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-[clamp(2.5rem,8vw,100px)] font-bold tracking-tight text-hv-white leading-[1.1]"
        >
          IDEIAS QUE MOVEM NEGÓCIOS
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
