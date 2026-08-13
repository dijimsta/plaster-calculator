"use client";

import { TEAM_NAME_MAX_LENGTH } from "@libraries/plaster-calculator-common";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Input,
    Text,
} from "@libraries/uikit-web";
import { useState } from "react";
import type { FormEvent, ReactElement } from "react";

const TEAM_NAME_INPUT_ID = "team-name";

export type TeamNamePanelProps = Readonly<{
    teamName: string;
    canEdit: boolean;
    isSaving: boolean;
    onSave(name: string): Promise<boolean>;
}>;

export function TeamNamePanel({
    teamName,
    canEdit,
    isSaving,
    onSave,
}: TeamNamePanelProps): ReactElement {
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(teamName);
    const normalizedName = draftName.trim();
    const isValid =
        normalizedName.length > 0 &&
        normalizedName.length <= TEAM_NAME_MAX_LENGTH;

    async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if (!isValid) return;

        if (await onSave(normalizedName)) setIsEditing(false);
    }

    function startEditing(): void {
        setDraftName(teamName);
        setIsEditing(true);
    }

    function cancelEditing(): void {
        setDraftName(teamName);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <FormLayout onSubmit={(event) => void submit(event)}>
                <Card>
                    <Card.Title>Team name</Card.Title>
                    <Card.Body>
                        <FormLayoutField
                            label="Team name"
                            htmlFor={TEAM_NAME_INPUT_ID}
                            description={`Use between 1 and ${TEAM_NAME_MAX_LENGTH} characters.`}
                        >
                            <Input
                                id={TEAM_NAME_INPUT_ID}
                                value={draftName}
                                maxLength={TEAM_NAME_MAX_LENGTH}
                                autoFocus
                                required
                                disabled={isSaving}
                                invalid={!isValid}
                                onChange={(event) =>
                                    setDraftName(event.target.value)
                                }
                            />
                        </FormLayoutField>
                    </Card.Body>
                    <FormLayoutActions>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isSaving}
                            onClick={cancelEditing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving || !isValid}>
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </FormLayoutActions>
                </Card>
            </FormLayout>
        );
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Team name</Card.Title>
                {canEdit && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="small"
                        onClick={startEditing}
                    >
                        Edit
                    </Button>
                )}
            </Card.Header>
            <Card.Body>
                <Text>
                    <strong>{teamName}</strong>
                </Text>
            </Card.Body>
        </Card>
    );
}
