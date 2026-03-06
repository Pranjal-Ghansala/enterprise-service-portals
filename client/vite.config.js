// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use process.env for Vite config, fallback if missing
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: API_URL, 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});