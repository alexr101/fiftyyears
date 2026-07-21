import * as React from "react"

import { cn } from "../lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout axis of the divider. Defaults to `"horizontal"`. */
  orientation?: "horizontal" | "vertical"
  /**
   * When `true`, the divider is purely decorative and hidden from assistive
   * tech. When `false`, it is exposed as a semantic separator. Defaults to
   * `true`.
   */
  decorative?: boolean
}

/**
 * Separator — a thin rule dividing content, horizontally or vertically. Sizing
 * and color live in `styles/components.css`; the orientation is reflected onto
 * `data-orientation` for the stylesheet to target.
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={
        decorative ? undefined : orientation === "vertical" ? "vertical" : undefined
      }
      data-orientation={orientation}
      className={cn("fy-separator", className)}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
