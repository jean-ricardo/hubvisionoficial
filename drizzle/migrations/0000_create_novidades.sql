CREATE TABLE public.novidades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  resumo text NOT NULL,
  autor text NOT NULL,
  imagem_capa text,
  link_linkedin text NOT NULL,
  data_publicacao date NOT NULL,
  publicado boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.novidades TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.novidades TO authenticated;
GRANT ALL ON public.novidades TO service_role;

ALTER TABLE public.novidades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Novidades publicadas sao publicas"
ON public.novidades FOR SELECT
TO anon, authenticated
USING (publicado = true);

CREATE POLICY "Autenticados leem todas as novidades"
ON public.novidades FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Autenticados criam novidades"
ON public.novidades FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Autenticados editam novidades"
ON public.novidades FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Autenticados excluem novidades"
ON public.novidades FOR DELETE
TO authenticated
USING (true);

CREATE INDEX novidades_data_publicacao_idx ON public.novidades (data_publicacao DESC);
