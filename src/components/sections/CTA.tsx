import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="bg-hv-blue py-32 px-6 overflow-hidden relative">
      {/* Background Micro-animations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-hv-blue-electric rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-hv-white mb-8 leading-tight">
            Temos uma ideia. E ela pode transformar seu negócio.
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Conte-nos o desafio. Nós ajudamos a encontrar a solução que conecta seu negócio ao futuro.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-hv-blue hover:bg-hv-bg-light h-16 px-10 text-xl font-bold shadow-[0_0_50px_rgba(255,255,255,0.3)] group transition-all"
              >
                Vamos conversar
                <ArrowUpRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </motion.div>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 h-16 px-10 text-xl"
            >
              Nossas soluções
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
