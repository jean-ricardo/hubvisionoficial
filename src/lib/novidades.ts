import { supabase } from "@/integrations/supabase/client";

export type AutorNovidade = "Empresa" | "Diretor";

export interface Novidade {
  id: string;
  titulo: string;
  resumo: string;
  autor: AutorNovidade;
  imagemCapa: string | null;
  linkLinkedin: string;
  data: string; // ISO (data_publicacao)
  publicado: boolean;
}

export interface NovidadeRow {
  id: string;
  titulo: string;
  resumo: string;
  autor: string;
  imagem_capa: string | null;
  link_linkedin: string;
  data_publicacao: string;
  publicado: boolean;
}

export const BUCKET_CAPAS = "novidades-capas";
const DEZ_ANOS_EM_SEGUNDOS = 60 * 60 * 24 * 365 * 10;

export function mapNovidade(row: NovidadeRow): Novidade {
  return {
    id: row.id,
    titulo: row.titulo,
    resumo: row.resumo,
    autor: (row.autor === "Diretor" ? "Diretor" : "Empresa") as AutorNovidade,
    imagemCapa: row.imagem_capa,
    linkLinkedin: row.link_linkedin,
    data: row.data_publicacao,
    publicado: row.publicado,
  };
}

/** Novidades públicas (publicado = true), mais recentes primeiro. */
export async function fetchNovidadesPublicadas(): Promise<Novidade[]> {
  const { data, error } = await supabase
    .from("novidades")
    .select("*")
    .eq("publicado", true)
    .order("data_publicacao", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapNovidade(row as NovidadeRow));
}

/** Todas as novidades, inclusive rascunhos (requer usuário autenticado). */
export async function fetchTodasNovidades(): Promise<Novidade[]> {
  const { data, error } = await supabase
    .from("novidades")
    .select("*")
    .order("data_publicacao", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapNovidade(row as NovidadeRow));
}

/** Faz upload da capa e devolve uma URL utilizável no <img>. */
export async function uploadCapa(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET_CAPAS)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from(BUCKET_CAPAS)
    .createSignedUrl(path, DEZ_ANOS_EM_SEGUNDOS);
  if (signError) throw signError;

  return data.signedUrl;
}

export function formatarDataCurta(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(iso))
    .replace(".", "");
}

export function formatarDataCompleta(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function formatarMesAno(iso: string) {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
