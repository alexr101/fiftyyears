import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Banner — a full-width notice bar, typically pinned above page content.
 * Variant tints the whole bar to a semantic color. When `onDismiss` is
 * supplied a trailing close button is rendered.
 */
const bannerVariants = cva("fy-banner", {
  variants: {
    variant: {
      info: "fy-banner--info",
      ok: "fy-banner--ok",
      warn: "fy-banner--warn",
      danger: "fy-banner--danger",
    },
  },
  defaultVariants: {
    variant: "info",
  },
})

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** When provided, renders a dismiss (x) button that calls this handler. */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. */
  dismissLabel?: string
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant, onDismiss, dismissLabel = "Dismiss", children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role="region"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      <div className="fy-banner__content">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          className="fy-banner__close"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X />
        </button>
      ) : null}
    </div>
  )
)
Banner.displayName = "Banner"

export { Banner, bannerVariants }
