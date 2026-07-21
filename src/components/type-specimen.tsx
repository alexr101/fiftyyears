import * as React from "react"
import { cn } from "../lib/utils"

/**
 * TypeSpecimen — a live specimen of the design system's type system: the three
 * families (heading / body / label / mono), the full size scale, and the weight
 * ramp. It reads the same tokens every component uses, so it re-renders per
 * theme — showing exactly how type looks under Editorial, Signal Desk, etc.
 *
 * Use it in a design-system/settings page to preview the active theme's type.
 */

const SCALE: { token: string; label: string; sample: string }[] = [
  { token: "--fy-text-2xl", label: "2xl", sample: "Display heading" },
  { token: "--fy-text-xl", label: "xl", sample: "Section title" },
  { token: "--fy-text-lg", label: "lg", sample: "Card title" },
  { token: "--fy-text-md", label: "md", sample: "Emphasised body" },
  { token: "--fy-text-base", label: "base", sample: "Body text — the default reading size." },
  { token: "--fy-text-sm", label: "sm", sample: "Secondary / help text" },
  { token: "--fy-text-xs", label: "xs", sample: "Fine print & labels" },
]

const WEIGHTS: { token: string; label: string }[] = [
  { token: "--fy-weight-normal", label: "Normal" },
  { token: "--fy-weight-medium", label: "Medium" },
  { token: "--fy-weight-semibold", label: "Semibold" },
  { token: "--fy-weight-bold", label: "Bold" },
]

export interface TypeSpecimenProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const TypeSpecimen = React.forwardRef<HTMLDivElement, TypeSpecimenProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("fy-typespec", className)} {...props}>
      {/* families */}
      <div className="fy-typespec__families">
        <div className="fy-typespec__family">
          <span className="fy-typespec__eyebrow">Heading</span>
          <p className="fy-typespec__family-sample" style={{ fontFamily: "var(--fy-font-heading)", fontWeight: "var(--fy-weight-heading)" as React.CSSProperties["fontWeight"] }}>
            When a payment fails
          </p>
        </div>
        <div className="fy-typespec__family">
          <span className="fy-typespec__eyebrow">Body</span>
          <p className="fy-typespec__family-sample" style={{ fontFamily: "var(--fy-font-ui)" }}>
            The right people get notified in Slack.
          </p>
        </div>
        <div className="fy-typespec__family">
          <span className="fy-typespec__eyebrow">Label</span>
          <p className="fy-typespec__family-sample fy-typespec__label" style={{ fontFamily: "var(--fy-font-label)" }}>
            TRIGGER · ACTION
          </p>
        </div>
        <div className="fy-typespec__family">
          <span className="fy-typespec__eyebrow">Mono</span>
          <p className="fy-typespec__family-sample" style={{ fontFamily: "var(--fy-font-mono)" }}>
            {"{{client_name}}"}
          </p>
        </div>
      </div>

      {/* scale */}
      <div className="fy-typespec__scale">
        {SCALE.map((s) => (
          <div className="fy-typespec__scale-row" key={s.token}>
            <span className="fy-typespec__scale-tag">{s.label}</span>
            <span
              className="fy-typespec__scale-sample"
              style={{
                fontSize: `var(${s.token})`,
                fontFamily: s.label === "2xl" || s.label === "xl" ? "var(--fy-font-heading)" : "var(--fy-font-ui)",
                fontWeight: (s.label === "2xl" || s.label === "xl"
                  ? "var(--fy-weight-heading)"
                  : "var(--fy-weight-normal)") as React.CSSProperties["fontWeight"],
              }}
            >
              {s.sample}
            </span>
          </div>
        ))}
      </div>

      {/* weights */}
      <div className="fy-typespec__weights">
        {WEIGHTS.map((w) => (
          <div className="fy-typespec__weight" key={w.token}>
            <span
              className="fy-typespec__weight-sample"
              style={{ fontWeight: `var(${w.token})` as React.CSSProperties["fontWeight"] }}
            >
              Aa
            </span>
            <span className="fy-typespec__weight-label">{w.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
)
TypeSpecimen.displayName = "TypeSpecimen"
