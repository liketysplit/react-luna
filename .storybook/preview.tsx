import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/theme";
import "../src/styles/theme-root.css";

const LIGHT_CANVAS = "#f8fafc";
const DARK_CANVAS = "#0f172a";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: LIGHT_CANVAS },
        { name: "dark", value: DARK_CANVAS }
      ]
    }
  },
  decorators: [
    (Story, context) => {
      const canvasBackground = context.globals.backgrounds?.value;
      const mode = canvasBackground === DARK_CANVAS ? "dark" : "light";

      return (
        <ThemeProvider mode={mode}>
          <div style={{ padding: "1.5rem" }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    }
  ]
};

export default preview;
