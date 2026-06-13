import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/WDD-330/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "src/home/index.html"),
        details: resolve(__dirname, "src/details/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});