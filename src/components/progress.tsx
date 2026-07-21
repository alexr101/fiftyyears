import * as React from "react"

import { cn } from "../lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress, 0–100. Values are clamped into range. */
  value?: number
  /** Upper bound of the scale. Defaults to 100. */
  max?: number
}

/**
 * Progress — a determinate progress bar. Renders an accent-filled track and
 * exposes ARIA `progressbar` semantics so assistive tech reports completion.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const clamped = Math.min(Math.max(value, 0), max)
    const pct = max > 0 ? (clamped / max) * 100 : 0
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        className={cn("fy-progress", className)}
        {...props}
      >
        <div className="fy-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
