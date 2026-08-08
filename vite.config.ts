import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `VITE_BASE_PATH` is injected by the GitHub Pages workflow so the build
// works both locally (served from `/`) and on Pages (served from `/<repo>/`).
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
});
