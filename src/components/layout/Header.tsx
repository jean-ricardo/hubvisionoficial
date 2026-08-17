import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "A Hubvision", href: "#" },
  { label: "Soluções", href: "#" },
  { label: "Ecossistema", href: "#" },
  { label: "Cases", href: "#" },
  { label: "Contato", href: "#" },
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
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-hv-white">
            HUB<span className="text-hv-blue">VISION</span>
          </span>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-hv-bg-primary border-b border-hv-border p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg font-medium text-hv-text-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full mt-4">Fale conosco</Button>
        </div>
      )}
    </header>
  );
}
