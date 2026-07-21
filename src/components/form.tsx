import * as React from "react"

import { cn } from "../lib/utils"

/**
 * Lightweight form primitives — no external form library. `Form` is a styled
 * <form>; `FormRow` lays out a label/control/message stack; `FormControl`
 * wraps a single control and surfaces an optional error string, wiring
 * aria-invalid / aria-describedby onto the control for accessibility.
 * Styling lives in `styles/components.forms.css`.
 */
const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("fy-form", className)} {...props} />
))
Form.displayName = "Form"

/** A vertical stack grouping one control with its label and messages. */
const FormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fy-form__row", className)} {...props} />
))
FormRow.displayName = "FormRow"

/** Field label. Pair its `htmlFor` with the control's `id`. */
const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("fy-form__label", className)} {...props} />
))
FormLabel.displayName = "FormLabel"

/** Secondary helper text under a control. */
const FormHint = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("fy-form__hint", className)} {...props} />
))
FormHint.displayName = "FormHint"

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Error text; when present the control is flagged invalid and it renders. */
  error?: string
  /**
   * Id used to link the control to its error message via aria-describedby.
   * Provide the same id as the control's own `id` for best results.
   */
  controlId?: string
}

/**
 * Wraps a single form control and renders an error message beneath it. It
 * clones its single child element to inject `aria-invalid` and
 * `aria-describedby` so screen readers announce the error, without requiring a
 * form library.
 */
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, error, controlId, children, ...props }, ref) => {
    const reactId = React.useId()
    const errorId = error ? `${controlId ?? reactId}-error` : undefined

    const child = React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          {
            "aria-invalid": error ? true : undefined,
            "aria-describedby":
              [
                errorId,
                (children.props as { "aria-describedby"?: string })[
                  "aria-describedby"
                ],
              ]
                .filter(Boolean)
                .join(" ") || undefined,
          }
        )
      : children

    return (
      <div
        ref={ref}
        className={cn("fy-form__control", className)}
        data-invalid={error ? "" : undefined}
        {...props}
      >
        {child}
        {error && (
          <p id={errorId} role="alert" className="fy-form__error">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormControl.displayName = "FormControl"

export { Form, FormRow, FormLabel, FormHint, FormControl }
