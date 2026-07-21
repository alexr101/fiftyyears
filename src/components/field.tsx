import * as React from "react"

import { cn } from "../lib/utils"
import { Label } from "./label"

/**
 * A vertical form row that groups a control with its label, hint and error
 * text for consistent spacing and alignment across forms.
 *
 * @example
 * <Field>
 *   <FieldLabel htmlFor="email">Email</FieldLabel>
 *   <Input id="email" />
 *   <FieldHint>We'll never share it.</FieldHint>
 *   <FieldError>Enter a valid email.</FieldError>
 * </Field>
 */
const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fy-field", className)} {...props} />
))
Field.displayName = "Field"

/** Label for the field's control. Wraps the design-system `Label`. */
const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn("fy-field__label", className)} {...props} />
))
FieldLabel.displayName = "FieldLabel"

/** Secondary helper text describing the control. */
const FieldHint = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("fy-field__hint", className)} {...props} />
))
FieldHint.displayName = "FieldHint"

/**
 * Validation error text. Renders nothing when it has no children so it can be
 * left mounted unconditionally.
 */
const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (children == null || children === false) return null
  return (
    <p
      ref={ref}
      role="alert"
      className={cn("fy-field__error", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FieldError.displayName = "FieldError"

export { Field, FieldLabel, FieldHint, FieldError }
