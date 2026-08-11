const INVITATION_EMAIL_SUBJECT = "You're invited to join a team";

export function buildInvitationUrl(path: string, origin: string): string {
    return new URL(path, origin).toString();
}

export function buildInvitationMailtoHref(email: string, body: string): string {
    const query = new URLSearchParams({
        subject: INVITATION_EMAIL_SUBJECT,
        body,
    });
    return `mailto:${email}?${query.toString()}`;
}

export function buildInvitationEmailBody(invitationUrl: string): string {
    return [
        "You've been invited to join a team.",
        "",
        "Accept your invitation:",
        invitationUrl,
        "",
        "This invitation expires after seven days.",
    ].join("\n");
}
