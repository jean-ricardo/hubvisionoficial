import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Acesso restrito | HubVision" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Área restrita de administração da HubVision." },
      { property: "og:title", content: "Acesso restrito | HubVision" },
      { property: "og:description", content: "Área restrita de administração da HubVision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErro(null);
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    setCarregando(false);
    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    navigate({ to: "/admin/novidades", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071329] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0D1F45] p-8"
      >
        <h1 className="mb-1 font-space-grotesk text-2xl font-bold text-white">
          Acesso restrito
        </h1>
        <p className="mb-8 text-sm text-white/60">
          Painel de novidades HubVision
        </p>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
          E-mail
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-5 w-full rounded-lg border border-white/10 bg-[#071329] px-4 py-3 text-sm text-white outline-none focus:border-[#2858D8]"
        />

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
          Senha
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-6 w-full rounded-lg border border-white/10 bg-[#071329] px-4 py-3 text-sm text-white outline-none focus:border-[#2858D8]"
        />

        {erro ? (
          <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {erro}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg bg-[#2858D8] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
