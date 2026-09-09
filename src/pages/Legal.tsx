import { company } from '@/config/company';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export type LegalPageKey = 'agb' | 'datenschutz' | 'cookies' | 'barrierefreiheit' | 'stornierung' | 'erstattung';

interface LegalSection {
  h: string;
  p: string[];
}

interface LegalPage {
  title: string;
  stand: string;
  description: string;
  sections: LegalSection[];
}

const IMPRESSUM_BLOCK = `${company.legalName}, ${company.address.street}, ${company.address.zip} ${company.address.city}, ${company.address.country} — Telefon: ${company.phoneDisplay}, E-Mail: ${company.email}. Geschäftsführer: ${company.managingDirector}. Handelsregister: ${company.registerCourt}, ${company.commercialRegister}. USt-IdNr.: ${company.vatId}.`;

const PAGES: Record<LegalPageKey, LegalPage> = {
  agb: {
    title: 'Allgemeine Geschäftsbedingungen',
    stand: 'Stand: 01.09.2025',
    description: `AGB der ${company.legalName} für die Flugbuchungsplattform SkyAHS.`,
    sections: [
      {
        h: '§ 1 Geltungsbereich und Vertragspartner',
        p: [
          `Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Flugbuchungsplattform SkyAHS, betrieben von der ${company.legalName} (nachfolgend „SkyAHS"), ${company.address.street}, ${company.address.zip} ${company.address.city}.`,
          'SkyAHS vermittelt Beförderungsverträge zwischen dem Kunden und der jeweiligen Fluggesellschaft. Der Beförderungsvertrag kommt ausschließlich zwischen dem Kunden und der Airline zustande; es gelten ergänzend die Beförderungsbedingungen der jeweiligen Airline.',
        ],
      },
      {
        h: '§ 2 Vertragsschluss',
        p: [
          'Die Darstellung der Flüge auf der Plattform stellt kein verbindliches Angebot dar, sondern eine Aufforderung zur Abgabe eines Angebots. Mit Klick auf „Jetzt verbindlich buchen" und erfolgreicher Zahlung geben Sie ein verbindliches Angebot ab. Der Vermittlungsvertrag kommt mit der Buchungsbestätigung per E-Mail zustande.',
          'Die Buchungsbestätigung enthält eine sechsstellige Buchungsreferenz. Bitte prüfen Sie alle Angaben unmittelbar nach Erhalt.',
        ],
      },
      {
        h: '§ 3 Preise und Zahlung',
        p: [
          'Alle angezeigten Preise sind Endpreise pro Person inklusive Steuern und Gebühren. Es fallen keine zusätzlichen Kosten im Buchungsprozess an.',
          'Die Zahlung erfolgt über unseren Zahlungsdienstleister SumUp. Der Rechnungsbetrag ist sofort mit Buchung fällig. Eine Ticketausstellung erfolgt erst nach erfolgreicher Zahlung.',
        ],
      },
      {
        h: '§ 4 Namens- und Datenkorrekturen',
        p: [
          'Die Passagierdaten müssen exakt mit dem Reisedokument übereinstimmen. Nachträgliche Namensänderungen sind nach Airline-Tarifbestimmungen möglicherweise kostenpflichtig oder ausgeschlossen.',
          'Offensichtliche Schreibfehler (bis zu drei Zeichen) korrigieren wir innerhalb von 24 Stunden nach Buchung kostenfrei, sofern die Airline dies zulässt.',
        ],
      },
      {
        h: '§ 5 Stornierung und Umbuchung',
        p: [
          'Es gelten unsere Stornierungsbedingungen und Erstattungsrichtlinie in der jeweils aktuellen Fassung. Bis 24 Stunden vor Abflug ist die Stornierung kostenfrei.',
          'Bei Flugplanänderungen oder Annullierungen durch die Airline gelten die Rechte aus der Verordnung (EG) Nr. 261/2004.',
        ],
      },
      {
        h: '§ 6 Haftung',
        p: [
          'SkyAHS haftet für die ordnungsgemäße Vermittlung des Beförderungsvertrags. Für die Durchführung der Beförderung selbst haftet ausschließlich die ausführende Airline.',
          'Für leicht fahrlässige Pflichtverletzungen haften wir nur bei Verletzung wesentlicher Vertragspflichten; die Haftung ist auf den vorhersehbaren, vertragstypischen Schaden begrenzt. Die Haftung bei Vorsatz, grober Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit bleibt unberührt.',
        ],
      },
      {
        h: '§ 7 Schlussbestimmungen',
        p: [
          'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für Kaufleute ist Hamburg.',
          `Anbieter: ${IMPRESSUM_BLOCK}`,
        ],
      },
    ],
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    stand: 'Stand: 01.09.2025',
    description: `Datenschutzerklärung der ${company.legalName}: Verantwortlicher, Zwecke, Rechtsgrundlagen und Ihre Rechte.`,
    sections: [
      {
        h: '1. Verantwortlicher',
        p: [
          `Verantwortlich für die Datenverarbeitung ist: ${IMPRESSUM_BLOCK}`,
        ],
      },
      {
        h: '2. Welche Daten wir verarbeiten',
        p: [
          'Bei der Buchung verarbeiten wir: Name, Geburtsdatum, E-Mail-Adresse, optional Telefonnummer sowie die Buchungsdaten (Strecke, Datum, Klasse, Preis). Zahlungsdaten (Kartendaten) werden ausschließlich vom Zahlungsdienstleister SumUp verarbeitet und nicht auf unseren Servern gespeichert.',
          'Bei der reinen Nutzung der Website ohne Buchung speichern wir keine personenbezogenen Daten auf unseren Systemen; lokale Speicherung (localStorage) erfolgt ausschließlich auf Ihrem Endgerät.',
        ],
      },
      {
        h: '3. Zwecke und Rechtsgrundlagen',
        p: [
          'Die Verarbeitung erfolgt zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) — Vermittlung und Abwicklung Ihrer Flugbuchung — sowie zur Erfüllung rechtlicher Pflichten (Art. 6 Abs. 1 lit. c DSGVO), insbesondere steuerlicher Aufbewahrungspflichten.',
          'Der Newsletter-Versand erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) mit Double-Opt-in; die Einwilligung ist jederzeit widerrufbar.',
        ],
      },
      {
        h: '4. Empfänger und Drittstaaten',
        p: [
          'Zur Vertragserfüllung übermitteln wir die erforderlichen Passagierdaten an die ausführende Airline sowie an den Zahlungsdienstleister SumUp. Eine Übermittlung in Drittstaaten erfolgt nur, soweit sie für die Flugbeförderung erforderlich ist (z. B. Zielland).',
        ],
      },
      {
        h: '5. Speicherdauer',
        p: [
          'Buchungsdaten speichern wir für die Dauer der gesetzlichen Aufbewahrungsfristen (in der Regel 10 Jahre für steuerrelevante Unterlagen). Daten aus Kontaktanfragen löschen wir nach abschließender Bearbeitung, spätestens nach 12 Monaten.',
        ],
      },
      {
        h: '6. Ihre Rechte',
        p: [
          'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.',
          'Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde: Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit, Ludwig-Erhard-Str. 22, 20459 Hamburg.',
        ],
      },
      {
        h: '7. Cookies',
        p: [
          'Details zur Verwendung von Cookies und lokaler Speicherung finden Sie in unserer Cookie-Richtlinie.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie-Richtlinie',
    stand: 'Stand: 01.09.2025',
    description: 'Cookie-Richtlinie von SkyAHS: welche Cookies und Speicher wir einsetzen und warum.',
    sections: [
      {
        h: '1. Grundsatz',
        p: [
          'SkyAHS setzt ausschließlich technisch notwendige Speichermechanismen ein. Wir verwenden keine Marketing-Cookies, kein Tracking und keine Analyse-Tools von Drittanbietern.',
        ],
      },
      {
        h: '2. Technisch notwendige Speicherung (localStorage)',
        p: [
          'Folgende Daten werden lokal in Ihrem Browser gespeichert und nicht an unsere Server übertragen: Ihre Buchungen (zur Anzeige unter „Meine Buchungen"), Ihr Anmeldestatus sowie Einstellungen der Oberfläche.',
          'Rechtsgrundlage ist § 25 Abs. 2 TDDDG, da die Speicherung für die Bereitstellung des von Ihnen gewünschten Dienstes unbedingt erforderlich ist.',
        ],
      },
      {
        h: '3. Verwaltung und Löschung',
        p: [
          'Sie können die lokal gespeicherten Daten jederzeit über die Browser-Einstellungen löschen („Website-Daten löschen"). Bitte beachten Sie: Ihre lokal gespeicherten Buchungen gehen dabei verloren; die Buchung selbst bleibt bestehen und ist über Ihre Buchungsreferenz wiederherstellbar.',
        ],
      },
      {
        h: '4. Kontakt',
        p: [`Fragen zur Cookie-Richtlinie beantworten wir unter ${company.email} oder telefonisch unter ${company.phoneDisplay}.`],
      },
    ],
  },
  barrierefreiheit: {
    title: 'Erklärung zur Barrierefreiheit',
    stand: 'Stand: 01.09.2025',
    description: 'Erklärung zur Barrierefreiheit der SkyAHS-Website nach BFSG und WCAG 2.2 AA.',
    sections: [
      {
        h: '1. Unser Anspruch',
        p: [
          `${company.legalName} ist bemüht, die Flugbuchungsplattform SkyAHS im Einklang mit dem Barrierefreiheitsstärkungsgesetz (BFSG) und den Web Content Accessibility Guidelines (WCAG) 2.2, Konformitätsstufe AA, barrierefrei zugänglich zu machen.`,
        ],
      },
      {
        h: '2. Umgesetzte Maßnahmen',
        p: [
          'Die Website verwendet semantisches HTML, eine logische Überschriftenstruktur und genau eine H1 pro Seite. Kontraste entsprechen mindestens 4,5:1. Alle interaktiven Elemente sind per Tastatur erreichbar und besitzen sichtbare Fokus-Indikatoren.',
          'Formulare verfügen über sichtbare Beschriftungen und verständliche Fehlermeldungen; die Autocomplete-Felder sind als Combobox mit ARIA-Attributen umgesetzt. Animationen berücksichtigen die Systemeinstellung „Bewegung reduzieren" (prefers-reduced-motion). Eine Skip-Verknüpfung „Zum Hauptinhalt" steht am Seitenanfang.',
        ],
      },
      {
        h: '3. Bekannte Einschränkungen',
        p: [
          'Ältere PDF-Dokumente (z. B. Tarifbestimmungen einzelner Airlines) sind möglicherweise nicht vollständig barrierefrei. Wir arbeiten an der schrittweisen Bereitstellung barrierefreier Alternativen.',
        ],
      },
      {
        h: '4. Feedback und Kontakt',
        p: [
          `Wenn Sie Barrieren auf unserer Website melden möchten, wenden Sie sich an ${company.email} oder ${company.phoneDisplay}. Wir beantworten Hinweise in der Regel innerhalb von 5 Werktagen.`,
        ],
      },
      {
        h: '5. Durchsetzungsverfahren',
        p: [
          'Sollten Sie mit unserer Antwort nicht zufrieden sein, können Sie sich an die Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen wenden.',
        ],
      },
    ],
  },
  stornierung: {
    title: 'Stornierungsbedingungen',
    stand: 'Stand: 01.09.2025',
    description: 'Stornierungsbedingungen von SkyAHS: kostenlose Stornierung bis 24 Stunden vor Abflug.',
    sections: [
      {
        h: '1. Kostenlose Stornierung',
        p: [
          'Sie können jede über SkyAHS gebuchte Buchung bis 24 Stunden vor dem planmäßigen Abflug kostenfrei stornieren. Sie erhalten den vollständigen Buchungsbetrag zurück — ohne Stornogebühr.',
        ],
      },
      {
        h: '2. Stornierung innerhalb von 24 Stunden vor Abflug',
        p: [
          'Bei Stornierung weniger als 24 Stunden vor Abflug gelten die Tarifbestimmungen der ausführenden Airline. Je nach Tarif ist eine Erstattung ganz oder teilweise ausgeschlossen; erstattungsfähige Steuern und Gebühren erstatten wir in jedem Fall.',
        ],
      },
      {
        h: '3. So stornieren Sie',
        p: [
          `Stornierungen sind jederzeit unter „Meine Buchungen" möglich — direkt in Ihrem Browser. Alternativ genügt eine E-Mail an ${company.email} oder ein Anruf unter ${company.phoneDisplay} unter Angabe Ihrer sechsstelligen Buchungsreferenz.`,
          'Die Stornierung wird Ihnen per E-Mail bestätigt. Maßgeblich für die Frist ist der Eingangszeitpunkt der Stornierung.',
        ],
      },
      {
        h: '4. Teilstornierung',
        p: [
          'Möchten Sie nur einzelne Passagiere einer Buchung stornieren, wenden Sie sich bitte an unseren Support. Teilstornierungen bearbeiten wir werktags innerhalb von 24 Stunden.',
        ],
      },
      {
        h: '5. Nichtantritt (No-Show)',
        p: [
          'Treten Sie den Flug ohne vorherige Stornierung nicht an, gelten die Bedingungen der Airline. Viele Tarife verfallen beim No-Show vollständig — stornieren Sie daher rechtzeitig, auch kurzfristig.',
        ],
      },
    ],
  },
  erstattung: {
    title: 'Erstattungsrichtlinie',
    stand: 'Stand: 01.09.2025',
    description: 'Erstattungsrichtlinie von SkyAHS: Fristen, Wege und Ihre Rechte nach EG 261/2004.',
    sections: [
      {
        h: '1. Erstattungsweg und Frist',
        p: [
          'Erstattungen erfolgen grundsätzlich auf das ursprünglich verwendete Zahlungsmittel. Nach bestätigter Stornierung veranlassen wir die Erstattung innerhalb von 7 Werktagen; je nach Kartenanbieter kann die Gutschrift weitere 3–5 Bankarbeitstage dauern.',
        ],
      },
      {
        h: '2. Umfang der Erstattung',
        p: [
          'Bei kostenfreier Stornierung (bis 24 Stunden vor Abflug) erstatten wir 100 % des Buchungsbetrags. Bei späterer Stornierung richtet sich der Betrag nach den Tarifbestimmungen der Airline; nicht genutzte Steuern und Flughafengebühren werden stets erstattet.',
        ],
      },
      {
        h: '3. Flugausfall oder Verspätung durch die Airline',
        p: [
          'Wird Ihr Flug annulliert oder verspätet sich um mehr als 5 Stunden, können Sie statt der Beförderung die vollständige Erstattung des Ticketpreises wählen. Zusätzlich kann ein Ausgleichsanspruch nach Verordnung (EG) Nr. 261/2004 bestehen (250 € bis 600 € je nach Strecke).',
          'Diese Ansprüche richten sich an die ausführende Airline. Unser Support unterstützt Sie kostenfrei bei der Durchsetzung.',
        ],
      },
      {
        h: '4. Bearbeitungsstand verfolgen',
        p: [
          `Den Stand Ihrer Erstattung erfragen Sie unter ${company.email} oder ${company.phoneDisplay} unter Angabe Ihrer Buchungsreferenz. Sie erhalten zu jedem Schritt eine Bestätigung per E-Mail.`,
        ],
      },
    ],
  },
};

export default function Legal({ page }: { page: LegalPageKey }) {
  const content = PAGES[page];

  useDocumentHead({
    title: content.title,
    description: content.description,
  });

  return (
    <div className="pt-16 md:pt-[72px]">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        {/* Inhaltsverzeichnis */}
        <nav aria-label="Inhaltsverzeichnis" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="text-caption font-semibold uppercase tracking-wider text-neutral-400">Inhalt</p>
          <ul className="mt-3 space-y-2">
            {content.sections.map((s, i) => (
              <li key={s.h}>
                <a href={`#abschnitt-${i + 1}`} className="text-body-sm text-neutral-500 transition-colors hover:text-navy-900">
                  {s.h}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-[760px]">
          <h1 className="text-display-sm md:text-display-md">{content.title}</h1>
          <p className="mt-2 text-caption text-neutral-400">{content.stand}</p>
          <div className="mt-10 space-y-10">
            {content.sections.map((s, i) => (
              <section key={s.h} id={`abschnitt-${i + 1}`} aria-labelledby={`h-${i + 1}`}>
                <h2 id={`h-${i + 1}`} className="text-title-md font-semibold text-navy-900">
                  {s.h}
                </h2>
                <span aria-hidden="true" className="mt-2 block h-0.5 w-6 bg-gold-500" />
                {s.p.map((para, j) => (
                  <p key={j} className="mt-3 text-body text-neutral-700">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
