import React from "react";

function isTransparent(value: string) {
  return value === "transparent" || value === "rgba(0, 0, 0, 0)";
}

function findParentBackground(element: HTMLElement | null) {
  let current = element?.parentElement ?? null;

  while (current) {
    const backgroundColor = window.getComputedStyle(current).backgroundColor;

    if (backgroundColor && !isTransparent(backgroundColor)) {
      return backgroundColor;
    }

    current = current.parentElement;
  }

  return "";
}

export function useParentBackgroundVar<T extends HTMLElement>(deps: React.DependencyList = []) {
  const ref = React.useRef<T | null>(null);

  React.useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const parentBackground = findParentBackground(element);

    if (parentBackground) {
      element.style.setProperty("--luna-container-bg", parentBackground);
      return;
    }

    element.style.removeProperty("--luna-container-bg");
  }, deps);

  return ref;
}
