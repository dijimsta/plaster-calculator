import { Box, Text, useApp, useInput } from "ink";
import { useState } from "react";
import { useNavigate } from "react-router";

const menuItems = [
    {
        key: "users" as const,
        label: "Find users",
        description: "Search Firebase Auth users and edit custom scopes.",
    },
];

export function HomeModule() {
    const { exit } = useApp();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useInput((input, key) => {
        if (input === "q" || key.escape) {
            exit();
            return;
        }

        if (key.upArrow) {
            setSelectedIndex((current) =>
                current === 0 ? menuItems.length - 1 : current - 1,
            );
            return;
        }

        if (key.downArrow) {
            setSelectedIndex((current) => (current + 1) % menuItems.length);
            return;
        }

        if (key.return) {
            const selectedItem = menuItems[selectedIndex];

            if (selectedItem?.key === "users") {
                navigate("/users");
            }
        }
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box flexDirection="column">
                <Text bold>Plaster Calculator Admin CLI</Text>
                <Text dimColor>Use arrow keys to choose, enter to open.</Text>
            </Box>

            <Box flexDirection="column">
                {menuItems.map((item, index) => {
                    const selected = index === selectedIndex;

                    return (
                        <Box key={item.key} flexDirection="column">
                            {selected ? (
                                <Text color="cyan">&gt; {item.label}</Text>
                            ) : (
                                <Text> {item.label}</Text>
                            )}
                            {selected ? (
                                <Text dimColor> {item.description}</Text>
                            ) : null}
                        </Box>
                    );
                })}
            </Box>

            <Text dimColor>Press q or escape to quit.</Text>
        </Box>
    );
}
