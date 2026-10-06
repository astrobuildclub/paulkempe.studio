# paulkempe.studio

> Portfoliosite van Paul Kempe: showreel, info en contact, beheerd in Sanity.

| | |
|---|---|
| **Klant** | Paul Kempe (TODO contactpersoon) |
| **Bedrijf** | All This |
| **Status** | Live |
| **SLA** | TODO |
| **Live** | https://paulkempe.studio |
| **Netlify** | team All This, site `TODO` (site-id `50d37606-9195-4a55-90c0-225d42f16266`) |
| **CMS** | Sanity project `fru2c8yu`, dataset `production`, Studio https://paulkempe.studio/admin |
| **Repo** | [github.com/astrobuildclub/paulkempe.studio](https://github.com/astrobuildclub/paulkempe.studio) |
| **Notion** | TODO |

## Stack

- Astro 5 · Sanity 4 (Studio ingebouwd via `@sanity/astro`) · Node 22 (`.nvmrc`) · SSR (`output: "server"`, `@astrojs/netlify`)
- Styling: SCSS met Utopia (fluid type en spacing) · Fonts: TODO
- Animatie: GSAP, Lenis (smooth scroll), Splitting
- Consent: TODO · Hosting: Netlify

## Lokaal starten

```bash
nvm use
npm install
cp .env.example .env   # vul de waarden in, zie tabel
npm run dev            # http://localhost:4321
```

Overige scripts: `npm run build` (draait eerst `astro check`), `npm run preview`.

### Environment-variabelen

| Naam | Waarvoor | Waar te vinden |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project | sanity.io/manage |
| `PUBLIC_SANITY_DATASET` | Dataset (`production`) | sanity.io/manage |
| `PUBLIC_SANITY_USE_CDN` | `"true"` = Sanity CDN voor gepubliceerde content | n.v.t. |
| `SANITY_API_READ_TOKEN` | Drafts / Visual Editing (geheim, rol Viewer) | sanity.io/manage → API → Tokens |

Waarden staan nooit in git. Productiewaarden: Netlify → Site configuration → Environment variables (let op deploy contexts: `SANITY_API_READ_TOKEN` moet op Production, Deploy previews én Branch deploys staan).

## Structuur

```
src/
  assets/scss/  Globale styles, Utopia-tokens, animaties
  components/   Header, footer, klok, videospeler, cursor, portable text
  layouts/      Layout.astro (site settings, meta, Visual Editing)
  middleware.ts Zet Visual Editing per request aan (cookie + iframe)
  pages/        Routes, incl. api/preview voor de Presentation tool
  sanity/
    lib/        loadQuery, visual-editing, resolve, image/file-URL's
    schemaTypes/  Schema's (pages, post, siteSettings, …)
sanity.config.ts  Studio-configuratie (/admin)
```

## Content en CMS

- Content types: `pages` (homepage met showreel, about met klanten, contact), `siteSettings` (singleton: titel, meta, logo-video, social, tijdzone, schema markup), `post`, `author`, `category`.
- De klant beheert alles in de Studio op `/admin`.
- Visual Editing: ja, ingericht volgens `~/Code/_standards/SANITY.md`. In de Studio via **Presentation** zie je drafts met klikbare overlays; bezoekers zien altijd de gepubliceerde site. Alle content gaat via `loadQuery()`.

## Privacy, toegankelijkheid en SEO

- Consent: TODO
- WCAG 2.2 AA-aandachtspunten: TODO
- SEO: meta en Open Graph uit site settings (`siteMeta.astro`), JSON-LD (`siteSchema.astro`). Sitemap, robots, `llms.txt`: TODO

## Deploy

- `main` → productie (Netlify) · pull requests → deploy preview
- Werkwijze: branch → PR → preview checken → merge

## Bekende issues en afspraken

- Er staan twee gepubliceerde `siteSettings`-documenten in de dataset; de site gebruikt het singleton-document met id `siteSettings`.

---

Eigenaar: All This · Wat er gedaan is: zie [`CHANGELOG.md`](CHANGELOG.md) · Werkafspraken voor ontwikkelaars en AI-agents: [`AGENTS.md`](AGENTS.md)
