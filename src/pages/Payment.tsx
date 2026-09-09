import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CLASS_LABELS } from '@/config/company';
import { formatEUR, formatDateDE } from '@/lib/format';
import { saveBooking } from '@/lib/booking';
import { Button } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const SUMUP_KEY: string | undefined = import.meta.env.VITE_SUMUP_API_KEY;

interface Draft {
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  departDate: string;
  returnDate?: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: 0 | 1;
  travelClass: keyof typeof CLASS_LABELS;
  passengers: { firstName: string; lastName: string; birthDate: string }[];
  totalPrice: number;
  email: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useDocumentHead({
    title: 'Sichere Zahlung',
    description: 'Sichere Zahlung über SumUp. Ihre Daten werden SSL-verschlüsselt übertragen.',
  });

  const raw = sessionStorage.getItem('skyahs_draft');
  const draft: Draft | null = raw ? JSON.parse(raw) : null;

  if (!draft) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="text-display-sm">Keine Buchung gefunden</h1>
        <p className="mt-3 text-body text-neutral-500">Bitte starten Sie den Buchungsvorgang erneut.</p>
        <Link to="/flights" className="mt-6 font-semibold text-navy-600 underline underline-offset-4">
          Zur Flugsuche
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (cardName.trim().length < 2) errs.cardName = 'Bitte geben Sie den Namen auf der Karte ein.';
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) errs.cardNumber = 'Bitte geben Sie eine 16-stellige Kartennummer ein.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errs.expiry = 'Bitte im Format MM/JJ eingeben.';
    else {
      const [m, y] = expiry.split('/').map(Number);
      const exp = new Date(2000 + y, m);
      if (exp <= new Date()) errs.expiry = 'Die Karte ist abgelaufen.';
    }
    if (!/^\d{3,4}$/.test(cvc)) errs.cvc = 'Bitte geben Sie die Prüfziffer ein (3–4 Stellen).';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setProcessing(true);
    // Demo-Modus: ohne echten SumUp-Key wird die Zahlung simuliert.
    const delay = SUMUP_KEY ? 1800 : 1400;
    setTimeout(() => {
      const booking = saveBooking(draft);
      sessionStorage.removeItem('skyahs_draft');
      navigate(`/payment-success?ref=${booking.reference}`);
    }, delay);
  };

  const inputCls = (err?: string) =>
    `h-12 w-full rounded-md border bg-white px-4 text-body text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus:border-sky-500 focus:shadow-focus focus:outline-none ${
      err ? 'border-error-500' : 'border-neutral-300'
    }`;

  return (
    <div className="container-page max-w-[960px] py-10 pt-24 md:pt-28">
      <h1 className="text-display-sm md:text-display-md">Sichere Zahlung</h1>
      <p className="mt-2 text-body text-neutral-500">Sichere Zahlung über SumUp — Ihre Daten werden SSL-verschlüsselt übertragen.</p>

      {!SUMUP_KEY && (
        <p className="mt-4 rounded-md bg-warning-50 px-4 py-3 text-body-sm font-medium text-warning-500" role="note">
          Demo-Modus: Es ist kein SumUp-API-Schlüssel konfiguriert (VITE_SUMUP_API_KEY). Die Zahlung wird simuliert — es findet keine echte Abbuchung statt.
        </p>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={pay} noValidate className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-title-md font-semibold text-navy-900">Kartendaten</h2>
          <div className="mt-5 space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cardName" className="text-body-sm font-medium text-neutral-700">Name auf der Karte <span className="text-neutral-500" aria-hidden="true">*</span></label>
              <input id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} autoComplete="cc-name" placeholder="z. B. Erika Mustermann" aria-invalid={errors.cardName ? true : undefined} aria-describedby={errors.cardName ? 'cardName-error' : undefined} className={inputCls(errors.cardName)} />
              {errors.cardName && <p id="cardName-error" role="alert" className="text-body-sm text-error-500">{errors.cardName}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cardNumber" className="text-body-sm font-medium text-neutral-700">Kartennummer <span className="text-neutral-500" aria-hidden="true">*</span></label>
              <input
                id="cardNumber"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
                  setCardNumber(digits.replace(/(\d{4})(?=\d)/g, '$1 '));
                }}
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                aria-invalid={errors.cardNumber ? true : undefined}
                aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                className={`${inputCls(errors.cardNumber)} font-mono`}
              />
              {errors.cardNumber && <p id="cardNumber-error" role="alert" className="text-body-sm text-error-500">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="expiry" className="text-body-sm font-medium text-neutral-700">Gültig bis <span className="text-neutral-500" aria-hidden="true">*</span></label>
                <input
                  id="expiry"
                  inputMode="numeric"
                  value={expiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                    if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                    setExpiry(v);
                  }}
                  autoComplete="cc-exp"
                  placeholder="MM/JJ"
                  aria-invalid={errors.expiry ? true : undefined}
                  aria-describedby={errors.expiry ? 'expiry-error' : undefined}
                  className={`${inputCls(errors.expiry)} font-mono`}
                />
                {errors.expiry && <p id="expiry-error" role="alert" className="text-body-sm text-error-500">{errors.expiry}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cvc" className="text-body-sm font-medium text-neutral-700">Prüfziffer <span className="text-neutral-500" aria-hidden="true">*</span></label>
                <input
                  id="cvc"
                  inputMode="numeric"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  autoComplete="cc-csc"
                  placeholder="CVC"
                  aria-invalid={errors.cvc ? true : undefined}
                  aria-describedby={errors.cvc ? 'cvc-error' : undefined}
                  className={`${inputCls(errors.cvc)} font-mono`}
                />
                {errors.cvc && <p id="cvc-error" role="alert" className="text-body-sm text-error-500">{errors.cvc}</p>}
              </div>
            </div>
          </div>

          <Button type="submit" variant="gold" size="lg" loading={processing} className="mt-8 w-full">
            {processing ? 'Zahlung wird verarbeitet…' : `${formatEUR(draft.totalPrice)} zahlen`}
          </Button>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-caption text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-success-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              SSL-verschlüsselt
            </span>
            <span className="font-semibold text-navy-600">SumUp</span>
            <span>Kostenlose Stornierung bis 24 h vor Abflug</span>
          </div>
        </form>

        <aside className="self-start rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:sticky md:top-24" aria-label="Bestellübersicht">
          <h2 className="text-title-md font-semibold text-navy-900">Bestellübersicht</h2>
          <dl className="mt-4 space-y-3 text-body-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Strecke</dt>
              <dd className="text-right font-medium text-navy-900">
                <span className="font-mono text-mono-code">{draft.from} → {draft.to}</span>
                <br />
                {draft.fromCity} – {draft.toCity}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Flug</dt>
              <dd className="text-right font-medium text-navy-900">
                {draft.airline} <span className="font-mono text-mono-code">{draft.flightNumber}</span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Datum</dt>
              <dd className="text-right font-medium text-navy-900">{formatDateDE(draft.departDate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Klasse</dt>
              <dd className="font-medium text-navy-900">{CLASS_LABELS[draft.travelClass]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Passagiere</dt>
              <dd className="font-medium text-navy-900">{draft.passengers.length}</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-5">
            <p className="text-body font-semibold text-navy-900">Gesamt</p>
            <div className="text-right">
              <p className="text-title-lg font-bold text-navy-900 tnum">{formatEUR(draft.totalPrice)}</p>
              <p className="text-caption text-neutral-500">inkl. Steuern und Gebühren</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
