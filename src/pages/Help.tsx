import { useMemo, useState } from 'react';
import JsonLd from '@/components/JsonLd';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const CATEGORIES = [
  { id: 'buchung', label: 'Buchung', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
  { id: 'zahlung', label: 'Zahlung', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'storno', label: 'Storno', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'gepaeck', label: 'Gepäck', icon: 'M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z' },
] as const;

interface Faq {
  category: (typeof CATEGORIES)[number]['id'];
  q: string;
  a: string;
}

const FAQS: Faq[] = [
  { category: 'buchung', q: 'Wie buche ich einen Flug bei SkyAHS?', a: 'Geben Sie auf der Startseite Abflug- und Zielflughafen sowie Ihr Reisedatum ein. Wählen Sie aus den Ergebnissen einen Flug, tragen Sie die Passagierdaten ein und bezahlen Sie sicher über SumUp. Die Bestätigung erhalten Sie sofort per E-Mail.' },
  { category: 'buchung', q: 'Kann ich für mehrere Personen buchen?', a: 'Ja, bis zu sechs Passagiere pro Buchung. Wählen Sie die Anzahl in der Suche — der Gesamtpreis wird direkt korrekt angezeigt.' },
  { category: 'buchung', q: 'Wo finde ich meine Buchungsreferenz?', a: 'Die sechsstellige Referenz (z. B. K7XQ2M) steht in Ihrer Bestätigungs-E-Mail und unter „Meine Buchungen". Sie benötigen sie für Auskünfte und Stornierungen.' },
  { category: 'zahlung', q: 'Welche Zahlungsarten akzeptieren Sie?', a: 'Wir akzeptieren gängige Kredit- und Debitkarten über unseren Zahlungspartner SumUp. Die Übertragung ist SSL-verschlüsselt; Kartendaten werden nicht auf unseren Servern gespeichert.' },
  { category: 'zahlung', q: 'Sind die angezeigten Preise Endpreise?', a: 'Ja. Alle Preise verstehen sich pro Person inklusive Steuern und Gebühren. Es gibt keine Zusatzkosten im letzten Buchungsschritt.' },
  { category: 'zahlung', q: 'Ist die Zahlung sicher?', a: 'Die Abwicklung erfolgt vollständig über SumUp, einen BaFin-regulierten Zahlungsdienstleister. Ihre Kartendaten berühren unsere Systeme nicht.' },
  { category: 'storno', q: 'Bis wann kann ich kostenlos stornieren?', a: 'Bis 24 Stunden vor Abflug ist die Stornierung kostenlos — Sie erhalten den vollständigen Betrag zurück. Details finden Sie in unseren Stornierungsbedingungen.' },
  { category: 'storno', q: 'Wie storniere ich meine Buchung?', a: 'Unter „Meine Buchungen" wählen Sie die Buchung und klicken auf „Stornieren". Alternativ genügt eine E-Mail an info@sky-ahs.com mit Ihrer Buchungsreferenz.' },
  { category: 'storno', q: 'Wann erhalte ich meine Erstattung?', a: 'Erstattungen werden innerhalb von 7 Werktagen auf das ursprüngliche Zahlungsmittel ausgezahlt. Bei Flugausfall durch die Airline gelten die Regeln der EU-Fluggastrechteverordnung (EG 261/2004).' },
  { category: 'gepaeck', q: 'Wie viel Handgepäck ist erlaubt?', a: 'Das hängt von Airline und Reiseklasse ab. Üblich sind 8 kg Handgepäck in Economy und zwei Stücke in Business. Die genauen Regeln Ihres Fluges stehen in der Buchungsbestätigung.' },
  { category: 'gepaeck', q: 'Kann ich Aufgabegepäck hinzubuchen?', a: 'Aufgabegepäck buchen Sie direkt bei der Airline unter Angabe Ihrer Buchungsreferenz — meist günstiger als am Flughafen.' },
  { category: 'gepaeck', q: 'Was tun bei verlorenem Gepäck?', a: 'Melden Sie den Verlust direkt am Flughafen beim Gepäckermittlungs-Schalter (Lost & Found) und lassen Sie ein Protokoll (PIR) erstellen. Unser Support unterstützt Sie bei der Nachverfolgung.' },
];

function FaqAccordion({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const id = useMemo(() => `faq-${faq.q.slice(0, 20).replace(/\W+/g, '-')}`, [faq.q]);
  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <h3>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-body font-semibold text-navy-900"
        >
          {faq.q}
          <svg
            className={`h-5 w-5 shrink-0 text-navy-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </button>
      </h3>
      {open && (
        <div id={`${id}-panel`} className="border-t border-neutral-200 px-5 py-4 text-body-sm text-neutral-600">
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  useDocumentHead({
    title: 'Hilfe & FAQ',
    description: 'Antworten auf häufige Fragen zu Buchung, Zahlung, Stornierung und Gepäck — und direkter Kontakt zum SkyAHS-Support aus Hamburg.',
  });

  const filtered = FAQS.filter(
    (f) =>
      (!category || f.category === category) &&
      (!query || `${f.q} ${f.a}`.toLowerCase().includes(query.toLowerCase())),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="container-page max-w-4xl py-10 pt-24 md:pt-28">
      <JsonLd data={jsonLd} />
      <h1 className="text-center text-display-sm md:text-display-md">Wie können wir helfen?</h1>

      <div className="mx-auto mt-8 max-w-xl">
        <label htmlFor="help-search" className="sr-only">Hilfe durchsuchen</label>
        <input
          id="help-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="z. B. Stornierung, Gepäck, Zahlung…"
          className="h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-body placeholder:text-neutral-400 focus:border-sky-500 focus:shadow-focus focus:outline-none"
        />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4" role="group" aria-label="Kategorien">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(category === c.id ? null : c.id)}
            aria-pressed={category === c.id}
            className={`flex flex-col items-center gap-2 rounded-lg border p-5 transition-colors duration-200 ${
              category === c.id
                ? 'border-navy-900 bg-navy-900 text-white'
                : 'border-neutral-200 bg-white text-navy-900 hover:border-navy-600'
            }`}
          >
            <svg className={`h-6 w-6 ${category === c.id ? 'text-gold-400' : 'text-gold-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
            </svg>
            <span className="text-body-sm font-semibold">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-neutral-200 bg-white p-8 text-center text-body text-neutral-500">
            Keine passende Antwort gefunden. Schreiben Sie uns über das{' '}
            <a href="/kontakt" className="font-semibold text-navy-600 underline underline-offset-4">Kontaktformular</a>.
          </p>
        ) : (
          filtered.map((f) => <FaqAccordion key={f.q} faq={f} />)
        )}
      </div>
    </div>
  );
}
