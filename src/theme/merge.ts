import type { DeepPartial } from "./types";

export function deepMerge<T>(base: T, override?: DeepPartial<T>): T {
  if (!override) {
    return base;
  }

  if (Array.isArray(base)) {
    return (override as T) ?? base;
  }

  if (typeof base !== "object" || base === null) {
    return (override as T) ?? base;
  }

  const result: Record<string, unknown> = { ...base } as Record<string, unknown>;
  const overrideObj = override as Record<string, unknown>;

  for (const key of Object.keys(overrideObj)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = overrideObj[key];

    if (Array.isArray(baseValue)) {
      result[key] = overrideValue ?? baseValue;
      continue;
    }

    if (
      typeof baseValue === "object" &&
      baseValue !== null &&
      typeof overrideValue === "object" &&
      overrideValue !== null
    ) {
      result[key] = deepMerge(baseValue, overrideValue as DeepPartial<typeof baseValue>);
      continue;
    }

    result[key] = overrideValue ?? baseValue;
  }

  return result as T;
}