import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "../lib/utils"

/**
 * AlertDialog — a confirmation modal built on @radix-ui/react-dialog. Unlike a
 * plain Dialog it is intended for a decision (confirm / cancel) rather than
 * arbitrary content: it has no visible close affordance and provides paired
 * Action / Cancel buttons. The centered card and its scrim live in
 * `styles/components.overlay.css`. `role="alertdialog"` is applied so assistive
 * tech announces it as requiring a response.
 */
const AlertDialog = DialogPrimitive.Root

const AlertDialogTrigger = DialogPrimitive.Trigger

const AlertDialogPortal = DialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fy-alert-dialog__overlay", className)}
    {...props}
  />
))
AlertDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      role="alertdialog"
      className={cn("fy-alert-dialog__content", className)}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = DialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("fy-alert-dialog__header", className)} {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("fy-alert-dialog__footer", className)} {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("fy-alert-dialog__title", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = DialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("fy-alert-dialog__description", className)}
    {...props}
  />
))
AlertDialogDescription.displayName = DialogPrimitive.Description.displayName

/**
 * The confirming action. Rendered as a Radix Close so activating it dismisses
 * the dialog; attach your handler via `onClick`.
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn("fy-btn fy-btn--primary fy-btn--default", "fy-alert-dialog__action", className)}
    {...props}
  />
))
AlertDialogAction.displayName = "AlertDialogAction"

/** The dismissing action. Rendered as a Radix Close styled as an outline button. */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn("fy-btn fy-btn--outline fy-btn--default", "fy-alert-dialog__cancel", className)}
    {...props}
  />
))
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
