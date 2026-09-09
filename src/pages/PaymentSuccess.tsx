import { Link, useSearchParams } from 'react-router-dom';
import { getBooking } from '@/lib/booking';
import { CLASS_LABELS } from '@/config/company';
import { formatDateDE, formatEUR } from '@/lib/format';
import { Button } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const ref = params.get('ref') || '';
  const booking = ref ? getBooking(ref) : undefined;

  useDocumentHead({
    title: 'Buchung bestätigt',
    description: 'Ihre Buchung ist bestätigt. Die Buchungsbestätigung wurde per E-Mail gesendet.',
  });

  return (
    <div className="container-page max-w-2xl py-16 pt-28 text-center md:pt-32">
      {/* Flugzeugspur-Animation (einmalig, 1.2s) */}
      <div className="relative mx-auto h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#ECFDF3" />
          <path
            d="M20 33.5 L28 41 L45 24"
            fill="none"
            stroke="#15803D"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'draw-check 1.2s cubic-bezier(0.16,1,0.3,1) forwards' }}
          />
        </svg>
        <style>{`@keyframes draw-check { to { stroke-dashoffset: 0; } }`}</style>
      </div>

      <h1 className="mt-6 text-display-md">Buchung bestätigt.</h1>
      {booking ? (
        <p className="mt-3 text-body-lg text-neutral-500">
          Ihre Buchungsbestätigung wurde an <span className="font-medium text-navy-900">{booking.email}</span> gesendet.
        </p>
      ) : (
        <p className="mt-3 text-body-lg text-neutral-500">Ihre Buchung wurde erfolgreich abgeschlossen.</p>
      )}

      {booking && (
        <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-8 text-left shadow-md print:shadow-none">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-5">
            <div>
              <p className="text-caption font-semibold uppercase tracking-wider text-neutral-400">Buchungsreferenz</p>
              <p className="mt-1 font-mono text-3xl font-semibold tracking-[0.08em] text-navy-900">{booking.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-caption text-neutral-400">Gesamtpreis</p>
              <p className="mt-1 text-title-lg font-bold text-navy-900 tnum">{formatEUR(booking.totalPrice)}</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-4 text-body-sm sm:grid-cols-2">
            <div>
              <dt className="text-neutral-400">Flug</dt>
              <dd className="mt-0.5 font-medium text-navy-900">
                {booking.airline} <span className="font-mono text-mono-code">{booking.flightNumber}</span>
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Strecke</dt>
              <dd className="mt-0.5 font-medium text-navy-900">
                {booking.fromCity} ({booking.from}) → {booking.toCity} ({booking.to})
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Abflug</dt>
              <dd className="mt-0.5 font-medium text-navy-900">
                {formatDateDE(booking.departDate)}, {booking.departTime} Uhr
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Reiseklasse</dt>
              <dd className="mt-0.5 font-medium text-navy-900">{CLASS_LABELS[booking.travelClass]}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Passagiere</dt>
              <dd className="mt-0.5 font-medium text-navy-900">
                {booking.passengers.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Status</dt>
              <dd className="mt-0.5 font-medium text-success-500">Bestätigt</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row print:hidden">
        <Button variant="primary" size="lg" onClick={() => window.print()}>
          Bestätigung drucken
        </Button>
        <Link to="/meine-buchungen">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">Meine Buchungen</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto">Startseite</Button>
        </Link>
      </div>
    </div>
  );
}
