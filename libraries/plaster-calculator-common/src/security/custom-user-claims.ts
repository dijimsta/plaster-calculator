export type CustomUserClaim = "isDeveloper" | "isTrialUser";

export type CustomUserClaims = {
    readonly [key in CustomUserClaim]?: boolean;
};
