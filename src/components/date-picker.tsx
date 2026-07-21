import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../lib/utils"
import { Calendar } from "./calendar"

/** Default formatter: "Jul 21, 2026". Kept dependency-free via `Intl`. */
function defaultFormat(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The selected date, or null when empty. */
  value?: Date | null
  /** Called when a day is chosen; the popover closes afterward. */
  onChange?: (date: Date) => void
  /** Placeholder shown when no date is selected. */
  placeholder?: string
  /** Override the trigger's date formatting. */
  formatDate?: (date: Date) => string
  /** Disable the trigger. */
  disabled?: boolean
}

/**
 * DatePicker — an Input-like trigger showing the formatted date plus a calendar
 * icon. Clicking opens the {@link Calendar} in a popover-style dropdown. The
 * dropdown is built inline with local state, closing on outside click or Escape.
 */
const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      formatDate = defaultFormat,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const triggerRef = React.useRef<HTMLButtonElement>(null)

    // Bridge the forwarded ref to our internal container ref.
    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement
    )

    // Close on outside click and on Escape while open.
    React.useEffect(() => {
      if (!open) return
      const onPointerDown = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      document.addEventListener("mousedown", onPointerDown)
      document.addEventListener("keydown", onKeyDown)
      return () => {
        document.removeEventListener("mousedown", onPointerDown)
        document.removeEventListener("keydown", onKeyDown)
      }
    }, [open])

    const handleSelect = (date: Date) => {
      onChange?.(date)
      setOpen(false)
      triggerRef.current?.focus()
    }

    return (
      <div
        ref={containerRef}
        className={cn("fy-datepicker", className)}
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "fy-input fy-datepicker__trigger",
            !value && "fy-datepicker__trigger--placeholder"
          )}
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <CalendarIcon
            className="fy-datepicker__icon"
            aria-hidden="true"
          />
          <span className="fy-datepicker__value">
            {value ? formatDate(value) : placeholder}
          </span>
        </button>

        {open && (
          <div className="fy-datepicker__popover" role="dialog">
            <Calendar value={value} onChange={handleSelect} />
          </div>
        )}
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
