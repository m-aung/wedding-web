# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (accessible on network via --host)
npm run build     # Type-check (tsc) then Vite build
npm run preview   # Preview production build locally
```

No test suite is configured. Type-checking is the primary correctness check.

## Releasing a new version

This project uses [Changesets](https://github.com/changesets/changesets) for changelog management.

1. **After making changes**, create a changeset describing what changed:
   ```bash
   npm run changeset
   ```
   This opens an interactive prompt — pick the bump type (major/minor/patch) and write a human-readable summary. A `.changeset/*.md` file is created; commit it alongside the code.

2. **When ready to release**, bump the version and update `CHANGELOG.md`:
   ```bash
   npm run version
   ```
   This consumes all pending changeset files and writes entries to `CHANGELOG.md`. Review, then commit.

3. **Tag the release**:
   ```bash
   git tag v<version> && git push --follow-tags
   ```

## Architecture

React 18 + TypeScript SPA built with Vite. React Router v6 handles client-side routing. Supabase is the only backend (RSVP form submissions).

**Routing** is defined in [src/App.tsx](src/App.tsx) — 7 routes wrapped in a shared layout (`Navbar` + `Footer`). All routes are static paths, no dynamic segments.

**Pages** live in [src/pages/](src/pages/) — each page is a `.tsx` file paired with a `.module.css` file. Content is mostly hardcoded prose; the RSVP page is the only one with live data (Supabase insert).

**Shared components** in [src/components/](src/components/) are few: `Navbar`, `Footer`, `SiteMasthead` (page title section), `MastheadIntro`.

**Wedding constants** (names, date, venue, email, hotel code) are centralized in [src/constants/couple.ts](src/constants/couple.ts). Always read from here rather than hardcoding strings inline.

**Supabase** client is initialized in [src/lib/supabase.ts](src/lib/supabase.ts) using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars. Auto-generated types are in [src/lib/database.types.ts](src/lib/database.types.ts). The only table is `rsvps`.

## Styling

**Global styles and design tokens** are in [src/index.css](src/index.css) as CSS custom properties on `:root`. A TypeScript mirror of key tokens is in [src/theme.ts](src/theme.ts).

**CSS Modules** are used for component-scoped styles (every component has a paired `.module.css`).

**Utility classes** defined globally in `index.css`: `.container`, `.section`, `.surface-low`, `.btn-primary`, `.btn-ghost`, `.input-field`, and typography classes (`.display-lg`, `.headline-md`, `.body-lg`, etc.). Prefer these over creating new component-level rules for common patterns.

**Responsive breakpoint**: 768px (mobile hamburger menu, stacked layouts).

**Icons**: Material Icons via `<span className="material-icons">icon_name</span>`.

**Fonts**: Pinyon Script / Newsreader for display, Work Sans for body, EB Garamond for labels.
