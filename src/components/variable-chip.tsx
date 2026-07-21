import * as React from "react"

import { cn } from "../lib/utils"

export interface VariableChipProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The variable's bare name, e.g. `"client_name"`. It is rendered wrapped in
   * mustache braces as `{{client_name}}`.
   */
  name: string
}

/**
 * VariableChip — renders an automation template token like `{{client_name}}`
 * in a soft accent pill with a monospace face. Used inline within trigger and
 * action descriptions to mark interpolated values. Styling lives in
 * `styles/components.css`.
 */
const VariableChip = React.forwardRef<HTMLSpanElement, VariableChipProps>(
  ({ className, name, ...props }, ref) => (
    <span ref={ref} className={cn("fy-var", className)} {...props}>
      <span className="fy-var__brace" aria-hidden="true">
        {"{{"}
      </span>
      <span className="fy-var__name">{name}</span>
      <span className="fy-var__brace" aria-hidden="true">
        {"}}"}
      </span>
    </span>
  )
)
VariableChip.displayName = "VariableChip"

export { VariableChip }
