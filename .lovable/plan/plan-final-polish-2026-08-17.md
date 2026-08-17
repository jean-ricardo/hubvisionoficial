---
name: Final Polish
description: Performance, accessibility, and content review for Hubvision site.
---

# Plan - Final Polish

Optimize performance, accessibility, and content consistency across all 16 sections of the Hubvision site.

## 1. Performance & Media Optimization
- [ ] **Lazy Loading**: Wrap all sections below `Hero` in a lazy-loading strategy or ensure `framer-motion`'s `whileInView` effectively manages resource usage.
- [ ] **Image Optimization**: Replace static `unsplash` URLs with optimized versions or placeholders that support `srcset` (simulated via high-res/low-res toggles if needed, focusing on `alt` and `loading="lazy"`).
- [ ] **Motion Tuning**: Review `Future.tsx` and `Ecosystem.tsx` animations; ensure `will-change: transform` is used for GPU acceleration where jank might occur.

## 2. Accessibility Review
- [ ] **Contrast Check**: Update `src/styles.css` and component-level colors to ensure `--hv-text-secondary` and `--hv-text-muted` meet WCAG AA on navy backgrounds.
- [ ] **Keyboard Navigation**: Ensure `Header`, `Cases` carousel, and all `Button` instances are focusable and operable.
- [ ] **Semantic HTML**: Verify `h1` in `Hero`, `h2` in sections, and `nav` landmarks.
- [ ] **Reduced Motion**: Add `useReducedMotion` hook checks to significant animations (Future, Hero, Transformation).

## 3. Content & CTA Consistency
- [ ] **CTA Audit**: Align all buttons to a consistent set: "Fale conosco" (Contact), "Saiba mais" (Learn more), "Explorar" (Explore).
- [ ] **Placeholder Audit**: Add `TODO: Content` comments to metrics in `Impact`, case studies in `Cases`, and partner logos in `Partners`.
- [ ] **Anchor Links**: Ensure `Header` and `Footer` links point to existing section IDs (e.g., `#solutions`, `#cases`).

## Technical Details
- Use `framer-motion`'s `useReducedMotion` to conditionally disable or simplify animations.
- Implement a `FocusVisible` utility or rely on Tailwind's `focus-visible` classes.
- Update `button.tsx` variant for consistent glow effects.
