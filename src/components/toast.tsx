import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Toast — a self-contained notification system (no @radix-ui/react-toast
 * dependency). Wrap the app in <ToastProvider>, render <Toaster /> once near
 * the root, and call `toast()` from the `useToast()` hook to enqueue messages.
 * Toasts stack fixed to the bottom-right, auto-dismiss after ~4s, and can be
 * closed manually. A left accent border encodes the variant. Styling —
 * including the mount/unmount transitions — lives in `styles/components.css`.
 */

type ToastVariant = "default" | "ok" | "danger"

interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  /** Auto-dismiss delay in ms. Defaults to 4000; pass 0 to disable. */
  duration?: number
}

interface ToastRecord extends ToastOptions {
  id: number
  /** Drives the exit transition before the node is removed from the DOM. */
  open: boolean
}

interface ToastContextValue {
  toasts: ToastRecord[]
  toast: (options: ToastOptions) => number
  dismiss: (id: number) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

const DEFAULT_DURATION = 4000
/** Must match the exit transition duration in components.css. */
const EXIT_MS = 200

let idCounter = 0

/**
 * ToastProvider — owns the toast queue and exposes the imperative API. Every
 * mutation is guarded so a bad call site can never crash a consumer; problems
 * are surfaced via console.error rather than swallowed silently.
 */
function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  // Keep pending timers so we can clear them on unmount / manual dismiss.
  const timers = React.useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  )

  const clearTimer = React.useCallback((id: number) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const remove = React.useCallback(
    (id: number) => {
      clearTimer(id)
      setToasts((current) => current.filter((t) => t.id !== id))
    },
    [clearTimer]
  )

  const dismiss = React.useCallback(
    (id: number) => {
      // Flip `open` to false to run the exit transition, then remove.
      setToasts((current) =>
        current.map((t) => (t.id === id ? { ...t, open: false } : t))
      )
      clearTimer(id)
      const exitTimer = setTimeout(() => remove(id), EXIT_MS)
      timers.current.set(id, exitTimer)
    },
    [clearTimer, remove]
  )

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = ++idCounter
      try {
        const duration = options.duration ?? DEFAULT_DURATION
        setToasts((current) => [
          ...current,
          { ...options, id, open: true },
        ])

        if (duration > 0) {
          const timer = setTimeout(() => dismiss(id), duration)
          timers.current.set(id, timer)
        }
      } catch (error) {
        // Never let a toast call take down the caller; log for visibility.
        console.error("[fy-toast] failed to enqueue toast", error)
      }
      return id
    },
    [dismiss]
  )

  // Clear any outstanding timers on unmount to avoid leaks / stray updates.
  React.useEffect(() => {
    const map = timers.current
    return () => {
      map.forEach((timer) => clearTimeout(timer))
      map.clear()
    }
  }, [])

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}

/**
 * useToast — access the toast API from anywhere under <ToastProvider>. Throws a
 * descriptive error when used outside the provider so misuse is caught early.
 */
function useToast(): Pick<ToastContextValue, "toast" | "dismiss"> {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>")
  }
  return { toast: context.toast, dismiss: context.dismiss }
}

/**
 * Toaster — renders the stacked toasts. Reads the queue straight from context,
 * so it must live under <ToastProvider>. Render it once, near the app root.
 */
function Toaster({ className }: { className?: string }) {
  const context = React.useContext(ToastContext)
  if (!context) {
    // Rendering the stack outside a provider is a wiring bug; warn loudly.
    console.error("[fy-toast] <Toaster /> must be used within a <ToastProvider>")
    return null
  }

  const { toasts, dismiss } = context

  return (
    <div
      className={cn("fy-toast__viewport", className)}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord
  onDismiss: () => void
}) {
  const variant = toast.variant ?? "default"
  return (
    <div
      className={cn("fy-toast", `fy-toast--${variant}`)}
      data-state={toast.open ? "open" : "closed"}
      role={variant === "danger" ? "alert" : "status"}
      aria-live={variant === "danger" ? "assertive" : "polite"}
    >
      <div className="fy-toast__body">
        {toast.title ? (
          <div className="fy-toast__title">{toast.title}</div>
        ) : null}
        {toast.description ? (
          <div className="fy-toast__description">{toast.description}</div>
        ) : null}
      </div>
      <button
        type="button"
        className="fy-toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <X aria-hidden="true" />
      </button>
    </div>
  )
}

export { ToastProvider, Toaster, useToast }
export type { ToastOptions, ToastVariant }
