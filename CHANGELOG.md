# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

## [Unreleased]

### Opgelost
- Presentation tool na navigatie: de adresbalk bleef op `/api/preview` staan en het documentpaneel toonde de vorige pagina. Eigen `VisualEditing`-component (`src/sanity/components/VisualEditing.tsx`) met een history-adapter, op basis van de al aanwezige dependency `@sanity/visual-editing`.

## [2026-10-06] (PR #33)

### Toegevoegd
- Visual Editing volgens `~/Code/_standards/SANITY.md`: `/api/preview` (valideert het preview-secret van de Studio en zet een cookie, ondertekend met `SANITY_API_READ_TOKEN` en 12 uur geldig, zodat een zelfgezette cookie niets doet), `/api/preview/disable` en `src/middleware.ts` (drafts alleen met geldige cookie én in de iframe van de Presentation tool; responses met preview-cookie krijgen `Cache-Control: private, no-store`).
- Presentation tool: `previewMode` in `sanity.config.ts`, en `resolve.ts` koppelt nu ook de `pages`-documenten (homepage, about, contact) aan URL's.
- `.env.example`, `CHANGELOG.md`, `AGENTS.md` en `CLAUDE.md`.

### Gewijzigd
- `loadQuery()` bepaalt Visual Editing per request i.p.v. per build; perspective `drafts` i.p.v. het verouderde `previewDrafts`.
- Site settings lopen via `loadQuery()` (drafts zichtbaar in de preview) en worden met `stegaClean()` schoongemaakt; de query pakt het singleton-document `siteSettings` op id i.p.v. `[1]`.
- README herschreven volgens de standaard.

### Verwijderd
- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`: zette drafts en stega bij de build aan voor álle bezoekers.

### Onderhoud
- Dependency `@sanity/preview-url-secret` toegevoegd.
