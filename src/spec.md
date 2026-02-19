# Specification

## Summary
**Goal:** Switch the background animation from rain back to snow effect.

**Planned changes:**
- Replace RainBackground with SnowfallBackground in App.tsx
- Restore/implement SnowfallBackground component with canvas-based animated snow particles
- Apply performance optimizations: device-pixel-ratio scaling, resize handling, particle density caps (40-250), and prefers-reduced-motion support

**User-visible outcome:** Users will see gentle snow particles falling in the background instead of rain, creating a cohesive winter atmosphere for the snowflake gallery.
