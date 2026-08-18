import { motion } from "framer-motion";
import stickerAsset from "@/assets/Adesivo_4.png.asset.json";

export function WhoWeAre() {
  return (
    <section id="whoweare" className="relative w-full bg-hv-bg-light py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-square lg:aspect-[4/5] w-full bg-hv-bg-surface rounded-2xl overflow-hidden shadow-2xl group border border-white/5"
          >
            <img
              src={stickerAsset.url}
              alt="Hubvision - Inovação e Negócios"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Subtle overlay to keep the image anchored to the navy palette */}
            <div className="absolute inset-0 bg-hv-bg-primary/10 mix-blend-multiply pointer-events-none" />
            
            {/* Decorative navy/blue elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-hv-bg-primary/60 to-transparent" />
            <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-hv-blue-electric/30 rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-hv-blue-electric/30 rounded-bl-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hv-text-on-light mb-8">
              Somos a HubVision
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
