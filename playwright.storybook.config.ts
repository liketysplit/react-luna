import { defineConfig, devices } from "@playwright/test";

const outputDir = "artifacts/storybook-screenshots";

export default defineConfig({
  testDir: "./playwright/storybook",
  timeout: 30_000,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:6106",
    trace: "off",
    video: "off",
    screenshot: "off"
  },
  outputDir,
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1080 }
      }
    }
  ],
  webServer: {
    command: "node scripts/serve-static.mjs storybook-static 6106",
    url: "http://127.0.0.1:6106",
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "pipe"
  }
});
