import galpaoImage from "@/assets/galpao-de-fabrica.jpg.asset.json";
import cientistaImage from "@/assets/cientista-laboratorio.jpg.asset.json";
import telaHubot from "@/assets/tela-hubot.png.asset.json";
import telaHorapoint from "@/assets/tela-horapoint.png.asset.json";
import telaRegua from "@/assets/tela-regua.png.asset.json";
import seloTotvs from "@/assets/selo-canal-homologado-totvs.png.asset.json";

export type AutorNovidade = "Empresa" | "Diretor";

export interface Novidade {
  id: string;
  titulo: string;
  resumo: string;
  data: string; // ISO
  autor: AutorNovidade;
  imagemCapa: string;
  linkLinkedin: string;
}

const UTM = "?utm_source=site&utm_medium=novidades";

/**
 * Curadoria manual: edite este array a cada novo post publicado no LinkedIn.
 * Sem CMS, sem API externa, sem sincronização automática.
 */
export const novidades: Novidade[] = [
  {
    id: "chatbot-segunda-via",
    titulo: "Como automatizamos 70% dos pedidos de segunda via de boleto",
    resumo:
      "Um chatbot simples resolveu um gargalo que consumia horas do time de atendimento todos os dias.",
    data: "2026-08-26",
    autor: "Empresa",
    imagemCapa: telaHubot.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
  {
    id: "regua-cobranca-resultado",
    titulo: "Régua de Cobrança: 35% mais títulos baixados sem esforço manual",
    resumo:
      "Disparos automáticos no dia e horário certos mudaram completamente a rotina financeira do cliente.",
    data: "2026-08-12",
    autor: "Diretor",
    imagemCapa: telaRegua.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
  {
    id: "horapoint-apontamento",
    titulo: "HoraPoint: o fim da planilha de apontamento de horas",
    resumo:
      "Validação, faturamento e aceite automático em um só painel — com dados confiáveis em tempo real.",
    data: "2026-07-30",
    autor: "Empresa",
    imagemCapa: telaHorapoint.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
  {
    id: "canal-homologado-totvs",
    titulo: "Somos canal homologado TOTVS — e o que isso muda para você",
    resumo:
      "Integrações com o ERP feitas por quem tem acesso e método reconhecidos pela própria TOTVS.",
    data: "2026-07-15",
    autor: "Diretor",
    imagemCapa: seloTotvs.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
  {
    id: "integracao-industria",
    titulo: "Integração na indústria: dados que finalmente conversam",
    resumo:
      "Da produção ao financeiro, conectamos sistemas que antes viviam em ilhas separadas.",
    data: "2026-06-28",
    autor: "Empresa",
    imagemCapa: galpaoImage.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
  {
    id: "ia-aplicada",
    titulo: "IA aplicada: quando faz sentido (e quando não faz)",
    resumo:
      "Nossa visão sobre onde a inteligência artificial gera retorno real em operações B2B.",
    data: "2026-06-10",
    autor: "Diretor",
    imagemCapa: cientistaImage.url,
    linkLinkedin: `https://www.linkedin.com/company/hubvision/${UTM}`,
  },
];

export const novidadesOrdenadas = [...novidades].sort(
  (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
);

export function formatarDataCurta(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(iso))
    .replace(".", "");
}

export function formatarMesAno(iso: string) {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
