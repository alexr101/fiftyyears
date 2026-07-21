import * as React from "react"

import { cn } from "../lib/utils"

/**
 * RadioGroup — a headless, accessible single-select radio group.
 *
 * Built from plain React state + ARIA (role="radiogroup" / role="radio") and
 * roving-tabindex keyboard navigation (arrow keys move and select, Space/Enter
 * select) since @radix-ui/react-radio-group is not a dependency. Supports
 * controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`).
 * Visuals live in `styles/components.forms.css`.
 */
interface RadioGroupContextValue {
  value: string | undefined
  onSelect: (value: string) => void
  name: string | undefined
  disabled: boolean
  /**
   * Registers an item's value in mount order and reports whether it is the
   * first registered one — used to keep a single item tabbable when the group
   * has no selection yet.
   */
  registerFirst: (value: string) => boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
)

function useRadioGroupContext(component: string) {
  const ctx = React.useContext(RadioGroupContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <RadioGroup>`)
  }
  return ctx
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled selected value. */
  value?: string
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string
  /** Fires with the newly selected value. */
  onValueChange?: (value: string) => void
  /** Shared `name` applied to items (useful inside native forms). */
  name?: string
  /** Disable every item in the group. */
  disabled?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      name,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(defaultValue)
    const selected = isControlled ? value : internalValue

    const onSelect = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next)
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
    )

    // Track the first item value seen this render so exactly one item stays in
    // the tab order when nothing is selected.
    const orderRef = React.useRef<string[]>([])
    orderRef.current = []
    const registerFirst = React.useCallback((itemValue: string) => {
      if (!orderRef.current.includes(itemValue)) {
        orderRef.current.push(itemValue)
      }
      return orderRef.current[0] === itemValue
    }, [])

    const ctx = React.useMemo<RadioGroupContextValue>(
      () => ({ value: selected, onSelect, name, disabled, registerFirst }),
      [selected, onSelect, name, disabled, registerFirst]
    )

    return (
      <RadioGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn("fy-radio-group", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** The value this item represents. */
  value: string
}

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(({ className, value, disabled, onKeyDown, ...props }, ref) => {
  const ctx = useRadioGroupContext("RadioGroupItem")
  const isDisabled = disabled || ctx.disabled
  const isChecked = ctx.value === value
  const isFirst = ctx.registerFirst(value)
  // Selected item is tabbable; if nothing is selected, the first item is.
  const isTabbable = ctx.value === undefined ? isFirst : isChecked

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || isDisabled) return

    const orientationKeys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"]
    if (!orientationKeys.includes(event.key)) return
    event.preventDefault()

    const group = event.currentTarget.closest('[role="radiogroup"]')
    if (!group) return
    const items = Array.from(
      group.querySelectorAll<HTMLButtonElement>(
        '[role="radio"]:not([disabled])'
      )
    )
    const currentIndex = items.indexOf(event.currentTarget)
    if (currentIndex === -1) return

    const forward = event.key === "ArrowDown" || event.key === "ArrowRight"
    const nextIndex =
      (currentIndex + (forward ? 1 : -1) + items.length) % items.length
    const nextItem = items[nextIndex]
    nextItem.focus()
    nextItem.click()
  }

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      disabled={isDisabled}
      // Roving tabindex: only the selected item (or the first, when none is
      // selected) is in the tab order.
      tabIndex={isDisabled ? -1 : isTabbable ? 0 : -1}
      data-state={isChecked ? "checked" : "unchecked"}
      data-value={value}
      name={ctx.name}
      className={cn("fy-radio", className)}
      onClick={() => !isDisabled && ctx.onSelect(value)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="fy-radio__indicator" aria-hidden="true">
        {isChecked && <span className="fy-radio__dot" />}
      </span>
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
