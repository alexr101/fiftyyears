import * as React from "react"

/**
 * Calls `handler` when a pointer press lands outside every referenced element.
 * Pass one ref or several (e.g. trigger + content) so clicking any of them is
 * treated as "inside". Listens on `pointerdown` so it fires before focus moves.
 */
export function useOnClickOutside(
  refs:
    | React.RefObject<HTMLElement | null>
    | React.RefObject<HTMLElement | null>[],
  handler: (event: PointerEvent) => void,
  enabled = true
) {
  // Keep the latest handler without re-subscribing the listener each render.
  const handlerRef = React.useRef(handler)
  handlerRef.current = handler

  React.useEffect(() => {
    if (!enabled) return

    const list = Array.isArray(refs) ? refs : [refs]

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      // Ignore if the press landed inside any tracked element.
      for (const ref of list) {
        const el = ref.current
        if (el && el.contains(target)) return
      }
      handlerRef.current(event)
    }

    document.addEventListener("pointerdown", onPointerDown, true)
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...(Array.isArray(refs) ? refs : [refs])])
}
