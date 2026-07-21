import * as React from "react"
import { X } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * TagInput — a controlled multi-value chip input. Typing text and pressing
 * Enter (or a comma) commits a tag; Backspace on an empty field removes the
 * last tag; each chip has an × button to remove it. Fully controlled via
 * `value` / `onChange`. Styling lives in `styles/components.forms.css`.
 */
export interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "size"
  > {
  /** The committed tags. */
  value: string[]
  /** Fires with the next full tag array on any add/remove. */
  onChange: (value: string[]) => void
  /** Reject duplicate tags (case-insensitive). Defaults to true. */
  dedupe?: boolean
  /** Max number of tags allowed. */
  max?: number
  disabled?: boolean
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      value,
      onChange,
      dedupe = true,
      max,
      disabled = false,
      placeholder,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [draft, setDraft] = React.useState("")
    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    const addTag = (raw: string) => {
      const tag = raw.trim()
      if (!tag) return
      if (max !== undefined && value.length >= max) return
      if (
        dedupe &&
        value.some((v) => v.toLowerCase() === tag.toLowerCase())
      ) {
        setDraft("")
        return
      }
      onChange([...value, tag])
      setDraft("")
    }

    const removeTag = (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented || disabled) return

      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault()
        addTag(draft)
      } else if (
        event.key === "Backspace" &&
        draft === "" &&
        value.length > 0
      ) {
        event.preventDefault()
        removeTag(value.length - 1)
      }
    }

    const focusInput = () => {
      if (!disabled) innerRef.current?.focus()
    }

    return (
      <div
        className={cn("fy-tag-input", className)}
        data-disabled={disabled ? "" : undefined}
        onMouseDown={(event) => {
          // Keep clicks in the empty area from stealing focus off the input.
          if (event.target === event.currentTarget) {
            event.preventDefault()
            focusInput()
          }
        }}
      >
        {value.map((tag, index) => (
          <span key={`${tag}-${index}`} className="fy-tag-input__chip">
            <span className="fy-tag-input__chip-label">{tag}</span>
            <button
              type="button"
              className="fy-tag-input__chip-remove"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={() => removeTag(index)}
            >
              <X aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          ref={innerRef}
          type="text"
          className="fy-tag-input__field"
          value={draft}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : undefined}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          {...props}
        />
      </div>
    )
  }
)
TagInput.displayName = "TagInput"

export { TagInput }
