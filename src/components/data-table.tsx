import * as React from "react"
import { ChevronDown, ChevronsUpDown, ChevronUp, Search } from "lucide-react"

import { cn } from "../lib/utils"

/** A single column definition for {@link DataTable}. */
export interface DataTableColumn<T> {
  /** Key into a row object; also the React key for the column. */
  key: keyof T & string
  /** Header label shown in the column head. */
  header: React.ReactNode
  /** When true, the header becomes a sort toggle (asc → desc → none). */
  sortable?: boolean
  /** Custom cell renderer. Falls back to the raw cell value as text. */
  render?: (value: T[keyof T], row: T) => React.ReactNode
  /** Add mono + tabular figures to the column's cells for numeric alignment. */
  numeric?: boolean
}

type SortDirection = "asc" | "desc"

interface SortState<T> {
  key: keyof T & string
  direction: SortDirection
}

export interface DataTableProps<T extends Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Column definitions, in display order. */
  columns: DataTableColumn<T>[]
  /** The full, unfiltered dataset. Filtering, sorting, and paging are client-side. */
  data: T[]
  /** Rows per page. Defaults to 10. */
  pageSize?: number
  /** Placeholder for the search field. */
  searchPlaceholder?: string
}

/** Coerce any cell value to a lowercase string for search matching. */
function cellToSearchString(value: unknown): string {
  if (value == null) return ""
  if (typeof value === "string") return value.toLowerCase()
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).toLowerCase()
  }
  return ""
}

/** Compare two cell values for sorting; numbers numerically, else by string. */
function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === "number" && typeof b === "number") return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true })
}

/**
 * DataTable — a generic, client-side sortable/filterable/paginated table built
 * on the `fy-table` styles with `fy-datatable` wrappers. Provide `columns` and
 * `data`; the component owns search, sort, and pagination state internally.
 */
function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    pageSize = 10,
    searchPlaceholder = "Search…",
    className,
    ...props
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<SortState<T> | null>(null)
  const [page, setPage] = React.useState(0)

  // Filter across every string-coercible cell in a row.
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter((row) =>
      columns.some((col) => cellToSearchString(row[col.key]).includes(q))
    )
  }, [data, columns, query])

  const sorted = React.useMemo(() => {
    if (!sort) return filtered
    const next = [...filtered]
    next.sort((a, b) => {
      const result = compareValues(a[sort.key], b[sort.key])
      return sort.direction === "asc" ? result : -result
    })
    return next
  }, [filtered, sort])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  // Keep the current page in range as the dataset shrinks (e.g. while filtering).
  const safePage = Math.min(page, pageCount - 1)
  const start = safePage * pageSize
  const pageRows = sorted.slice(start, start + pageSize)

  // Reset to the first page whenever the filtered/sorted result set changes.
  React.useEffect(() => {
    setPage(0)
  }, [query, sort, pageSize])

  const toggleSort = React.useCallback((key: keyof T & string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" }
      if (prev.direction === "asc") return { key, direction: "desc" }
      return null // third click clears the sort
    })
  }, [])

  const rangeStart = sorted.length === 0 ? 0 : start + 1
  const rangeEnd = Math.min(start + pageSize, sorted.length)

  return (
    <div ref={ref} className={cn("fy-datatable", className)} {...props}>
      <div className="fy-datatable__toolbar">
        <div className="fy-datatable__search">
          <Search className="fy-datatable__search-icon" aria-hidden="true" />
          <input
            type="text"
            className="fy-input fy-datatable__search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search table"
          />
        </div>
      </div>

      <div className="fy-table__wrap">
        <table className="fy-table fy-datatable__table">
          <thead className="fy-table__header">
            <tr className="fy-table__row">
              {columns.map((col) => {
                const active = sort?.key === col.key
                const direction = active ? sort.direction : undefined
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "fy-table__head",
                      col.sortable && "fy-datatable__head--sortable",
                      col.numeric && "fy-datatable__head--numeric"
                    )}
                    aria-sort={
                      col.sortable
                        ? active
                          ? direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        className="fy-datatable__sort"
                        onClick={() => toggleSort(col.key)}
                      >
                        <span>{col.header}</span>
                        {!active && (
                          <ChevronsUpDown
                            className="fy-datatable__sort-icon fy-datatable__sort-icon--idle"
                            aria-hidden="true"
                          />
                        )}
                        {active && direction === "asc" && (
                          <ChevronUp
                            className="fy-datatable__sort-icon"
                            aria-hidden="true"
                          />
                        )}
                        {active && direction === "desc" && (
                          <ChevronDown
                            className="fy-datatable__sort-icon"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="fy-table__body">
            {pageRows.length === 0 ? (
              <tr className="fy-table__row">
                <td
                  className="fy-table__cell fy-datatable__empty"
                  colSpan={columns.length}
                >
                  No results found.
                </td>
              </tr>
            ) : (
              pageRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="fy-table__row">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "fy-table__cell",
                        col.numeric && "fy-num"
                      )}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="fy-datatable__footer">
        <span className="fy-datatable__count">
          {rangeStart}–{rangeEnd} of {sorted.length}
        </span>
        <div className="fy-datatable__pager">
          <button
            type="button"
            className="fy-btn fy-btn--outline fy-btn--sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
          >
            Previous
          </button>
          <span className="fy-datatable__page-label">
            Page {safePage + 1} of {pageCount}
          </span>
          <button
            type="button"
            className="fy-btn fy-btn--outline fy-btn--sm"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={safePage >= pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * `forwardRef` erases generics, so we recast the wrapped component back to a
 * generic-preserving signature. This keeps `DataTable<T>` fully typed at usage.
 */
const DataTable = React.forwardRef(DataTableInner) as <
  T extends Record<string, unknown>
>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement

export { DataTable }
