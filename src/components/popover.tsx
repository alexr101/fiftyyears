import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../lib/utils"
import { useOnClickOutside } from "../lib/use-on-click-outside"

/**
 * Popover — a floating panel anchored beneath a trigger. Built headless (no
 * external primitive) so it stays dependency-light: React state drives
 * open/close, the panel closes on outside click or Escape, and focus/ARIA are
 * wired between trigger and content. Visuals live in
 * `styles/components.overlay.css`.
 */

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  contentId: string
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <Popover>`)
  }
  return ctx
}

export interface PopoverProps {
  children: React.ReactNode
  /** Controlled open state. Omit for uncontrolled behavior. */
  open?: boolean
  /** Default open state when uncontrolled. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover: React.FC<PopoverProps> = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const triggerRef = React.useRef<HTMLElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const contentId = React.useId()

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const value = React.useMemo(
    () => ({ open, setOpen, triggerRef, contentRef, contentId }),
    [open, setOpen, contentId]
  )

  return (
    <PopoverContext.Provider value={value}>
      <div className="fy-popover">{children}</div>
    </PopoverContext.Provider>
  )
}
Popover.displayName = "Popover"

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the child element as the trigger instead of a <button>. */
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ className, asChild = false, onClick, type, ...props }, forwardedRef) => {
  const { open, setOpen, triggerRef, contentId } = usePopoverContext(
    "PopoverTrigger"
  )
  const Comp = asChild ? Slot : "button"

  const setRefs = (node: HTMLButtonElement | null) => {
    triggerRef.current = node
    if (typeof forwardedRef === "function") forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <Comp
      ref={setRefs}
      type={asChild ? type : type ?? "button"}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      className={cn("fy-popover__trigger", className)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
      }}
      {...props}
    />
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Which side of the trigger to align to. */
  align?: "start" | "center" | "end"
  /** Gap in pixels between trigger and content. */
  sideOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { className, align = "center", sideOffset = 6, style, children, ...props },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef, contentRef, contentId } =
      usePopoverContext("PopoverContent")

    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    useOnClickOutside([triggerRef, contentRef], () => setOpen(false), open)

    React.useEffect(() => {
      if (!open) return
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }
      document.addEventListener("keydown", onKeyDown)
      return () => document.removeEventListener("keydown", onKeyDown)
    }, [open, setOpen, triggerRef])

    if (!open) return null

    return (
      <div
        ref={setRefs}
        id={contentId}
        role="dialog"
        data-align={align}
        className={cn("fy-popover__content", className)}
        style={{ ...style, marginTop: sideOffset }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
