import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../lib/utils"
import { useOnClickOutside } from "../lib/use-on-click-outside"

/**
 * DropdownMenu — a button-triggered menu of actions. Headless (no external
 * primitive): React state drives open/close, roving focus handles arrow-key
 * navigation, and the menu closes on outside click, Escape, or item select.
 * ARIA roles (menu / menuitem) are applied so it announces correctly. Visuals
 * live in `styles/components.overlay.css`.
 */

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  contentId: string
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null)

function useDropdownContext(component: string): DropdownMenuContextValue {
  const ctx = React.useContext(DropdownMenuContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <DropdownMenu>`)
  }
  return ctx
}

/** Move focus to the next/first/last enabled menuitem within `container`. */
function focusItem(
  container: HTMLElement | null,
  direction: "next" | "prev" | "first" | "last"
) {
  if (!container) return
  const items = Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    )
  )
  if (items.length === 0) return
  const active = document.activeElement as HTMLElement | null
  const currentIndex = active ? items.indexOf(active) : -1

  let nextIndex = 0
  if (direction === "first") nextIndex = 0
  else if (direction === "last") nextIndex = items.length - 1
  else if (direction === "next")
    nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length
  else
    nextIndex =
      currentIndex < 0
        ? items.length - 1
        : (currentIndex - 1 + items.length) % items.length

  items[nextIndex]?.focus()
}

export interface DropdownMenuProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
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
    <DropdownMenuContext.Provider value={value}>
      <div className="fy-dropdown">{children}</div>
    </DropdownMenuContext.Provider>
  )
}
DropdownMenu.displayName = "DropdownMenu"

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, asChild = false, onClick, onKeyDown, type, ...props }, forwardedRef) => {
  const { open, setOpen, triggerRef, contentRef, contentId } =
    useDropdownContext("DropdownMenuTrigger")
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
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      className={cn("fy-dropdown__trigger", className)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setOpen(true)
          requestAnimationFrame(() => focusItem(contentRef.current, "first"))
        }
      }}
      {...props}
    />
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    { className, align = "start", sideOffset = 6, style, children, ...props },
    forwardedRef
  ) => {
    const { open, setOpen, triggerRef, contentRef, contentId } =
      useDropdownContext("DropdownMenuContent")

    const setRefs = (node: HTMLDivElement | null) => {
      contentRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    useOnClickOutside([triggerRef, contentRef], () => setOpen(false), open)

    React.useEffect(() => {
      if (!open) return
      // Focus the first item when the menu opens.
      requestAnimationFrame(() => focusItem(contentRef.current, "first"))
    }, [open, contentRef])

    if (!open) return null

    return (
      <div
        ref={setRefs}
        id={contentId}
        role="menu"
        aria-orientation="vertical"
        data-align={align}
        className={cn("fy-dropdown__content", className)}
        style={{ ...style, marginTop: sideOffset }}
        onKeyDown={(event) => {
          switch (event.key) {
            case "ArrowDown":
              event.preventDefault()
              focusItem(contentRef.current, "next")
              break
            case "ArrowUp":
              event.preventDefault()
              focusItem(contentRef.current, "prev")
              break
            case "Home":
              event.preventDefault()
              focusItem(contentRef.current, "first")
              break
            case "End":
              event.preventDefault()
              focusItem(contentRef.current, "last")
              break
            case "Escape":
              event.preventDefault()
              setOpen(false)
              triggerRef.current?.focus()
              break
            case "Tab":
              setOpen(false)
              break
          }
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  /** Apply the destructive styling for delete-style actions. */
  variant?: "default" | "danger"
  /** Keep the menu open after selecting this item. */
  keepOpen?: boolean
}

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(
  (
    { className, disabled, variant = "default", keepOpen, onClick, onKeyDown, children, ...props },
    ref
  ) => {
    const { setOpen, triggerRef } = useDropdownContext("DropdownMenuItem")

    const select = () => {
      if (disabled) return
      if (!keepOpen) {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        data-variant={variant}
        className={cn("fy-dropdown__item", className)}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          onClick?.(event)
          select()
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            if (!disabled) {
              ;(event.currentTarget as HTMLElement).click()
            }
          }
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("fy-dropdown__separator", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fy-dropdown__label", className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
}
