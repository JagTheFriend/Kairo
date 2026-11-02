# AGENTS.md

Guidance for agents and contributors working on Kairo.

## What this project is

Kairo is a single-page event discovery and registration demo. It uses React 19, TypeScript, Vite, Tailwind CSS v4, and React Router. There is no backend. Registrations and theme preference are stored in `localStorage`.

## Commands

```bash
npm install
npm run dev       # Vite dev server, normally http://localhost:5173
npm run build     # TypeScript project build + Vite production build
npm run preview   # Serve dist/
npm run lint      # Oxlint
```

On Windows machines where PowerShell script execution is disabled, call npm as `npm.cmd`. The production build must pass before a change is considered complete.

## Architecture

| Area | Location |
| --- | --- |
| Router and providers | `src/App.tsx` |
| Layout, header, footer | `src/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` |
| Route pages | `src/pages/` |
| Reusable UI | `src/components/` |
| Event catalogue | `src/data/events.ts` |
| Registration state | `src/context/RegistrationsProvider.tsx` |
| Storage and validation | `src/lib/` |
| Hooks | `src/hooks/` |
| Design tokens and motion | `src/index.css` |

`SiteLayout` owns the skip link, route-level scroll reset, page entry animation, header, and footer. New top-level pages should be added as children of that layout in `src/App.tsx` and should call `useDocumentTitle`.

## Data flow

- `events` is a static array. `upcomingEvents` is sorted by date. `HERO_EVENT_SLUG` selects the home page feature.
- Event dates are generated relative to the current date in `eventDate()`, so the demo calendar never goes stale. Do not replace this with fixed literals unless the product intentionally becomes a historical archive.
- `RegistrationsProvider` reads storage once, writes on change, and exposes `register` and `cancelRegistration` through `useRegistrations`.
- Registration references use the first six characters of a UUID: `KAI-ABC123`.
- Duplicate checks compare event slug plus normalised email, scoped to the current browser.

## Conventions

- Keep components small and colocated by responsibility. Use named exports.
- Use semantic Tailwind tokens (`bg-canvas`, `text-muted`, `border-line`, `text-accent`) rather than raw colour values, so both themes keep working.
- Use `font-display` for editorial headings and the default sans for UI. Do not introduce another font.
- Use `lucide-react` for icons and mark them `aria-hidden` when the adjacent text already conveys the meaning.
- Use `Link`/`NavLink` from React Router for internal navigation. Do not use plain anchors for in-app routes.
- Preserve the editorial tone: concrete, calm, lightly witty. Avoid marketing filler and emoji.
- Keep the layout responsive. Test at 320, 390, 768, and 1440 px. Horizontal overflow is a regression.
- Respect `prefers-reduced-motion`; new motion must have a reduced-motion path.
- New form fields need a visible label, an accessible error association, and validation in `src/lib/validation.ts`.

## State and storage contract

| Key | Value |
| --- | --- |
| `kairo.theme` | `"light"` or `"dark"` |
| `kairo.registrations` | JSON array of `Registration` objects |

The boot script in `index.html` reads the theme key before React starts. If you rename a storage key, update `src/lib/storage.ts`, the boot script, and this document together.

## QA checklist

1. `npm run build` and `npm run lint` pass.
2. Home, events, detail, register, success, registrations, and 404 routes render.
3. Search and category filters update the URL and result count.
4. Empty and invalid registration submissions show useful errors and focus the first invalid field.
5. A successful registration persists after reload and appears under My registrations.
6. A duplicate email for the same event is blocked.
7. Cancelling a registration removes it from storage.
8. Theme survives reload; the page does not flash the wrong theme.
9. Mobile menu traps no content, closes on Escape and outside click, and locks page scroll while open.
10. No console errors and no horizontal overflow at the breakpoints above.

## Deployment notes

`vercel.json` and `public/_redirects` provide SPA fallbacks. The app uses `BrowserRouter`, so hosts without a rewrite need a 404 fallback. Do not add a repository base path unless the target is GitHub Pages.
