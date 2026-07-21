import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "../lib/utils"

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLPreElement> {
  /** The code to render. Provided as a prop or via children. */
  code?: string
  /** Show a copy-to-clipboard button in the top-right. */
  copyable?: boolean
  /** Accessible label for the copy button. */
  copyLabel?: string
}

/**
 * CodeBlock — a monospace, muted, horizontally scrollable preformatted block
 * with an optional copy button. Copying uses the async Clipboard API and logs
 * failures so we are never in the dark when it errors.
 */
const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    { className, code, copyable = false, copyLabel = "Copy code", children, ...props },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)
    const text = code ?? (typeof children === "string" ? children : "")

    const handleCopy = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
      } catch (err) {
        // Log so a clipboard failure is never silent.
        console.error("CodeBlock: failed to copy to clipboard", err)
      }
    }, [text])

    return (
      <div className="fy-code-block">
        {copyable ? (
          <button
            type="button"
            className="fy-code-block__copy"
            aria-label={copied ? "Copied" : copyLabel}
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
        ) : null}
        <pre
          ref={ref}
          className={cn("fy-code-block__pre", className)}
          {...props}
        >
          <code className="fy-code-block__code">{children ?? code}</code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
