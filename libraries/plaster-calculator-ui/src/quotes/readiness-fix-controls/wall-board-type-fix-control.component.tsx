import type {
    ReadinessAffectedItem,
    WallBoardType,
} from "@libraries/plaster-calculator-common";
import { WALL_BOARD_TYPES } from "@libraries/plaster-calculator-common";
import { Badge, Box, SelectMenu } from "@libraries/uikit-web";
import type { SelectMenuOption } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { useFixControlSubmission } from "./use-fix-control-submission.hook.ts";

const WALL_BOARD_TYPE_OPTIONS: readonly SelectMenuOption[] =
    WALL_BOARD_TYPES.map((wallBoardType) => ({
        value: wallBoardType,
        label: wallBoardType,
    }));

export type WallBoardTypeFixControlProps = {
    /** The affected room/area this select scopes its edit to. */
    readonly item: ReadinessAffectedItem;
    /**
     * The wall board type this select shows as selected — the room's
     * current type if one is set, otherwise whatever proposed default the
     * caller wants pre-selected. Never left unselected: an inline "pick a
     * value" control that opens on a blank option would let an estimator
     * confirm the readiness check without ever having looked at the value.
     */
    readonly value: WallBoardType;
    readonly onChange: (value: WallBoardType) => void | Promise<void>;
};

/**
 * Inline fix control for the "wall type set" readiness check: a select over
 * `WALL_BOARD_TYPES`, scoped to one room/area via `item`. Fires `onChange`
 * as soon as a new option is picked — a select has no separate "commit"
 * step the way a free-text input does. Owns only its own pending/error
 * state via `useFixControlSubmission`, so a rejected `onChange` here never
 * touches a sibling control's state.
 */
export function WallBoardTypeFixControl({
    item,
    value,
    onChange,
}: WallBoardTypeFixControlProps): ReactElement {
    const id = useId();
    const { t } = useQuotesTranslation();
    const { isPending, error, run } = useFixControlSubmission(
        t("readinessFixControls.wallBoardType.error"),
    );
    const label = item.areaLabel
        ? t("readinessFixControls.wallBoardType.labelWithArea", {
              area: item.areaLabel,
          })
        : t("readinessFixControls.wallBoardType.label");

    return (
        <Box direction="column" gap="xs">
            <SelectMenu
                id={id}
                label={label}
                options={WALL_BOARD_TYPE_OPTIONS}
                value={value}
                disabled={isPending}
                onChange={(event) => {
                    const nextValue = event.target.value as WallBoardType;
                    void run(() => onChange(nextValue));
                }}
            />
            {error && (
                <Box status>
                    <Badge color="red" size="sm">
                        {error}
                    </Badge>
                </Box>
            )}
        </Box>
    );
}
