# Stream Studio (Spotify Music App) - AGENTS Guide

Welcome to the **Stream Studio** codebase. This guide provides AI agents and developers with essential context, architectural patterns, commands, and conventions for working within this project.

---

## 1. Project Overview

**Stream Studio** is an Angular-based single-page web application that integrates with the **Spotify Web API** to allow users to search for musical artists, explore discographies and albums, and preview tracks directly within the browser.

### Key Capabilities
- **Artist & Music Search**: Search for artists using Spotify's search endpoint with auto-fetching of OAuth access tokens.
- **Artist Profile**: Display artist details, genre tags, follower counts, and album discography.
- **Album & Track Listings**: View album tracklists and listen to audio preview snippets.
- **Standalone Component Architecture**: Built using modern Angular standalone components.

---

## 2. Technology Stack & Environment

- **Framework**: Angular 22 (`@angular/core`, `@angular/common`, `@angular/router`, etc.)
- **Build System**: `@angular-devkit/build-angular:application` (Vite / Esbuild engine)
- **Language**: TypeScript (`target: es2022`, `moduleResolution: bundler`)
- **Styling**: SCSS (Component-level and global styles in `src/styles.scss`)
- **HTTP Client**: `@angular/common/http` (`HttpClient`) with RxJS operators
- **Package Manager**: npm

---

## 3. Directory Structure

```
music-app-spotify/
├── angular.json                # Angular CLI workspace configuration
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # Base TypeScript configuration
├── tsconfig.app.json           # Application TypeScript compilation config
├── src/
│   ├── index.html              # Main HTML entry point
│   ├── main.ts                 # Application bootstrap (bootstrapApplication)
│   ├── styles.scss             # Global application styles
│   ├── environments/           # Environment configs (development & production)
│   └── app/
│       ├── app.component.*     # Root component housing Navbar and RouterOutlet
│       ├── app-routing.module.ts # Route configurations
│       ├── Artist.ts           # Artist data model/interface
│       ├── Album.ts            # Album data model/interface
│       ├── navbar/             # Navigation header component
│       ├── search/             # Music/Artist search page component
│       ├── artist/             # Artist details and albums view
│       ├── album/              # Album details and track previews view
│       ├── about/              # About page
│       └── services/
│           └── spotify.service.ts # Spotify Web API communication service
└── docs/                       # Production build output target
```

---

## 4. Key Development Commands

| Action | Command | Description |
|---|---|---|
| **Start Dev Server** | `npm start` or `npx ng serve` | Starts dev server on `http://localhost:4200/` |
| **Build for Production**| `npm run build` or `npx ng build` | Compiles app to the `docs/` folder |
| **Run Unit Tests** | `npm test` or `npx ng test` | Runs Karma/Jasmine test suite |
| **Install Dependencies**| `npm install` | Installs project dependencies |

---

## 5. Architectural & Code Conventions

### Angular Standalone Components
All components in `src/app/` utilize Angular's standalone architecture (`standalone: true` default in Angular 22). When adding or modifying components:
- Explicitly declare imports (e.g. `imports: [CommonModule, FormsModule, RouterLink]`) in the `@Component` decorator.
- Ensure services are provided at the root level via `providedIn: 'root'` or declared in `providers: []` if scoped.

### Spotify Web API Integration
- The service `SpotifyService` (`src/app/services/spotify.service.ts`) handles API authentication and requests.
- Spotify uses OAuth 2.0 Client Credentials flow. `getToken()` exchanges credentials for a temporary bearer token, which is then passed as an `Authorization: Bearer <token>` header for endpoints like `searchMusic`, `getArtist`, and `getAlbums`.
- Always handle API errors and rate-limiting gracefully in UI components.

### Dependency Version Alignment (Crucial Gotcha)
In Angular projects, all `@angular/*` packages (including `@angular/core`, `@angular/compiler`, `@angular/common`, `@angular/router`, and `@angular-devkit/build-angular` / `@angular/compiler-cli`) **must have matching minor versions**.
- Do not mix mismatched version ranges (e.g., `~` for runtime packages and `^` for compiler packages), as new compiler releases may depend on compiler symbols (e.g. `TmplAstContentBlock`) introduced in matching runtime compiler releases.

---

## 6. Guidelines for Agents

1. **Verify Builds Before Completion**: Always run `npm run build` after making modifications to verify TypeScript and template compilation.
2. **Preserve Compatibility**: Keep `tsconfig.json` compiler options aligned with Angular CLI bundler requirements (`moduleResolution: "bundler"`, `target: "es2022"`).
3. **Keep Changes Minimal & Clean**: Avoid introducing unnecessary external dependencies when native Angular / standard browser APIs suffice.
