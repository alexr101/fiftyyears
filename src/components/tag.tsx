import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When provided, renders a trailing remove (x) button. */
  onRemove?: () => void
  /** Accessible label for the remove button. */
  removeLabel?: string
}

/**
 * Tag — a small neutral label chip for categorization. Unlike Badge (which
 * signals status), Tag reads as a plain, outlined token and can be removable.
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, onRemove, removeLabel = "Remove", children, ...props }, ref) => (
    <span ref={ref} className={cn("fy-tag", className)} {...props}>
      <span className="fy-tag__label">{children}</span>
      {onRemove ? (
        <button
          type="button"
          className="fy-tag__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <X />
        </button>
      ) : null}
    </span>
  )
)
Tag.displayName = "Tag"

export { Tag }
