import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ImageCropperModal } from "@/components/admin/ImageCropperModal";

import {
  fetchTodasNovidades,
  formatarDataCompleta,
  uploadCapa,
  type AutorNovidade,
  type Novidade,
} from "@/lib/novidades";

export const Route = createFileRoute("/admin/novidades")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
  },
  component: AdminNovidadesPage,
  head: () => ({
    meta: [
      { title: "Gerenciar novidades | HubVision" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Painel interno de gerenciamento das novidades da HubVision.",
      },
      { property: "og:title", content: "Gerenciar novidades | HubVision" },
      {
        property: "og:description",
        content: "Painel interno de gerenciamento das novidades da HubVision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

interface FormState {
  id: string | null;
  titulo: string;
  resumo: string;
  autor: AutorNovidade;
  imagemCapa: string | null;
  linkLinkedin: string;
  dataPublicacao: string;
  publicado: boolean;
}

const FORM_VAZIO: FormState = {
  id: null,
  titulo: "",
  resumo: "",
  autor: "Empresa",
  imagemCapa: null,
  linkLinkedin: "",
  dataPublicacao: new Date().toISOString().slice(0, 10),
  publicado: true,
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#071329] px-4 py-3 text-sm text-white outline-none focus:border-[#2858D8]";
const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60";

function AdminNovidadesPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);
  const [enviandoImagem, setEnviandoImagem] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);


  const { data, isLoading } = useQuery({
    queryKey: ["novidades", "admin"],
    queryFn: fetchTodasNovidades,
  });

  const lista = useMemo(() => data ?? [], [data]);

  const salvar = useMutation({
    mutationFn: async (valores: FormState) => {
      const payload = {
        titulo: valores.titulo.trim(),
        resumo: valores.resumo.trim(),
        autor: valores.autor,
        imagem_capa: valores.imagemCapa,
        link_linkedin: valores.linkLinkedin.trim(),
        data_publicacao: valores.dataPublicacao,
        publicado: valores.publicado,
      };
      if (valores.id) {
        const { error } = await supabase
          .from("novidades")
          .update(payload)
          .eq("id", valores.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("novidades").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: async () => {
      setForm(null);
      setErro(null);
      await queryClient.invalidateQueries({ queryKey: ["novidades"] });
    },
    onError: (e: unknown) =>
      setErro(e instanceof Error ? e.message : "Não foi possível salvar."),
  });

  const excluir = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("novidades").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["novidades"] }),
  });

  function editar(novidade: Novidade) {
    setErro(null);
    setForm({
      id: novidade.id,
      titulo: novidade.titulo,
      resumo: novidade.resumo,
      autor: novidade.autor,
      imagemCapa: novidade.imagemCapa,
      linkLinkedin: novidade.linkLinkedin,
      dataPublicacao: novidade.data,
      publicado: novidade.publicado,
    });
  }

  function abrirCropper(file: File) {
    setErro(null);
    if (cropSrc?.startsWith("blob:")) URL.revokeObjectURL(cropSrc);
    setCropSrc(URL.createObjectURL(file));
  }

  function fecharCropper() {
    if (cropSrc?.startsWith("blob:")) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  }

  async function handleCropAplicado(blob: Blob) {
    setEnviandoImagem(true);
    setErro(null);
    try {
      const file = new File([blob], `capa-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      const url = await uploadCapa(file);
      setForm((atual) => (atual ? { ...atual, imagemCapa: url } : atual));
      fecharCropper();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha no upload da imagem.");
    } finally {
      setEnviandoImagem(false);
    }
  }


  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <main className="min-h-screen bg-[#071329] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-space-grotesk text-2xl font-bold">
              Novidades HubVision
            </h1>
            <p className="text-sm text-white/50">{email ?? "painel interno"}</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setErro(null);
                setForm(FORM_VAZIO);
              }}
              className="rounded-lg bg-[#2858D8] px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Nova novidade
            </button>
            <button
              type="button"
              onClick={sair}
              className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white"
            >
              Sair
            </button>
          </div>
        </header>

        {form ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              salvar.mutate(form);
            }}
            className="mb-10 rounded-2xl border border-white/10 bg-[#0D1F45] p-6"
          >
            <h2 className="mb-6 font-space-grotesk text-lg font-bold">
              {form.id ? "Editar novidade" : "Nova novidade"}
            </h2>

            <div className="mb-5">
              <label className={labelClass}>Título</label>
              <input
                required
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="mb-5">
              <label className={labelClass}>Resumo</label>
              <textarea
                required
                rows={3}
                value={form.resumo}
                onChange={(e) => setForm({ ...form, resumo: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="mb-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Autor</label>
                <select
                  value={form.autor}
                  onChange={(e) =>
                    setForm({ ...form, autor: e.target.value as AutorNovidade })
                  }
                  className={inputClass}
                >
                  <option value="Empresa">Empresa</option>
                  <option value="Diretor">Diretor</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Data de publicação</label>
                <input
                  type="date"
                  required
                  value={form.dataPublicacao}
                  onChange={(e) =>
                    setForm({ ...form, dataPublicacao: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelClass}>Link do LinkedIn</label>
              <input
                type="url"
                required
                placeholder="https://www.linkedin.com/..."
                value={form.linkLinkedin}
                onChange={(e) =>
                  setForm({ ...form, linkLinkedin: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="mb-6">
              <label className={labelClass}>Imagem de capa</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) abrirCropper(file);
                  e.target.value = "";
                }}
                className="text-sm text-white/70"
              />
              <p className="mt-2 text-xs text-white/40">
                Após escolher o arquivo você define o enquadramento 16:9 antes do
                envio.
              </p>
              {enviandoImagem ? (
                <p className="mt-2 text-xs text-white/50">Enviando imagem...</p>
              ) : null}
              {form.imagemCapa ? (
                <div className="mt-4 max-w-xs">
                  <img
                    src={form.imagemCapa}
                    alt="Prévia da capa"
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setErro(null);
                      setCropSrc(form.imagemCapa);
                    }}
                    className="mt-3 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:text-white"
                  >
                    Reajustar enquadramento
                  </button>
                </div>
              ) : null}

            </div>

            <label className="mb-6 flex items-center gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={form.publicado}
                onChange={(e) =>
                  setForm({ ...form, publicado: e.target.checked })
                }
                className="h-4 w-4 accent-[#2858D8]"
              />
              Publicado
            </label>

            {erro ? (
              <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {erro}
              </p>
            ) : null}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={salvar.isPending || enviandoImagem}
                className="rounded-lg bg-[#2858D8] px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {salvar.isPending ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                onClick={() => setForm(null)}
                className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1F45]">
          {isLoading ? (
            <p className="p-6 text-sm text-white/60">Carregando...</p>
          ) : lista.length === 0 ? (
            <p className="p-6 text-sm text-white/60">
              Nenhuma novidade cadastrada ainda.
            </p>
          ) : (
            <ul className="divide-y divide-white/10">
              {lista.map((novidade) => (
                <li
                  key={novidade.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{novidade.titulo}</p>
                    <p className="mt-1 text-xs text-white/50">
                      {novidade.autor} · {formatarDataCompleta(novidade.data)} ·{" "}
                      <span
                        className={
                          novidade.publicado ? "text-emerald-300" : "text-amber-300"
                        }
                      >
                        {novidade.publicado ? "Publicado" : "Rascunho"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editar(novidade)}
                      className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:text-white"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Excluir "${novidade.titulo}"? Esta ação não pode ser desfeita.`
                          )
                        ) {
                          excluir.mutate(novidade.id);
                        }
                      }}
                      className="rounded-lg border border-red-400/30 px-4 py-2 text-xs font-semibold text-red-300 hover:text-red-200"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {cropSrc && form ? (
        <ImageCropperModal
          src={cropSrc}
          enviando={enviandoImagem}
          onCancel={fecharCropper}
          onApply={handleCropAplicado}
        />
      ) : null}
    </main>

  );
}
