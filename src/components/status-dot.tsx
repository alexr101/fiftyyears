import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Maps the `variant` prop to its semantic CSS class name. The visual
 * definition of each class lives in `styles/components.css`.
 */
const statusDotVariants = cva("fy-status-dot", {
  variants: {
    variant: {
      ok: "fy-status-dot--ok",
      warn: "fy-status-dot--warn",
      danger: "fy-status-dot--danger",
      off: "fy-status-dot--off",
    },
  },
  defaultVariants: {
    variant: "off",
  },
})

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {
  /**
   * When `true`, the dot gains a soft pulsing halo to signal a live /
   * active state. Defaults to `false`.
   */
  pulse?: boolean
}

/**
 * StatusDot — a small filled circle in a semantic color used to convey the
 * health of a connection, trigger, or action. Optionally pulses when `live`.
 * Purely decorative by default; pass an `aria-label` for a standalone status.
 */
const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, variant, pulse = false, ...props }, ref) => (
    <span
      ref={ref}
      data-pulse={pulse ? "true" : undefined}
      className={cn(statusDotVariants({ variant }), className)}
      {...props}
    />
  )
)
StatusDot.displayName = "StatusDot"

export { StatusDot, statusDotVariants }
