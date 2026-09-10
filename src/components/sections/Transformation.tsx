import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const DWELL_MS = 4500;
const RESUME_MS = 4000;

const steps = [
  {
    word: "IDEIA",
    color: "var(--hv-white)",
    subtitle: "Tudo começa com uma provocação: e se esse processo pudesse ser mais simples?",
  },
  {
    word: "TECNOLOGIA",
    color: "var(--hv-blue-electric)",
    subtitle: "Escolhemos as ferramentas certas e desenhamos a arquitetura que sustenta a ideia.",
  },
  {
    word: "SOLUÇÃO",
    color: "var(--hv-white)",
    subtitle: "Construímos algo aplicável, escalável e pronto para o dia a dia do negócio.",
  },
  {
    word: "RESULTADO",
    color: "#F5A623",
    subtitle: "Eficiência que aparece nos números, no tempo da equipe e na experiência do cliente.",
  },
];

export function Transformation() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });

  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [cycleKey, setCycleKey] = useState(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const running = !reduceMotion && autoplay && inView;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % steps.length);
      setCycleKey((k) => k + 1);
    }, DWELL_MS);
    return () => clearTimeout(id);
  }, [running, index, cycleKey]);

  const pause = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setAutoplay(false);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      setAutoplay(true);
      setCycleKey((k) => k + 1);
    }, RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const goTo = (i: number) => {
    setIndex(i);
    setCycleKey((k) => k + 1);
    if (!reduceMotion) {
      setAutoplay(true);
    }
  };

  const active = steps[index] ?? steps[0]!;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-hv-bg-secondary py-32"
    >
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, var(--hv-text-muted) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="relative flex h-40 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h2
              key={active.word}
              initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? {} : { opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: active.color }}
              className="absolute whitespace-nowrap text-[clamp(2.5rem,12vw,9rem)] font-bold uppercase tracking-tighter"
            >
              {active.word}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex min-h-24 items-start justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active.subtitle}
              initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? {} : { opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl text-xl text-hv-text-secondary md:text-2xl"
            >
              {active.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {steps.map((step, i) => (
            <div key={step.word} className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver etapa ${step.word}`}
                aria-current={i === index}
                className="relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hv-blue-electric"
              >
                {i === index && !reduceMotion && (
                  <svg className="absolute h-7 w-7 -rotate-90" viewBox="0 0 32 32" aria-hidden="true">
                    <circle cx="16" cy="16" r="14" fill="none" strokeWidth="2" className="stroke-hv-white/10" />
                    <motion.circle
                      key={`${index}-${cycleKey}-${running}`}
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      strokeWidth="2"
                      stroke="var(--hv-blue-electric)"
                      strokeLinecap="round"
                      pathLength={1}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: running ? 1 : 0.001 }}
                      transition={{ duration: running ? DWELL_MS / 1000 : 0, ease: "linear" }}
                    />
                  </svg>
                )}
                <span
                  className="h-3 w-3 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: i === index ? "var(--hv-blue-electric)" : "rgba(255,255,255,0.1)" }}
                />
              </button>
              {i < steps.length - 1 && <div className="h-[1px] w-8 bg-hv-white/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
