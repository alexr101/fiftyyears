import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

// Showcase dev server. The published library is built with tsup, not this.
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "showcase"),
  server: { port: 5300, strictPort: true },
})
