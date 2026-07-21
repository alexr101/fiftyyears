import * as React from "react"

import { cn } from "../lib/utils"

type Axis = "vertical" | "horizontal" | "both"

const axisClass: Record<Axis, string> = {
  vertical: "fy-scroll-area--y",
  horizontal: "fy-scroll-area--x",
  both: "fy-scroll-area--both",
}

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which axis is allowed to overflow and scroll. Defaults to `vertical`. */
  axis?: Axis
}

/**
 * ScrollArea — a scrollable viewport with thin, theme-aware scrollbars styled
 * in `styles/components.css`. Choose the overflow `axis` (default `vertical`).
 * Constrain its height/width via `style` or a parent for scrolling to engage.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, axis = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-scroll-area", axisClass[axis], className)}
      {...props}
    />
  )
)
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
