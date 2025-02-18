import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Käytetään JSDOM:ia Reactin testaamiseen
    setupFiles: "./setupTests.js", // Ladataan jest-dom-lisäosat automaattisesti
  },
});
