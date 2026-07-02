import { Badge, StackedList } from "@libraries/uikit-web";
import { ChevronRight } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StackedList> = {
    title: "Lists/StackedList",
    component: StackedList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Vertical list layout for stacking arbitrary item content with consistent dividers.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof StackedList>;

const jobs = [
    {
        name: "Brighton renovation",
        description: "Level five finish across bedrooms and hallway.",
        initials: "BR",
        status: "Quoted",
        date: "Today",
    },
    {
        name: "Richmond apartment",
        description: "Wet area patching, primer, and final skim coat.",
        initials: "RA",
        status: "Scheduled",
        date: "Tomorrow",
    },
    {
        name: "Kew extension",
        description: "Ceiling joins and corner bead repairs.",
        initials: "KE",
        status: "Draft",
        date: "Friday",
    },
];

export const Default: Story = {
    render: (args) => (
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white px-4 shadow-sm ring-1 ring-gray-900/5 sm:px-6">
            <StackedList {...args}>
                {jobs.map((job) => (
                    <StackedList.Item key={job.name}>
                        <div className="flex items-center gap-x-4">
                            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                                {job.initials}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <h3 className="truncate text-sm font-semibold leading-6 text-gray-900">
                                    {job.name}
                                </h3>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                    {job.description}
                                </p>
                            </div>
                            <div className="hidden shrink-0 text-sm leading-6 text-gray-500 sm:block">
                                {job.date}
                            </div>
                            <div className="flex shrink-0 items-center gap-x-2">
                                <Badge color="blue" size="xs">
                                    {job.status}
                                </Badge>
                            </div>
                        </div>
                    </StackedList.Item>
                ))}
            </StackedList>
        </div>
    ),
};

export const WithLinks: Story = {
    render: () => (
        <div className="mx-auto max-w-3xl">
            <StackedList className="border-y border-gray-200">
                {jobs.map((job) => (
                    <StackedList.Item key={job.name} className="py-3">
                        <a
                            href="#"
                            className="group flex items-center gap-x-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                                {job.initials}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <h3 className="truncate text-sm font-semibold leading-6 text-indigo-600 group-hover:text-indigo-500">
                                    {job.name}
                                </h3>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                    {job.description}
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-2">
                                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                    View
                                </span>
                                <ChevronRight
                                    aria-hidden="true"
                                    className="size-5 text-indigo-600 group-hover:text-indigo-500"
                                />
                            </div>
                        </a>
                    </StackedList.Item>
                ))}
            </StackedList>
        </div>
    ),
};
