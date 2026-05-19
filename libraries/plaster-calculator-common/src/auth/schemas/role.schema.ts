import { z } from "zod";

export const ADMIN_ROLE = "admin";
export const DEVELOPER_ROLE = "developer";

export const RoleSchema = z.union([
    z.literal(ADMIN_ROLE),
    z.literal(DEVELOPER_ROLE),
]);

export type Role = z.infer<typeof RoleSchema>;
