import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  // Bundle the token + component CSS into dist/styles.css so apps just
  // `import "fiftyyears/styles.css"` — no Tailwind required in the app.
  loader: { ".css": "copy" },
  esbuildOptions(options) {
    options.banner = { js: '"use client";' }
  },
})
