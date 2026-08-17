# Plan: Implement Hubvision Sections 07-10

Implement the next 4 sections of the Hubvision institutional website: Ecosystem, Featured Solutions, TOTVS/Integrations, and Impact.

## 07. Ecossistema (Ecosystem)
- **Visual**: A central node (Hubvision) with surrounding nodes (products, partners, tech) connected by animated SVG lines.
- **Background**: `--hv-bg-primary` (Dark).
- **Motion**: Progressive reveal of nodes and lines using Framer Motion and `stroke-dasharray`.

## 08. Soluções em destaque (Featured Solutions)
- **Content**: Presentation of HUBOT, HORAPOINT, and Hub Vendas.
- **Visual**: Tabbed or carousel interface with browser/app mockup placeholders.
- **Background**: `--hv-bg-surface`.
- **Motion**: Smooth transitions between product details and UI element reactions to scroll.

## 09. TOTVS / Integrações (Integrations)
- **Visual**: Horizontal or circular diagram showing Hubvision ↔ TOTVS ↔ CRM ↔ WhatsApp ↔ Data ↔ Operation.
- **Background**: `--hv-bg-secondary`.
- **Motion**: Continuous loop of "data packets" (small blue glow dots) moving along connection lines.

## 10. Impacto (Impact)
- **Content**: Key metrics (Clients, Interactions, Projects).
- **Visual**: High-contrast grid with large white numbers.
- **Background**: `--hv-bg-primary`.
- **Motion**: Count-up animation triggering on viewport entry.

## Technical Details
- Create 4 new components in `src/components/sections/`.
- Use `framer-motion` for all animations.
- Ensure responsive design and accessibility (contrast, `prefers-reduced-motion`).
- Update `src/routes/index.tsx` to include the new sections.
