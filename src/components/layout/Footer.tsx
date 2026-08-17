import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020817] pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
              HUBVISION<span className="text-hv-blue-electric">.</span>
            </Link>
            <p className="text-hv-text-muted leading-relaxed">
              Transformamos ideias em soluções de tecnologia que conectam pessoas, processos e negócios.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-hv-text-muted hover:text-hv-blue-electric hover:border-hv-blue-electric/50 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links: Institucional */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Institucional</h4>
            <ul className="space-y-4">
              {["A Hubvision", "Ecossistema", "Cases", "Carreiras", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-hv-text-muted hover:text-hv-white transition-colors relative group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-hv-blue-electric transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Soluções */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Soluções</h4>
            <ul className="space-y-4">
              {["HUBOT", "HORAPOINT", "Hub Vendas", "Integrações TOTVS", "Consultoria Cloud"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-hv-text-muted hover:text-hv-white transition-colors relative group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-hv-blue-electric transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Contato</h4>
            <div className="space-y-4 text-hv-text-muted">
              <p>Av. Paulista, 1000 - Bela Vista</p>
              <p>São Paulo, SP - 01310-100</p>
              <p className="pt-2">contato@hubvision.tech</p>
              <p>+55 (11) 4004-0000</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-bold tracking-widest text-hv-text-muted uppercase">
            Tecnologia que transforma negócios<span className="text-hv-blue-electric ml-1">.</span>
          </div>
          <div className="text-hv-text-muted text-sm">
            © {currentYear} Hubvision Tecnologia. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
