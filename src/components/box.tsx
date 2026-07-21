import * as React from "react"

import { cn } from "../lib/utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uniform padding applied on all sides, in pixels. */
  padding?: number
}

/**
 * Box — the most primitive layout element: a plain `<div>` wrapper.
 * Accepts an optional numeric `padding` (px) alongside the usual
 * `className`/`style`/children passthrough. Everything else is a normal div.
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, style, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-box", className)}
      style={padding != null ? { padding, ...style } : style}
      {...props}
    />
  )
)
Box.displayName = "Box"

export { Box }
