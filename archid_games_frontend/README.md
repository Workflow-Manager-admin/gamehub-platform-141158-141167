# Archid Games Frontend (React SPA)

This is the **Archid Games Platform** single-page application (SPA) built with React.  
Users can browse, play, and manage a catalog of games, submit/view high scores on a leaderboard, and handle their account/profile. All data is persisted in-browser (localStorage/IndexedDB). For MVP, there is *no backend/API*—all data is mocked and lives only in the user's browser.

## Features

- **Authentication**: Sign up, log in, log out, and guest mode
- **Game Browser**: Home/gallery to explore games
- **Game Detail**: View & play supported games directly in the browser, submit scores
- **Leaderboard**: View top scores (locally generated/mock)
- **Profile**: Account & profile management, achievements, change user data
- **Settings**: Local preferences, theme (light/dark)
- **Routing**: Fully client-side with navigation bar
- **Accessibility and Responsiveness**: Modern UI with accessible markup/components

## Tech Stack

- React, React Router
- Context + hooks for global state management
- LocalStorage/IndexedDB for data persistence (no backend)

## Quickstart

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   - App opens at http://localhost:3000

3. **Build for production:**
   ```bash
   npm run build
   ```

## Directory Structure

- `/src` — Main app source
  - `/components` — UI components
  - `/pages` — Route-level pages
  - `/hooks` — Custom React hooks
  - `/context` — State/context providers
  - `/utils` — Utility functions
  - `/games` — In-browser/game engine integration
  - `/assets` — Images and static assets

## Theming

- Theme colors: main accent `#fbbf24`, primary `#1e90ff`, background `#23272f`, etc.
- Toggle between light/dark modes.

---
