# Shared Next.js Web App + Word Add-in Taskpane

This project demonstrates one Next.js deployment URL serving:

- a normal browser app (`/`)
- a Word add-in taskpane (`/taskpane`)
- a shared Office dialog page (`/dialog`)

## Key architecture decisions

- **Client-side Office host detection only** through `Office.onReady`.
- **Office provider is scoped to Office routes only** using an App Router route group (`app/(office)/layout.tsx`).
- **Pure web routes are not readiness-gated**, so browser users do not wait on Office readiness.
- **Readiness gate** (`EnvironmentGate`) is only applied where Office APIs are expected (`/taskpane`).
- **Shared auth + backend patterns** reused by browser and taskpane views.
- **Word feature gating** through `isWord` checks.

## Important files

- `office/OfficeContext.tsx`: Office runtime detection + readiness state.
- `app/(office)/layout.tsx`: scopes `OfficeProvider` to Office experiences.
- `components/EnvironmentGate.tsx`: readiness gate used for Office taskpane rendering.
- `components/SharedDashboard.tsx`: same UI pattern for `/` and `/taskpane`.
- `components/TaskpaneDialogActions.tsx`: Office modal dialog and popup fallback.
- `app/api/me/route.ts`: shared backend call pattern.
- `office-manifest/word-addin-manifest.xml`: sample add-in manifest targeting `/taskpane`.

## Local development

```bash
npm install
npm run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/taskpane
- http://localhost:3000/dialog

## Notes for Office integration

- Sideload `office-manifest/word-addin-manifest.xml` in Word Desktop/Online.
- Keep URL and TLS settings aligned with your deployed Next.js domain.
- Detection is intentionally **not** done via user-agent, middleware, or server headers.
