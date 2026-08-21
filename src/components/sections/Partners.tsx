import { motion } from "framer-motion";

const partners = [
  { name: "TOTVS", logo: "/lovable-uploads/48e91689-d101-447b-a634-110037f59d43.png" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
];

export const Partners = () => {
  // Triple the partners for a seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-hv-bg-primary overflow-hidden border-y border-white/5">
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center min-w-[160px] h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              {partner.logo.startsWith("http") || partner.logo.startsWith("/") ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-hv-white font-bold">{partner.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Visual edge fades */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-hv-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-hv-bg-primary to-transparent z-10 pointer-events-none" />
    </section>
  );
};
