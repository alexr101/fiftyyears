import * as React from "react"

import { cn } from "../lib/utils"

type Direction = "row" | "row-reverse" | "column" | "column-reverse"
type Align = "start" | "center" | "end" | "stretch" | "baseline"
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly"
type Wrap = "nowrap" | "wrap" | "wrap-reverse"

const alignMap: Record<Align, React.CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
}

const justifyMap: Record<Justify, React.CSSProperties["justifyContent"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction. Defaults to `row`. */
  direction?: Direction
  /** Cross-axis alignment. */
  align?: Align
  /** Main-axis distribution. */
  justify?: Justify
  /** Whether/how children wrap. */
  wrap?: Wrap
  /** Gap between children, in pixels. */
  gap?: number
}

/**
 * Flex — a general-purpose flexbox container. Every axis prop maps to its CSS
 * equivalent and is applied inline; the base `display: flex` comes from the
 * `fy-flex` class in `styles/components.css`.
 */
const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, style, direction, align, justify, wrap, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-flex", className)}
      style={{
        ...(direction ? { flexDirection: direction } : null),
        ...(align ? { alignItems: alignMap[align] } : null),
        ...(justify ? { justifyContent: justifyMap[justify] } : null),
        ...(wrap ? { flexWrap: wrap } : null),
        ...(gap != null ? { gap } : null),
        ...style,
      }}
      {...props}
    />
  )
)
Flex.displayName = "Flex"

export { Flex }
