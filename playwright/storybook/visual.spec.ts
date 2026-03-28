import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { storybookCaptures } from "./manifest";

const screenshotDir = join(process.cwd(), "artifacts", "storybook-screenshots");

for (const capture of storybookCaptures) {
  const backgrounds = capture.backgrounds ?? ["light"];

  for (const background of backgrounds) {
    test(`${capture.storyId} [${background}]`, async ({ page }) => {
      const screenshotPath = join(screenshotDir, `${capture.fileName}--${background}.png`);
      mkdirSync(dirname(screenshotPath), { recursive: true });

      await page.goto(
        `/iframe.html?id=${capture.storyId}&viewMode=story&globals=backgrounds.value:${background}`,
        { waitUntil: "networkidle" }
      );

      await page.setViewportSize({ width: 1440, height: 1080 });
      await expect(page.locator("#storybook-root")).toBeVisible();
      await page.screenshot({ path: screenshotPath, fullPage: true });
    });
  }
}
