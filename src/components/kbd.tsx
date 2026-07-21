import * as React from "react"

import { cn } from "../lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Kbd — a small key-cap styled `<kbd>` for representing a single keyboard key
 * or chord (e.g. `⌘`, `Enter`). Monospace face with a subtle raised border.
 * Styling lives in `styles/components.css`.
 */
const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, ...props }, ref) => (
    <kbd ref={ref} className={cn("fy-kbd", className)} {...props} />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
