# AGENTS.md – assessment-import-csv

## Project Overview
Angular 19 standalone components application for CSV import and data mapping. Uses Angular Material UI, ngx-dropzone for file upload, and PapaParse for CSV parsing.

## Commands & Scripts

**Development server:**
```bash
npm start
```
Runs `ng serve -o --no-hmr` (opens browser, disables HMR).

**Build:**
```bash
npm run build
```
Outputs to `dist/import-csv`. Production config is default; passes budget checks (1MB initial, 8KB component styles).

**Watch mode:**
```bash
npm run watch
```
Rebuilds on file changes in development configuration.

**Lint:**
```bash
npm run lint
```
Runs ESLint (via @angular-eslint) on `src/**/*.ts` and `src/**/*.html`.

**Test:**
```bash
npm test
```
Karma + Jasmine test runner. Note: tests exist but e2e testing not configured by default.

## Docker & Dev Container Setup

**Using Docker Compose for development:**
```bash
docker-compose up
```
Starts the development environment. The Angular dev server runs at `http://localhost:4200`. Changes to source files auto-reload.

**Dev container configuration:**
- `.devcontainer/devcontainer.json` configures VS Code Remote Containers
- `docker-compose.yml` orchestrates the dev environment
- `Dockerfile` builds the Node 20 Alpine image with dependencies
- `.dockerignore` excludes unnecessary files from the build context

**Important volume mounts:**
- Source code mounted to `/workspace` for live file sync
- `node_modules` volume is isolated to prevent conflicts with host

**To rebuild the container after dependency changes:**
```bash
docker-compose down && docker-compose up --build
```

## Code Style & Linting Rules

**Key enforced conventions:**
- ESLint config: `eslint.config.js` combines `ts-standard` + Angular rules
- Component selectors: `prefix="app"` + `kebab-case` (e.g., `app-data-list`)
- Directive selectors: `prefix="app"` + `camelCase` (e.g., `appHighlight`)
- Single quotes required in TypeScript (quote_type in .editorconfig)
- Indent: 2 spaces (enforced in .editorconfig)
- `dot-notation: off` and `@typescript-eslint/ban-ts-comment: off` (disabled rules)

**TypeScript strictness:**
- `strict: true` mode enabled
- `noImplicitOverride: true`, `noImplicitReturns: true`, `noFallthroughCasesInSwitch: true`
- `strictTemplates: true` and `strictInjectionParameters: true` in Angular compiler options
- `noPropertyAccessFromIndexSignature: true` enforced

## Architecture & Entry Points

**Main entry:** `src/main.ts` → bootstraps `AppComponent` from `src/app/app.component.ts`

**Standalone components (Angular 19 standalone architecture):**
- `AppComponent`: Root, manages MatDialog for modal, contains DataListComponent
- `DataListComponent` (`src/app/data-list/`): CSV data display and manipulation
- `ModalComponent` (`src/app/modal/`): File upload dialog

**Angular configuration:**
- `app.config.ts`: Provides router, animations, and zone change detection
- `app.routes.ts`: Route definitions
- Material theme: `src/custom-theme.scss` + Azure Blue prebuilt theme for tests

**Key dependencies:**
- `@angular/material ^19.1.1` for UI components
- `ngx-dropzone ^3.1.0` for drag-and-drop file input
- `papaparse ^5.5.1` for CSV parsing

## Git Conventions

Commit messages follow semantic prefix convention (observed in history):
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code refactoring
- `chore:` maintenance tasks
- Example: `feat: Validate unselected columns`

## Testing

- Test runner: Karma (via `@angular-devkit/build-angular:karma`)
- Framework: Jasmine (~5.4.0)
- Config file: `tsconfig.spec.json` (inherits from base tsconfig.json with spec compilation)
- Coverage tool available: karma-coverage ~2.2.0
- No e2e framework pre-configured; Angular CLI docs suggest choosing one that suits needs

## Build & Deployment Quirks

- **Production budgets:** 500kB warning / 1MB error (initial bundle), 4kB warning / 8kB error per component style
- **Output hashing:** Enabled in production (`outputHashing: 'all'`)
- **Public assets:** Files in `public/` directory copied to dist root (see `angular.json` assets glob)
- **Styles:** Two main stylesheets loaded: `src/custom-theme.scss` + `src/styles.css`
- **Dev server default:** Uses development configuration (unoptimized, sourcemaps enabled)

## Common Agent Mistakes to Avoid

1. **Component selectors:** Do NOT use uppercase or non-kebab-case for component selectors; lint will fail.
2. **ESLint strict mode:** Don't import unused variables or violate ts-standard rules; run `npm run lint` before committing.
3. **TypeScript strict mode:** All types must be explicit; no implicit `any` or missing return types.
4. **Material imports:** Always import specific Material components (e.g., `MatButton`, `MatDialog`), not the whole module.
5. **Standalone flag:** All new components should use `standalone: true` and import dependencies directly in the `@Component` decorator.
6. **Dialog lifecycle:** Modal closes via `dialogRef.afterClosed()` subscription; check if result is truthy.
7. **Quote style:** Use single quotes in TypeScript; double quotes will fail linting.

## Important Paths

- **Source root:** `src/`
- **App components:** `src/app/`
- **Build output:** `dist/import-csv/`
- **Tests:** `src/**/*.spec.ts`
- **TypeScript config:** `tsconfig.json` (base), `tsconfig.app.json` (app), `tsconfig.spec.json` (tests)
