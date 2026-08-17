import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoAsset from "@/assets/hubvision-logo-white.png.asset.json";


const NAV_LINKS = [
  { label: "A Hubvision", href: "#manifesto" },
  { label: "Soluções", href: "#solutions" },
  { label: "Ecossistema", href: "#ecosystem" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <img
            src={logoAsset.url}
            alt="Hubvision"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-hv-text-secondary transition-colors hover:text-hv-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" size="sm">
            Fale conosco
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-hv-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-hv-bg-primary pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="text-2xl font-bold text-hv-white border-b border-hv-border pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-12"
            >
              <Button className="w-full h-16 text-lg">Fale conosco</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
