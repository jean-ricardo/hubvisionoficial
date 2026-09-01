import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/hubvision-logo-white.png.asset.json";
import { openWhatsApp } from "@/lib/whatsapp";

const HEADER_OFFSET = 80;

type NavLink = { label: string; id: string; to?: "/novidades" };

const NAV_LINKS: NavLink[] = [
  { label: "Quem Somos", id: "quem-somos" },
  { label: "Soluções", id: "solucoes" },
  { label: "Plataformas", id: "plataformas" },
  { label: "Parceiros", id: "parceiros" },
  { label: "Cases", id: "cases" },
  { label: "Novidades", id: "novidades", to: "/novidades" },
  { label: "Contato", id: "contact" },
];


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy: seção cujo topo já passou pela linha do header
      let current: string | null = null;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - HEADER_OFFSET - 8;
        if (top <= 0) current = link.id;
      }
      setActiveId(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      // Em páginas internas, volta para a home na âncora correspondente
      window.location.href = `/#${id}`;
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);


  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-hv-bg-primary/80 py-4 backdrop-blur-md border-b border-hv-border"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoAsset.url}
            alt="HubVision"
            className="h-7 w-auto sm:h-8 md:h-10 lg:h-11 transition-all"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            const className = clsx(
              "relative py-1 text-xs xl:text-sm font-medium font-inter transition-colors whitespace-nowrap",
              isActive ? "text-hv-white" : "text-hv-text-secondary hover:text-hv-white"
            );
            const underline = isActive ? (
              <motion.span
                layoutId="nav-active-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-hv-blue-electric"
              />
            ) : null;

            if (link.to) {
              return (
                <Link
                  key={link.id}
                  to={link.to}
                  className={className}
                  activeProps={{ className: clsx(className, "text-hv-white") }}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={className}
              >
                {link.label}
                {underline}
              </a>
            );
          })}

        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => openWhatsApp()}
          >
            Fale conosco
          </Button>

          <button
            className="lg:hidden text-hv-white p-2"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-hv-bg-surface pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link, idx) => {
                const itemClass = clsx(
                  "text-2xl font-bold border-b border-hv-border pb-4",
                  activeId === link.id ? "text-hv-white" : "text-hv-text-secondary"
                );

                if (link.to) {
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        className={clsx(itemClass, "block")}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className={itemClass}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(link.id), 120);
                  }}
                >
                  {link.label}
                </motion.a>
                );
              })}

            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-12"
            >
              <Button
                className="w-full h-16 text-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWhatsApp();
                }}
              >
                Fale conosco
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
