import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../lib/utils"

/**
 * Sidebar — a vertical navigation rail. Compose a <Sidebar> around
 * <SidebarSection>s (optionally titled) of <SidebarItem>s, each an icon + label
 * with an active state. Items render as buttons by default, or as any element
 * (e.g. an anchor / router link) via `asChild`. Visuals live in
 * `styles/components.overlay.css`.
 */
const Sidebar = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"aside">
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("fy-sidebar", className)}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

export interface SidebarSectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional heading rendered above the section's items. */
  title?: React.ReactNode
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-sidebar__section", className)}
      {...props}
    >
      {title != null && (
        <div className="fy-sidebar__section-title">{title}</div>
      )}
      <nav className="fy-sidebar__nav">{children}</nav>
    </div>
  )
)
SidebarSection.displayName = "SidebarSection"

export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this item represents the current page/section. */
  active?: boolean
  /** Leading icon element. */
  icon?: React.ReactNode
  /** Trailing content (e.g. a badge or count). */
  trailing?: React.ReactNode
  /** Render the child element (e.g. an <a>) instead of a <button>. */
  asChild?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, active = false, icon, trailing, asChild = false, type, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? type : type ?? "button"}
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cn("fy-sidebar__item", className)}
        {...props}
      >
        {icon != null && (
          <span className="fy-sidebar__item-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="fy-sidebar__item-label">{children}</span>
        {trailing != null && (
          <span className="fy-sidebar__item-trailing">{trailing}</span>
        )}
      </Comp>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

export { Sidebar, SidebarSection, SidebarItem }
