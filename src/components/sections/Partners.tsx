import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import amigo from "@/assets/amigo.png.asset.json";
import autoNorte from "@/assets/auto-norte.png.asset.json";
import asa from "@/assets/asa-rent-a-car.png.asset.json";
import bokus from "@/assets/bokus.png.asset.json";
import damaq from "@/assets/damaq.png.asset.json";
import divisao from "@/assets/divisao.png.asset.json";
import edilimp from "@/assets/edilimp.png.asset.json";
import mauricea from "@/assets/mauricea.png.asset.json";
import rmPolimeros from "@/assets/rm-polimeros.png.asset.json";
import solPlast from "@/assets/sol-plast.png.asset.json";

type Partner = {
  name: string;
  logo: string;
  /** Grupo B — logo sem cor própria (branca): o destaque vem da superfície do card, não da cor */
  mono?: boolean;
  /** Ajuste fino de altura para logos com muito espaço interno */
  sizeClass?: string;
};

/** Altura maior para logos com margens internas grandes */
const logoSizeLarge = "h-12 md:h-[58px] w-auto object-contain";
/** Altura extra para logos que precisam de destaque visual */
const logoSizeXLarge = "h-14 md:h-[68px] w-auto object-contain";
/** Altura máxima para logos que ainda precisam de mais presença */
const logoSizeMax = "h-16 md:h-[78px] w-auto object-contain";

// Logos já tratadas (fundo removido, margens normalizadas) — usar como estão.
const partners: Partner[] = [
  { name: "Amigo", logo: amigo.url },
  { name: "Auto Norte", logo: autoNorte.url, sizeClass: logoSizeLarge },
  { name: "ASA Rent a Car", logo: asa.url, sizeClass: logoSizeXLarge },
  { name: "Boku's", logo: bokus.url, sizeClass: logoSizeMax },
  { name: "Damaq Equipamentos", logo: damaq.url },
  { name: "Divisão Industrial e Marítimo", logo: divisao.url, mono: true },
  { name: "Edilimp", logo: edilimp.url, sizeClass: logoSizeLarge },
  { name: "Mauricéa", logo: mauricea.url, sizeClass: logoSizeLarge },
  { name: "R&M Polímeros", logo: rmPolimeros.url },
  { name: "SolPlast", logo: solPlast.url },
];

const cardBase =
  "relative w-full h-full flex items-center justify-center p-5 rounded-2xl border transition-all duration-[400ms] ease-out";

const cardInteractive = cn(
  cardBase,
  "bg-hv-bg-surface border-[rgba(255,255,255,0.08)]",
  "group-hover:border-[rgba(51,104,232,0.4)] group-hover:shadow-[0_0_40px_rgba(51,104,232,0.25)]"
);

/** Grupo A — logos coloridas: repouso em cinza dessaturado, cor real no hover */
const logoColored =
  "opacity-75 grayscale brightness-[1.8] contrast-[0.9] group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100";

/** Grupo B — logo branca/monocromática: destaque pela luz do card */
const logoMono = "opacity-75 group-hover:opacity-100 group-hover:scale-105";

/** Altura padronizada — os arquivos já têm margens normalizadas, sem ajuste por logo */
const logoSize = "h-9 md:h-[42px] w-auto object-contain";

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
          partner.sizeClass ?? logoSize,
          "transition-all duration-[400ms] ease-out",
          partner.mono ? logoMono : logoColored
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
      className={partner.sizeClass ?? logoSize}
    />
  </motion.div>
);

export const Partners = () => {
  // Triplica a lista para um loop contínuo e sem emenda em qualquer largura
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
        {/* Máscaras de fade nas bordas (#071329 → transparente) */}
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
