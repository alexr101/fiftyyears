/**
 * Flattens the token + component stylesheets into a single dist/styles.css,
 * inlining the @import chain in src/styles/index.css so consumers ship one file.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const stylesDir = resolve(here, "../src/styles")
const entry = resolve(stylesDir, "index.css")

const IMPORT_RE = /@import\s+["']([^"']+)["']\s*;/g

/** Recursively inline @import statements, depth-first, once each. */
function inline(file, seen = new Set()) {
  const abs = resolve(file)
  if (seen.has(abs)) return "" // guard against cycles / double-includes
  seen.add(abs)

  const css = readFileSync(abs, "utf8")
  const base = dirname(abs)

  return css.replace(IMPORT_RE, (_, spec) => {
    const target = resolve(base, spec)
    return inline(target, seen)
  })
}

const banner = `/* fiftyyears — bundled stylesheet. Generated; do not edit. */\n`
const out = banner + inline(entry)

const distDir = resolve(here, "../dist")
mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, "styles.css"), out, "utf8")

console.log(`dist/styles.css written (${(out.length / 1024).toFixed(1)} KB)`)
