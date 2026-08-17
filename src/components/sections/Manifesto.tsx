import { motion } from "framer-motion";

export function Manifesto() {
  const words = [
    { text: "Toda", highlight: false },
    { text: "transformação", highlight: false },
    { text: "começa", highlight: false },
    { text: "com", highlight: false },
    { text: "uma", highlight: false },
    { text: "ideia.", highlight: true },
  ];

  const supportText = "Mas uma ideia só ganha valor quando encontra tecnologia, pessoas e execução. É aí que entramos.";
  const keywords = ["tecnologia", "pessoas", "execução"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const renderTextWithHighlights = (text: string, highlights: string[]) => {
    const parts = text.split(new RegExp(`(${highlights.join("|")})`, "gi"));
    return parts.map((part, i) => {
      const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
      return (
        <span key={i} className={isHighlight ? "text-hv-blue-electric font-semibold" : ""}>
          {part}
        </span>
      );
    });
  };

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center bg-hv-bg-primary py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-hv-white mb-12 leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={item}
                className={`inline-block mr-[0.2em] ${word.highlight ? "text-hv-blue-electric" : ""}`}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl lg:text-3xl text-hv-text-secondary leading-relaxed max-w-3xl mx-auto"
          >
            {renderTextWithHighlights(supportText, keywords)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
