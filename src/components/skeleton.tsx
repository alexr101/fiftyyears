import * as React from "react"

import { cn } from "../lib/utils"

/**
 * Skeleton — a shimmering placeholder used while content loads. Size it with
 * `className` (width/height/border-radius). The shimmer animation is defined
 * in `styles/components.display.css`.
 */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn("fy-skeleton", className)}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
