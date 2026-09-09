import { company } from '@/config/company';
import { Badge, SectionHeading } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const JOBS = [
  { title: 'Aviation Handling Agent (m/w/d)', location: 'Hamburg Airport', type: 'Vollzeit', team: 'Operations' },
  { title: 'Senior Frontend Engineer (m/w/d)', location: 'Hamburg / Remote', type: 'Vollzeit', team: 'Produkt' },
  { title: 'Kundenbetreuer Flugbuchung (m/w/d)', location: 'Hamburg', type: 'Vollzeit / Schicht', team: 'Support' },
  { title: 'Working Student Data & Pricing (m/w/d)', location: 'Hamburg', type: 'Werkstudent', team: 'Produkt' },
];

export default function Careers() {
  useDocumentHead({
    title: 'Karriere',
    description: `Karriere bei ${company.legalName}: Arbeiten am Hamburg Airport — in Operations, Support und Produkt.`,
  });
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="pt-16 md:pt-[72px]">
      <section className="bg-navy-900 py-16 lg:py-24">
        <div className="container-page max-w-3xl" data-reveal>
          <p className="text-caption font-semibold uppercase tracking-wider text-gold-500">Karriere</p>
          <h1 className="mt-3 text-display-md text-white md:text-display-lg">
            Arbeiten, wo Flugzeuge starten.
          </h1>
          <p className="mt-5 text-body-lg text-navy-100">
            Vom Vorfeld des Hamburg Airport ins Produkt: Bei SkyAHS arbeiten Menschen, die Luftfahrt nicht aus dem Lehrbuch kennen, sondern aus der Praxis. Hanseatisch im Ton, präzise in der Sache.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <div data-reveal>
          <SectionHeading eyebrow="Offene Stellen" title="Aktuelle Positionen" sub="Alle Bewerbungen bitte an karriere@sky-ahs.com — Betreff: Position + Ihr Name." />
        </div>
        <ul className="mt-10 space-y-4">
          {JOBS.map((j, i) => (
            <li
              key={j.title}
              data-reveal
              data-reveal-delay={i * 60}
              className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-title-md font-semibold text-navy-900">{j.title}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="neutral">{j.team}</Badge>
                  <Badge variant="neutral">{j.location}</Badge>
                  <Badge variant="gold">{j.type}</Badge>
                </div>
              </div>
              <a
                href={`mailto:karriere@sky-ahs.com?subject=${encodeURIComponent(`Bewerbung: ${j.title}`)}`}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-neutral-300 px-5 font-semibold text-navy-900 transition-colors hover:border-navy-600"
              >
                Bewerben
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-body-sm text-neutral-500" data-reveal>
          Keine passende Stelle dabei? Initiativbewerbungen sind willkommen:{' '}
          <a href="mailto:karriere@sky-ahs.com" className="font-semibold text-navy-600 underline underline-offset-4">
            karriere@sky-ahs.com
          </a>
        </p>
      </section>
    </div>
  );
}
