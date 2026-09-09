import { useState } from 'react';
import { Badge, SectionHeading } from '@/components/ui';
import JsonLd from '@/components/JsonLd';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Article {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  date: string;
  excerpt: string;
  body: string[];
  author: string;
  authorRole: string;
}

const ARTICLES: Article[] = [
  {
    slug: 'handgepaeck-regeln-2025',
    title: 'Handgepäck-Regeln 2025: Was sich geändert hat',
    category: 'Reisetipps',
    readingTime: '4 Min.',
    date: '2025-08-12',
    excerpt: 'Neue EU-Vorgaben, einheitlichere Maße und was Sie bei Powerbanks beachten müssen — der kompakte Überblick.',
    body: [
      'Die EU hat die Vorgaben für Flüssigkeiten im Handgepäck an mehreren Flughäfen angepasst: An Kontrollen mit neuen CT-Scannern dürfen Behälter bis 2 Liter mitgeführt werden, an älteren Spuren gilt weiterhin die 100-ml-Regel. Hamburg Airport ist größtenteils umgerüstet.',
      'Unser Rat aus der Praxis: Packen Sie weiterhin konservativ — der Rückflug kann von einem Flughafen mit älterer Technik starten. Powerbanks gehören ausschließlich ins Handgepäck, niemals in den Koffer.',
      'Prüfen Sie die Handgepäck-Maße Ihrer Airline vor Abflug: Gerade Billigflieger messen am Gate nach. Die genauen Regeln Ihres Fluges finden Sie in Ihrer SkyAHS-Buchungsbestätigung.',
    ],
    author: 'Janne Petersen',
    authorRole: 'Leitung Bodenverkehrsdienste',
  },
  {
    slug: 'anschlussflug-umsteigezeit',
    title: 'Wie viel Umsteigezeit brauche ich wirklich?',
    category: 'Know-how',
    readingTime: '5 Min.',
    date: '2025-07-28',
    excerpt: 'Warum 45 Minuten in Frankfurt knapp sind und in Kopenhagen reichen — aus der Sicht des Ground Handlings.',
    body: [
      'Die offizielle Minimum Connection Time (MCT) ist das, was Airports als machbar definieren — nicht das, was entspannt ist. In Frankfurt empfehlen wir 75 Minuten, in München 60, in Kopenhagen genügen oft 45.',
      'Entscheidend ist, ob Sie das Terminal wechseln müssen und ob eine Passkontrolle dazwischenliegt. Flüge innerhalb des Schengen-Raums sind deutlich fehlerverzeihender.',
      'Bei SkyAHS zeigen wir nur Verbindungen, die wir selbst für realistisch halten — das ist der Vorteil, wenn das Buchungsteam weiß, wie lange ein Pushback wirklich dauert.',
    ],
    author: 'Dr. Sabine Lorenz',
    authorRole: 'Produkt & Netzwerk',
  },
  {
    slug: 'eu-fluggastrechte',
    title: 'EU-Fluggastrechte: Ihre Ansprüche bei Verspätung',
    category: 'Recht',
    readingTime: '6 Min.',
    date: '2025-07-10',
    excerpt: '250 bis 600 Euro Ausgleich — wann Sie Anspruch haben und wie Sie ihn durchsetzen.',
    body: [
      'Bei Verspätungen ab drei Stunden am Zielort haben Sie nach EG 261/2004 Anspruch auf Ausgleich: 250 € bis 1.500 km, 400 € bis 3.500 km, 600 € darüber. Voraussetzung: Die Airline trägt die Verantwortung.',
      'Zusätzlich zur Ausgleichszahlung stehen Ihnen Betreuungsleistungen zu — Mahlzeiten, Getränke, bei Übernachtung das Hotel. Bewahren Sie alle Belege auf.',
      'Unser Tipp: Reichen Sie den Anspruch direkt bei der Airline ein und dokumentieren Sie die tatsächliche Ankunftszeit. Screenshot der Anzeigetafel genügt oft.',
    ],
    author: 'Radoslav Kozubjak',
    authorRole: 'Geschäftsführer',
  },
  {
    slug: 'business-class-lohnt-sich',
    title: 'Wann sich Business Class wirklich lohnt',
    category: 'Reisetipps',
    readingTime: '4 Min.',
    date: '2025-06-18',
    excerpt: 'Nachtflüge, Meetings am Ankunftstag, lange Strecken — drei Szenarien, in denen der Aufpreis stimmt.',
    body: [
      'Auf Nachtflügen über sechs Stunden ist der liegende Sitz kein Luxus, sondern Arbeitszeit-Schutz: Sie kommen an und können arbeiten. Auf Tagesflügen unter drei Stunden zahlen Sie vor allem für Lounge und Gepäck.',
      'Ein oft übersehener Mittelweg: Premium Economy. Auf Langstrecke kostet sie rund 60 % mehr als Economy — deutlich weniger als der Sprung in die Business Class.',
      'Bei SkyAHS sehen Sie alle vier Klassen direkt im Preisvergleich. Rechnen Sie ehrlich: Was ist Ihnen ein ausgeruhter Ankunftstag wert?',
    ],
    author: 'Janne Petersen',
    authorRole: 'Leitung Bodenverkehrsdienste',
  },
  {
    slug: 'hamburg-airport-guide',
    title: 'Hamburg Airport: Der Insider-Guide unseres Teams',
    category: 'Destinationen',
    readingTime: '5 Min.',
    date: '2025-05-30',
    excerpt: 'Welche Sicherheitskontrolle schneller ist, wo der beste Kaffee wartet und wann Sie wirklich am Flughafen sein sollten.',
    body: [
      'Terminal 2 ist morgens zwischen 6 und 8 Uhr deutlich ruhiger als Terminal 1. Beide Terminals sind luftseitig verbunden — Sie können also dort einchecken, wo es leerer ist.',
      'Unsere Faustregel: Inlandsflüge 90 Minuten vor Abflug, Schengen 2 Stunden, Langstrecke 2,5 Stunden. Wer Fast Lane nutzt, darf 20 Minuten abziehen.',
      'Und der Kaffee? Die Rösterei in der Airport Plaza, Ebene 3 — das sagen wir nicht, weil wir müssen, sondern weil wir dort selbst stehen.',
    ],
    author: 'Meike Brandt',
    authorRole: 'Station Management HAM',
  },
  {
    slug: 'dubai-stopover',
    title: 'Dubai als Stopover: Aus dem Vorfeld in die Stadt',
    category: 'Destinationen',
    readingTime: '4 Min.',
    date: '2025-05-08',
    excerpt: 'Sechs Stunden Aufenthalt in DXB reichen für Burj Khalifa und zurück — wenn man es richtig plant.',
    body: [
      'Dubai ist einer der effizientesten Umsteigeflughäfen der Welt: Für Staatsangehörige vieler Länder gibt es das Visum bei Einreise, die Metro fährt direkt vom Terminal 3 in die Stadt.',
      'Realistisch kalkuliert: 30 Minuten Einreise, 25 Minuten Metro zur Downtown, zwei Stunden vor Ort, zurück am Gate 90 Minuten vor Abflug. Ab sechs Stunden Umsteigezeit wird es entspannt.',
      'Ab Hamburg fliegt Emirates zweimal täglich nach Dubai — der Abendflug EK 063 ist ideal, um morgens in Asien anzukommen.',
    ],
    author: 'Dr. Sabine Lorenz',
    authorRole: 'Produkt & Netzwerk',
  },
];

export default function Blog() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();
  const openArticle = ARTICLES.find((a) => a.slug === openSlug) ?? null;

  useDocumentHead({
    title: openArticle ? openArticle.title : 'Blog',
    description: openArticle
      ? openArticle.excerpt
      : 'Der SkyAHS-Blog: Reisetipps, Fluggastrechte und Insider-Wissen vom Hamburg Airport.',
  });

  if (openArticle) {
    return (
      <div className="pt-16 md:pt-[72px]">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: openArticle.title,
            datePublished: openArticle.date,
            author: { '@type': 'Person', name: openArticle.author },
          }}
        />
        <article className="container-page max-w-[760px] py-12">
          <button
            onClick={() => setOpenSlug(null)}
            className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
          >
            <svg className="h-4 w-4 rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            Alle Artikel
          </button>
          <div className="mt-6 flex items-center gap-3">
            <Badge variant="gold">{openArticle.category}</Badge>
            <span className="text-caption text-neutral-400">
              {new Date(openArticle.date).toLocaleDateString('de-DE')} · {openArticle.readingTime} Lesezeit
            </span>
          </div>
          <h1 className="mt-4 text-display-md">{openArticle.title}</h1>
          <div className="mt-8 space-y-5 text-body text-neutral-700">
            {openArticle.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <footer className="mt-10 flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-mono text-sm font-semibold text-gold-400" aria-hidden="true">
              {openArticle.author.split(' ').map((w) => w[0]).join('')}
            </span>
            <div>
              <p className="text-body-sm font-semibold text-navy-900">{openArticle.author}</p>
              <p className="text-caption text-neutral-500">{openArticle.authorRole}, SkyAHS Hamburg</p>
            </div>
          </footer>
        </article>
      </div>
    );
  }

  return (
    <div ref={ref} className="container-page py-12 pt-24 md:pt-28">
      <div data-reveal>
        <SectionHeading
          eyebrow="Blog"
          title="Wissen aus der Luftfahrt-Praxis"
          sub="Reisetipps, Fluggastrechte und Blicke hinter die Kulissen des Hamburg Airport — geschrieben vom Team, das dort arbeitet."
        />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <article
            key={a.slug}
            data-reveal
            data-reveal-delay={i * 60}
            className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex aspect-[16/9] items-center justify-center bg-navy-900">
              <span className="font-mono text-mono-code text-gold-500" aria-hidden="true">
                SkyAHS · {a.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                <Badge variant="gold">{a.category}</Badge>
                <span className="text-caption text-neutral-400">{a.readingTime}</span>
              </div>
              <h2 className="mt-3 text-title-md font-semibold text-navy-900">{a.title}</h2>
              <p className="mt-2 flex-1 text-body-sm text-neutral-500">{a.excerpt}</p>
              <button
                onClick={() => setOpenSlug(a.slug)}
                className="mt-4 inline-flex items-center gap-1 self-start text-body-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
              >
                Weiterlesen
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
