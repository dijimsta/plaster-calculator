import { Pagination } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Pagination> = {
    title: "UIKit/Navigation/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A responsive pagination control for moving through a collection one page at a time.",
            },
        },
    },
    args: {
        pageCount: 20,
    },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
    render: (args) => {
        const [page, setPage] = useState(6);

        return <Pagination {...args} page={page} onPageChange={setPage} />;
    },
};

export const FewPages: Story = {
    render: () => {
        const [page, setPage] = useState(2);

        return <Pagination page={page} pageCount={5} onPageChange={setPage} />;
    },
};

export const CustomLabel: Story = {
    render: () => {
        const [page, setPage] = useState(1);

        return (
            <Pagination
                aria-label="Questionnaire pages"
                page={page}
                pageCount={12}
                onPageChange={setPage}
            />
        );
    },
};
