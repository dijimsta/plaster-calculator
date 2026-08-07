# Production team migration

Run this after the additive team schema and connector operations have been
deployed. This migration is safe to rerun: existing memberships are reused and
team-scoped records are updated to the same team ID.

1. Deploy Data Connect from the branch containing the team schema:

    ```powershell
    npx.cmd -y firebase-tools@latest deploy --only dataconnect --project plaster-calculator
    ```

2. Deploy the functions code so new Firebase Auth users receive a personal
   team automatically:

    ```powershell
    npx.cmd -y firebase-tools@latest deploy --only functions:plaster-calculator-functions --project plaster-calculator
    ```

3. Authenticate the local shell with Application Default Credentials or set
   `GOOGLE_APPLICATION_CREDENTIALS` to a service-account JSON file that can
   list Firebase Auth users and execute Data Connect admin operations. Set the
   project and run the migration:

    ```powershell
    $env:GOOGLE_CLOUD_PROJECT = "plaster-calculator"
    pnpm.cmd --filter @functions/plaster-calculator-functions exec tsx src/migrate-teams.ts
    ```

The command stops on a resource whose historical `ownerId` has no matching
Firebase Auth user. Resolve that user or record, then rerun the command.

After the migration, users must refresh their Firebase ID token (sign out and
back in is sufficient) to receive the `teamId` custom claim used by the direct
Data Connect account and questionnaire operations.
