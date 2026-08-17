# Plan: Hubvision Institutional Website - Final Sections (11-16)

Implement the final 6 sections: Cases, Partners, Differentials, Future, CTA, and Footer.

## 11. Cases
- **Content**: Structure: Challenge → Solution → Result. Placeholders: Amigotech, ASA Locadora.
- **Visual**: Horizontal scroll cards with customer background images and navy overlays.
- **Motion**: Smooth transitions with horizontal drag/scroll.

## 12. Parceiros (Partners)
- **Content**: Networking and association focus.
- **Visual**: Grid of logos with connecting lines/agglomeration.
- **Background**: `navy` (`--hv-bg-secondary`) to contrast with dark Cases.
- **Motion**: Sequential fade-in (stagger).

## 13. Diferenciais (Differentials)
- **Content**: Vision, Applied Tech, Ecosystem, Execution.
- **Visual**: 4 large editorial blocks with strong typography.
- **Background**: `light` (`--hv-bg-light`) to contrast with Partners.
- **Motion**: Vertical entry with typography emphasis.

## 14. Futuro (Future)
- **Visual**: Dark cinematic atmosphere with abstract floating keywords (IA, Automation, etc.).
- **Background**: Deep dark (`--hv-bg-primary`).
- **Motion**: Slow contemplative movement, depth/scale effects.

## 15. CTA
- **Visual**: High-impact brand blue (`--hv-blue`). Large typography.
- **Motion**: Intense hover effect (glow + scale) on the primary button.

## 16. Footer
- **Content**: Institutional links, products, contact, social.
- **Visual**: Very dark background (`#020817`), clear hierarchy.
- **Motion**: Simple link micro-interactions.

## Implementation Steps
1. Create components in `src/components/sections/`: `Cases.tsx`, `Partners.tsx`, `Differentials.tsx`, `Future.tsx`, `CTA.tsx`.
2. Create `src/components/layout/Footer.tsx`.
3. Update `src/routes/index.tsx` to include all final sections.
4. Ensure responsive containers and accessibility.
