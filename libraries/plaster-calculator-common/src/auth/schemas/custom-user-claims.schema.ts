import { z } from "zod";

import { RoleSchema } from "./role.schema.ts";

export const CustomUserClaimsSchema = z
    .object({
        roles: z.array(RoleSchema).readonly().optional(),
    })
    .readonly();

export type CustomUserClaims = z.infer<typeof CustomUserClaimsSchema>;
