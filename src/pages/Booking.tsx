import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { flights } from '@/data/flights';
import { getAirport } from '@/data/airports';
import { CLASS_LABELS, CLASS_MULTIPLIERS, type TravelClass } from '@/config/company';
import { formatEUR, formatDateDE, todayISO } from '@/lib/format';
import { Button, Badge } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

interface PassengerDraft {
  firstName: string;
  lastName: string;
  birthDate: string;
}

interface FieldErrors {
  [key: string]: string;
}

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const flightNumber = params.get('flight') || '';
  const departDate = params.get('date') || todayISO();
  const returnDate = params.get('return') || '';
  const travelClass = (params.get('class') || 'economy') as TravelClass;
  const passengerCount = Math.min(6, Math.max(1, parseInt(params.get('passengers') || '1', 10)));

  const flight = useMemo(() => flights.find((f) => f.flight === flightNumber), [flightNumber]);

  const [passengers, setPassengers] = useState<PassengerDraft[]>(
    Array.from({ length: passengerCount }, () => ({ firstName: '', lastName: '', birthDate: '' })),
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agb, setAgb] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  useDocumentHead({
    title: flight ? `Buchung ${flight.from} → ${flight.to}` : 'Buchung',
    description: 'Passagierdaten eintragen und Flug sicher buchen. Alle Preise inkl. Steuern und Gebühren.',
  });

  if (!flight) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="text-display-sm">Flug nicht gefunden</h1>
        <p className="mt-3 text-body text-neutral-500">Der gewählte Flug ist nicht mehr verfügbar.</p>
        <Link to="/flights" className="mt-6 font-semibold text-navy-600 underline underline-offset-4">
          Zurück zur Flugsuche
        </Link>
      </div>
    );
  }

  const fromA = getAirport(flight.from);
  const toA = getAirport(flight.to);
  const pricePerPerson = flight.basePrice * CLASS_MULTIPLIERS[travelClass];
  const taxesIncluded = pricePerPerson * 0.19;
  const total = pricePerPerson * passengerCount;

  const updatePassenger = (i: number, field: keyof PassengerDraft, value: string) => {
    setPassengers((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  };

  const validate = (): boolean => {
    const errs: FieldErrors = {};
    passengers.forEach((p, i) => {
      if (p.firstName.trim().length < 2) errs[`p${i}-firstName`] = 'Bitte geben Sie den Vornamen ein (mind. 2 Zeichen).';
      if (p.lastName.trim().length < 2) errs[`p${i}-lastName`] = 'Bitte geben Sie den Nachnamen ein (mind. 2 Zeichen).';
      if (!p.birthDate) errs[`p${i}-birthDate`] = 'Bitte geben Sie das Geburtsdatum ein.';
      else if (new Date(p.birthDate) > new Date()) errs[`p${i}-birthDate`] = 'Das Geburtsdatum liegt in der Zukunft.';
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (phone && !/^[+\d][\d\s/-]{5,}$/.test(phone)) errs.phone = 'Bitte prüfen Sie die Telefonnummer.';
    if (!agb) errs.agb = 'Bitte akzeptieren Sie die AGB und die Datenschutzerklärung.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      document.querySelector('[role="alert"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const draft = {
      flightNumber: flight.flight,
      airline: flight.airline,
      from: flight.from,
      to: flight.to,
      fromCity: fromA?.city ?? flight.from,
      toCity: toA?.city ?? flight.to,
      departDate,
      returnDate: returnDate || undefined,
      departTime: flight.depart,
      arriveTime: flight.arrive,
      duration: flight.duration,
      stops: flight.stops,
      travelClass,
      passengers,
      totalPrice: Math.round(total * 100) / 100,
      email,
    };
    sessionStorage.setItem('skyahs_draft', JSON.stringify(draft));
    navigate('/payment');
  };

  const inputCls = (err?: string) =>
    `h-12 w-full rounded-md border bg-white px-4 text-body text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus:border-sky-500 focus:shadow-focus focus:outline-none ${
      err ? 'border-error-500' : 'border-neutral-300'
    }`;

  return (
    <div className="container-page py-10 pt-24 md:pt-28">
      <nav aria-label="Buchungsschritte" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-body-sm">
          {['Passagiere', 'Prüfen', 'Zahlung'].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                aria-current={i === 0 ? 'step' : undefined}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-caption font-semibold ${
                  i === 0 ? 'bg-gold-500 text-navy-950' : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {i + 1}
              </span>
              <span className={i === 0 ? 'font-semibold text-navy-900' : 'text-neutral-500'}>{s}</span>
              {i < 2 && <span className="mx-1 h-px w-6 bg-neutral-300" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="text-display-sm md:text-display-md">Ihre Buchung</h1>
      <p className="mt-2 text-body text-neutral-500">
        <span className="font-mono text-mono-code">{flight.from} → {flight.to}</span> · {formatDateDE(departDate)} ·{' '}
        {flight.airline} <span className="font-mono text-mono-code">{flight.flight}</span> · <Badge variant={travelClass === 'economy' ? 'neutral' : 'gold'}>{CLASS_LABELS[travelClass]}</Badge>
      </p>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {passengers.map((p, i) => (
            <fieldset key={i} className="rounded-lg border border-neutral-200 bg-white p-6">
              <legend className="px-2 text-title-md font-semibold text-navy-900">
                Passagier {i + 1}{i === 0 && <span className="ml-2 text-body-sm font-normal text-neutral-500">(Hauptkontakt)</span>}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`p${i}-firstName`} className="text-body-sm font-medium text-neutral-700">
                    Vorname <span className="text-neutral-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`p${i}-firstName`}
                    value={p.firstName}
                    onChange={(e) => updatePassenger(i, 'firstName', e.target.value)}
                    aria-invalid={errors[`p${i}-firstName`] ? true : undefined}
                    aria-describedby={errors[`p${i}-firstName`] ? `p${i}-firstName-error` : undefined}
                    placeholder="z. B. Erika"
                    className={inputCls(errors[`p${i}-firstName`])}
                    autoComplete="given-name"
                  />
                  {errors[`p${i}-firstName`] && (
                    <p id={`p${i}-firstName-error`} role="alert" className="text-body-sm text-error-500">{errors[`p${i}-firstName`]}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`p${i}-lastName`} className="text-body-sm font-medium text-neutral-700">
                    Nachname <span className="text-neutral-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`p${i}-lastName`}
                    value={p.lastName}
                    onChange={(e) => updatePassenger(i, 'lastName', e.target.value)}
                    aria-invalid={errors[`p${i}-lastName`] ? true : undefined}
                    aria-describedby={errors[`p${i}-lastName`] ? `p${i}-lastName-error` : undefined}
                    placeholder="z. B. Mustermann"
                    className={inputCls(errors[`p${i}-lastName`])}
                    autoComplete="family-name"
                  />
                  {errors[`p${i}-lastName`] && (
                    <p id={`p${i}-lastName-error`} role="alert" className="text-body-sm text-error-500">{errors[`p${i}-lastName`]}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`p${i}-birthDate`} className="text-body-sm font-medium text-neutral-700">
                    Geburtsdatum <span className="text-neutral-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`p${i}-birthDate`}
                    type="date"
                    max={todayISO()}
                    value={p.birthDate}
                    onChange={(e) => updatePassenger(i, 'birthDate', e.target.value)}
                    aria-invalid={errors[`p${i}-birthDate`] ? true : undefined}
                    aria-describedby={errors[`p${i}-birthDate`] ? `p${i}-birthDate-error` : undefined}
                    className={inputCls(errors[`p${i}-birthDate`])}
                  />
                  {errors[`p${i}-birthDate`] && (
                    <p id={`p${i}-birthDate-error`} role="alert" className="text-body-sm text-error-500">{errors[`p${i}-birthDate`]}</p>
                  )}
                </div>
              </div>
            </fieldset>
          ))}

          {/* Kontakt */}
          <fieldset className="rounded-lg border border-neutral-200 bg-white p-6">
            <legend className="px-2 text-title-md font-semibold text-navy-900">Kontaktdaten</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-body-sm font-medium text-neutral-700">
                  E-Mail-Adresse <span className="text-neutral-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="z. B. max@example.de"
                  className={inputCls(errors.email)}
                  autoComplete="email"
                />
                {errors.email && <p id="email-error" role="alert" className="text-body-sm text-error-500">{errors.email}</p>}
                <p className="text-caption text-neutral-400">Die Buchungsbestätigung wird an diese Adresse gesendet.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-body-sm font-medium text-neutral-700">
                  Telefonnummer (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  placeholder="z. B. +49 40 12345678"
                  className={inputCls(errors.phone)}
                  autoComplete="tel"
                />
                {errors.phone && <p id="phone-error" role="alert" className="text-body-sm text-error-500">{errors.phone}</p>}
              </div>
            </div>
          </fieldset>

          {/* AGB */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agb}
                onChange={(e) => setAgb(e.target.checked)}
                aria-invalid={errors.agb ? true : undefined}
                aria-describedby={errors.agb ? 'agb-error' : undefined}
                className="mt-1 h-4 w-4 rounded accent-navy-600"
              />
              <span className="text-body-sm text-neutral-700">
                Ich akzeptiere die <Link to="/agb" className="font-semibold text-navy-600 underline underline-offset-4">AGB</Link> und habe die{' '}
                <Link to="/datenschutz" className="font-semibold text-navy-600 underline underline-offset-4">Datenschutzerklärung</Link> zur Kenntnis genommen.
              </span>
            </label>
            {errors.agb && <p id="agb-error" role="alert" className="mt-2 text-body-sm text-error-500">{errors.agb}</p>}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
            Weiter zur Zahlung
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>

        {/* Sticky Preisübersicht */}
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Preisübersicht">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-md">
            <h2 className="text-title-md font-semibold text-navy-900">Preisübersicht</h2>
            <p className="mt-2 font-mono text-mono-code text-neutral-500">
              {flight.from} → {flight.to} · {flight.flight}
            </p>
            <p className="mt-1 text-body-sm text-neutral-500">
              {formatDateDE(departDate)}
              {returnDate && ` – ${formatDateDE(returnDate)}`}
            </p>
            <dl className="mt-5 space-y-3 border-t border-neutral-200 pt-5 text-body-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-500">
                  {CLASS_LABELS[travelClass]} × {passengerCount}
                </dt>
                <dd className="font-medium text-navy-900 tnum">{formatEUR(pricePerPerson)} p.&nbsp;P.</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Zwischenstopps</dt>
                <dd className="font-medium text-navy-900">{flight.stops === 0 ? 'Nonstop' : '1 Stopp'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Steuern & Gebühren</dt>
                <dd className="font-medium text-navy-900">enthalten ({formatEUR(taxesIncluded * passengerCount)})</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-5">
              <p className="text-body font-semibold text-navy-900">Gesamt</p>
              <div className="text-right">
                <p className="text-title-lg font-bold text-navy-900 tnum">{formatEUR(total)}</p>
                <p className="text-caption text-neutral-500">inkl. Steuern und Gebühren</p>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-success-50 px-3 py-2 text-caption font-medium text-success-500">
              Kostenlose Stornierung bis 24 h vor Abflug
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
