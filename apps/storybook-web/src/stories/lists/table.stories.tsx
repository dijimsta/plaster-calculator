import { Badge, Table } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Table> = {
    title: "UIKit/Lists/Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A responsive semantic table for presenting structured data, inspired by the Tailwind UI table patterns.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Table>;

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
        status: "Active",
    },
    {
        name: "Courtney Henry",
        title: "Designer",
        email: "courtney.henry@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        name: "Tom Cook",
        title: "Director of Product",
        email: "tom.cook@example.com",
        role: "Member",
        status: "Away",
    },
] as const;

function PeopleTable(args: Story["args"]): React.ReactElement {
    return (
        <Table {...args}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Title</Table.Header>
                    <Table.Header>Email</Table.Header>
                    <Table.Header>Status</Table.Header>
                    <Table.Header>Role</Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {people.map((person) => (
                    <Table.Row key={person.email}>
                        <Table.Cell>{person.name}</Table.Cell>
                        <Table.Cell>{person.title}</Table.Cell>
                        <Table.Cell>{person.email}</Table.Cell>
                        <Table.Cell>
                            <Badge
                                color={
                                    person.status === "Active"
                                        ? "green"
                                        : "yellow"
                                }
                                size="xs"
                            >
                                {person.status}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>{person.role}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export const Default: Story = {
    render: PeopleTable,
};

export const Striped: Story = {
    args: {
        striped: true,
    },
    render: PeopleTable,
};

export const BorderedAndCompact: Story = {
    args: {
        bordered: true,
        compact: true,
    },
    render: PeopleTable,
};

export const FitColumns: Story = {
    render: () => (
        <Table bordered>
            <Table.Head>
                <Table.Row>
                    <Table.Header>Name</Table.Header>
                    <Table.Header fit>Status</Table.Header>
                    <Table.Header fit>Updated</Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Lindsay Walton</Table.Cell>
                    <Table.Cell fit>
                        <Badge color="green" size="xs">
                            Active
                        </Badge>
                    </Table.Cell>
                    <Table.Cell fit>2 hours ago</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Courtney Henry</Table.Cell>
                    <Table.Cell fit>
                        <Badge color="yellow" size="xs">
                            Away
                        </Badge>
                    </Table.Cell>
                    <Table.Cell fit>Yesterday</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
};
