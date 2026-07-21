import * as React from "react"

import { cn } from "../lib/utils"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of equal-width columns. Defaults to 1. */
  cols?: number
  /** Gap between grid cells, in pixels. */
  gap?: number
}

/**
 * Grid — a CSS grid container laying children into `cols` equal-fraction
 * columns. `cols` and `gap` are applied inline so callers can drive them from
 * responsive logic; the base `display: grid` comes from the `fy-grid` class in
 * `styles/components.css`.
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, style, cols, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-grid", className)}
      style={{
        ...(cols != null
          ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
          : null),
        ...(gap != null ? { gap } : null),
        ...style,
      }}
      {...props}
    />
  )
)
Grid.displayName = "Grid"

export { Grid }
