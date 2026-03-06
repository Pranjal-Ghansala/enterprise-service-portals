// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Use import.meta.env for Vite config
const API_URL = "http://localhost:5000";

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