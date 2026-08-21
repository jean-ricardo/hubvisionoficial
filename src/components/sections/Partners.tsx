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
    <section className="py-16 bg-gradient-to-b from-hv-navy-light/20 to-hv-navy-light/10 overflow-hidden border-y border-white/5">
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap gap-10 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center min-w-[200px] h-24 px-8 rounded-2xl transition-all duration-500 bg-white/90 shadow-sm backdrop-blur-sm opacity-90 hover:opacity-100 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-16 max-w-[180px] w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
