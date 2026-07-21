import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Spinner — an indeterminate rotating ring for pending states. The `size`
 * prop scales the ring; the spin animation lives in
 * `styles/components.display.css`.
 */
const spinnerVariants = cva("fy-spinner", {
  variants: {
    size: {
      sm: "fy-spinner--sm",
      md: "fy-spinner--md",
      lg: "fy-spinner--lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label announced to assistive tech. */
  label?: string
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label = "Loading", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
