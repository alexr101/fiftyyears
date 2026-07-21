import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Accordion — a headless, vertically stacked set of expandable sections.
 * Built from React state + ARIA (no external primitive). Supports single
 * (default) or multiple open items and keyboard interaction on triggers.
 */

type AccordionType = "single" | "multiple"

interface AccordionContextValue {
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordionContext(component: string): AccordionContextValue {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) {
    throw new Error(`${component} must be used within an <Accordion>`)
  }
  return ctx
}

interface AccordionItemContextValue {
  value: string
  open: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null)

function useAccordionItemContext(component: string): AccordionItemContextValue {
  const ctx = React.useContext(AccordionItemContext)
  if (!ctx) {
    throw new Error(`${component} must be used within an <AccordionItem>`)
  }
  return ctx
}

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** "single" allows one open item at a time; "multiple" allows many. */
  type?: AccordionType
  /** Controlled open value(s). */
  value?: string | string[]
  /** Uncontrolled initial open value(s). */
  defaultValue?: string | string[]
  /** Fires with the next open value(s) when an item toggles. */
  onValueChange?: (value: string | string[]) => void
  /** Allow closing the only open item in "single" mode. Defaults to true. */
  collapsible?: boolean
}

function toArray(v: string | string[] | undefined): string[] {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = "single",
      value,
      defaultValue,
      onValueChange,
      collapsible = true,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<string[]>(() =>
      toArray(defaultValue)
    )
    const open = isControlled ? toArray(value) : internal

    const setOpen = React.useCallback(
      (next: string[]) => {
        if (!isControlled) setInternal(next)
        if (onValueChange) {
          onValueChange(type === "single" ? next[0] ?? "" : next)
        }
      },
      [isControlled, onValueChange, type]
    )

    const toggle = React.useCallback(
      (itemValue: string) => {
        const isItemOpen = open.includes(itemValue)
        if (type === "single") {
          if (isItemOpen) {
            setOpen(collapsible ? [] : [itemValue])
          } else {
            setOpen([itemValue])
          }
        } else {
          setOpen(
            isItemOpen
              ? open.filter((v) => v !== itemValue)
              : [...open, itemValue]
          )
        }
      },
      [open, type, collapsible, setOpen]
    )

    const ctx = React.useMemo<AccordionContextValue>(
      () => ({ isOpen: (v) => open.includes(v), toggle }),
      [open, toggle]
    )

    return (
      <AccordionContext.Provider value={ctx}>
        <div ref={ref} className={cn("fy-accordion", className)} {...props} />
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for this item. */
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const { isOpen } = useAccordionContext("AccordionItem")
    const reactId = React.useId()
    const open = isOpen(value)
    const itemCtx = React.useMemo<AccordionItemContextValue>(
      () => ({
        value,
        open,
        triggerId: `${reactId}-trigger`,
        contentId: `${reactId}-content`,
      }),
      [value, open, reactId]
    )
    return (
      <AccordionItemContext.Provider value={itemCtx}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn("fy-accordion__item", className)}
          {...props}
        />
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { toggle } = useAccordionContext("AccordionTrigger")
  const { value, open, triggerId, contentId } =
    useAccordionItemContext("AccordionTrigger")
  return (
    <h3 className="fy-accordion__heading">
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={contentId}
        data-state={open ? "open" : "closed"}
        className={cn("fy-accordion__trigger", className)}
        onClick={(e) => {
          onClick?.(e)
          toggle(value)
        }}
        {...props}
      >
        <span className="fy-accordion__trigger-label">{children}</span>
        <ChevronDown className="fy-accordion__chevron" aria-hidden="true" />
      </button>
    </h3>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, triggerId, contentId } =
    useAccordionItemContext("AccordionContent")
  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn("fy-accordion__content", className)}
      {...props}
    >
      <div className="fy-accordion__content-inner">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
