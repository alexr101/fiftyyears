import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "../lib/utils"
import { useTheme, type ThemeMode } from "./ThemeProvider"

/**
 * Standalone theme controls. Each is independent and layout-free — place them
 * wherever an app's layout wants (toolbar, settings menu, footer). They read
 * shared state from <ThemeProvider> via context. No wrapper, no imposed
 * arrangement.
 */

/* --- ModeControl: light / dark / system ----------------------------------- */

const MODE_CYCLE: ThemeMode[] = ["system", "light", "dark"]
const MODE_ICON: Record<ThemeMode, React.ReactNode> = {
  system: <Monitor size={15} aria-hidden="true" />,
  light: <Sun size={15} aria-hidden="true" />,
  dark: <Moon size={15} aria-hidden="true" />,
}

export interface ModeControlProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "icon" (default) shows just the icon; "labeled" adds the mode name. */
  variant?: "icon" | "labeled"
}

/** Cycles system → light → dark. Renders a single button. */
export const ModeControl = React.forwardRef<HTMLButtonElement, ModeControlProps>(
  ({ className, variant = "icon", ...props }, ref) => {
    const { mode, setMode } = useTheme()
    const next = () =>
      setMode(MODE_CYCLE[(MODE_CYCLE.indexOf(mode) + 1) % MODE_CYCLE.length])
    return (
      <button
        ref={ref}
        type="button"
        className={cn("fy-mode-control", className)}
        onClick={next}
        aria-label={`Theme mode: ${mode}. Click to change.`}
        title={`Mode: ${mode}`}
        {...props}
      >
        {MODE_ICON[mode]}
        {variant === "labeled" && (
          <span className="fy-mode-control__label">{mode}</span>
        )}
      </button>
    )
  }
)
ModeControl.displayName = "ModeControl"

/* --- ThemeControl: color/style preset ------------------------------------- */

export interface ThemeControlProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Show a color swatch of the selected preset. Default true. */
  showSwatch?: boolean
}

/** A dropdown of the available theme presets. */
export const ThemeControl = React.forwardRef<HTMLDivElement, ThemeControlProps>(
  ({ className, showSwatch = true, ...props }, ref) => {
    const { presetId, setPresetId, presets } = useTheme()
    const current = presets.find((p) => p.id === presetId) ?? presets[0]
    return (
      <div ref={ref} className={cn("fy-theme-control", className)}>
        {showSwatch && (
          <span
            className="fy-theme-control__swatch"
            style={{ background: current?.swatch }}
            aria-hidden="true"
          />
        )}
        <select
          className="fy-theme-control__select"
          value={presetId}
          onChange={(e) => setPresetId(e.target.value)}
          aria-label="Theme"
          {...props}
        >
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
)
ThemeControl.displayName = "ThemeControl"

/* --- DensityControl: compact → spacious ----------------------------------- */

export interface DensityControlProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/** A dropdown of density options. Scales spacing/controls across every theme. */
export const DensityControl = React.forwardRef<
  HTMLDivElement,
  DensityControlProps
>(({ className, ...props }, ref) => {
  const { densityId, setDensityId, densities } = useTheme()
  return (
    <div ref={ref} className={cn("fy-density-control", className)}>
      <select
        className="fy-density-control__select"
        value={densityId}
        onChange={(e) => setDensityId(e.target.value)}
        aria-label="Density"
        {...props}
      >
        {densities.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  )
})
DensityControl.displayName = "DensityControl"
