# Rally

Rally is a dependency-free, mobile-first padel tournament manager. Open `index.html` to use it in a browser. To enable install prompts and offline app-shell caching, serve the folder over HTTPS (or localhost); those browser features are not available from a `file://` URL.

## Tournament data

Tournament data is stored locally in IndexedDB, with a localStorage backup. Changes are saved as they happen and again when the app is backgrounded or closed. Use **Settings → Export tournament backup** to move data between devices, and **Restore from backup** to load a JSON export. There is no account or cloud synchronization: a shared invite contains event details and the app link, but does not synchronize edits or player registrations across devices.

The static web app can be packaged for Android and iOS with Capacitor. For shared, multi-device tournament data in a native release, add a backend/synchronization service; a native SQLite adapter can also be added if native database management is required.

## Features

- Tournament configuration, player registration and two-player teams
- Group assignment, generated round-robin fixtures and standings
- Match scheduling, padel set scores and automatic winner progression
- Knockout bracket generation from group qualifiers
- Native share-sheet / clipboard invites, installable app shell and JSON backups
