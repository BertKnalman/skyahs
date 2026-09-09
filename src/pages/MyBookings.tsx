import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getBookings,
  cancelBooking,
  getSession,
  BOOKING_STATUS_LABELS,
  type BookingStatus,
} from '@/lib/booking';
import { CLASS_LABELS } from '@/config/company';
import { formatDateDE, formatEUR } from '@/lib/format';
import { Badge, Button } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const STATUS_VARIANT: Record<BookingStatus, 'success' | 'warning' | 'error'> = {
  bestaetigt: 'success',
  wartend: 'warning',
  storniert: 'error',
};

export default function MyBookings() {
  const session = getSession();
  const [bookings, setBookings] = useState(getBookings());
  const [confirmRef, setConfirmRef] = useState<string | null>(null);

  useDocumentHead({
    title: 'Meine Buchungen',
    description: 'Ihre SkyAHS-Buchungen verwalten: Details ansehen, stornieren, Bestätigungen drucken.',
  });

  const doCancel = (reference: string) => {
    cancelBooking(reference);
    setBookings(getBookings());
    setConfirmRef(null);
  };

  return (
    <div className="container-page max-w-4xl py-10 pt-24 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-display-sm md:text-display-md">Meine Buchungen</h1>
          <p className="mt-2 text-body text-neutral-500">
            {session ? `Angemeldet als ${session.name}` : 'Buchungen werden lokal in diesem Browser gespeichert.'}
          </p>
        </div>
        <Link to="/flights">
          <Button variant="secondary">Neuen Flug buchen</Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-12 text-center">
          <svg className="mx-auto h-14 w-14 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19h19M12 4c-3 0-5.5 1-7.5 3L3 9l4.5 1.5L9 12l1.5 4.5L12 21l2-1.5c2-2 3-4.5 3-7.5V9l-5-.5V4z" />
          </svg>
          <h2 className="mt-4 text-title-lg">Noch keine Buchungen</h2>
          <p className="mx-auto mt-2 max-w-md text-body text-neutral-500">
            Sobald Sie einen Flug gebucht haben, erscheint er hier — mit Status, Details und Stornierungsoption.
          </p>
          <Link to="/flights" className="mt-6 inline-block">
            <Button variant="primary">Flüge suchen</Button>
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {bookings.map((b) => (
            <li key={b.reference} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-mono-code font-semibold text-navy-600">{b.reference}</p>
                  <h2 className="mt-1 text-title-md font-semibold text-navy-900">
                    {b.fromCity} → {b.toCity}
                  </h2>
                  <p className="mt-1 text-body-sm text-neutral-500">
                    {b.airline} <span className="font-mono text-mono-code">{b.flightNumber}</span> · {formatDateDE(b.departDate)} · {b.departTime} Uhr · {CLASS_LABELS[b.travelClass]} · {b.passengers.length}{' '}
                    {b.passengers.length === 1 ? 'Passagier' : 'Passagiere'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={STATUS_VARIANT[b.status]} dot>
                    {BOOKING_STATUS_LABELS[b.status]}
                  </Badge>
                  <p className="text-title-md font-bold text-navy-900 tnum">{formatEUR(b.totalPrice)}</p>
                </div>
              </div>
              {b.status !== 'storniert' && (
                <div className="mt-4 flex items-center justify-end gap-3 border-t border-neutral-200 pt-4">
                  {confirmRef === b.reference ? (
                    <>
                      <p className="mr-auto text-body-sm text-neutral-600">Buchung wirklich stornieren?</p>
                      <Button variant="ghost" size="sm" onClick={() => setConfirmRef(null)}>
                        Zurück
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => doCancel(b.reference)}>
                        Jetzt stornieren
                      </Button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmRef(b.reference)}
                      className="text-body-sm font-semibold text-error-500 underline-offset-4 transition-colors hover:underline"
                    >
                      Stornieren
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
