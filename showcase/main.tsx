import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../src/styles/index.css"
import "./showcase.css"
import { Showcase } from "./Showcase"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Showcase />
  </StrictMode>
)
