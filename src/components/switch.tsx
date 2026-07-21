import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "../lib/utils"

/**
 * Switch — a two-state toggle. Built on @radix-ui/react-switch, so it renders a
 * real checkbox for forms and is fully keyboard operable. The 38x22 track and
 * 18px thumb, plus the accent checked state, are defined in
 * `styles/components.css`.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn("fy-switch", className)}
    {...props}
  >
    <SwitchPrimitive.Thumb className="fy-switch__thumb" />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
