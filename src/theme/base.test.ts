import { describe, expect, it } from "vitest";
import { lunarTheme } from "./base";

describe("theme size contract", () => {
  it("keeps field and button size tiers aligned by minHeight", () => {
    const buttonSizes = lunarTheme.components.button?.sizes;
    const inputSizes = lunarTheme.components.input?.sizes;

    expect(inputSizes?.sm?.minHeight).toBe(buttonSizes?.small?.minHeight);
    expect(inputSizes?.md?.minHeight).toBe(buttonSizes?.medium?.minHeight);
    expect(inputSizes?.lg?.minHeight).toBe(buttonSizes?.large?.minHeight);
  });

  it("keeps avatar size tiers aligned with button heights", () => {
    const buttonSizes = lunarTheme.components.button?.sizes;
    const avatarSizes = lunarTheme.components.avatar?.sizes;

    expect(avatarSizes?.small?.size).toBe(buttonSizes?.small?.minHeight);
    expect(avatarSizes?.medium?.size).toBe(buttonSizes?.medium?.minHeight);
    expect(avatarSizes?.large?.size).toBe(buttonSizes?.large?.minHeight);
    expect(avatarSizes?.["x-large"]?.size).toBe(buttonSizes?.["x-large"]?.minHeight);
  });
});
