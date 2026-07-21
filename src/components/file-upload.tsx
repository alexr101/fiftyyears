import * as React from "react"
import { File as FileIcon, Upload, X } from "lucide-react"

import { cn } from "../lib/utils"

/** Human-readable byte size, e.g. 2048 → "2 KB". */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )
  const value = bytes / Math.pow(1024, exponent)
  const rounded = exponent === 0 ? value : Math.round(value * 10) / 10
  return `${rounded} ${units[exponent]}`
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Called with the current selection whenever files are added or removed. */
  onFiles?: (files: File[]) => void
  /** Allow selecting more than one file. Defaults to true. */
  multiple?: boolean
  /** `accept` attribute forwarded to the hidden input (e.g. "image/*"). */
  accept?: string
  /** Disable dropping and browsing. */
  disabled?: boolean
}

/**
 * FileUpload — a dashed drop zone that highlights on drag-over and opens a file
 * browser on click (via a hidden input). Selected files are listed with their
 * size and a remove control. Selection state is internal; `onFiles` reports the
 * current list on every change.
 */
const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    { onFiles, multiple = true, accept, disabled, className, ...props },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [dragging, setDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const commit = React.useCallback(
      (next: File[]) => {
        setFiles(next)
        onFiles?.(next)
      },
      [onFiles]
    )

    const addFiles = React.useCallback(
      (incoming: FileList | File[]) => {
        const list = Array.from(incoming)
        if (list.length === 0) return
        commit(multiple ? [...files, ...list] : list.slice(0, 1))
      },
      [commit, files, multiple]
    )

    const removeAt = (index: number) => {
      commit(files.filter((_, i) => i !== index))
    }

    const openBrowser = () => {
      if (!disabled) inputRef.current?.click()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
      if (disabled) return
      if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!disabled) setDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      // Ignore drag-leave events bubbling up from inner children.
      if (e.currentTarget.contains(e.relatedTarget as Node)) return
      setDragging(false)
    }

    return (
      <div ref={ref} className={cn("fy-fileupload", className)} {...props}>
        <div
          className={cn(
            "fy-fileupload__dropzone",
            dragging && "fy-fileupload__dropzone--active",
            disabled && "fy-fileupload__dropzone--disabled"
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={openBrowser}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              openBrowser()
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <span className="fy-fileupload__icon">
            <Upload aria-hidden="true" />
          </span>
          <span className="fy-fileupload__prompt">
            <span className="fy-fileupload__prompt-strong">
              Click to upload
            </span>{" "}
            or drag and drop
          </span>
          <input
            ref={inputRef}
            type="file"
            className="fy-fileupload__input"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files)
              // Reset so selecting the same file again still fires onChange.
              e.target.value = ""
            }}
          />
        </div>

        {files.length > 0 && (
          <ul className="fy-fileupload__list">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="fy-fileupload__item"
              >
                <span className="fy-fileupload__file-icon">
                  <FileIcon aria-hidden="true" />
                </span>
                <span className="fy-fileupload__file-name">{file.name}</span>
                <span className="fy-fileupload__file-size fy-num">
                  {formatBytes(file.size)}
                </span>
                <button
                  type="button"
                  className="fy-fileupload__remove"
                  onClick={() => removeAt(index)}
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                >
                  <X aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
