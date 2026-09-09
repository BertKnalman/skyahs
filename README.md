# SkyAHS – Premium Flugbuchung

> **„Ihr Flug. Präzise geplant."** — Premium-Flugbuchungsplattform der AHS HAMBURG Aviation Handling Services GmbH.

---

## Deutsch

### Überblick
SkyAHS ist eine vollständige Flugbuchungs-Website als React-Single-Page-App: Flugsuche mit Flughafen-Autocomplete, Filter- und Sortierfunktionen, kompletter Buchungsprozess mit Passagierformularen und Validierung, Zahlungsseite mit SumUp-Anbindung (Demo-Modus ohne API-Schlüssel), Buchungsverwaltung mit Stornierung, Kundenkonten (localStorage), Admin-Dashboard, Blog, Hilfebereich mit FAQ sowie vollständige Rechtstexte.

### Features
- **Flugsuche**: Autocomplete über 174 Flughäfen (Stadt/Code/Land), Tastatursteuerung, ARIA-Combobox
- **Ergebnisse**: Filter (Preis, Airline, Zwischenstopps, Tageszeit), Sortierung (Preis/Dauer/Abflug), Skeleton-Loading, Empty-State mit beliebten Strecken
- **Preise**: Endpreise inkl. Steuern, Durchstreichpreis (+10 %), Klassen-Multiplikatoren (Economy 1× / Premium 1,6× / Business 2,5× / First 4,2×)
- **Buchung & Zahlung**: Deutsche Formularvalidierung, sticky Preisübersicht, SumUp-Zahlung (Demo-Modus), Buchungsreferenz, Druckansicht
- **Konto**: Registrierung/Login (localStorage-Demo), „Meine Buchungen" mit Stornierung
- **Admin**: `/admin` — Login `admin@skyahs.com` / `admin123`, Statistiken, Buchungstabelle
- **SEO/A11y**: JSON-LD (Organization, WebSite, FAQPage, Article, Flight), OG/Twitter-Tags, `lang="de"`, WCAG-2.2-AA-Fokus, Skip-Link, `prefers-reduced-motion`-Kill-Switch
- **Legal**: AGB, Datenschutz, Cookie-Richtlinie, Barrierefreiheit, Stornierung, Erstattung — mit echten Firmendaten

### Tech-Stack
React 19 · TypeScript · Vite · Tailwind CSS · React Router 7 (lazy routes) · Sora/Inter/JetBrains Mono

### Setup
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal testen
```

### Umgebungsvariablen
Siehe `.env.example`. Nur eine Variable:

| Variable | Zweck |
|---|---|
| `VITE_SUMUP_API_KEY` | SumUp-Schlüssel für echte Zahlungen. Ohne Schlüssel: Demo-Modus (simulierte Zahlung, keine Abbuchung). |

**Niemals echte Schlüssel committen.** `.env*` ist per `.gitignore` ausgeschlossen.

### Deployment auf Vercel
1. Repository zu GitHub/GitLab pushen
2. In Vercel importieren — Framework: **Vite**, Build: `npm run build`, Output: `dist`
3. `vercel.json` enthält den SPA-Rewrite (alle Routen → `index.html`)
4. Optional `VITE_SUMUP_API_KEY` in den Vercel-Projekteinstellungen setzen

---

## English

### Overview
SkyAHS is a complete flight-booking website (German UI) built as a React SPA: flight search with airport autocomplete, filtering/sorting, full booking flow with passenger forms and German validation, SumUp payment page (demo mode without API key), booking management with cancellation, customer accounts (localStorage), admin dashboard, blog, help center with FAQ, and full legal pages.

### Quick start
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to dist/
```

### Environment variables
Copy `.env.example` to `.env`. Only `VITE_SUMUP_API_KEY` is used; without it, payments run in demo mode. **Never commit real keys.**

### Deploy to Vercel
Import the repo, framework **Vite** (`npm run build`, output `dist`). `vercel.json` already contains the SPA rewrite to `index.html`.

---

## Unternehmen / Company
AHS HAMBURG Aviation Handling Services GmbH · Flughafenstraße 1-3 · 22335 Hamburg · +49 40 123 4567 · info@sky-ahs.com · HRB 60521 · USt-ID DE118635180 · Geschäftsführer: Radoslav Kozubjak
