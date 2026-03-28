export type StoryCapture = {
  storyId: string;
  fileName: string;
  backgrounds?: string[];
};

export const storybookCaptures: StoryCapture[] = [
  {
    storyId: "components-lunabadge--playground",
    fileName: "luna-badge-playground",
    backgrounds: ["light", "dark"]
  },
  {
    storyId: "components-lunabadge--tone-and-variant-matrix",
    fileName: "luna-badge-tone-and-variant-matrix",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunabadge--size-scale",
    fileName: "luna-badge-size-scale",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunabadge--rounded-and-semantic-markup",
    fileName: "luna-badge-rounded-and-semantic-markup",
    backgrounds: ["light"]
  }
];
