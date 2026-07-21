import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Checkbox — a headless, accessible two-state (or indeterminate) checkbox.
 *
 * Built from a plain <button role="checkbox"> plus ARIA and keyboard handling
 * (Space toggles) rather than a Radix primitive, since @radix-ui/react-checkbox
 * is not a dependency. Supports both controlled (`checked` + `onCheckedChange`)
 * and uncontrolled (`defaultChecked`) usage. The styled box and accent checked
 * state live in `styles/components.forms.css`.
 */
export interface CheckboxProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "checked" | "defaultChecked" | "onChange"
  > {
  /** Controlled checked state. Provide together with `onCheckedChange`. */
  checked?: boolean
  /** Initial checked state for uncontrolled usage. */
  defaultChecked?: boolean
  /** Fires with the next checked value whenever the box toggles. */
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked)
    const isChecked = isControlled ? checked : internalChecked

    const toggle = () => {
      if (disabled) return
      const next = !isChecked
      if (!isControlled) setInternalChecked(next)
      onCheckedChange?.(next)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        disabled={disabled}
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn("fy-checkbox", className)}
        onClick={toggle}
        {...props}
      >
        <span className="fy-checkbox__indicator" aria-hidden="true">
          {isChecked && <Check className="fy-checkbox__check" />}
        </span>
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
