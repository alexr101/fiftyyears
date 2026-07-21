import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/** Days in a given month. `new Date(y, m + 1, 0)` is the last day of month `m`. */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/** True when two dates fall on the same calendar day. */
function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The currently selected date, if any. */
  value?: Date | null
  /** Called with the newly picked date. */
  onChange?: (date: Date) => void
}

/**
 * Calendar — a self-contained month grid with prev/next navigation. Selection is
 * controlled via `value`/`onChange`; the visible month is internal state that
 * initializes to the selected date (or today). Highlights the selected day and,
 * distinctly, today. All date math is pure `Date` arithmetic — no libraries.
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const today = React.useMemo(() => new Date(), [])
    const initial = value ?? today
    const [viewYear, setViewYear] = React.useState(initial.getFullYear())
    const [viewMonth, setViewMonth] = React.useState(initial.getMonth())

    const goPrev = () => {
      setViewMonth((m) => {
        if (m === 0) {
          setViewYear((y) => y - 1)
          return 11
        }
        return m - 1
      })
    }

    const goNext = () => {
      setViewMonth((m) => {
        if (m === 11) {
          setViewYear((y) => y + 1)
          return 0
        }
        return m + 1
      })
    }

    // Leading blank cells so the 1st lands under its weekday column.
    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
    const totalDays = daysInMonth(viewYear, viewMonth)
    const cells: (number | null)[] = [
      ...Array<null>(firstWeekday).fill(null),
      ...Array.from({ length: totalDays }, (_, i) => i + 1),
    ]

    return (
      <div ref={ref} className={cn("fy-calendar", className)} {...props}>
        <div className="fy-calendar__header">
          <button
            type="button"
            className="fy-btn fy-btn--ghost fy-btn--icon fy-calendar__nav"
            onClick={goPrev}
            aria-label="Previous month"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="fy-calendar__title" aria-live="polite">
            {MONTHS[viewMonth]} {viewYear}
          </div>
          <button
            type="button"
            className="fy-btn fy-btn--ghost fy-btn--icon fy-calendar__nav"
            onClick={goNext}
            aria-label="Next month"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="fy-calendar__weekdays" role="row">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="fy-calendar__weekday" role="columnheader">
              {wd}
            </div>
          ))}
        </div>

        <div className="fy-calendar__grid" role="grid">
          {cells.map((day, index) => {
            if (day == null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="fy-calendar__cell fy-calendar__cell--empty"
                  aria-hidden="true"
                />
              )
            }
            const cellDate = new Date(viewYear, viewMonth, day)
            const selected = isSameDay(cellDate, value ?? undefined)
            const isToday = isSameDay(cellDate, today)
            return (
              <button
                key={day}
                type="button"
                role="gridcell"
                className={cn(
                  "fy-calendar__day",
                  selected && "fy-calendar__day--selected",
                  isToday && !selected && "fy-calendar__day--today"
                )}
                aria-pressed={selected}
                aria-current={isToday ? "date" : undefined}
                onClick={() => onChange?.(cellDate)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
