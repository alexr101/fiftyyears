import * as React from "react"

import { cn } from "../lib/utils"

/**
 * ToggleGroup — a headless group of toggle buttons, either single-select
 * (radio-like) or multi-select. Built from plain React state + ARIA
 * (aria-pressed) since no Radix toggle-group dependency is available.
 * Controlled and uncontrolled usage are both supported. The pressed accent
 * background is styled in `styles/components.forms.css`.
 */
type SingleProps = {
  type: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type MultipleProps = {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

interface ToggleGroupContextValue {
  isPressed: (value: string) => boolean
  toggle: (value: string) => void
  disabled: boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null
)

function useToggleGroupContext(component: string) {
  const ctx = React.useContext(ToggleGroupContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <ToggleGroup>`)
  }
  return ctx
}

export type ToggleGroupProps = (SingleProps | MultipleProps) & {
  disabled?: boolean
} & Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue" | "value"
  >

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (props, ref) => {
    const {
      className,
      type,
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      ...rest
    } = props as (SingleProps | MultipleProps) & {
      className?: string
      disabled?: boolean
    } & React.HTMLAttributes<HTMLDivElement>

    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<string | string[] | undefined>(
      defaultValue
    )
    const current = isControlled ? value : internal

    const setValue = (next: string | string[] | undefined) => {
      if (!isControlled) setInternal(next)
    }

    const isPressed = (itemValue: string) => {
      if (type === "single") return current === itemValue
      return Array.isArray(current) && current.includes(itemValue)
    }

    const toggle = (itemValue: string) => {
      if (type === "single") {
        const next = current === itemValue ? "" : itemValue
        setValue(next)
        ;(onValueChange as SingleProps["onValueChange"])?.(next)
      } else {
        const arr = Array.isArray(current) ? current : []
        const next = arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue]
        setValue(next)
        ;(onValueChange as MultipleProps["onValueChange"])?.(next)
      }
    }

    const ctx = React.useMemo<ToggleGroupContextValue>(
      () => ({ isPressed, toggle, disabled }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [current, disabled, type]
    )

    return (
      <ToggleGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          className={cn("fy-toggle-group", className)}
          {...rest}
        />
      </ToggleGroupContext.Provider>
    )
  }
)
ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, value, disabled, ...props }, ref) => {
  const ctx = useToggleGroupContext("ToggleGroupItem")
  const isDisabled = disabled || ctx.disabled
  const pressed = ctx.isPressed(value)

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      disabled={isDisabled}
      data-state={pressed ? "on" : "off"}
      className={cn("fy-toggle-group__item", className)}
      onClick={() => !isDisabled && ctx.toggle(value)}
      {...props}
    />
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
