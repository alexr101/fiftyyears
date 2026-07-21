import * as React from "react"

import { cn } from "../lib/utils"

/**
 * Timeline — a vertical list of events. Each TimelineItem renders a dot, a
 * connector line to the next item, and its content. Wrap items in <Timeline>.
 */
const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("fy-timeline", className)} {...props} />
))
Timeline.displayName = "Timeline"

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /** Custom node rendered inside the dot (e.g. an icon). */
  dot?: React.ReactNode
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, dot, children, ...props }, ref) => (
    <li ref={ref} className={cn("fy-timeline__item", className)} {...props}>
      <div className="fy-timeline__marker" aria-hidden="true">
        <span className="fy-timeline__dot">{dot}</span>
        <span className="fy-timeline__connector" />
      </div>
      <div className="fy-timeline__content">{children}</div>
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
