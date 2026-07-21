import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Tree — a headless nested, expandable list. TreeItems may contain other
 * TreeItems; a chevron toggles children and each level indents further via a
 * depth context. Uses ARIA `tree`/`treeitem`/`group` roles.
 */

const TreeDepthContext = React.createContext(0)

const Tree = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    role="tree"
    className={cn("fy-tree", className)}
    {...props}
  />
))
Tree.displayName = "Tree"

export interface TreeItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "onChange"> {
  /** Node label rendered on the row. */
  label: React.ReactNode
  /** Optional leading icon (e.g. a folder/file glyph). */
  icon?: React.ReactNode
  /** Nested TreeItem children. When present, the row is expandable. */
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Marks the row as selected for styling and ARIA. */
  selected?: boolean
}

const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (
    {
      className,
      label,
      icon,
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      selected,
      onClick,
      ...props
    },
    ref
  ) => {
    const depth = React.useContext(TreeDepthContext)
    const hasChildren = React.Children.count(children) > 0
    const isControlled = open !== undefined
    const [internal, setInternal] = React.useState(defaultOpen)
    const isOpen = isControlled ? open : internal

    const toggle = () => {
      if (!hasChildren) return
      const next = !isOpen
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasChildren) return
      if (e.key === "ArrowRight" && !isOpen) {
        e.preventDefault()
        toggle()
      } else if (e.key === "ArrowLeft" && isOpen) {
        e.preventDefault()
        toggle()
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggle()
      }
    }

    return (
      <li
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={selected || undefined}
        className={cn("fy-tree__item", className)}
        {...props}
      >
        <div
          role="button"
          tabIndex={0}
          data-state={isOpen ? "open" : "closed"}
          data-selected={selected ? "true" : undefined}
          className="fy-tree__row"
          style={{ paddingInlineStart: `${depth * 1.25 + 0.5}rem` }}
          onClick={(e) => {
            onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>)
            toggle()
          }}
          onKeyDown={handleKeyDown}
        >
          <span className="fy-tree__toggle" aria-hidden="true">
            {hasChildren ? (
              <ChevronRight
                className="fy-tree__chevron"
                data-state={isOpen ? "open" : "closed"}
              />
            ) : null}
          </span>
          {icon ? <span className="fy-tree__icon">{icon}</span> : null}
          <span className="fy-tree__label">{label}</span>
        </div>
        {hasChildren && isOpen ? (
          <TreeDepthContext.Provider value={depth + 1}>
            <ul role="group" className="fy-tree__group">
              {children}
            </ul>
          </TreeDepthContext.Provider>
        ) : null}
      </li>
    )
  }
)
TreeItem.displayName = "TreeItem"

export { Tree, TreeItem }
