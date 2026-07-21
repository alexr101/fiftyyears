# fiftyyears

A durable, token-driven React design system. 65 components, themeable to the
bone — color, type, density, radius, borders, and elevation are all tokens, so
a theme changes the *product*, not just the hue.

Built to be installed by every app in the family so they all look like one
company.

## Install

```bash
npm install fiftyyears
```

```tsx
import "fiftyyears/styles.css"          // once, at the app root
import { Button, Card, Input } from "fiftyyears"

<Button variant="primary">Publish</Button>
```

- Ships ESM with full TypeScript types and one bundled stylesheet.
- Requires **React 18+**.
- Brings its own styles — **no Tailwind, no CSS framework, no config** in the app.
- Wrap the app root in `className="fy-root"` to set base font/size/color from tokens.

## Providers

Some components need a provider near the root:

```tsx
import {
  ThemeProvider, TooltipProvider, ToastProvider, Toaster,
} from "fiftyyears"

<ThemeProvider>          {/* theme + density + light/dark, persisted */}
  <TooltipProvider>
    <ToastProvider>
      <App />
      <Toaster />        {/* toast stack — replaces native alerts */}
    </ToastProvider>
  </TooltipProvider>
</ThemeProvider>
```

Never use native `alert`/`confirm`/`prompt` — use `useToast()`, `Dialog`, or
`AlertDialog`.

## Theming

Every color, size, weight, radius, and border is a CSS variable (`--fy-*`) in
one place. Override tokens on `:root` (or a wrapper) to rebrand — never edit
component styles.

```css
:root {
  --fy-primary: 262 83% 60%;   /* HSL triplet, no hsl() wrapper */
  --fy-radius: 0.4rem;
  --fy-density: 1.1;
}
```

Colors are HSL triplets so alpha works: `hsl(var(--fy-primary) / 0.15)`.
Dark mode: add `class="dark"` to `<html>` (or `class="light"`; omit both to
follow the OS).

### Built-in themes + controls

The package ships switchable themes and layout-free controls:

```tsx
import { ModeControl, ThemeControl, DensityControl } from "fiftyyears"
```

Place each control anywhere. Themes: Foundation, Editorial, Signal Desk,
Brutalist, Solarized, Candy, Kiosk. Density (Compact → Spacious) is independent
of theme and scales spacing + control sizing across every component. All three
axes persist to localStorage.

## Components

Full reference — every component, its props, and a usage example — is in
[`docs/COMPONENTS.md`](docs/COMPONENTS.md). 65 components across Layout, Forms,
Overlays, Navigation, Feedback, Display, plus automation-domain pieces
(`Node`, `VariableChip`, `StatusDot`) and the theme system.

## Development

```bash
npm install
npm run showcase     # live showcase of every component at :5300
npm run build        # build dist/ (JS + types + styles.css)
npm run typecheck
```

The showcase (`showcase/`) renders every component with a theme/density/mode
switcher and a live type specimen — it is the design system's working surface.

## License

MIT
