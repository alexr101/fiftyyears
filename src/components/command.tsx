import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Command — a filterable command palette. Headless: <CommandInput> filters the
 * <CommandItem>s by their text value, arrow keys move a highlight through the
 * visible items, Enter activates the highlighted one, and <CommandEmpty> shows
 * when nothing matches. Visuals live in `styles/components.overlay.css`.
 *
 * Filtering is value-based: each item registers a `value` (defaulting to its
 * text content) and is matched with a case-insensitive substring test.
 */

interface CommandItemMeta {
  id: string
  value: string
  disabled: boolean
}

interface CommandContextValue {
  search: string
  setSearch: (value: string) => void
  register: (meta: CommandItemMeta) => void
  unregister: (id: string) => void
  matches: (value: string) => boolean
  activeId: string | null
  setActiveId: (id: string | null) => void
  onItemSelect: (id: string) => void
  registerSelect: (id: string, fn: () => void) => void
  listId: string
  /** True when at least one enabled item matches the current search. */
  hasMatches: boolean
}

const CommandContext = React.createContext<CommandContextValue | null>(null)

function useCommandContext(component: string): CommandContextValue {
  const ctx = React.useContext(CommandContext)
  if (!ctx) {
    throw new Error(`${component} must be used within a <Command>`)
  }
  return ctx
}

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Provide your own filter. Return true to keep the item for `search`. */
  filter?: (value: string, search: string) => boolean
}

const defaultFilter = (value: string, search: string) =>
  value.toLowerCase().includes(search.trim().toLowerCase())

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, filter = defaultFilter, children, onKeyDown, ...props }, ref) => {
    const [search, setSearch] = React.useState("")
    const [activeId, setActiveId] = React.useState<string | null>(null)
    const listId = React.useId()

    // Ordered registry of visible/enabled items for keyboard navigation.
    const itemsRef = React.useRef<Map<string, CommandItemMeta>>(new Map())
    const selectHandlers = React.useRef<Map<string, () => void>>(new Map())
    const [, forceUpdate] = React.useReducer((n) => n + 1, 0)

    const register = React.useCallback((meta: CommandItemMeta) => {
      itemsRef.current.set(meta.id, meta)
      forceUpdate()
    }, [])

    const unregister = React.useCallback((id: string) => {
      itemsRef.current.delete(id)
      selectHandlers.current.delete(id)
      forceUpdate()
    }, [])

    const registerSelect = React.useCallback((id: string, fn: () => void) => {
      selectHandlers.current.set(id, fn)
    }, [])

    const matches = React.useCallback(
      (value: string) => filter(value, search),
      [filter, search]
    )

    const onItemSelect = React.useCallback((id: string) => {
      selectHandlers.current.get(id)?.()
    }, [])

    // Compute the currently navigable items (registered, enabled, matching).
    const visibleIds = React.useMemo(() => {
      return Array.from(itemsRef.current.values())
        .filter((m) => !m.disabled && matches(m.value))
        .map((m) => m.id)
    }, [matches, search])

    // Keep the highlight on a valid item as the filtered set changes.
    React.useEffect(() => {
      if (visibleIds.length === 0) {
        setActiveId(null)
        return
      }
      if (!activeId || !visibleIds.includes(activeId)) {
        setActiveId(visibleIds[0] ?? null)
      }
    }, [visibleIds, activeId])

    const move = (delta: number) => {
      if (visibleIds.length === 0) return
      const currentIndex = activeId ? visibleIds.indexOf(activeId) : -1
      const nextIndex =
        (currentIndex + delta + visibleIds.length) % visibleIds.length
      setActiveId(visibleIds[nextIndex] ?? null)
    }

    const value = React.useMemo<CommandContextValue>(
      () => ({
        search,
        setSearch,
        register,
        unregister,
        matches,
        activeId,
        setActiveId,
        onItemSelect,
        registerSelect,
        listId,
        hasMatches: visibleIds.length > 0,
      }),
      [search, register, unregister, matches, activeId, onItemSelect, registerSelect, listId, visibleIds.length]
    )

    return (
      <CommandContext.Provider value={value}>
        <div
          ref={ref}
          className={cn("fy-command", className)}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return
            if (event.key === "ArrowDown") {
              event.preventDefault()
              move(1)
            } else if (event.key === "ArrowUp") {
              event.preventDefault()
              move(-1)
            } else if (event.key === "Enter" && activeId) {
              event.preventDefault()
              onItemSelect(activeId)
            }
          }}
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    )
  }
)
Command.displayName = "Command"

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const ctx = useCommandContext("CommandInput")
    const controlled = value !== undefined
    const current = controlled ? value : ctx.search

    return (
      <div className="fy-command__input-wrap">
        <Search className="fy-command__input-icon" aria-hidden="true" />
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={ctx.listId}
          aria-activedescendant={ctx.activeId ?? undefined}
          autoComplete="off"
          spellCheck={false}
          className={cn("fy-command__input", className)}
          value={current}
          onChange={(event) => {
            const next = event.target.value
            if (!controlled) ctx.setSearch(next)
            onValueChange?.(next)
          }}
          {...props}
        />
      </div>
    )
  }
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const ctx = useCommandContext("CommandList")
  return (
    <div
      ref={ref}
      id={ctx.listId}
      role="listbox"
      className={cn("fy-command__list", className)}
      {...props}
    />
  )
})
CommandList.displayName = "CommandList"

export interface CommandItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Text used for filtering; defaults to the item's text content. */
  value?: string
  disabled?: boolean
  onSelect?: () => void
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, disabled = false, onSelect, onClick, children, ...props }, forwardedRef) => {
    const ctx = useCommandContext("CommandItem")
    const id = React.useId()
    const localRef = React.useRef<HTMLDivElement | null>(null)

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    // Resolve the filter value: explicit prop, else rendered text.
    const resolvedValue =
      value ?? (typeof children === "string" ? children : "")
    const [textValue, setTextValue] = React.useState(resolvedValue)

    React.useEffect(() => {
      if (value !== undefined) {
        setTextValue(value)
      } else if (localRef.current) {
        setTextValue(localRef.current.textContent ?? "")
      }
    }, [value, children])

    React.useEffect(() => {
      ctx.register({ id, value: textValue, disabled })
      return () => ctx.unregister(id)
    }, [id, textValue, disabled, ctx])

    React.useEffect(() => {
      ctx.registerSelect(id, () => onSelect?.())
    }, [id, onSelect, ctx])

    const visible = disabled ? false : ctx.matches(textValue)
    const active = ctx.activeId === id

    if (!visible) return null

    return (
      <div
        ref={setRefs}
        id={id}
        role="option"
        aria-selected={active}
        aria-disabled={disabled || undefined}
        data-active={active || undefined}
        className={cn("fy-command__item", className)}
        onMouseEnter={() => ctx.setActiveId(id)}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) return
          onClick?.(event)
          onSelect?.()
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CommandItem.displayName = "CommandItem"

const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const ctx = useCommandContext("CommandEmpty")

  // Shown only when no enabled item matches the current search.
  if (ctx.hasMatches) return null

  return (
    <div
      ref={ref}
      role="presentation"
      className={cn("fy-command__empty", className)}
      {...props}
    >
      {children}
    </div>
  )
})
CommandEmpty.displayName = "CommandEmpty"

export {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
}
