import { Box, Button, Card, Text, Textarea } from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { useId, useState } from "react";

import type { ReactElement } from "react";

export interface ProjectQuestionnaireQuestion {
    readonly id: string;
    readonly label: string;
    readonly position: number;
    readonly answer?: string | null;
}

export interface ProjectQuestionnaireQuestionListProps {
    readonly questions: readonly ProjectQuestionnaireQuestion[];
    readonly onSaveAnswer: (
        question: ProjectQuestionnaireQuestion,
        answer: string,
    ) => void;
    readonly onRemove: (question: ProjectQuestionnaireQuestion) => void;
}

/** Renders a project's questionnaire questions with an answer field for each. */
export function ProjectQuestionnaireQuestionList({
    questions,
    onSaveAnswer,
    onRemove,
}: ProjectQuestionnaireQuestionListProps): ReactElement {
    return (
        <Box direction="column" gap="sm">
            {questions.map((question, index) => (
                <ProjectQuestionnaireQuestionRow
                    key={question.id}
                    question={question}
                    index={index}
                    onSaveAnswer={onSaveAnswer}
                    onRemove={onRemove}
                />
            ))}
        </Box>
    );
}

function ProjectQuestionnaireQuestionRow({
    question,
    index,
    onSaveAnswer,
    onRemove,
}: {
    readonly question: ProjectQuestionnaireQuestion;
    readonly index: number;
    readonly onSaveAnswer: ProjectQuestionnaireQuestionListProps["onSaveAnswer"];
    readonly onRemove: ProjectQuestionnaireQuestionListProps["onRemove"];
}): ReactElement {
    const [answer, setAnswer] = useState(question.answer ?? "");
    const answerId = useId();

    return (
        <Card>
            <Box direction="column" gap="sm">
                <Box direction="row" justify="between" align="center">
                    <Text size="base">
                        {index + 1}. {question.label}
                    </Text>
                    <Button
                        type="button"
                        variant="ghost"
                        icon={<Trash2 size={16} aria-hidden="true" />}
                        aria-label={`Remove question ${index + 1}`}
                        onClick={() => onRemove(question)}
                    />
                </Box>
                <Textarea
                    id={answerId}
                    rows={2}
                    value={answer}
                    placeholder="Answer"
                    aria-label={`Answer for question ${index + 1}`}
                    onChange={(event) => setAnswer(event.target.value)}
                    onBlur={() => {
                        if (answer !== (question.answer ?? "")) {
                            onSaveAnswer(question, answer);
                        }
                    }}
                />
            </Box>
        </Card>
    );
}
