import * as React from "react"

import { cn } from "../lib/utils"

/**
 * SegmentedControl — an iOS-style single-select control with a sliding pill
 * that animates behind the active option. Headless: plain React state, ARIA
 * (role="radiogroup" / role="radio") and roving-tabindex arrow navigation.
 * Controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`).
 * The pill and layout live in `styles/components.forms.css`.
 */
export interface SegmentedOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: SegmentedOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<string | undefined>(
      defaultValue ?? options[0]?.value
    )
    const selected = isControlled ? value : internal

    const select = (next: string) => {
      if (!isControlled) setInternal(next)
      onValueChange?.(next)
    }

    const selectedIndex = options.findIndex((o) => o.value === selected)
    const count = options.length

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      const keys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
      if (!keys.includes(event.key)) return
      event.preventDefault()
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown"

      // Walk to the next non-disabled option in the chosen direction.
      let nextIndex = index
      for (let i = 0; i < count; i++) {
        nextIndex = (nextIndex + (forward ? 1 : -1) + count) % count
        if (!options[nextIndex]?.disabled) break
      }
      const nextOption = options[nextIndex]
      if (!nextOption || nextOption.disabled) return
      select(nextOption.value)
      const parent = event.currentTarget.parentElement
      const buttons = parent?.querySelectorAll<HTMLButtonElement>(
        '[role="radio"]'
      )
      buttons?.[nextIndex]?.focus()
    }

    // Position/size the sliding pill over the selected segment. The track has
    // `--fy-seg-gap` padding on every side, so each of the `count` segments is
    // `(100% - (count+1)*gap) / count` wide, offset by that width plus one gap.
    const segWidth = `((100% - ${count + 1} * var(--fy-seg-gap)) / ${count})`
    const pillStyle: React.CSSProperties | undefined =
      selectedIndex >= 0
        ? {
            width: `calc(${segWidth})`,
            left: `calc(var(--fy-seg-gap) + ${selectedIndex} * (${segWidth} + var(--fy-seg-gap)))`,
          }
        : undefined

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-disabled={disabled || undefined}
        className={cn("fy-segmented", className)}
        data-disabled={disabled ? "" : undefined}
        {...props}
      >
        {selectedIndex >= 0 && (
          <span
            className="fy-segmented__pill"
            aria-hidden="true"
            style={pillStyle}
          />
        )}
        {options.map((option, index) => {
          const isSelected = option.value === selected
          const isDisabled = disabled || option.disabled
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isDisabled}
              tabIndex={isSelected ? 0 : -1}
              data-state={isSelected ? "checked" : "unchecked"}
              className="fy-segmented__option"
              onClick={() => !isDisabled && select(option.value)}
              onKeyDown={(event) => !isDisabled && handleKeyDown(event, index)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"

export { SegmentedControl }
