# plaster-calculator

## Firebase Emulators

The project uses the Firebase Local Emulator Suite for local development. The following emulators are configured:

| Emulator    | Port |
|-------------|------|
| Auth        | 9099 |
| App Hosting | 5050 |
| Tasks       | 9499 |
| Emulator UI | 4000 (default) |

### Prerequisites

Install the Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

### Starting the emulators

From the repo root:

```bash
firebase emulators:start
```

This will start the Auth and Tasks emulators alongside the App Hosting emulator, which runs the Next.js dev server (`yarn dev`) on port 5050. The Emulator UI is available at http://localhost:4000.
