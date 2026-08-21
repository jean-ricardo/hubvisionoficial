import { motion } from "framer-motion";
import amigo from "@/assets/cliente-amigo.png.asset.json";
import autoNorte from "@/assets/cliente-auto-norte.png.asset.json";
import asa from "@/assets/cliente-asa.png.asset.json";
import bokus from "@/assets/cliente-bokus.png.asset.json";
import damaq from "@/assets/cliente-damaq.png.asset.json";
import pmPolimeros from "@/assets/cliente-pm-polimeros.png.asset.json";
import divisao from "@/assets/cliente-divisao.png.asset.json";
import edilimp from "@/assets/cliente-edilimp.png.asset.json";
import solplast from "@/assets/cliente-solplast.png.asset.json";
import mauricea from "@/assets/cliente-mauricea.webp.asset.json";

type Partner = { name: string; logo: string; light?: boolean };

const partners: Partner[] = [
  { name: "Amigo", logo: amigo.url },
  { name: "Auto Norte", logo: autoNorte.url },
  { name: "ASA Rent a Car", logo: asa.url },
  { name: "Boku's", logo: bokus.url },
  { name: "Damaq Equipamentos", logo: damaq.url },
  { name: "P&M Polímeros", logo: pmPolimeros.url, light: true },
  { name: "Divisão Industrial e Marítimo", logo: divisao.url },
  { name: "Edilimp", logo: edilimp.url },
  { name: "SolPlast", logo: solplast.url },
  { name: "Mauricéa", logo: mauricea.url },
];

export const Partners = () => {
  // Triple the partners for a seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-hv-bg-primary overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
      
      <div className="container px-4 mx-auto mb-12 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-hv-blue-light font-medium tracking-wider uppercase text-sm mb-4"
        >
          Confiança e Parceria
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display text-white"
        >
          Empresas que confiam na Hubvision
        </motion.h2>
      </div>

      <div className="relative flex items-center py-10">
        {/* Left/Right masks for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-hv-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-hv-bg-primary to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-8 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <motion.div
              key={`${partner.name}-${index}`}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group relative flex items-center justify-center min-w-[200px] h-28 px-8"
            >
              {/* Animated particle-like background elements around the card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-hv-blue-light rounded-full"
                    animate={{
                      y: [0, -20, -40],
                      x: [0, (i % 2 === 0 ? 20 : -20), (i % 2 === 0 ? 40 : -40)],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut",
                    }}
                    style={{
                      left: `${20 + i * 12}%`,
                      top: '50%',
                    }}
                  />
                ))}
              </div>

              {/* Glowing outer ring */}
              <div className="absolute inset-2 rounded-2xl bg-hv-blue-light/0 group-hover:bg-hv-blue-light/5 blur-xl transition-all duration-500" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4 bg-[#3166E2] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden group-hover:shadow-[0_8px_30px_rgba(49,102,226,0.3)] transition-all duration-300">
                {/* Internal light sheen animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="relative z-10 max-h-full max-w-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
