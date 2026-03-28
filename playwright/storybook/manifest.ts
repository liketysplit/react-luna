export type StoryCapture = {
  storyId: string;
  fileName: string;
  backgrounds?: string[];
};

export const storybookCaptures: StoryCapture[] = [
  {
    storyId: "components-lunaemptystate--playground",
    fileName: "luna-empty-state-playground",
    backgrounds: ["light", "dark"]
  },
  {
    storyId: "components-lunaemptystate--standard-no-data",
    fileName: "luna-empty-state-standard-no-data",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunaemptystate--first-run-flow",
    fileName: "luna-empty-state-first-run-flow",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunaemptystate--alignment-and-surface-variants",
    fileName: "luna-empty-state-alignment-and-surface-variants",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunaemptystate--custom-content",
    fileName: "luna-empty-state-custom-content",
    backgrounds: ["light"]
  }
];
