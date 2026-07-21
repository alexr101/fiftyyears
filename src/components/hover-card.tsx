import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../lib/utils"

/**
 * HoverCard — a rich floating card that opens when the user hovers (or focuses)
 * the trigger, after a short delay, and closes after a small grace period so
 * the pointer can travel from trigger to card. Headless; visuals live in
 * `styles/components.overlay.css`.
 */

interface HoverCardContextValue {
  open: boolean
  scheduleOpen: () => void
  scheduleClose: () => void
  contentId: string
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

function useHoverCardContext(component: string): HoverCardContextValue {
  const ctx = React.useContext(HoverCardContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <HoverCard>`)
  }
  return ctx
}

export interface HoverCardProps {
  children: React.ReactNode
  /** Delay in ms before opening on hover. */
  openDelay?: number
  /** Delay in ms before closing after the pointer leaves. */
  closeDelay?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  openDelay = 300,
  closeDelay = 150,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen
  const contentId = React.useId()
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const scheduleOpen = React.useCallback(() => {
    clearTimer()
    timer.current = setTimeout(() => setOpen(true), openDelay)
  }, [openDelay, setOpen])

  const scheduleClose = React.useCallback(() => {
    clearTimer()
    timer.current = setTimeout(() => setOpen(false), closeDelay)
  }, [closeDelay, setOpen])

  React.useEffect(() => () => clearTimer(), [])

  const value = React.useMemo(
    () => ({ open, scheduleOpen, scheduleClose, contentId }),
    [open, scheduleOpen, scheduleClose, contentId]
  )

  return (
    <HoverCardContext.Provider value={value}>
      <div className="fy-hover-card">{children}</div>
    </HoverCardContext.Provider>
  )
}
HoverCard.displayName = "HoverCard"

export interface HoverCardTriggerProps
  extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  (
    { className, asChild = false, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props },
    ref
  ) => {
    const { open, scheduleOpen, scheduleClose, contentId } =
      useHoverCardContext("HoverCardTrigger")
    const Comp = asChild ? Slot : "span"

    return (
      <Comp
        ref={ref as React.Ref<HTMLSpanElement>}
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        className={cn("fy-hover-card__trigger", className)}
        onMouseEnter={(event: React.MouseEvent<HTMLElement>) => {
          onMouseEnter?.(event)
          scheduleOpen()
        }}
        onMouseLeave={(event: React.MouseEvent<HTMLElement>) => {
          onMouseLeave?.(event)
          scheduleClose()
        }}
        onFocus={(event: React.FocusEvent<HTMLElement>) => {
          onFocus?.(event)
          scheduleOpen()
        }}
        onBlur={(event: React.FocusEvent<HTMLElement>) => {
          onBlur?.(event)
          scheduleClose()
        }}
        {...props}
      />
    )
  }
)
HoverCardTrigger.displayName = "HoverCardTrigger"

export interface HoverCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(
  (
    { className, align = "center", sideOffset = 8, style, onMouseEnter, onMouseLeave, children, ...props },
    ref
  ) => {
    const { open, scheduleOpen, scheduleClose, contentId } =
      useHoverCardContext("HoverCardContent")

    if (!open) return null

    return (
      <div
        ref={ref}
        id={contentId}
        role="dialog"
        data-align={align}
        className={cn("fy-hover-card__content", className)}
        style={{ ...style, marginTop: sideOffset }}
        // Keep open while the pointer is over the card itself.
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          scheduleOpen()
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event)
          scheduleClose()
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
