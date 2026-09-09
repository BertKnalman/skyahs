import { useState } from 'react';
import {
  loginAdmin,
  logoutAdmin,
  isAdminLoggedIn,
  getBookings,
  BOOKING_STATUS_LABELS,
} from '@/lib/booking';
import { CLASS_LABELS } from '@/config/company';
import { formatDateDE, formatEUR } from '@/lib/format';
import { Button, Input, Badge } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useDocumentHead({
    title: 'Admin',
    description: 'SkyAHS-Administrationsbereich. Nur für autorisiertes Personal.',
  });

  if (!loggedIn) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loginAdmin(email, password)) {
              setLoggedIn(true);
            } else {
              setError('Zugangsdaten nicht korrekt.');
            }
          }}
          className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-8 shadow-md"
        >
          <h1 className="font-sans text-title-lg font-semibold text-navy-900">Admin-Bereich</h1>
          <p className="mt-1 text-body-sm text-neutral-500">Nur für autorisiertes Personal.</p>
          {error && (
            <p role="alert" className="mt-4 rounded-md bg-error-50 px-3 py-2 text-body-sm text-error-500">
              {error}
            </p>
          )}
          <div className="mt-6 space-y-4">
            <Input label="E-Mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
            <Input label="Passwort" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <Button type="submit" variant="primary" className="w-full">Anmelden</Button>
          </div>
        </form>
      </div>
    );
  }

  const bookings = getBookings();
  const active = bookings.filter((b) => b.status !== 'storniert');
  const revenue = active.reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { label: 'Buchungen gesamt', value: String(bookings.length) },
    { label: 'Aktive Buchungen', value: String(active.length) },
    { label: 'Stornierungen', value: String(bookings.length - active.length) },
    { label: 'Umsatz', value: formatEUR(revenue) },
  ];

  return (
    <div className="pt-16 md:pt-[72px]">
      <div className="container-page py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-sans text-title-lg font-semibold text-navy-900">Admin-Dashboard</h1>
            <p className="mt-1 text-body-sm text-neutral-500">Übersicht aller Buchungen (lokale Demo-Daten).</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logoutAdmin();
              setLoggedIn(false);
            }}
          >
            Abmelden
          </Button>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-neutral-200 bg-white p-5">
              <dt className="text-caption font-medium uppercase tracking-wider text-neutral-400">{s.label}</dt>
              <dd className="mt-1 font-sans text-title-lg font-bold text-navy-900 tnum">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-body-sm">
            <caption className="sr-only">Alle Buchungen</caption>
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-caption font-semibold uppercase tracking-wider text-neutral-500">
                <th scope="col" className="px-4 py-3">Referenz</th>
                <th scope="col" className="px-4 py-3">Strecke</th>
                <th scope="col" className="px-4 py-3">Flug</th>
                <th scope="col" className="px-4 py-3">Datum</th>
                <th scope="col" className="px-4 py-3">Klasse</th>
                <th scope="col" className="px-4 py-3">Passagiere</th>
                <th scope="col" className="px-4 py-3 text-right">Betrag</th>
                <th scope="col" className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-neutral-400">
                    Noch keine Buchungen vorhanden.
                  </td>
                </tr>
              ) : (
                bookings.map((b, i) => (
                  <tr key={b.reference} className={`border-b border-neutral-100 ${i % 2 === 1 ? 'bg-neutral-50' : ''}`}>
                    <td className="px-4 py-3 font-mono text-mono-code font-semibold text-navy-600">{b.reference}</td>
                    <td className="px-4 py-3 text-neutral-700">
                      {b.from} → {b.to}
                    </td>
                    <td className="px-4 py-3 font-mono text-mono-code text-neutral-500">{b.flightNumber}</td>
                    <td className="px-4 py-3 text-neutral-700">{formatDateDE(b.departDate)}</td>
                    <td className="px-4 py-3 text-neutral-700">{CLASS_LABELS[b.travelClass]}</td>
                    <td className="px-4 py-3 text-neutral-700">{b.passengers.length}</td>
                    <td className="px-4 py-3 text-right font-medium text-navy-900 tnum">{formatEUR(b.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={b.status === 'bestaetigt' ? 'success' : b.status === 'wartend' ? 'warning' : 'error'}
                        dot
                      >
                        {BOOKING_STATUS_LABELS[b.status]}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
