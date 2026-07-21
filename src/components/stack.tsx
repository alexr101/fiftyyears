import * as React from "react"

import { cn } from "../lib/utils"

type Align = "start" | "center" | "end" | "stretch" | "baseline"
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly"

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

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between children, in pixels. */
  gap?: number
  /** Cross-axis alignment. */
  align?: Align
  /** Main-axis distribution. */
  justify?: Justify
}

/**
 * Stack — a vertical flex column. `HStack` is the horizontal counterpart.
 * `gap` is applied inline as a pixel value; `align`/`justify` map to their
 * flexbox equivalents. Both read from the shared `fy-stack`/`fy-hstack` classes
 * in `styles/components.css` for their base flex declaration.
 */
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, style, gap, align, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-stack", className)}
      style={{
        ...(gap != null ? { gap } : null),
        ...(align ? { alignItems: alignMap[align] } : null),
        ...(justify ? { justifyContent: justifyMap[justify] } : null),
        ...style,
      }}
      {...props}
    />
  )
)
Stack.displayName = "Stack"

const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, style, gap, align, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("fy-hstack", className)}
      style={{
        ...(gap != null ? { gap } : null),
        ...(align ? { alignItems: alignMap[align] } : null),
        ...(justify ? { justifyContent: justifyMap[justify] } : null),
        ...style,
      }}
      {...props}
    />
  )
)
HStack.displayName = "HStack"

export { Stack, HStack }
