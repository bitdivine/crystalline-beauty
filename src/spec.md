# Specification

## Summary
**Goal:** Replace the existing canvas snowfall background animation with a hail effect while preserving performance, resize behavior, and reduced-motion accessibility.

**Planned changes:**
- Update the canvas particle renderer to draw falling hailstones (bright pellets and/or short streaks) instead of snowflakes, with faster downward motion and subtle horizontal wind drift.
- Keep existing animation safeguards: particle density caps, device-pixel-ratio scaling, and correct reinitialization on window resize.
- Preserve prefers-reduced-motion behavior so the background does not continuously animate when reduced motion is enabled.
- Swap the main layout to use the hail background component behind existing content, ensuring the canvas remains non-interactive (pointer-events disabled) and does not impact layout/readability.

**User-visible outcome:** The site background shows a faster, wind-drifted hail animation behind the header/hero/gallery/footer, without affecting scrolling/clicks, and it becomes static/low-motion when reduced-motion is enabled.
