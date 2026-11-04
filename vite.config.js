import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// BASE_PATH é definido no workflow do GitHub Pages ("/Cinedose/").
// Localmente (npm run dev / build) o site continua servido na raiz "/".
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
});
