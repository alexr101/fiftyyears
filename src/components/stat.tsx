import * as React from "react"

import { cn } from "../lib/utils"

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small label above the value (e.g. "Revenue"). */
  label: React.ReactNode
  /** The prominent metric value. */
  value: React.ReactNode
  /** Optional change indicator (e.g. "+12%"). */
  delta?: React.ReactNode
  /** Direction of the delta, drives its color. */
  deltaDirection?: "up" | "down" | "neutral"
  /** Optional muted hint below the value. */
  hint?: React.ReactNode
}

/**
 * Stat — a dashboard metric tile: a label, a large value, an optional colored
 * delta (up = ok, down = danger) and an optional hint line.
 */
const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    { className, label, value, delta, deltaDirection = "neutral", hint, ...props },
    ref
  ) => (
    <div ref={ref} className={cn("fy-stat", className)} {...props}>
      <span className="fy-stat__label">{label}</span>
      <div className="fy-stat__value-row">
        <span className="fy-stat__value">{value}</span>
        {delta != null ? (
          <span
            className="fy-stat__delta"
            data-direction={deltaDirection}
          >
            {delta}
          </span>
        ) : null}
      </div>
      {hint != null ? <span className="fy-stat__hint">{hint}</span> : null}
    </div>
  )
)
Stat.displayName = "Stat"

export { Stat }
