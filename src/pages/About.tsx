import { Link } from 'react-router-dom';
import { company } from '@/config/company';
import { SectionHeading, Button } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const VALUES = [
  { title: 'Präzision', text: 'Jede Angabe auf dieser Seite ist geprüft: Preise, Zeiten, Bedingungen. Was wir anzeigen, gilt.' },
  { title: 'Ruhe', text: 'Keine Countdown-Timer, keine künstliche Verknappung, keine dunklen Muster. Sie entscheiden in Ihrem Tempo.' },
  { title: 'Verlässlichkeit', text: 'Hanseatische Nüchternheit: Wir versprechen wenig — und halten alles.' },
];

const NUMBERS = [
  { value: '2011', label: 'Gegründet in Hamburg' },
  { value: '130+', label: 'Flughäfen im Netz' },
  { value: '24/7', label: 'Erreichbarer Support' },
  { value: '4,8/5', label: 'Kundenbewertung' },
];

export default function About() {
  useDocumentHead({
    title: 'Über uns',
    description: `SkyAHS ist die Flugbuchungsplattform der ${company.legalName} — Ground-Handling-Erfahrung vom Hamburg Airport, jetzt in Ihrer Buchung.`,
  });
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="pt-16 md:pt-[72px]">
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="container-page max-w-3xl" data-reveal>
          <p className="text-caption font-semibold uppercase tracking-wider text-gold-500">Über uns</p>
          <h1 className="mt-3 text-display-md text-white md:text-display-lg">
            Vom Vorfeld in Ihre Buchung.
          </h1>
          <p className="mt-5 text-body-lg text-navy-100">
            Die {company.legalName} arbeitet seit Jahren im Ground Handling am Hamburg Airport. Wir wissen, warum Flüge pünktlich sind — und warum nicht. Diese Erfahrung macht SkyAHS zur Flugbuchung, auf die Sie sich verlassen können.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div data-reveal>
          <SectionHeading eyebrow="Unsere Werte" title="Hanseatisch. Präzise. Verlässlich." />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <article key={v.title} data-reveal data-reveal-delay={i * 60} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-title-md font-semibold text-navy-900">{v.title}</h2>
              <p className="mt-2 text-body-sm text-neutral-500">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-page">
          <div data-reveal>
            <SectionHeading eyebrow="Zahlen" title="SkyAHS in Kennzahlen" />
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <div key={n.label} data-reveal data-reveal-delay={i * 60} className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
                <dd className="font-display text-display-sm font-semibold text-navy-900">{n.value}</dd>
                <dt className="mt-1 text-body-sm text-neutral-500">{n.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl shadow-lg" data-reveal>
            <img src="/assets/dest-hamburg.png" alt="Hamburg Airport" width="800" height="600" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div data-reveal data-reveal-delay="120">
            <h2 className="text-display-sm md:text-display-md">Unser Zuhause: Hamburg Airport</h2>
            <span aria-hidden="true" className="mt-4 block h-0.5 w-6 bg-gold-500" />
            <p className="mt-4 max-w-prose text-body text-neutral-600">
              Unsere Teams beladen Flugzeuge, lotsen sie an ihre Positionen und sorgen dafür, dass Abflüge pünktlich starten. Wenn Sie bei SkyAHS buchen, profitieren Sie von diesem Wissen: realistische Umsteigezeiten, ehrliche Flugzeiten, klare Preise.
            </p>
            <p className="mt-4 max-w-prose text-body text-neutral-600">
              Fragen? Rufen Sie uns an unter {company.phoneDisplay} oder schreiben Sie an{' '}
              <a href={`mailto:${company.email}`} className="font-semibold text-navy-600 underline underline-offset-4">{company.email}</a>.
            </p>
            <Link to="/kontakt" className="mt-6 inline-block">
              <Button variant="primary">Kontakt aufnehmen</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
