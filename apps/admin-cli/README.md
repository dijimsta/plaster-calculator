# Admin CLI

Internal command-line tooling for Plaster Calculator administration.

## Authentication

The Admin CLI uses the Firebase Admin SDK. Before running commands that read or
modify Firebase resources, create a Firebase Admin SDK private key and point the
CLI at it.

1. Open the Firebase Console.
2. Go to Project settings.
3. Open the Service accounts tab.
4. Click Generate new private key.
5. Save the JSON file somewhere outside this repository.
6. Set `GOOGLE_APPLICATION_CREDENTIALS` to the JSON file path.

Example:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/firebase-adminsdk.json"
```

If needed, also set the Firebase project:

```bash
export GOOGLE_CLOUD_PROJECT="plaster-calculator"
```

Do not commit service account JSON files.

## Usage

Start the interactive CLI:

```bash
yarn admin-cli
```
