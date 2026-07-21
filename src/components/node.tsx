import * as React from "react"

import { cn } from "../lib/utils"

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content rendered flush against the right edge — typically a menu button,
   * badge, or switch. Separated from the main content so it is never crowded.
   */
  trailing?: React.ReactNode
}

/**
 * Node — a single bordered row in a WHEN→THEN automation flow. It hosts a
 * leading slot (commonly a `StatusDot`), a flexible label region (`children`),
 * and an optional `trailing` slot. Stack Nodes and wire them with
 * `NodeConnector`. Styling lives in `styles/components.css`.
 */
const Node = React.forwardRef<HTMLDivElement, NodeProps>(
  ({ className, children, trailing, ...props }, ref) => (
    <div ref={ref} className={cn("fy-node", className)} {...props}>
      <div className="fy-node__body">{children}</div>
      {trailing != null && <div className="fy-node__trailing">{trailing}</div>}
    </div>
  )
)
Node.displayName = "Node"

export interface NodeConnectorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * NodeConnector — a short, left-indented vertical line that visually links two
 * stacked `Node`s, expressing the wiring from a trigger to its actions. Purely
 * decorative; hidden from assistive tech.
 */
const NodeConnector = React.forwardRef<HTMLDivElement, NodeConnectorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="none"
      aria-hidden="true"
      className={cn("fy-node-connector", className)}
      {...props}
    >
      <span className="fy-node-connector__line" />
    </div>
  )
)
NodeConnector.displayName = "NodeConnector"

export { Node, NodeConnector }
