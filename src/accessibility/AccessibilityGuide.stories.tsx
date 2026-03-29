import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

function AccessibilityGuidePage() {
  return (
    <article
      style={{
        maxWidth: "64rem",
        margin: "0 auto",
        display: "grid",
        gap: "1.5rem",
        lineHeight: 1.6
      }}
    >
      <header style={{ display: "grid", gap: "0.75rem" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Accessibility</h1>
        <p style={{ margin: 0 }}>
          `react-luna` aims for accessible defaults, but accessibility remains a shared contract
          between the library and the consuming product.
        </p>
        <p style={{ margin: 0 }}>
          The canonical written guide lives in <code>docs/ACCESSIBILITY.md</code>. This Storybook
          page mirrors the current expectations so they stay visible during component review.
        </p>
      </header>

      <section>
        <h2>Baseline Expectations</h2>
        <ul>
          <li>Prefer native semantics whenever the component contract allows them.</li>
          <li>Give every interactive control an accessible name.</li>
          <li>Prefer visible labels for fields instead of placeholder-only labeling.</li>
          <li>Preserve keyboard access anywhere pointer interaction is supported.</li>
          <li>Preserve visible focus treatment when overriding theme tokens.</li>
          <li>Choose announcement semantics deliberately for feedback, loading, and progress.</li>
        </ul>
      </section>

      <section>
        <h2>Known Constraints</h2>
        <ul>
          <li>
            <code>LunaDrawer</code> exposes dialog semantics, but it does not trap focus or manage
            focus transitions.
          </li>
          <li>
            <code>LunaTooltip</code> is descriptive only and should not contain interactive content.
          </li>
          <li>
            <code>LunaHoverText</code> is not a tooltip replacement and does not wire descriptive
            overlay semantics.
          </li>
          <li>
            <code>LunaButton</code> loading is presentational only and does not disable interaction
            by itself.
          </li>
          <li>
            Custom theme overrides are not automatically validated for contrast, focus visibility,
            or motion comfort.
          </li>
        </ul>
      </section>

      <section>
        <h2>Component Guidance</h2>
        <ul>
          <li>
            Use explicit labels for icon-only buttons, floating action buttons, and unlabeled
            fields.
          </li>
          <li>
            Keep tooltip content short and descriptive; use other patterns for interactive floating
            content.
          </li>
          <li>
            Use <code>LunaModal</code> when the workflow needs managed dialog focus behavior; treat
            <code>LunaDrawer</code> as a lighter primitive unless the product adds its own focus
            management.
          </li>
          <li>
            Add <code>role</code> and <code>aria-live</code> intentionally for alerts and
            notifications when announcement timing matters.
          </li>
          <li>
            Use semantic spinner and progress states only when the loading or task context needs to
            be announced.
          </li>
        </ul>
      </section>
    </article>
  );
}

const meta = {
  title: "Documentation/Accessibility",
  component: AccessibilityGuidePage,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof AccessibilityGuidePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <AccessibilityGuidePage />
};
