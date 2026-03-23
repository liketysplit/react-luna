import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "./luna-column";
import { LunaGrid } from "./luna-grid";
import { LunaInput } from "./luna-input";
import { LunaRow } from "./luna-row";
import { LunaSelect } from "./luna-select";
import { LunaTextarea } from "./luna-textarea";
import "./luna-layout.stories.css";
import type { LunaLayoutSpan } from "./layout-shared";

const fieldOptions = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma", disabled: true }
];

function DemoBlock({
  label,
  detail
}: {
  label: string;
  detail?: string;
}) {
  return (
    <div className="luna-layout-demo-block">
      <span className="luna-layout-demo-block__label">{label}</span>
      {detail ? <span className="luna-layout-demo-block__detail">{detail}</span> : null}
    </div>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="luna-layout-story-section">
      <h3 className="luna-layout-story-section__title">{title}</h3>
      {children}
    </section>
  );
}

function LayoutItem({
  colSpan,
  label,
  detail
}: {
  colSpan?: LunaLayoutSpan;
  label: string;
  detail?: string;
}) {
  return (
    <div data-col-span={colSpan as never}>
      <DemoBlock label={label} detail={detail} />
    </div>
  );
}

const meta = {
  title: "Components/Layout",
  parameters: {
    controls: { disable: true }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColumnBasics: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Vertical flow with gap">
        <LunaColumn gap="4">
          <LayoutItem label="Header copy" detail="default width" />
          <LayoutItem label="Support text" detail="colSpan 8" colSpan={8} />
          <LayoutItem
            label="Responsive note"
            detail="xs 12, md 6, xl 4"
            colSpan={{ xs: 12, md: 6, xl: 4 }}
          />
        </LunaColumn>
      </Section>
    </div>
  )
};

export const ColumnProps: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Alignment and justification">
        <LunaColumn gap="3" align="center" justify="center" style={{ minHeight: "18rem" }}>
          <LayoutItem label="Centered item" />
          <LayoutItem label="Second item" colSpan={8} />
          <LayoutItem label="Third item" colSpan={6} />
        </LunaColumn>
      </Section>
      <Section title="Inline column">
        <LunaColumn gap="2" inline>
          <LayoutItem label="Inline" />
          <LayoutItem label="Column" />
        </LunaColumn>
      </Section>
    </div>
  )
};

export const RowBasics: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Default wrapped row with 12-column subdivision">
        <LunaRow gap="4">
          <LayoutItem label="Primary action" detail="colSpan 6" colSpan={6} />
          <LayoutItem label="Filter" detail="colSpan 3" colSpan={3} />
          <LayoutItem label="Status" detail="colSpan 3" colSpan={3} />
          <LayoutItem
            label="Responsive panel"
            detail="mobile 12, tablet 6, desktop 4"
            colSpan={{ mobile: 12, tablet: 6, desktop: 4 }}
          />
          <LayoutItem label="Wide content" detail="xs 12, md 6, xl 8" colSpan={{ xs: 12, md: 6, xl: 8 }} />
        </LunaRow>
      </Section>
    </div>
  )
};

export const RowProps: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="No wrap row">
        <LunaRow gap="3" wrap={false}>
          <LayoutItem label="One" detail="colSpan 4" colSpan={4} />
          <LayoutItem label="Two" detail="colSpan 4" colSpan={4} />
          <LayoutItem label="Three" detail="colSpan 4" colSpan={4} />
        </LunaRow>
      </Section>
      <Section title="Alignment and justification">
        <LunaRow gap="3" align="center" justify="between" style={{ minHeight: "8rem" }}>
          <LayoutItem label="Start" detail="colSpan 2" colSpan={2} />
          <LayoutItem label="Middle" detail="colSpan 2" colSpan={2} />
          <LayoutItem label="End" detail="colSpan 2" colSpan={2} />
        </LunaRow>
      </Section>
      <Section title="Inline row">
        <LunaRow gap="2" inline>
          <LayoutItem label="Inline" />
          <LayoutItem label="Row" />
        </LunaRow>
      </Section>
    </div>
  )
};

export const GridBasics: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Basic 12-column grid">
        <LunaGrid gap="4">
          <LayoutItem label="Card A" detail="colSpan 4" colSpan={4} />
          <LayoutItem label="Card B" detail="colSpan 4" colSpan={4} />
          <LayoutItem label="Card C" detail="colSpan 4" colSpan={4} />
          <LayoutItem label="Sidebar" detail="xs 12, md 4" colSpan={{ xs: 12, md: 4 }} />
          <LayoutItem label="Main content" detail="xs 12, md 8" colSpan={{ xs: 12, md: 8 }} />
        </LunaGrid>
      </Section>
    </div>
  )
};

export const GridResponsiveSpans: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Responsive spans and aliases">
        <LunaGrid gap="4">
          <LayoutItem
            label="Alias span"
            detail="mobile 12, tablet 4, desktop 3"
            colSpan={{ mobile: 12, tablet: 4, desktop: 3 }}
          />
          <LayoutItem
            label="Canonical span"
            detail="xs 12, sm 6, md 4, lg 3, xl 2"
            colSpan={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          />
          <LayoutItem label="Content band" detail="xs 12, md 8, xl 9" colSpan={{ xs: 12, md: 8, xl: 9 }} />
          <LayoutItem label="Utility panel" detail="xs 12, md 4, xl 3" colSpan={{ xs: 12, md: 4, xl: 3 }} />
        </LunaGrid>
      </Section>
    </div>
  )
};

export const FieldLayoutComparison: Story = {
  render: () => (
    <div className="luna-layout-story">
      <Section title="Row with fields">
        <LunaRow gap="4">
          <LunaInput
            label="Input"
            placeholder="Enter value"
          />
          <LunaSelect
            label="Select"
            options={fieldOptions}
            placeholder="Choose"
          />
          <LunaTextarea
            label="Textarea"
            minRows={1}
            placeholder="Enter notes"
          />
        </LunaRow>
      </Section>
      <Section title="Column with fields">
        <LunaColumn gap="4">
          <LunaInput label="Input" placeholder="Enter value" />
          <LunaSelect label="Select" options={fieldOptions} placeholder="Choose" />
          <LunaTextarea label="Textarea" minRows={1} placeholder="Enter notes" />
        </LunaColumn>
      </Section>
      <Section title="Grid with fields">
        <LunaGrid gap="4">
          <div data-col-span={4}>
            <LunaInput label="Input" placeholder="Enter value" />
          </div>
          <div data-col-span={4}>
            <LunaSelect label="Select" options={fieldOptions} placeholder="Choose" />
          </div>
          <div data-col-span={4}>
            <LunaTextarea label="Textarea" minRows={1} placeholder="Enter notes" />
          </div>
        </LunaGrid>
      </Section>
    </div>
  )
};
