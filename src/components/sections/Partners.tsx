import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

type Partner = {
  name: string;
  logo: string;
  /** Logo branca/monocromática: o destaque vem da superfície do card, não da cor */
  mono?: boolean;
  /** Logo monocromática escura: invertida para branco para ficar legível no card escuro */
  invert?: boolean;
};

const partners: Partner[] = [
  { name: "Amigo", logo: amigo.url },
  { name: "Auto Norte", logo: autoNorte.url },
  { name: "ASA Rent a Car", logo: asa.url },
  { name: "Boku's", logo: bokus.url },
  { name: "Damaq Equipamentos", logo: damaq.url },
  { name: "P&M Polímeros", logo: pmPolimeros.url, mono: true },
  { name: "Divisão Industrial e Marítimo", logo: divisao.url, mono: true, invert: true },
  { name: "Edilimp", logo: edilimp.url },
  { name: "SolPlast", logo: solplast.url },
  { name: "Mauricéa", logo: mauricea.url },
];

const cardBase =
  "relative w-full h-full flex items-center justify-center p-5 rounded-2xl border transition-all duration-[400ms] ease-out";

const cardInteractive = cn(
  cardBase,
  "bg-hv-bg-surface border-[rgba(255,255,255,0.08)]",
  "group-hover:border-[rgba(51,104,232,0.4)] group-hover:shadow-[0_0_40px_rgba(51,104,232,0.25)]"
);

const logoColored =
  "opacity-75 grayscale brightness-[1.8] contrast-[0.9] group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100";

const logoMono =
  "opacity-75 group-hover:opacity-100 group-hover:scale-105";

/** Card usado no marquee (desktop) — revelação via hover */
const MarqueeCard = ({ partner, ariaHidden }: { partner: Partner; ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden}
    className="group relative flex items-center justify-center min-w-[200px] h-28 px-4 shrink-0"
  >
    <div className={cn(cardInteractive, partner.mono && "group-hover:bg-hv-bg-highlight")}>
      <img
        src={partner.logo}
        alt={ariaHidden ? "" : partner.name}
        loading="lazy"
        className={cn(
          "max-h-full max-w-full w-auto object-contain transition-all duration-[400ms] ease-out",
          partner.mono ? logoMono : logoColored,
          partner.invert && "invert"
        )}
      />
    </div>
  </div>
);

/** Card usado no grid estático (mobile) — revelação ao entrar na viewport */
const GridCard = ({ partner, index }: { partner: Partner; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, backgroundColor: "#0D1F45" }}
    whileInView={{
      opacity: 1,
      y: 0,
      backgroundColor: partner.mono ? "#142C68" : "#0D1F45",
    }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
    className={cn(
      cardBase,
      "h-24 border-[rgba(255,255,255,0.08)] shadow-[0_0_40px_rgba(51,104,232,0.12)]"
    )}
  >
    <motion.img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      initial={{
        opacity: 0.75,
        filter: partner.mono
          ? "none"
          : "grayscale(100%) brightness(1.8) contrast(0.9)",
      }}
      whileInView={{
        opacity: 1,
        filter: partner.mono
          ? "none"
          : "grayscale(0%) brightness(1) contrast(1)",
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "max-h-full max-w-full w-auto object-contain",
        partner.invert && "invert"
      )}
    />
  </motion.div>
);

export const Partners = () => {
  // Triplica a lista para um loop contínuo e perfeito
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-hv-bg-primary overflow-hidden relative">
      <div className="container px-4 mx-auto mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-hv-blue-electric font-medium tracking-wider uppercase text-sm mb-4"
        >
          Confiança e Parceria
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-display text-hv-white"
        >
          Empresas que confiam na Hubvision
        </motion.h2>
      </div>

      {/* Marquee infinito — desktop */}
      <div className="hv-marquee relative hidden md:flex items-center py-6">
        {/* Máscaras de fade nas bordas */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-hv-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-hv-bg-primary to-transparent z-10 pointer-events-none" />

        <div className="hv-marquee-track flex whitespace-nowrap items-center">
          {duplicatedPartners.map((partner, index) => (
            <MarqueeCard
              key={`${partner.name}-${index}`}
              partner={partner}
              ariaHidden={index >= partners.length}
            />
          ))}
        </div>
      </div>

      {/* Grid estático — mobile (melhor performance, revela ao entrar na viewport) */}
      <div className="grid grid-cols-2 gap-4 md:hidden container px-4 mx-auto">
        {partners.map((partner, index) => (
          <GridCard key={partner.name} partner={partner} index={index} />
        ))}
      </div>
    </section>
  );
};
