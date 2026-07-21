import * as React from "react"

import { cn } from "../lib/utils"

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Fixed size in pixels. When set, the spacer becomes a rigid gap of this
   * size (no grow/shrink). When omitted, it flex-grows to fill available space.
   */
  size?: number
}

/**
 * Spacer — a flexible filler for flex layouts. With no `size` it grows to push
 * siblings apart; with `size` it becomes a fixed, non-shrinking gap. The base
 * `flex: 1 1 0` comes from the `fy-spacer` class in `styles/components.css`.
 */
const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, style, size, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("fy-spacer", className)}
      style={
        size != null
          ? { flex: `0 0 ${size}px`, alignSelf: "stretch", ...style }
          : style
      }
      {...props}
    />
  )
)
Spacer.displayName = "Spacer"

export { Spacer }
