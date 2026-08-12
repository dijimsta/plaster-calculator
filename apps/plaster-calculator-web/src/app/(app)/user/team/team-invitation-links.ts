const PRODUCT_HOSTNAME = "plastercalculator.com";

export function buildInvitationUrl(path: string, origin: string): string {
    return new URL(path, origin).toString();
}

export function buildInvitationMailtoHref(
    email: string,
    subject: string,
    body: string,
): string {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildInvitationEmailSubject(teamName: string): string {
    return `Invitation to join ${teamName} on ${PRODUCT_HOSTNAME}`;
}

export function buildInvitationEmailBody(
    invitationUrl: string,
    teamName: string,
): string {
    return [
        `You've been invited to join ${teamName} on ${PRODUCT_HOSTNAME}.`,
        "",
        "Accept your invitation:",
        invitationUrl,
        "",
        "This invitation expires after seven days.",
    ].join("\n");
}
