import * as React from "react"

import { cn } from "../lib/utils"

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Primary line, e.g. `"No automations yet"`. */
  title: React.ReactNode
  /** Optional supporting sentence beneath the title. */
  description?: React.ReactNode
  /** Optional leading visual, typically an icon. */
  icon?: React.ReactNode
}

/**
 * EmptyState — a dashed-border, centered container for "nothing here yet"
 * states. Renders an optional `icon`, a `title`, an optional `description`,
 * and an optional action region passed as `children` (e.g. a "New automation"
 * button). Styling lives in `styles/components.css`.
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, children, ...props }, ref) => (
    <div ref={ref} className={cn("fy-empty", className)} {...props}>
      {icon != null && (
        <div className="fy-empty__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <p className="fy-empty__title">{title}</p>
      {description != null && (
        <p className="fy-empty__description">{description}</p>
      )}
      {children != null && <div className="fy-empty__action">{children}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
