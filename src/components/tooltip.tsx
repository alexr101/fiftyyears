import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../lib/utils"

/**
 * Tooltip — a small floating label built on @radix-ui/react-tooltip. Wrap an
 * app (or a subtree) in TooltipProvider once, then compose Tooltip /
 * TooltipTrigger / TooltipContent per target. The dark bubble, arrow, and
 * fade/zoom transitions (keyed off Radix's `data-state`) live in
 * `styles/components.css`.
 */
const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("fy-tooltip__content", className)}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fy-tooltip__arrow" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
