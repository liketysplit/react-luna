import { expect, test } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { storybookCaptures } from "./manifest";

const screenshotDir = join(process.cwd(), "artifacts", "storybook-screenshots");
const requestedComponent = process.env.STORYBOOK_COMPONENT?.trim();

type StoryCapture = (typeof storybookCaptures)[number];

function loadBranchManifest(componentSlug: string): StoryCapture[] | null {
  const manifestPath = join(
    process.cwd(),
    "playwright",
    "storybook",
    "manifests",
    `${componentSlug}.json`
  );

  if (!existsSync(manifestPath)) {
    return null;
  }

  return JSON.parse(readFileSync(manifestPath, "utf8")) as StoryCapture[];
}

function buildCapturesFromStorybookIndex(componentSlug: string): StoryCapture[] {
  const normalizedComponent = componentSlug.replace(/-/g, "");
  const storybookIndexPath = join(process.cwd(), "storybook-static", "index.json");
  const storybookIndex = JSON.parse(readFileSync(storybookIndexPath, "utf8")) as {
    entries: Record<string, { id: string }>;
  };

  return Object.keys(storybookIndex.entries)
    .filter((storyId) => storyId.startsWith(`components-${normalizedComponent}--`))
    .filter((storyId) => !storyId.endsWith("--docs"))
    .sort()
    .map((storyId) => {
      const storyName = storyId.split("--")[1] ?? "story";
      return {
        storyId,
        fileName: `${componentSlug}-${storyName}`,
        backgrounds: storyName === "playground" ? ["light", "dark"] : ["light"]
      };
    });
}

const captures =
  requestedComponent && requestedComponent.length > 0
    ? loadBranchManifest(requestedComponent) ?? buildCapturesFromStorybookIndex(requestedComponent)
    : [];

for (const capture of captures) {
  const backgrounds = capture.backgrounds ?? ["light"];

  for (const background of backgrounds) {
    test(`${capture.storyId} [${background}]`, async ({ page }) => {
      const screenshotPath = join(screenshotDir, `${capture.fileName}--${background}.png`);
      mkdirSync(dirname(screenshotPath), { recursive: true });
      const globalsQuery = background === "light" ? "" : `&globals=backgrounds.value:${background}`;

      await page.goto(
        `/iframe.html?id=${capture.storyId}&viewMode=story${globalsQuery}`,
        { waitUntil: "networkidle" }
      );

      await page.setViewportSize({ width: 1440, height: 1080 });
      await expect(page.locator("#storybook-root")).toBeVisible();
      await page.screenshot({ path: screenshotPath, fullPage: true });
    });
  }
}
