import * as React from "react"
import {
  PRESETS,
  DENSITIES,
  applyPreset,
  applyDensity,
  type ThemePreset,
  type DensityPreset,
} from "./presets"

/**
 * Headless theme state for a fiftyyears app. No UI of its own — it owns the
 * three axes (color mode, theme preset, density), persists them to
 * localStorage, applies them to <html> (including on first load), and exposes
 * them via context to the standalone controls.
 *
 * Wrap the app once:
 *   <ThemeProvider><App /></ThemeProvider>
 * then drop <ModeControl/>, <ThemeControl/>, <DensityControl/> anywhere.
 */

export type ThemeMode = "system" | "light" | "dark"

interface ThemeContextValue {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  presetId: string
  setPresetId: (id: string) => void
  densityId: string
  setDensityId: (id: string) => void
  presets: ThemePreset[]
  densities: DensityPreset[]
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const KEY_MODE = "fy-mode"
const KEY_PRESET = "fy-preset"
const KEY_DENSITY = "fy-density"

const MODES: ThemeMode[] = ["system", "light", "dark"]

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode — ignore */
  }
}

function isDarkNow(mode: ThemeMode): boolean {
  if (mode === "dark") return true
  if (mode === "light") return false
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
}

export interface ThemeProviderProps {
  children: React.ReactNode
  /** Preset id used when nothing is persisted. Defaults to the first preset. */
  defaultPreset?: string
  /** Density id used when nothing is persisted. Defaults to "cozy". */
  defaultDensity?: string
  /** Mode used when nothing is persisted. Defaults to "system". */
  defaultMode?: ThemeMode
}

export function ThemeProvider({
  children,
  defaultPreset = PRESETS[0]?.id ?? "default",
  defaultDensity = "cozy",
  defaultMode = "system",
}: ThemeProviderProps) {
  const [mode, setModeState] = React.useState<ThemeMode>(defaultMode)
  const [presetId, setPresetIdState] = React.useState<string>(defaultPreset)
  const [densityId, setDensityIdState] = React.useState<string>(defaultDensity)

  // Hydrate persisted choices once.
  React.useEffect(() => {
    const m = read(KEY_MODE) as ThemeMode | null
    if (m && MODES.includes(m)) setModeState(m)
    const p = read(KEY_PRESET)
    if (p && PRESETS.some((x) => x.id === p)) setPresetIdState(p)
    const d = read(KEY_DENSITY)
    if (d && DENSITIES.some((x) => x.id === d)) setDensityIdState(d)
  }, [])

  // Reflect mode onto <html> (class "light"/"dark", or none for system).
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    if (mode !== "system") root.classList.add(mode)
    write(KEY_MODE, mode)
  }, [mode])

  // Apply the theme preset; re-run when mode changes so the light/dark variant
  // matches, and follow the OS while in system mode.
  React.useEffect(() => {
    const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]
    applyPreset(preset, isDarkNow(mode))
    write(KEY_PRESET, presetId)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (mode === "system") applyPreset(preset, mq.matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [presetId, mode])

  // Apply density independently.
  React.useEffect(() => {
    const density = DENSITIES.find((d) => d.id === densityId) ?? DENSITIES[1]
    applyDensity(density)
    write(KEY_DENSITY, densityId)
  }, [densityId])

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode: setModeState,
      presetId,
      setPresetId: setPresetIdState,
      densityId,
      setDensityId: setDensityIdState,
      presets: PRESETS,
      densities: DENSITIES,
    }),
    [mode, presetId, densityId]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/** Access theme state. Throws if used outside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>")
  }
  return ctx
}
