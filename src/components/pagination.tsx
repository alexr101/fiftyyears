import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../lib/utils"

/**
 * Pagination — a compact page navigator. Given the current `page` (1-based),
 * total `pageCount`, and an `onPageChange` callback, it renders Prev / Next
 * controls plus numbered page buttons, collapsing long ranges with ellipses so
 * the first, last, and a window around the current page always stay visible.
 * Visuals live in `styles/components.overlay.css`.
 */

/** An entry in the rendered strip: a page number or a gap ("ellipsis"). */
type PageEntry = number | "ellipsis"

/**
 * Build the visible strip of pages. Always show page 1 and `pageCount`, plus a
 * window of `siblingCount` pages on each side of the current page; replace the
 * hidden runs with ellipses.
 */
function buildPages(
  page: number,
  pageCount: number,
  siblingCount: number
): PageEntry[] {
  // Total slots: first + last + current + 2*siblings + 2 ellipses.
  const totalNumbers = siblingCount * 2 + 5
  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const left = Math.max(page - siblingCount, 1)
  const right = Math.min(page + siblingCount, pageCount)

  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < pageCount - 1

  const entries: PageEntry[] = [1]
  if (showLeftEllipsis) entries.push("ellipsis")

  for (let p = showLeftEllipsis ? left : 2; p <= (showRightEllipsis ? right : pageCount - 1); p++) {
    entries.push(p)
  }

  if (showRightEllipsis) entries.push("ellipsis")
  entries.push(pageCount)

  return entries
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. */
  pageCount: number
  onPageChange: (page: number) => void
  /** Pages to show either side of the current page. */
  siblingCount?: number
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, pageCount, onPageChange, siblingCount = 1, ...props }, ref) => {
    const entries = React.useMemo(
      () => buildPages(page, pageCount, siblingCount),
      [page, pageCount, siblingCount]
    )

    const goTo = (next: number) => {
      const clamped = Math.min(Math.max(next, 1), pageCount)
      if (clamped !== page) onPageChange(clamped)
    }

    const atStart = page <= 1
    const atEnd = page >= pageCount

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("fy-pagination", className)}
        {...props}
      >
        <ul className="fy-pagination__list">
          <li>
            <button
              type="button"
              className="fy-pagination__link fy-pagination__prev"
              aria-label="Go to previous page"
              disabled={atStart}
              onClick={() => goTo(page - 1)}
            >
              <ChevronLeft aria-hidden="true" />
              <span>Previous</span>
            </button>
          </li>

          {entries.map((entry, index) =>
            entry === "ellipsis" ? (
              <li key={`ellipsis-${index}`} aria-hidden="true">
                <span className="fy-pagination__ellipsis">
                  <MoreHorizontal aria-hidden="true" />
                </span>
              </li>
            ) : (
              <li key={entry}>
                <button
                  type="button"
                  className="fy-pagination__link"
                  aria-label={`Go to page ${entry}`}
                  aria-current={entry === page ? "page" : undefined}
                  data-active={entry === page || undefined}
                  onClick={() => goTo(entry)}
                >
                  {entry}
                </button>
              </li>
            )
          )}

          <li>
            <button
              type="button"
              className="fy-pagination__link fy-pagination__next"
              aria-label="Go to next page"
              disabled={atEnd}
              onClick={() => goTo(page + 1)}
            >
              <span>Next</span>
              <ChevronRight aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
