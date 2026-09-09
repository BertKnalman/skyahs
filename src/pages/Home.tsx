import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchWidget from '@/components/SearchWidget';
import JsonLd from '@/components/JsonLd';
import { SectionHeading, Button } from '@/components/ui';
import { company } from '@/config/company';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const DESTINATIONS = [
  { img: '/assets/dest-hamburg.png', city: 'Hamburg', country: 'Deutschland', from: 'AMS', to: 'HAM', price: 149 },
  { img: '/assets/dest-paris.png', city: 'Paris', country: 'Frankreich', from: 'HAM', to: 'CDG', price: 109 },
  { img: '/assets/dest-dubai.png', city: 'Dubai', country: 'Vereinigte Arabische Emirate', from: 'HAM', to: 'DXB', price: 489 },
  { img: '/assets/dest-mallorca.png', city: 'Palma de Mallorca', country: 'Spanien', from: 'HAM', to: 'PMI', price: 59 },
];

const TRUST_ITEMS = [
  { title: 'Keine versteckten Gebühren', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Sichere Zahlung', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Deutsche Betreuung', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: '24/7 Erreichbar', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const USPS = [
  { title: 'Alle Kosten auf einen Blick.', text: 'Der Preis, den Sie sehen, ist der Preis, den Sie zahlen — inklusive Steuern und Gebühren. Ohne Überraschungen im letzten Schritt.' },
  { title: 'Zahlung über geprüfte Partner.', text: 'Die Zahlungsabwicklung erfolgt SSL-verschlüsselt über SumUp. Ihre Kartendaten berühren unsere Server nicht.' },
  { title: 'Deutscher Support, der antwortet.', text: 'Unser Team in Hamburg kennt den Flugbetrieb aus eigener Praxis — und ist rund um die Uhr für Sie da.' },
];

const STEPS = [
  { nr: '01', title: 'Strecke wählen', text: 'Abflughafen, Ziel und Datum eingeben — wir zeigen alle verfügbaren Verbindungen mit Endpreisen.' },
  { nr: '02', title: 'Flug buchen', text: 'Passagierdaten eintragen, Auswahl prüfen und sicher über SumUp bezahlen. Dauert keine drei Minuten.' },
  { nr: '03', title: 'Abheben', text: 'Buchungsbestätigung sofort per E-Mail. Ihre Buchung verwalten Sie jederzeit unter „Meine Buchungen".' },
];

const TESTIMONIALS = [
  { quote: 'Endlich eine Buchungsseite ohne Kleingedrucktes-Falle. Der Preis von der Suche war der Preis an der Kasse.', name: 'Martina K.', route: 'HAM → PMI' },
  { quote: 'Mein Anschlussflug ist ausgefallen — ein Anruf in Hamburg, zehn Minuten später hatte ich eine neue Verbindung.', name: 'Jens B.', route: 'HAM → DXB' },
  { quote: 'Ich buche dienstlich viel. SkyAHS ist das erste Portal, das sich anfühlt, als hätte jemand mit Ahnung vom Flugbetrieb gebaut.', name: 'Dr. Sabine L.', route: 'HAM → JFK' },
];

export default function Home() {
  useDocumentHead({
    title: 'SkyAHS – Premium Flugbuchung | Ihr Flug. Präzise geplant.',
    description: 'SkyAHS – Flüge buchen ohne Umwege. Transparente Preise, sichere Zahlung über SumUp und persönliche Betreuung aus Hamburg.',
  });
  const revealRef = useScrollReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.brand,
      legalName: company.legalName,
      url: company.website,
      email: company.email,
      telephone: company.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address.street,
        postalCode: company.address.zip,
        addressLocality: company.address.city,
        addressCountry: company.address.countryCode,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: company.brand,
      url: company.website,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${company.website}/flights?from=HAM&to={ziel}`,
        'query-input': 'required name=ziel',
      },
    },
  ];

  return (
    <div ref={revealRef}>
      <JsonLd data={jsonLd} />

      {/* ── Video-Hero (88vh, Poster-Fallback) ── */}
      <section className="relative flex h-[88vh] min-h-[560px] items-center justify-center overflow-hidden bg-navy-950">
        {videoOk && !reducedMotion && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/assets/hero-poster.png"
            onError={() => setVideoOk(false)}
            aria-hidden="true"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        {(reducedMotion || !videoOk) && (
          <img
            src="/assets/hero-poster.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950/70" aria-hidden="true" />
        <div className="container-page relative z-10 text-center">
          <p className="text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
            {company.brand} · Am Hamburg Airport zu Hause
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-display-md font-semibold text-white sm:text-display-lg lg:text-display-xl">
            Flüge buchen. Ohne Umwege.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-navy-100">
            SkyAHS findet Ihren Flug — transparente Preise, sichere Buchung, persönliche Betreuung aus Hamburg.
          </p>
        </div>
      </section>

      {/* ── Such-Widget (überlappt Hero) ── */}
      <div className="container-page relative z-10 -mt-20 lg:-mt-24">
        <SearchWidget />
      </div>

      {/* ── Vertrauensbalken ── */}
      <section className="container-page mt-14" aria-label="Ihre Vorteile">
        <ul className="grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 lg:grid-cols-4" data-reveal>
          {TRUST_ITEMS.map((t) => (
            <li key={t.title} className="flex items-center gap-3">
              <svg className="h-6 w-6 shrink-0 text-gold-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              <span className="text-body-sm font-medium text-neutral-700">{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Beliebte Ziele ── */}
      <section id="angebote" className="container-page py-16 lg:py-24" aria-labelledby="ziele-title">
        <div data-reveal>
          <SectionHeading
            eyebrow="Angebote"
            title="Beliebte Ziele ab Hamburg"
            sub="Handverlesene Strecken mit Preisen, die stimmen — Stand heute, pro Person, inklusive aller Steuern und Gebühren."
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Link
              key={d.city}
              to={`/flights?from=${d.from}&to=${d.to}`}
              data-reveal
              data-reveal-delay={i * 60}
              className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden bg-navy-100">
                <img
                  src={d.img}
                  alt={`${d.city}, ${d.country}`}
                  width="600"
                  height="450"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-320 ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-title-md font-semibold text-navy-900">{d.city}</h3>
                  <p className="text-body-sm text-neutral-500">{d.country}</p>
                </div>
                <p className="text-body-sm font-bold text-gold-700 tnum">ab {d.price}&nbsp;€</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Warum SkyAHS ── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="warum-title">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="text-caption font-semibold uppercase tracking-wider text-gold-600">Warum SkyAHS</p>
            <h2 id="warum-title" className="mt-2 text-display-sm md:text-display-md">
              Warum Reisende SkyAHS vertrauen
            </h2>
            <span aria-hidden="true" className="mt-4 block h-0.5 w-6 bg-gold-500" />
            <p className="mt-4 max-w-prose text-body-lg text-neutral-500">
              AHS HAMBURG wickelt seit Jahren Flüge am Hamburg Airport ab — wir wissen, wie Luftfahrt wirklich funktioniert. Diese Erfahrung steckt in jeder Buchung.
            </p>
            <ul className="mt-8 space-y-6">
              {USPS.map((u) => (
                <li key={u.title} className="flex gap-4">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-gold-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-body font-semibold text-navy-900">{u.title}</h3>
                    <p className="mt-1 text-body-sm text-neutral-500">{u.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal data-reveal-delay="120" className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="/assets/dest-hamburg.png"
              alt="Hamburg Airport bei Abendlicht"
              width="800"
              height="600"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Ablauf in 3 Schritten ── */}
      <section className="container-page py-16 lg:py-24" aria-labelledby="schritte-title">
        <div data-reveal>
          <SectionHeading center eyebrow="So einfach geht's" title="In drei Schritten zum Flug" />
        </div>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-3">
          <span aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-px bg-neutral-200 md:block" />
          {STEPS.map((s, i) => (
            <li key={s.nr} className="relative text-center" data-reveal data-reveal-delay={i * 60}>
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-white font-mono text-mono-code font-semibold text-gold-700">
                {s.nr}
              </span>
              <h3 className="mt-4 text-title-md font-semibold text-navy-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-body-sm text-neutral-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="stimmen-title">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading center eyebrow="Erfahrungen" title="Das sagen unsere Passagiere" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                data-reveal
                data-reveal-delay={i * 60}
                className="flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6"
              >
                <blockquote className="flex-1 text-body-lg text-neutral-700">„{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
                  <span className="text-body-sm font-semibold text-navy-900">{t.name}</span>
                  <span className="font-mono text-mono-code text-neutral-500">{t.route}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA-Band ── */}
      <section className="bg-navy-900 py-16" aria-labelledby="cta-title">
        <div className="container-page flex flex-col items-center text-center" data-reveal>
          <h2 id="cta-title" className="max-w-2xl text-display-sm text-white md:text-display-md">
            Ihr nächster Flug ist drei Minuten entfernt.
          </h2>
          <p className="mt-4 max-w-xl text-body-lg text-navy-100">
            Transparente Preise, sichere Zahlung, hanseatische Betreuung.
          </p>
          <Link to="#main" onClick={(e) => {
            e.preventDefault();
            document.querySelector('form[aria-label="Flugsuche"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}>
            <Button variant="gold" size="lg" className="mt-8" tabIndex={-1}>
              Jetzt Flüge suchen
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="container-page py-16 lg:py-24" aria-labelledby="newsletter-title">
        <div className="mx-auto max-w-xl text-center" data-reveal>
          <h2 id="newsletter-title" className="text-title-lg">Flugangebote in Ihr Postfach</h2>
          <p className="mt-3 text-body text-neutral-500">
            Einmal im Monat: ausgewählte Strecken ab Hamburg. Kein Spam, jederzeit abbestellbar.
          </p>
          {newsletterDone ? (
            <p className="mt-6 rounded-lg bg-success-50 px-4 py-3 text-body-sm font-medium text-success-500" role="status">
              Vielen Dank. Bitte bestätigen Sie Ihre Anmeldung über den Link in Ihrem Postfach.
            </p>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.includes('@')) setNewsletterDone(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">E-Mail-Adresse</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="z. B. max@example.de"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="h-12 flex-1 rounded-md border border-neutral-300 bg-white px-4 text-body placeholder:text-neutral-400 focus:border-sky-500 focus:shadow-focus focus:outline-none"
              />
              <Button type="submit" variant="primary" size="lg">Anmelden</Button>
            </form>
          )}
          <p className="mt-4 text-caption text-neutral-400">
            Mit der Anmeldung akzeptieren Sie unsere <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
