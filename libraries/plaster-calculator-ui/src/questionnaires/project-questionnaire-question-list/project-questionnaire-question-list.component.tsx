import { AI_SUGGESTED_ANSWER_SOURCE } from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, Card, Text, Textarea } from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { useId, useState } from "react";

import type { AnswerSource } from "@libraries/plaster-calculator-common";
import type { ReactElement } from "react";

export interface ProjectQuestionnaireQuestion {
    readonly id: string;
    readonly label: string;
    readonly position: number;
    readonly answer?: string | null;
    readonly answerSource?: AnswerSource;
}

export interface ProjectQuestionnaireQuestionListProps {
    readonly questions: readonly ProjectQuestionnaireQuestion[];
    readonly onSaveAnswer: (
        question: ProjectQuestionnaireQuestion,
        answer: string,
    ) => void;
    readonly onRemove: (question: ProjectQuestionnaireQuestion) => void;
    readonly onConfirmAnswer?: (question: ProjectQuestionnaireQuestion) => void;
}

/** Renders a project's questionnaire questions with an answer field for each. */
export function ProjectQuestionnaireQuestionList({
    questions,
    onSaveAnswer,
    onRemove,
    onConfirmAnswer,
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
                    onConfirmAnswer={onConfirmAnswer}
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
    onConfirmAnswer,
}: {
    readonly question: ProjectQuestionnaireQuestion;
    readonly index: number;
    readonly onSaveAnswer: ProjectQuestionnaireQuestionListProps["onSaveAnswer"];
    readonly onRemove: ProjectQuestionnaireQuestionListProps["onRemove"];
    readonly onConfirmAnswer: ProjectQuestionnaireQuestionListProps["onConfirmAnswer"];
}): ReactElement {
    const [answer, setAnswer] = useState(question.answer ?? "");
    const answerId = useId();
    const isAiSuggested = question.answerSource === AI_SUGGESTED_ANSWER_SOURCE;

    return (
        <Card>
            <Box direction="column" gap="sm">
                <Box direction="row" justify="between" align="center">
                    <Box direction="row" gap="sm" align="center">
                        <Text size="base">
                            {index + 1}. {question.label}
                        </Text>
                        {isAiSuggested && (
                            <Badge color="purple" size="xs">
                                AI suggested
                            </Badge>
                        )}
                    </Box>
                    <Box direction="row" gap="sm" align="center">
                        {isAiSuggested && onConfirmAnswer && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="small"
                                onClick={() => onConfirmAnswer(question)}
                            >
                                Confirm
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="ghost"
                            icon={<Trash2 size={16} aria-hidden="true" />}
                            aria-label={`Remove question ${index + 1}`}
                            onClick={() => onRemove(question)}
                        />
                    </Box>
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
