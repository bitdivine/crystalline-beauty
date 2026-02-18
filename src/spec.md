# Specification

## Summary
**Goal:** Replace the existing hail/snow background with a spring-themed rain effect while preserving performance and accessibility behaviors.

**Planned changes:**
- Add a new `RainBackground` canvas component that renders elongated falling raindrops with subtle wind drift as a fixed, full-viewport, non-interactive background layer.
- Implement DPR-aware canvas scaling, resize handling, density-based particle caps, and `prefers-reduced-motion` support (static/non-animated rendering when enabled, including runtime preference changes).
- Update the main app layout to use `RainBackground` instead of `HailBackground`, ensuring all existing foreground content remains usable.
- Remove or clearly deprecate unused snow/hail background components so no snow/hail background is actively mounted.

**User-visible outcome:** The site displays a rain animation as the background (instead of hail/snow), behind the existing page content, and it respects reduced-motion preferences.
