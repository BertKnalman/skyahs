import type { TravelClass } from '@/config/company';
import { CLASS_LABELS } from '@/config/company';
import { generateBookingReference } from '@/lib/format';

/* ── Buchungen (localStorage) ───────────────────────────────────── */

export interface Passenger {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export type BookingStatus = 'bestaetigt' | 'wartend' | 'storniert';

export interface Booking {
  reference: string;
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
  travelClass: TravelClass;
  passengers: Passenger[];
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  email: string;
}

const BOOKINGS_KEY = 'skyahs_bookings';

export function getBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]') as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Omit<Booking, 'reference' | 'createdAt' | 'status'>): Booking {
  const full: Booking = {
    ...booking,
    reference: generateBookingReference(),
    status: 'bestaetigt',
    createdAt: new Date().toISOString(),
  };
  const all = getBookings();
  all.unshift(full);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
  return full;
}

export function cancelBooking(reference: string): void {
  const all = getBookings().map((b) =>
    b.reference === reference ? { ...b, status: 'storniert' as BookingStatus } : b,
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all));
}

export function getBooking(reference: string): Booking | undefined {
  return getBookings().find((b) => b.reference === reference);
}

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  bestaetigt: 'Bestätigt',
  wartend: 'Wartend',
  storniert: 'Storniert',
};

export { CLASS_LABELS };

/* ── Auth (localStorage, Demo) ──────────────────────────────────── */

export interface User {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'skyahs_users';
const SESSION_KEY = 'skyahs_session';

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
  } catch {
    return [];
  }
}

export function registerUser(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: 'Diese E-Mail-Adresse ist bereits registriert.' };
  }
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
  return { ok: true };
}

export function loginUser(email: string, password: string): { ok: boolean; error?: string } {
  const user = getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return { ok: false, error: 'E-Mail-Adresse oder Passwort ist nicht korrekt.' };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
  return { ok: true };
}

export function getSession(): { name: string; email: string } | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_KEY);
}

/* ── Admin (Demo) ───────────────────────────────────────────────── */

export const ADMIN_EMAIL = 'admin@skyahs.com';
export const ADMIN_PASSWORD = 'admin123';
const ADMIN_KEY = 'skyahs_admin';

export function loginAdmin(email: string, password: string): boolean {
  if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, '1');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) === '1';
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_KEY);
}
