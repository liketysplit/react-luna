import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { LunaAvatar } from "./LunaAvatar";

const moonPortrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23818cf8'/%3E%3Cstop offset='100%25' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='60' fill='url(%23g)'/%3E%3Ccircle cx='60' cy='44' r='22' fill='%23f8fafc' fill-opacity='0.95'/%3E%3Cpath d='M28 96c8-18 24-28 32-28s24 10 32 28' fill='%23f8fafc' fill-opacity='0.95'/%3E%3C/svg%3E";

const meta = {
  title: "Components/LunaAvatar",
  component: LunaAvatar,
  args: {
    name: "Luna Orbit"
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof LunaAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ContentModes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <LunaAvatar src={moonPortrait} name="Luna Orbit" />
      <LunaAvatar name="Nova Drift" />
      <LunaAvatar fallback={<span aria-hidden="true">✦</span>} aria-label="Fallback star avatar" />
      <LunaAvatar />
    </div>
  )
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <LunaAvatar size="x-small" name="Luna Orbit" />
      <LunaAvatar size="small" name="Luna Orbit" />
      <LunaAvatar size="medium" name="Luna Orbit" />
      <LunaAvatar size="large" name="Luna Orbit" />
      <LunaAvatar size="x-large" name="Luna Orbit" />
    </div>
  )
};

export const ThemeOverrides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <LunaAvatar
        name="Luna Orbit"
        style={
          {
            "--luna-avatar-bg": "#312e81",
            "--luna-avatar-fg": "#eef2ff",
            "--luna-avatar-border": "#818cf8"
          } as React.CSSProperties
        }
      />
      <LunaAvatar size="3.75rem" name="Nova Drift" />
    </div>
  )
};
