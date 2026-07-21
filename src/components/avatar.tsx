import * as React from "react"

import { cn } from "../lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source. When absent or on load error, the fallback is shown. */
  src?: string
  /** Alt text for the image. */
  alt?: string
  /** Text (usually initials) shown when no image is available. */
  fallback?: string
}

/**
 * Avatar — a small circular representation of a user. Renders `src` when it
 * loads, otherwise falls back to initials (or a neutral placeholder).
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [errored, setErrored] = React.useState(false)
    const showImage = Boolean(src) && !errored
    return (
      <span ref={ref} className={cn("fy-avatar", className)} {...props}>
        {showImage ? (
          <img
            className="fy-avatar__image"
            src={src}
            alt={alt ?? ""}
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="fy-avatar__fallback" aria-label={alt}>
            {fallback}
          </span>
        )}
      </span>
    )
  }
)
Avatar.displayName = "Avatar"

/**
 * AvatarGroup — overlaps its Avatar children into a compact stack. Later
 * avatars sit behind earlier ones via negative margin.
 */
const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fy-avatar-group", className)} {...props} />
))
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }
