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

  it("defines alert defaults and all built-in tones", () => {
    const alert = lunarTheme.components.alert;

    expect(alert?.defaultPadding).toBe("4");
    expect(alert?.defaultGap).toBe("3");
    expect(Object.keys(alert?.tones?.light ?? {})).toEqual([
      "neutral",
      "info",
      "success",
      "warning",
      "danger"
    ]);
    expect(Object.keys(alert?.tones?.dark ?? {})).toEqual([
      "neutral",
      "info",
      "success",
      "warning",
      "danger"
    ]);
  });

  it("defines notification defaults and all built-in tones", () => {
    const notification = lunarTheme.components.notification;

    expect(notification?.defaultPadding).toBe("4");
    expect(notification?.defaultGap).toBe("3");
    expect(Object.keys(notification?.tones?.light ?? {})).toEqual([
      "neutral",
      "info",
      "success",
      "warning",
      "danger"
    ]);
    expect(Object.keys(notification?.tones?.dark ?? {})).toEqual([
      "neutral",
      "info",
      "success",
      "warning",
      "danger"
    ]);
  });

  it("defines drawer defaults for the composite overlay surface", () => {
    const drawer = lunarTheme.components.drawer;

    expect(drawer?.defaultPlacement).toBe("right");
    expect(drawer?.defaultPadding).toBe("5");
    expect(drawer?.defaultGap).toBe("4");
    expect(drawer?.defaultInset).toBe("4");
    expect(drawer?.defaultSize).toBe("28rem");
  });
});
