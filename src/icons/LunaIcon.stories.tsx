import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaIcon } from "./LunaIcon";
import { CORE_ICON_NAMES, ICON_NAMES, LUNA_ICON_NAMES } from "./internal/types";

const meta = {
  title: "Foundations/LunaIcon",
  component: LunaIcon,
  args: {
    name: "check",
    variant: "outline",
    size: "lg",
    label: "Check icon"
  },
  argTypes: {
    name: {
      control: "select",
      options: ICON_NAMES
    },
    variant: {
      control: "inline-radio",
      options: ["outline", "filled"]
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl"]
    }
  }
} satisfies Meta<typeof LunaIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

const galleryFrameStyle: React.CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  padding: "1.5rem",
  boxSizing: "border-box"
};

const galleryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
  gap: "1rem"
};

const galleryCardStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.75rem",
  justifyItems: "center",
  padding: "1rem",
  borderRadius: "0.75rem",
  border: "1px solid var(--luna-border, rgba(127, 127, 127, 0.24))",
  background: "var(--luna-surface, rgba(255, 255, 255, 0.02))",
  minHeight: "7rem",
  textAlign: "center"
};

const galleryLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  lineHeight: 1.3,
  wordBreak: "break-word"
};

const sectionStyle: React.CSSProperties = {
  display: "grid",
  gap: "1rem"
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase"
};

export const Playground: Story = {};

export const GalleryOutline: Story = {
  render: () => (
    <div style={galleryFrameStyle}>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Core UI Icons</span>
        <div style={galleryGridStyle}>
          {CORE_ICON_NAMES.map((name) => (
            <div key={`outline-core-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="outline" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Luna Brand Icons</span>
        <div style={galleryGridStyle}>
          {LUNA_ICON_NAMES.map((name) => (
            <div key={`outline-luna-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="outline" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export const GalleryFilled: Story = {
  render: () => (
    <div style={galleryFrameStyle}>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Core UI Icons</span>
        <div style={galleryGridStyle}>
          {CORE_ICON_NAMES.map((name) => (
            <div key={`filled-core-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="filled" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Luna Brand Icons</span>
        <div style={galleryGridStyle}>
          {LUNA_ICON_NAMES.map((name) => (
            <div key={`filled-luna-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="filled" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export const LunaOnly: Story = {
  render: () => (
    <div style={galleryFrameStyle}>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Luna Outline</span>
        <div style={galleryGridStyle}>
          {LUNA_ICON_NAMES.map((name) => (
            <div key={`luna-only-outline-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="outline" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sectionStyle}>
        <span style={sectionTitleStyle}>Luna Filled</span>
        <div style={galleryGridStyle}>
          {LUNA_ICON_NAMES.map((name) => (
            <div key={`luna-only-filled-${name}`} style={galleryCardStyle}>
              <LunaIcon name={name} variant="filled" size="lg" label={`${name} icon`} />
              <span style={galleryLabelStyle}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
