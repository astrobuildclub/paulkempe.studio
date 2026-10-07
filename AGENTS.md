# AGENTS.md: paulkempe.studio

Instructies voor AI-agents (Claude Code, Cursor, Codex) en ontwikkelaars die aan dit project werken.
Lees eerst `README.md` voor context en `CHANGELOG.md` voor recente wijzigingen.

## Project
- Klant: Paul Kempe · Bedrijf: All This · SLA: TODO
- Stack: Astro 5, Sanity 4, Node 22 (zie `.nvmrc`)

## Werkwijze
- Werk nooit direct op `main`. Branch → PR → deploy preview → merge.
- Branchnamen: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Commit nooit `.env`-bestanden of tokens. Nieuwe variabelen: naam toevoegen aan `.env.example` en de README-tabel.
- Variabelen met `PUBLIC_` komen in de browser terecht: nooit voor tokens.

## Documentatie bijhouden (verplicht)
- Elke wijziging die je commit: voeg een regel toe onder `## [Unreleased]` in `CHANGELOG.md`.
- Bij een merge naar `main`: zet `[Unreleased]` om naar een datumkop.
- Verandert setup, env, stack of deploy? Werk `README.md` bij.

## Conventies
- Moderne CSS: custom properties, OKLCH-kleuren, logical properties, container queries waar zinvol.
- Toegankelijkheid: WCAG 2.2 AA. Semantische HTML, focus-states, `prefers-reduced-motion` respecteren (ook bij GSAP).
- AVG: geen tracking of third-party embeds zonder consent.
- Animaties (GSAP): leg in een comment kort de logica uit (timeline, trigger, cleanup).
- Sanity: content altijd via `loadQuery()`. Visual Editing volgens `~/Code/_standards/SANITY.md`.

## Projectspecifiek
- Visual Editing volgens `~/Code/_standards/SANITY.md`; content altijd via `loadQuery()` (`src/sanity/lib/load-query.ts`). De Sanity-bestanden staan in `src/sanity/lib/`, niet in `src/lib/sanity/`.
- Voeg geen andere manier toe om drafts aan te zetten (env-vlag, query-parameter, header).
- `<VisualEditing>` komt uit `src/sanity/components/VisualEditing.tsx`, niet uit `@sanity/astro`: die heeft geen history-adapter, waardoor de Presentation tool na navigatie de verkeerde URL en het verkeerde document toont.
- De preview-cookie is ondertekend met `SANITY_API_READ_TOKEN` (`src/sanity/lib/visual-editing.ts`); nooit terug naar een vaste waarde als `true`.
- Site settings (`getSiteSettings()`) worden met `stegaClean()` schoongemaakt, omdat ze in meta-tags, JSON-LD, `lang`, de tijdzone van de klok en icoonnamen terechtkomen.
- `src/pages/post/[slug].astro` heeft een `getStaticPaths()`, maar de site draait volledig SSR (`output: "server"`): die functie wordt genegeerd.
