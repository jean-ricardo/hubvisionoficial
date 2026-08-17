# Plan - Hubvision Institutional Site (Header & Hero)

Implement the premium design system and initial sections for Hubvision.

## Design System & Styling
- Update `src/styles.css` with the requested color tokens and typography.
- Configure Tailwind v4 theme variables for the new brand colors.
- Add Google Fonts (Space Grotesk and Inter) to the root layout.

## Components
- Create `src/components/ui/button.tsx` with primary/secondary variants following the design spec.
- Create `src/components/layout/Header.tsx`:
  - Minimalist navigation with logo, links, and CTA.
  - Sticky behavior with scroll-triggered background/blur effect.
- Create `src/components/sections/Hero.tsx`:
  - Full-height (100vh) section with the specified radial glow and background.
  - Headline ("IDEIAS QUE MOVEM NEGÓCIOS") and support text with entrance animations.
  - Subtle background movement (slow pulse/glow).

## Page Structure
- Refactor `src/routes/index.tsx` to remove the placeholder and compose the Header and Hero components.

## Technical Details
- Use Framer Motion for entrance animations and background effects.
- Ensure responsive design and accessible contrasts.
- Leverage Tailwind CSS v4's native CSS variables and `@theme` block.
