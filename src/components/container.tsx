import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Maps the `maxWidth` prop to a semantic CSS class. The actual width values
 * live in `styles/components.css` under `.fy-container--*`.
 */
const containerVariants = cva("fy-container", {
  variants: {
    maxWidth: {
      sm: "fy-container--sm",
      md: "fy-container--md",
      lg: "fy-container--lg",
      xl: "fy-container--xl",
    },
  },
  defaultVariants: {
    maxWidth: "lg",
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

/**
 * Container — a horizontally-centered wrapper that caps content width and adds
 * responsive side padding. Choose a `maxWidth` breakpoint (default `lg`).
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ maxWidth }), className)}
      {...props}
    />
  )
)
Container.displayName = "Container"

export { Container, containerVariants }
