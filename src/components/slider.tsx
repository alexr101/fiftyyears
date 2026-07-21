import * as React from "react"

import { cn } from "../lib/utils"

/**
 * Slider — a headless, accessible single-value slider.
 *
 * Built from plain React state, pointer events and ARIA (role="slider" with
 * aria-valuemin/max/now) plus keyboard support (arrows step, Home/End jump)
 * since @radix-ui/react-slider is not a dependency. Supports controlled
 * (`value` + `onValueChange`) and uncontrolled (`defaultValue`). The filled
 * track and draggable thumb are styled in `styles/components.forms.css`.
 */
export interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
  > {
  /** Controlled current value. */
  value?: number
  /** Initial value for uncontrolled usage. */
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** Fires continuously with the new value while dragging or on keypress. */
  onValueChange?: (value: number) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function roundToStep(value: number, min: number, step: number) {
  const steps = Math.round((value - min) / step)
  return min + steps * step
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<number>(
      defaultValue ?? min
    )
    const current = clamp(isControlled ? value : internalValue, min, max)

    const trackRef = React.useRef<HTMLDivElement>(null)

    const commit = React.useCallback(
      (next: number) => {
        const clamped = clamp(roundToStep(next, min, step), min, max)
        if (!isControlled) setInternalValue(clamped)
        onValueChange?.(clamped)
      },
      [isControlled, min, max, step, onValueChange]
    )

    const valueFromPointer = React.useCallback(
      (clientX: number) => {
        const track = trackRef.current
        if (!track) return current
        const rect = track.getBoundingClientRect()
        if (rect.width === 0) return current
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
        return min + ratio * (max - min)
      },
      [current, min, max]
    )

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      event.preventDefault()
      const track = trackRef.current
      track?.setPointerCapture(event.pointerId)
      commit(valueFromPointer(event.clientX))
    }

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      const track = trackRef.current
      if (!track?.hasPointerCapture(event.pointerId)) return
      commit(valueFromPointer(event.clientX))
    }

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current
      if (track?.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      let next: number | null = null
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + step
          break
        case "ArrowLeft":
        case "ArrowDown":
          next = current - step
          break
        case "PageUp":
          next = current + step * 10
          break
        case "PageDown":
          next = current - step * 10
          break
        case "Home":
          next = min
          break
        case "End":
          next = max
          break
        default:
          return
      }
      event.preventDefault()
      commit(next)
    }

    const percent = max === min ? 0 : ((current - min) / (max - min)) * 100

    return (
      <div
        ref={ref}
        className={cn("fy-slider", className)}
        data-disabled={disabled ? "" : undefined}
        {...props}
      >
        <div
          ref={trackRef}
          className="fy-slider__track"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="fy-slider__range"
            style={{ width: `${percent}%` }}
          />
          <div
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={current}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            className="fy-slider__thumb"
            style={{ left: `${percent}%` }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
