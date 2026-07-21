import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Maps the `variant` prop to its semantic CSS class name. The visual
 * definition of each class lives in `styles/components.css`.
 */
const badgeVariants = cva("fy-badge", {
  variants: {
    variant: {
      default: "fy-badge--default",
      ok: "fy-badge--ok",
      warn: "fy-badge--warn",
      danger: "fy-badge--danger",
      muted: "fy-badge--muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
