import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    manifest: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Smart Scorecard Builder",
        short_name: "Smart Scorecard",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ff5f00",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
