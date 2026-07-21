import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Stepper — a horizontal progress indicator for multi-step flows. Given a list
 * of `steps` and the `current` index (0-based), it renders numbered circles
 * joined by connectors, marking each step done / current / todo. Completed
 * steps show a check; the current step is highlighted. Visuals live in
 * `styles/components.overlay.css`.
 */

export interface Step {
  /** Primary label for the step. */
  label: React.ReactNode
  /** Optional secondary description shown beneath the label. */
  description?: React.ReactNode
}

type StepStatus = "done" | "current" | "todo"

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[]
  /** Index of the active step, 0-based. Steps before it are "done". */
  current: number
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, steps, current, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("fy-stepper", className)}
        aria-label="Progress"
        {...props}
      >
        {steps.map((step, index) => {
          const status: StepStatus =
            index < current ? "done" : index === current ? "current" : "todo"
          const isLast = index === steps.length - 1

          return (
            <li
              key={index}
              className="fy-stepper__step"
              data-status={status}
              aria-current={status === "current" ? "step" : undefined}
            >
              <div className="fy-stepper__marker-row">
                <span className="fy-stepper__circle" aria-hidden="true">
                  {status === "done" ? (
                    <Check className="fy-stepper__check" aria-hidden="true" />
                  ) : (
                    <span className="fy-stepper__number">{index + 1}</span>
                  )}
                </span>
                {!isLast && (
                  <span
                    className="fy-stepper__connector"
                    data-complete={status === "done" || undefined}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="fy-stepper__content">
                <span className="fy-stepper__label">{step.label}</span>
                {step.description != null && (
                  <span className="fy-stepper__description">
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper }
