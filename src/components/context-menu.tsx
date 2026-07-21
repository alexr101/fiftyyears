import * as React from "react"

import { cn } from "../lib/utils"
import { useOnClickOutside } from "../lib/use-on-click-outside"

/**
 * ContextMenu — a right-click menu that opens at the cursor. Headless: the
 * wrapping <ContextMenu> captures onContextMenu, records the pointer position,
 * and renders <ContextMenuContent> as a fixed-positioned menu. Closes on
 * outside click, Escape, or item select. Visuals live in
 * `styles/components.overlay.css`.
 */

interface Point {
  x: number
  y: number
}

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  point: Point
  contentRef: React.MutableRefObject<HTMLDivElement | null>
}

const ContextMenuContext =
  React.createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext(component: string): ContextMenuContextValue {
  const ctx = React.useContext(ContextMenuContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <ContextMenu>`)
  }
  return ctx
}

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

export interface ContextMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, onContextMenu, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [point, setPoint] = React.useState<Point>({ x: 0, y: 0 })
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    const value = React.useMemo(
      () => ({ open, setOpen, point, contentRef }),
      [open, point]
    )

    return (
      <ContextMenuContext.Provider value={value}>
        <div
          ref={ref}
          className={cn("fy-context-menu", className)}
          onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
            onContextMenu?.(event)
            if (event.defaultPrevented) return
            event.preventDefault()
            setPoint({ x: event.clientX, y: event.clientY })
            setOpen(true)
          }}
          {...props}
        >
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  }
)
ContextMenu.displayName = "ContextMenu"

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, children, ...props }, forwardedRef) => {
  const { open, setOpen, point, contentRef } =
    useContextMenuContext("ContextMenuContent")

  const setRefs = (node: HTMLDivElement | null) => {
    contentRef.current = node
    if (typeof forwardedRef === "function") forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useOnClickOutside(contentRef, () => setOpen(false), open)

  React.useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => focusItem(contentRef.current, "first"))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen, contentRef])

  if (!open) return null

  return (
    <div
      ref={setRefs}
      role="menu"
      aria-orientation="vertical"
      className={cn("fy-context-menu__content", className)}
      style={{ ...style, position: "fixed", top: point.y, left: point.x }}
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
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
})
ContextMenuContent.displayName = "ContextMenuContent"

export interface ContextMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  variant?: "default" | "danger"
}

const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuItemProps
>(
  ({ className, disabled, variant = "default", onClick, onKeyDown, children, ...props }, ref) => {
    const { setOpen } = useContextMenuContext("ContextMenuItem")

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        data-variant={variant}
        className={cn("fy-context-menu__item", className)}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          onClick?.(event)
          setOpen(false)
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            if (!disabled) (event.currentTarget as HTMLElement).click()
          }
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContextMenuItem.displayName = "ContextMenuItem"

export { ContextMenu, ContextMenuContent, ContextMenuItem }
