import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactLuna",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});
