export type StoryCapture = {
  storyId: string;
  fileName: string;
  backgrounds?: string[];
};

export const storybookCaptures: StoryCapture[] = [
  {
    storyId: "components-lunatoast--playground",
    fileName: "luna-toast-playground",
    backgrounds: ["light", "dark"]
  },
  {
    storyId: "components-lunatoast--tone-and-emphasis-matrix",
    fileName: "luna-toast-tone-and-emphasis-matrix",
    backgrounds: ["light"]
  },
  {
    storyId: "components-lunatoast--controlled-visibility",
    fileName: "luna-toast-controlled-visibility",
    backgrounds: ["light"]
  }
];
