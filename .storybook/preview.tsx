import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/theme-root.css";

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: "Theme Mode",
      description: "Global theme mode for stories",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ],
        showName: true
      }
    }
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider mode={context.globals.themeMode}>
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;
