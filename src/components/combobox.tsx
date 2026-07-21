import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Combobox — a headless, searchable single-select. A text input filters a
 * dropdown list; keyboard nav (Up/Down to move the active option, Enter to
 * select, Escape to close) and outside-click-to-close are all handled with
 * plain React + ARIA (combobox/listbox roles). Built without a Radix popover
 * dependency. Controlled via `value` / `onValueChange`. Visuals live in
 * `styles/components.forms.css`.
 */
export interface ComboboxOption {
  label: string
  value: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  /** Placeholder for the input when nothing is selected. */
  placeholder?: string
  /** Message shown when the filter matches no options. */
  emptyMessage?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Search…",
      emptyMessage = "No results.",
      disabled = false,
      className,
      id,
      name,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [activeIndex, setActiveIndex] = React.useState(0)

    const rootRef = React.useRef<HTMLDivElement>(null)
    const listRef = React.useRef<HTMLUListElement>(null)
    const reactId = React.useId()
    const listboxId = `${id ?? reactId}-listbox`

    const selectedOption = options.find((o) => o.value === value)

    // When closed, the input mirrors the selected label; when open, it holds
    // the live search query.
    const inputValue = open ? query : selectedOption?.label ?? ""

    const filtered = React.useMemo(() => {
      if (!query) return options
      const q = query.toLowerCase()
      return options.filter((o) => o.label.toLowerCase().includes(q))
    }, [options, query])

    const openMenu = () => {
      if (disabled || open) return
      setQuery("")
      const selIdx = filtered.findIndex((o) => o.value === value)
      setActiveIndex(selIdx >= 0 ? selIdx : 0)
      setOpen(true)
    }

    const closeMenu = () => {
      setOpen(false)
      setQuery("")
    }

    const commit = (option: ComboboxOption) => {
      if (option.disabled) return
      onValueChange?.(option.value)
      closeMenu()
    }

    // Close on outside click / focus loss.
    React.useEffect(() => {
      if (!open) return
      const onPointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) closeMenu()
      }
      document.addEventListener("pointerdown", onPointerDown)
      return () => document.removeEventListener("pointerdown", onPointerDown)
    }, [open])

    // Keep the active option scrolled into view.
    React.useEffect(() => {
      if (!open) return
      const list = listRef.current
      const active = list?.querySelector<HTMLElement>('[data-active="true"]')
      active?.scrollIntoView({ block: "nearest" })
    }, [open, activeIndex])

    const moveActive = (delta: number) => {
      if (filtered.length === 0) return
      let next = activeIndex
      for (let i = 0; i < filtered.length; i++) {
        next = (next + delta + filtered.length) % filtered.length
        if (!filtered[next]?.disabled) break
      }
      setActiveIndex(next)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          if (!open) openMenu()
          else moveActive(1)
          break
        case "ArrowUp":
          event.preventDefault()
          if (!open) openMenu()
          else moveActive(-1)
          break
        case "Enter":
          if (open && filtered[activeIndex]) {
            event.preventDefault()
            commit(filtered[activeIndex])
          }
          break
        case "Escape":
          if (open) {
            event.preventDefault()
            closeMenu()
          }
          break
        case "Tab":
          if (open) closeMenu()
          break
      }
    }

    const activeOptionId =
      open && filtered[activeIndex]
        ? `${listboxId}-opt-${activeIndex}`
        : undefined

    return (
      <div ref={rootRef} className={cn("fy-combobox", className)}>
        <div className="fy-combobox__control">
          <input
            ref={ref}
            id={id}
            name={name}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            autoComplete="off"
            disabled={disabled}
            placeholder={placeholder}
            className="fy-combobox__input"
            value={inputValue}
            onChange={(event) => {
              if (!open) openMenu()
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onFocus={openMenu}
            onKeyDown={handleKeyDown}
          />
          <ChevronsUpDown className="fy-combobox__icon" aria-hidden="true" />
        </div>
        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="fy-combobox__list"
          >
            {filtered.length === 0 ? (
              <li className="fy-combobox__empty">{emptyMessage}</li>
            ) : (
              filtered.map((option, index) => {
                const isActive = index === activeIndex
                const isSelected = option.value === value
                return (
                  <li
                    key={option.value}
                    id={`${listboxId}-opt-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-active={isActive ? "true" : undefined}
                    data-disabled={option.disabled ? "" : undefined}
                    className="fy-combobox__option"
                    onMouseEnter={() => setActiveIndex(index)}
                    // Use mousedown so selection lands before the input blurs.
                    onMouseDown={(event) => {
                      event.preventDefault()
                      commit(option)
                    }}
                  >
                    <span className="fy-combobox__option-label">
                      {option.label}
                    </span>
                    {isSelected && (
                      <Check
                        className="fy-combobox__check"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>
    )
  }
)
Combobox.displayName = "Combobox"

export { Combobox }
