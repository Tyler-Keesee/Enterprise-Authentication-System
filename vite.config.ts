/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  base: "/Enterprise-Authentication-System/",
  build: {
    outDir: "dist",
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: /^jspdf$/, replacement: fileURLToPath(new URL("./node_modules/jspdf/dist/jspdf.umd.min.js", import.meta.url)) },
      { find: /^jspdf-autotable$/, replacement: fileURLToPath(new URL("./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs", import.meta.url)) },
      { find: /^process$/, replacement: "process/browser" },
    ],
  },
  define: {
    "process.env": {},
    global: "globalThis",
  },
});
