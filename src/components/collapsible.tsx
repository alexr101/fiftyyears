import * as React from "react"

import { cn } from "../lib/utils"

/**
 * Collapsible — a single headless open/close region. Simpler than Accordion:
 * one trigger toggles one content panel. Controlled via `open`/`onOpenChange`
 * or uncontrolled via `defaultOpen`.
 */

interface CollapsibleContextValue {
  open: boolean
  toggle: () => void
  contentId: string
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null
)

function useCollapsibleContext(component: string): CollapsibleContextValue {
  const ctx = React.useContext(CollapsibleContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <Collapsible>`)
  }
  return ctx
}

export interface CollapsibleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, open, defaultOpen = false, onOpenChange, ...props }, ref) => {
    const isControlled = open !== undefined
    const [internal, setInternal] = React.useState(defaultOpen)
    const isOpen = isControlled ? open : internal
    const contentId = React.useId()

    const toggle = React.useCallback(() => {
      const next = !isOpen
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    }, [isOpen, isControlled, onOpenChange])

    const ctx = React.useMemo<CollapsibleContextValue>(
      () => ({ open: isOpen, toggle, contentId }),
      [isOpen, toggle, contentId]
    )

    return (
      <CollapsibleContext.Provider value={ctx}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn("fy-collapsible", className)}
          {...props}
        />
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, toggle, contentId } = useCollapsibleContext("CollapsibleTrigger")
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? "open" : "closed"}
      className={cn("fy-collapsible__trigger", className)}
      onClick={(e) => {
        onClick?.(e)
        toggle()
      }}
      {...props}
    />
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, contentId } = useCollapsibleContext("CollapsibleContent")
  return (
    <div
      ref={ref}
      id={contentId}
      hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn("fy-collapsible__content", className)}
      {...props}
    />
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
