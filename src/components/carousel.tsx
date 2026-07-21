import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Each child becomes a scroll-snap slide. */
  children: React.ReactNode
  /** Show the prev/next arrow buttons. Defaults to true. */
  showArrows?: boolean
  /** Show the position dots. Defaults to true. */
  showDots?: boolean
  /** Accessible label for the carousel region. */
  label?: string
}

/**
 * Carousel — a dependency-free horizontal scroll-snap slider. Prev/next
 * buttons scroll by one slide; dots reflect and jump to the active slide.
 * Active index is tracked from scroll position, so native swipe stays in sync.
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      showArrows = true,
      showDots = true,
      label = "Carousel",
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const slides = React.Children.toArray(children)
    const [active, setActive] = React.useState(0)

    const scrollToIndex = React.useCallback((index: number) => {
      const viewport = viewportRef.current
      if (!viewport) return
      const clamped = Math.min(Math.max(index, 0), viewport.children.length - 1)
      const slide = viewport.children[clamped] as HTMLElement | undefined
      if (slide) {
        viewport.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
      }
    }, [])

    const handleScroll = React.useCallback(() => {
      const viewport = viewportRef.current
      if (!viewport) return
      const center = viewport.scrollLeft + viewport.clientWidth / 2
      let nearest = 0
      let nearestDist = Infinity
      Array.from(viewport.children).forEach((child, i) => {
        const el = child as HTMLElement
        const mid = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(mid - center)
        if (dist < nearestDist) {
          nearestDist = dist
          nearest = i
        }
      })
      setActive(nearest)
    }, [])

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={cn("fy-carousel", className)}
        {...props}
      >
        <div
          ref={viewportRef}
          className="fy-carousel__viewport"
          onScroll={handleScroll}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="fy-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>

        {showArrows && slides.length > 1 ? (
          <>
            <button
              type="button"
              className="fy-carousel__arrow fy-carousel__arrow--prev"
              aria-label="Previous slide"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="fy-carousel__arrow fy-carousel__arrow--next"
              aria-label="Next slide"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === slides.length - 1}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}

        {showDots && slides.length > 1 ? (
          <div className="fy-carousel__dots" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}`}
                data-active={i === active ? "true" : undefined}
                className="fy-carousel__dot"
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }
