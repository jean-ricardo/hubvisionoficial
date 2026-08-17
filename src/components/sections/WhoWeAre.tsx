import { motion } from "framer-motion";

export function WhoWeAre() {
  return (
    <section className="relative w-full bg-hv-bg-light py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-square lg:aspect-[4/5] w-full bg-hv-bg-surface rounded-2xl overflow-hidden shadow-2xl group border border-white/5"
          >
            {/* TODO: Content - Replace with real team/office photography */}
            {/* Placeholder for real team photo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--hv-blue-electric)_0%,transparent_70%)] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            
            {/* Decorative navy/blue elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-hv-bg-primary/40 to-transparent" />
            <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-hv-blue-electric/30 rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-hv-blue-electric/30 rounded-bl-xl" />
            
            <motion.div 
              style={{ y: "-10%" }}
              whileInView={{ y: "0%" }}
              transition={{ type: "spring", stiffness: 30, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center text-hv-white/10 font-bold text-8xl pointer-events-none uppercase tracking-tighter"
            >
              Hubvision
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hv-text-on-light mb-8">
              Somos a Hubvision.
            </h2>
            <p className="text-xl md:text-2xl text-hv-bg-primary/80 leading-relaxed mb-8">
              Somos uma empresa de tecnologia que transforma ideias em soluções capazes de simplificar operações, conectar negócios e gerar resultados.
            </p>
            <div className="h-1 w-20 bg-hv-blue-electric rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
