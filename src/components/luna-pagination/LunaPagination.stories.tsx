import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LunaColumn } from "../luna-column";
import { LunaText } from "../luna-text";
import { LunaPagination } from "./LunaPagination";

const meta = {
  title: "Components/LunaPagination",
  component: LunaPagination,
  args: {
    currentPage: 1,
    totalPages: 8,
    siblingCount: 1,
    boundaryCount: 1,
    showPreviousNext: true,
    size: "md"
  }
} satisfies Meta<typeof LunaPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

function StatefulPagination(args: React.ComponentProps<typeof LunaPagination>) {
  const [page, setPage] = React.useState(args.currentPage);

  React.useEffect(() => {
    setPage(args.currentPage);
  }, [args.currentPage]);

  return (
    <LunaColumn gap="3">
      <LunaPagination {...args} currentPage={page} onPageChange={setPage} />
      <LunaText variant="body-small" muted>
        Current page: {page}
      </LunaText>
    </LunaColumn>
  );
}

export const Basic: Story = {
  render: (args) => <StatefulPagination {...args} />
};

export const DenseRange: Story = {
  args: {
    currentPage: 9,
    totalPages: 18,
    boundaryCount: 2,
    siblingCount: 2
  },
  render: (args) => <StatefulPagination {...args} />
};

export const Compact: Story = {
  args: {
    currentPage: 3,
    totalPages: 7,
    size: "sm",
    showPreviousNext: false
  },
  render: (args) => (
    <div style={{ maxWidth: "18rem" }}>
      <StatefulPagination {...args} />
    </div>
  )
};

export const Disabled: Story = {
  args: {
    currentPage: 4,
    totalPages: 12,
    disabled: true
  }
};
