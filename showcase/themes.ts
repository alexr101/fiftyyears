/**
 * Preset themes for the showcase.
 *
 * These are real themes, not recolors. Each can override any token — type
 * family + scale + weight, density (spacing unit + control heights + card
 * padding), radius, border weight, and elevation (shadow vs flat) — so
 * switching looks like switching products.
 *
 * Curated set: Foundation (baseline) plus themes that change the STRUCTURE, not
 * just the hue. Editorial/Brutalist/Solarized/Candy are kept because they land;
 * Swiss/Ledger/Cloud/Kiosk are structural extremes (whitespace-only, borders-
 * only, elevation-only, oversized).
 */

export interface ThemeVars {
  [cssVar: string]: string
}

export interface ThemePreset {
  id: string
  name: string
  blurb: string
  swatch: string
  /** Tokens applied in BOTH light and dark (type, density, radius, borders). */
  shared: ThemeVars
  light: ThemeVars
  dark: ThemeVars
}

const MONO = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
const SERIF = 'Georgia, "Iowan Old Style", "Times New Roman", serif'
const GROTESK =
  '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'

export const PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Foundation",
    blurb: "The baseline — balanced sans, medium density, soft corners, subtle shadows.",
    swatch: "hsl(222 80% 58%)",
    shared: {},
    light: {},
    dark: {},
  },

  {
    id: "editorial",
    name: "Editorial",
    blurb:
      "Warm paper, large serif display, hairline rules, generous whitespace. A magazine, not an app.",
    swatch: "hsl(18 68% 48%)",
    shared: {
      "--fy-font-heading": SERIF,
      "--fy-font-ui": GROTESK,
      "--fy-radius": "0.2rem",
      "--fy-radius-sm": "0.15rem",
      "--fy-radius-lg": "0.25rem",
      "--fy-border-width": "1px",
      // airy: intrinsic density > 1 (scales with the density control), plus
      // extra card padding for the editorial roominess
      "--fy-theme-density": "1.2",
      "--fy-pad-card": "calc(1.55rem * var(--fy-density))",
      // big serif display scale
      "--fy-text-2xl": "2.4rem",
      "--fy-text-xl": "1.8rem",
      "--fy-text-lg": "1.25rem",
      "--fy-tracking-tight": "-0.025em",
      "--fy-tracking-caps": "0.14em",
      "--fy-leading-normal": "1.65",
      "--fy-weight-semibold": "600",
      // near-flat: hairline separation, minimal shadow
      "--fy-shadow-sm": "none",
      "--fy-shadow": "0 1px 0 hsl(30 12% 45% / 0.14)",
      "--fy-shadow-lg": "0 24px 60px -16px hsl(30 24% 18% / 0.2)",
    },
    light: {
      "--fy-bg": "39 34% 97%",
      "--fy-card": "40 40% 99%",
      "--fy-muted": "39 26% 93%",
      "--fy-border": "36 18% 85%",
      "--fy-input": "36 18% 81%",
      "--fy-fg": "28 20% 16%",
      "--fy-muted-fg": "30 12% 42%",
      "--fy-primary": "16 66% 44%",
      "--fy-primary-fg": "0 0% 100%",
      "--fy-ring": "16 66% 44%",
    },
    dark: {
      "--fy-bg": "28 14% 10%",
      "--fy-card": "28 14% 13%",
      "--fy-muted": "28 11% 18%",
      "--fy-border": "28 10% 24%",
      "--fy-input": "28 10% 27%",
      "--fy-fg": "38 24% 88%",
      "--fy-muted-fg": "34 12% 62%",
      "--fy-primary": "18 78% 58%",
      "--fy-primary-fg": "28 40% 8%",
      "--fy-ring": "18 78% 58%",
    },
  },

  {
    id: "brutal",
    name: "Brutalist",
    blurb: "Heavy borders, zero radius, no shadow, bold weights, stark hard-offset drop.",
    swatch: "hsl(0 0% 0%)",
    shared: {
      "--fy-radius": "0rem",
      "--fy-radius-sm": "0rem",
      "--fy-radius-lg": "0rem",
      "--fy-border-width": "2px",
      "--fy-border-width-strong": "3px",
      "--fy-space-unit": "0.26rem",
      "--fy-control-h": "2.4rem",
      "--fy-weight-normal": "500",
      "--fy-weight-medium": "600",
      "--fy-weight-semibold": "700",
      "--fy-weight-bold": "800",
      "--fy-pad-card": "1.1rem",
      "--fy-shadow-sm": "none",
      "--fy-shadow": "none",
      "--fy-shadow-lg": "4px 4px 0 0 hsl(0 0% 0%)",
    },
    light: {
      "--fy-bg": "48 20% 96%",
      "--fy-card": "0 0% 100%",
      "--fy-muted": "48 15% 90%",
      "--fy-border": "0 0% 8%",
      "--fy-input": "0 0% 8%",
      "--fy-primary": "0 0% 8%",
      "--fy-primary-fg": "48 100% 60%",
      "--fy-ring": "0 0% 8%",
    },
    dark: {
      "--fy-bg": "0 0% 7%",
      "--fy-card": "0 0% 10%",
      "--fy-muted": "0 0% 16%",
      "--fy-border": "0 0% 90%",
      "--fy-input": "0 0% 90%",
      "--fy-primary": "54 100% 62%",
      "--fy-primary-fg": "0 0% 8%",
      "--fy-ring": "54 100% 62%",
    },
  },

  {
    id: "solarized",
    name: "Solarized",
    blurb: "The beloved dev palette — warm base tones, teal accent, calm, mono.",
    swatch: "hsl(175 74% 37%)",
    shared: {
      "--fy-font-ui": MONO,
      "--fy-font-heading": MONO,
      "--fy-radius": "0.35rem",
      // slightly tighter than default, still density-scalable
      "--fy-theme-density": "0.94",
      "--fy-shadow-sm": "none",
      "--fy-shadow": "0 1px 2px hsl(45 30% 30% / 0.12)",
      "--fy-shadow-lg": "0 12px 28px -8px hsl(45 30% 25% / 0.25)",
    },
    light: {
      "--fy-bg": "44 87% 94%",
      "--fy-card": "46 70% 97%",
      "--fy-muted": "45 50% 89%",
      "--fy-border": "45 30% 80%",
      "--fy-input": "45 30% 76%",
      "--fy-fg": "192 81% 20%",
      "--fy-muted-fg": "194 25% 45%",
      "--fy-primary": "175 74% 33%",
      "--fy-primary-fg": "0 0% 100%",
      "--fy-ring": "175 74% 37%",
    },
    dark: {
      "--fy-bg": "192 100% 11%",
      "--fy-card": "192 81% 14%",
      "--fy-muted": "193 50% 19%",
      "--fy-border": "194 40% 24%",
      "--fy-input": "194 40% 28%",
      "--fy-fg": "44 40% 82%",
      "--fy-muted-fg": "180 20% 58%",
      "--fy-primary": "175 70% 45%",
      "--fy-primary-fg": "192 100% 8%",
      "--fy-ring": "175 70% 50%",
    },
  },

  {
    id: "candy",
    name: "Candy",
    blurb: "Loud, playful, big pills, thick borders, bubblegum accent, hard drop.",
    swatch: "hsl(330 90% 60%)",
    shared: {
      "--fy-radius": "1.3rem",
      "--fy-radius-sm": "0.8rem",
      "--fy-border-width": "2px",
      "--fy-border-width-strong": "3px",
      "--fy-space-unit": "0.3rem",
      "--fy-control-h": "2.7rem",
      "--fy-pad-card": "1.35rem",
      "--fy-weight-medium": "600",
      "--fy-weight-semibold": "750",
      "--fy-shadow-sm": "none",
      "--fy-shadow": "0 4px 0 0 hsl(330 60% 45% / 0.25)",
      "--fy-shadow-lg": "0 8px 0 0 hsl(330 60% 45% / 0.3)",
    },
    light: {
      "--fy-bg": "340 80% 98%",
      "--fy-card": "0 0% 100%",
      "--fy-muted": "335 70% 95%",
      "--fy-border": "330 60% 80%",
      "--fy-input": "330 60% 76%",
      "--fy-primary": "330 90% 56%",
      "--fy-primary-fg": "0 0% 100%",
      "--fy-ring": "330 90% 56%",
    },
    dark: {
      "--fy-bg": "320 35% 12%",
      "--fy-card": "322 30% 16%",
      "--fy-muted": "324 28% 22%",
      "--fy-border": "328 45% 40%",
      "--fy-input": "328 45% 44%",
      "--fy-primary": "330 95% 66%",
      "--fy-primary-fg": "320 40% 10%",
      "--fy-ring": "330 95% 70%",
    },
  },

  {
    id: "kiosk",
    name: "Kiosk",
    blurb:
      "Oversized everything — huge type, tall controls, low density. Built for touch and distance. Still scales with the density control.",
    swatch: "hsl(158 75% 40%)",
    shared: {
      "--fy-font-ui": GROTESK,
      "--fy-radius": "0.8rem",
      // Bigness is expressed as an intrinsic density multiplier, so the density
      // dropdown still scales it (Kiosk × Spacious = even bigger).
      "--fy-theme-density": "1.42",
      // type scale is bumped separately (density drives spacing/controls, not text)
      "--fy-text-base": "1rem",
      "--fy-text-sm": "0.9375rem",
      "--fy-text-md": "1.125rem",
      "--fy-text-lg": "1.35rem",
      "--fy-text-xl": "1.75rem",
      "--fy-text-2xl": "2.4rem",
      "--fy-weight-medium": "600",
      "--fy-weight-semibold": "700",
      "--fy-shadow-sm": "0 1px 3px hsl(160 30% 30% / 0.1)",
      "--fy-shadow": "0 4px 14px -4px hsl(160 30% 30% / 0.2)",
      "--fy-shadow-lg": "0 18px 40px -10px hsl(160 30% 30% / 0.3)",
    },
    light: {
      "--fy-bg": "160 24% 97%",
      "--fy-card": "0 0% 100%",
      "--fy-muted": "160 22% 93%",
      "--fy-border": "160 20% 85%",
      "--fy-input": "160 20% 81%",
      "--fy-primary": "158 75% 36%",
      "--fy-primary-fg": "0 0% 100%",
      "--fy-ring": "158 75% 36%",
    },
    dark: {
      "--fy-bg": "162 26% 9%",
      "--fy-card": "162 22% 13%",
      "--fy-muted": "162 18% 18%",
      "--fy-border": "162 18% 24%",
      "--fy-input": "162 18% 28%",
      "--fy-primary": "156 70% 46%",
      "--fy-primary-fg": "162 40% 8%",
      "--fy-ring": "156 70% 50%",
    },
  },
]

/* ---------------------------------------------------------------------------
   Density — an independent axis. One multiplier scales spacing + control sizes
   across every component. Layered on top of any theme + light/dark.
   --------------------------------------------------------------------------- */

export interface DensityPreset {
  id: string
  name: string
  value: number
}

export const DENSITIES: DensityPreset[] = [
  { id: "compact", name: "Compact", value: 0.82 },
  { id: "cozy", name: "Cozy", value: 1 },
  { id: "comfortable", name: "Comfortable", value: 1.15 },
  { id: "spacious", name: "Spacious", value: 1.32 },
]

/** Sets the density multiplier on the root; all spacing/control tokens rescale. */
export function applyDensity(density: DensityPreset): void {
  document.documentElement.style.setProperty("--fy-density", String(density.value))
}

/** Every token any preset may touch — cleared on each switch so presets don't bleed. */
const PRESET_VAR_UNIVERSE = [
  "--fy-bg", "--fy-card", "--fy-muted", "--fy-muted-fg", "--fy-fg", "--fy-border", "--fy-input",
  "--fy-primary", "--fy-primary-fg", "--fy-ring",
  "--fy-font-ui", "--fy-font-heading",
  "--fy-radius", "--fy-radius-sm", "--fy-radius-lg",
  "--fy-border-width", "--fy-border-width-strong",
  "--fy-space-unit",
  "--fy-control-h", "--fy-control-h-sm", "--fy-control-h-lg",
  "--fy-control-px", "--fy-control-px-sm", "--fy-pad-card",
  "--fy-weight-normal", "--fy-weight-medium", "--fy-weight-semibold", "--fy-weight-bold",
  "--fy-tracking-tight", "--fy-tracking-caps", "--fy-tracking-wide", "--fy-leading-normal",
  "--fy-text-sm", "--fy-text-base", "--fy-text-md", "--fy-text-lg", "--fy-text-xl", "--fy-text-2xl",
  "--fy-shadow-sm", "--fy-shadow", "--fy-shadow-lg",
  "--fy-ok", "--fy-ok-fg",
]

/**
 * Applies a preset: clears the universe of preset-touchable vars, then sets the
 * preset's shared tokens plus the light or dark variant. Call again when the
 * light/dark mode changes so the correct color variant applies.
 */
export function applyPreset(preset: ThemePreset, isDark: boolean): void {
  const root = document.documentElement
  for (const v of PRESET_VAR_UNIVERSE) root.style.removeProperty(v)
  const merged = { ...preset.shared, ...(isDark ? preset.dark : preset.light) }
  for (const [k, val] of Object.entries(merged)) root.style.setProperty(k, val)
}
