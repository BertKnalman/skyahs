# SkyAHS — Transformation Changelog

Vollständige Transformation des PHP-Projekts in ein premium, Vercel-ready React-Produkt.

## Changed

- **Stack**: PHP/MySQL (shared hosting) → React 18 + TypeScript + Vite 5 + Tailwind CSS 3.4 (Vercel-ready SPA)
- **Design**: generisches Template → eigenes Design-System (navy/sky/gold Tokens, Sora + Inter + JetBrains Mono, zentrale Tokens in `tailwind.config.js`)
- **Flight-Cards**: neue Anatomie mit Route-Linie, IATA-Codes in JetBrains Mono, Klassen-Badges, Streichpreisen (+10 % Konkurrenzvergleich)
- **Preislogik**: Klassen-Multiplikatoren Economy 1× / Premium Economy 1,6× / Business 2,5× / First 4,2×
- **Navbar**: transparent → solid beim Scrollen; Login-Status mit Nutzername
- **Copy**: alle Texte professionell neu geschrieben (Deutsch, Sie-Form)
- **Firmendaten**: zentralisiert in `src/config/company.ts` (AHS HAMBURG Aviation Handling Services GmbH, Flughafenstraße 1-3, 22335 Hamburg, HRB 60521, USt-ID DE118635180, Geschäftsführer Radoslav Kozubjak)

## Added

- **22 Routen**: Home (Video-Hero mit Poster-Fallback + prefers-reduced-motion), Flights (Filter/Sortierung/Skeletons), Booking, Payment (SumUp via VITE_SUMUP_API_KEY, Demo-Modus ohne Key), Payment-Success, Login, Register, Meine Buchungen, Über uns, Kontakt, Hilfe (FAQ + FAQPage-JSON-LD), Karriere, Blog, Admin, 6 Legal-Seiten, 404
- **SearchWidget**: Airport-Autocomplete mit 174 Flughäfen, Tastaturnavigation, aria-combobox
- **Bildassets**: Hero-Poster, 4 Destinationsbilder, OG-Image, SVG-Favicon, Logo-Komponente
- **SEO**: dynamische Title/Meta pro Route, OpenGraph/Twitter, JSON-LD, robots.txt, sitemap.xml
- **Accessibility**: Skip-Link, Focus-visible, WCAG-AA-Kontraste, Reduced-Motion
- **Daten**: 174 Flughäfen, 123 Demo-Verbindungen mit realistischen Preisen
- **Repo-Hygiene**: vercel.json (SPA-Rewrites), .gitignore, .env.example, zweisprachiges README, Lazy-Loading aller Routen

## Removed

- PHP/MySQL-Backend (ersetzt durch client-seitige SPA-Architektur)
- Hardcodierte API-Keys aus dem Code (jetzt Environment Variables)
- Alle toten Links; veraltete Markenreste

## Technical

- Build: `tsc -b && vite build` — 0 Fehler; 26 lazy Route-Chunks; index.js ~231 kB (73 kB gzip)
- Routing: react-router-dom v6, SPA-Rewrites für Vercel
- Auth/Buchungen: bewusst client-seitig (localStorage/sessionStorage)
- Secret-Scan durchgeführt: keine echten Keys im Repository

## Deployment

### Vercel
1. vercel.com → „Add New… → Project“ → GitHub-Repo `BertKnalman/skyahs` importieren
2. Framework: **Vite** (automatisch erkannt) — Build `npm run build`, Output `dist`
3. Environment Variable: `VITE_SUMUP_API_KEY` = echter SumUp-Schlüssel (niemals committen!)
4. Deploy klicken — fertig

### Lokal
```bash
npm install
npm run dev
npm run build
```

### Hinweis zu Bildassets
PNG-Bilder (`public/assets/*.png`) konnten nicht über die API gepusht werden — sie liegen im mitgelieferten ZIP; nach dem Klonen in `public/assets/` kopieren und committen.

## Environment Variables

| Variable | Zweck | Pflicht |
|----------|-------|---------|
| `VITE_SUMUP_API_KEY` | SumUp-Zahlungsabwicklung (Demo-Modus ohne Key) | Nein |

## Known Limitations

- Hero-Video nicht enthalten — Poster-Fallback implementiert (Video später in `public/assets/` ergänzbar)
- Auth/Buchungen/Zahlung client-seitig simuliert (kein Backend)
- Blogartikel mit Kurz-Detailansichten
- `package-lock.json` via `npm install` regenerieren
- PNG-Bildassets manuell aus ZIP ergänzen
- Admin-Dashboard nutzt Demo-Daten
