import { updateProfile, type User } from "firebase/auth";

/** Updates the display name stored on a Firebase Authentication user. */
export async function updateUserDisplayName(
    user: User,
    displayName: string,
): Promise<void> {
    await updateProfile(user, { displayName: displayName.trim() });
}
