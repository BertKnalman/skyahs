/** Formatierungs-Helpers (de-DE) */

export function formatEUR(amount: number): string {
  return amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Ganzzahl-Preis für "ab €X"-Anzeigen */
export function formatEURShort(amount: number): string {
  return `ab ${Math.round(amount).toLocaleString('de-DE')} €`;
}

export function formatDateDE(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function todayISO(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Pseudo-zufällige, aber deterministische Buchungsreferenz */
export function generateBookingReference(seed?: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let h = 0;
  const s = seed || `${Date.now()}-${Math.random()}`;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  }
  let ref = '';
  for (let i = 0; i < 6; i++) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    ref += chars[h % chars.length];
  }
  return ref;
}
