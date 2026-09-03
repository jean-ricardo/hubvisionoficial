import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

interface ImageCropperModalProps {
  /** URL (object URL ou URL remota) da imagem a recortar. */
  src: string;
  onCancel: () => void;
  onApply: (blob: Blob) => void;
  enviando?: boolean;
}

const ASPECT = 16 / 9;

async function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("Não foi possível carregar a imagem para recorte."));
    img.src = src;
  });
}

async function gerarRecorte(
  src: string,
  area: Area,
  rotacao: number
): Promise<Blob> {
  const image = await carregarImagem(src);
  const rad = (rotacao * Math.PI) / 180;

  // canvas auxiliar com a imagem já rotacionada
  const seno = Math.abs(Math.sin(rad));
  const cosseno = Math.abs(Math.cos(rad));
  const larguraGirada = image.width * cosseno + image.height * seno;
  const alturaGirada = image.width * seno + image.height * cosseno;

  const aux = document.createElement("canvas");
  aux.width = larguraGirada;
  aux.height = alturaGirada;
  const ctxAux = aux.getContext("2d");
  if (!ctxAux) throw new Error("Canvas indisponível.");
  ctxAux.translate(larguraGirada / 2, alturaGirada / 2);
  ctxAux.rotate(rad);
  ctxAux.drawImage(image, -image.width / 2, -image.height / 2);

  const saida = document.createElement("canvas");
  const largura = Math.min(Math.round(area.width), 1600);
  saida.width = largura;
  saida.height = Math.round(largura / ASPECT);
  const ctx = saida.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponível.");
  ctx.drawImage(
    aux,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    saida.width,
    saida.height
  );

  return new Promise((resolve, reject) => {
    saida.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Falha ao gerar o recorte.")),
      "image/jpeg",
      0.9
    );
  });
}

const botaoSecundario =
  "rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:text-white";

export function ImageCropperModal({
  src,
  onCancel,
  onApply,
  enviando = false,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotacaoBase, setRotacaoBase] = useState(0);
  const [ajusteFino, setAjusteFino] = useState(0);
  const [area, setArea] = useState<Area | null>(null);
  const [preview, setPreview] = useState<{ url: string; blob: Blob } | null>(
    null
  );
  const [erro, setErro] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);

  const rotacao = rotacaoBase + ajusteFino;

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setArea(pixels);
  }, []);

  async function aplicar() {
    if (!area) return;
    setProcessando(true);
    setErro(null);
    try {
      const blob = await gerarRecorte(src, area, rotacao);
      setPreview({ blob, url: URL.createObjectURL(blob) });
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Falha ao recortar a imagem.");
    } finally {
      setProcessando(false);
    }
  }

  function descartarPreview() {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#071329] p-6 text-white shadow-2xl">
        <h3 className="mb-1 font-space-grotesk text-lg font-bold">
          Ajustar imagem de capa
        </h3>
        <p className="mb-5 text-xs text-white/50">
          Enquadramento 16:9 — exatamente como aparecerá nos cards do site.
        </p>

        {preview ? (
          <>
            <img
              src={preview.url}
              alt="Prévia final da capa recortada"
              className="aspect-video w-full rounded-xl object-cover"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={enviando}
                onClick={() => onApply(preview.blob)}
                className="rounded-lg bg-[#2858D8] px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Confirmar e enviar"}
              </button>
              <button
                type="button"
                onClick={descartarPreview}
                className={botaoSecundario}
              >
                Reajustar
              </button>
              <button type="button" onClick={onCancel} className={botaoSecundario}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                rotation={rotacao}
                aspect={ASPECT}
                minZoom={1}
                maxZoom={5}
                zoomWithScroll
                restrictPosition={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/60">
                  Zoom <span className="normal-case">{zoom.toFixed(2)}x</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#2858D8]"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/60">
                  Ajuste fino de ângulo
                  <span className="normal-case">{ajusteFino}°</span>
                </span>
                <input
                  type="range"
                  min={-45}
                  max={45}
                  step={1}
                  value={ajusteFino}
                  onChange={(e) => setAjusteFino(Number(e.target.value))}
                  className="w-full accent-[#2858D8]"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRotacaoBase((r) => r - 90)}
                  className={botaoSecundario}
                >
                  Girar -90°
                </button>
                <button
                  type="button"
                  onClick={() => setRotacaoBase((r) => r + 90)}
                  className={botaoSecundario}
                >
                  Girar +90°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRotacaoBase(0);
                    setAjusteFino(0);
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                  }}
                  className={botaoSecundario}
                >
                  Redefinir
                </button>
              </div>
            </div>

            {erro ? (
              <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {erro}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={aplicar}
                disabled={processando || !area}
                className="rounded-lg bg-[#2858D8] px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {processando ? "Processando..." : "Aplicar recorte"}
              </button>
              <button type="button" onClick={onCancel} className={botaoSecundario}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
