import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

/**
 * Maps the `variant` and `size` props to their semantic CSS class names.
 * The visual definition of each class lives in `styles/components.css`.
 */
const buttonVariants = cva("fy-btn", {
  variants: {
    variant: {
      primary: "fy-btn--primary",
      secondary: "fy-btn--secondary",
      ghost: "fy-btn--ghost",
      outline: "fy-btn--outline",
      danger: "fy-btn--danger",
    },
    size: {
      sm: "fy-btn--sm",
      default: "fy-btn--default",
      lg: "fy-btn--lg",
      icon: "fy-btn--icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element as the button, merging button styling onto it. */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        // Only set a default type when rendering a real <button>; Slot forwards
        // to an arbitrary element that may not accept a `type` attribute.
        type={asChild ? type : type ?? "button"}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
