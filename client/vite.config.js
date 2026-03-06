// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Provide a fallback URL if VITE_API_URL is missing
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
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