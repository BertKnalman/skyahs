import { useState } from 'react';
import { company } from '@/config/company';
import { Button, Input } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Buchung');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useDocumentHead({
    title: 'Kontakt',
    description: `Kontakt zu SkyAHS: ${company.phoneDisplay}, ${company.email} — 24/7 erreichbar aus Hamburg.`,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (message.trim().length < 10) errs.message = 'Bitte beschreiben Sie Ihr Anliegen (mind. 10 Zeichen).';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <div className="container-page max-w-5xl py-10 pt-24 md:pt-28">
      <h1 className="text-display-sm md:text-display-md">Kontakt</h1>
      <p className="mt-3 max-w-prose text-body-lg text-neutral-500">
        Unser Team in Hamburg ist rund um die Uhr für Sie da — auch nachts, auch am Wochenende.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          {sent ? (
            <div role="status" className="py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-success-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              <h2 className="mt-4 text-title-lg">Nachricht gesendet</h2>
              <p className="mx-auto mt-2 max-w-md text-body text-neutral-500">
                Vielen Dank. Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="z. B. Erika Mustermann" />
                <Input label="E-Mail-Adresse" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} placeholder="z. B. max@example.de" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="topic" className="text-body-sm font-medium text-neutral-700">Anliegen</label>
                <select
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="h-12 rounded-md border border-neutral-300 bg-white px-4 text-body focus:border-sky-500 focus:shadow-focus focus:outline-none"
                >
                  {['Buchung', 'Stornierung & Erstattung', 'Zahlung', 'Gepäck', 'Feedback', 'Sonstiges'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-body-sm font-medium text-neutral-700">
                  Nachricht <span className="text-neutral-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Wie können wir helfen?"
                  className={`rounded-md border bg-white px-4 py-3 text-body text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus:border-sky-500 focus:shadow-focus focus:outline-none ${
                    errors.message ? 'border-error-500' : 'border-neutral-300'
                  }`}
                />
                {errors.message && <p id="message-error" role="alert" className="text-body-sm text-error-500">{errors.message}</p>}
              </div>
              <Button type="submit" variant="primary" size="lg">Nachricht senden</Button>
            </form>
          )}
        </div>

        <aside className="space-y-6" aria-label="Kontaktdaten">
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="text-title-md font-semibold text-navy-900">Direkter Draht</h2>
            <dl className="mt-4 space-y-3 text-body-sm">
              <div>
                <dt className="text-neutral-400">Telefon (24/7)</dt>
                <dd><a href={`tel:${company.phone.replace(/\s/g, '')}`} className="font-semibold text-navy-600">{company.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt className="text-neutral-400">E-Mail</dt>
                <dd><a href={`mailto:${company.email}`} className="font-semibold text-navy-600">{company.email}</a></dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="text-title-md font-semibold text-navy-900">Anschrift</h2>
            <address className="mt-4 text-body-sm not-italic text-neutral-600">
              {company.legalName}
              <br />
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
              <br />
              {company.address.country}
            </address>
          </div>
        </aside>
      </div>
    </div>
  );
}
