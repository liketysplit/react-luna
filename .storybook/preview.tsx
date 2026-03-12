import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/theme-root.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;
