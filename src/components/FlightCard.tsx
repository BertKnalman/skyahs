import { Link } from 'react-router-dom';
import type { Flight } from '@/data/flights';
import { getAirport } from '@/data/airports';
import { CLASS_LABELS, CLASS_MULTIPLIERS, type TravelClass } from '@/config/company';
import { formatEUR } from '@/lib/format';
import { Badge } from '@/components/ui';

interface FlightCardProps {
  flight: Flight;
  departDate: string;
  returnDate?: string;
  travelClass?: TravelClass;
  passengers?: number;
  /** Streeppreis = Basis +10 % („uvp"-Vergleich) */
  showStrikethrough?: boolean;
  index?: number;
}

/** Airline-Kürzel als Logo-Platzhalter (32px, navy) */
function AirlineMark({ airline }: { airline: string }) {
  const initials = airline
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy-900 text-[11px] font-bold text-gold-400"
    >
      {initials}
    </span>
  );
}

function RouteLine({ stops }: { stops: 0 | 1 }) {
  return (
    <span className="relative mx-2 flex h-0.5 flex-1 items-center bg-neutral-200 sm:mx-3" aria-hidden="true">
      <span className="absolute -left-0.5 h-2 w-2 rounded-full border-2 border-navy-600 bg-white" />
      {stops === 1 && <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-500" />}
      <span className="absolute -right-0.5 h-2 w-2 rounded-full bg-navy-600" />
    </span>
  );
}

export default function FlightCard({
  flight,
  departDate,
  returnDate,
  travelClass = 'economy',
  passengers = 1,
  showStrikethrough = true,
  index = 0,
}: FlightCardProps) {
  const price = flight.basePrice * CLASS_MULTIPLIERS[travelClass];
  const comparePrice = Math.round(price * 1.1);
  const fromAirport = getAirport(flight.from);
  const toAirport = getAirport(flight.to);

  const params = new URLSearchParams({
    flight: flight.flight,
    date: departDate,
    class: travelClass,
    passengers: String(passengers),
  });
  if (returnDate) params.set('return', returnDate);

  const isPremium = travelClass === 'business' || travelClass === 'first';

  return (
    <Link
      to={`/booking?${params.toString()}`}
      style={{ animationDelay: `${Math.min(index, 7) * 40}ms` }}
      className="group block animate-fade-up rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:shadow-md focus-visible:shadow-focus sm:p-5"
      aria-label={`${flight.airline} Flug ${flight.flight}, ${fromAirport?.city ?? flight.from} nach ${toAirport?.city ?? flight.to}, Abflug ${flight.depart}, ${formatEUR(price)} pro Person`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* Airline */}
        <div className="flex items-center gap-3 md:w-40 md:shrink-0">
          <AirlineMark airline={flight.airline} />
          <div className="min-w-0">
            <p className="truncate text-body-sm font-medium text-neutral-700">{flight.airline}</p>
            <p className="font-mono text-mono-code text-neutral-500">{flight.flight}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex flex-1 items-center">
          <div className="text-right">
            <p className="text-title-md font-semibold text-navy-900 tnum">
              <time dateTime={`${departDate}T${flight.depart}`}>{flight.depart}</time>
            </p>
            <p className="font-mono text-mono-code text-neutral-500">{flight.from}</p>
          </div>
          <RouteLine stops={flight.stops} />
          <div>
            <p className="text-title-md font-semibold text-navy-900 tnum">{flight.arrive}</p>
            <p className="font-mono text-mono-code text-neutral-500">{flight.to}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 md:w-44 md:flex-col md:items-start md:gap-1.5">
          <p className="text-body-sm text-neutral-500">
            {flight.stops === 0 ? 'Nonstop' : '1 Zwischenstopp'} · {flight.duration}
          </p>
          <Badge variant={isPremium ? 'gold' : 'neutral'}>{CLASS_LABELS[travelClass]}</Badge>
        </div>

        {/* Preis + CTA */}
        <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-3 md:w-48 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="text-left md:text-right">
            {showStrikethrough && (
              <p className="text-caption text-neutral-400 line-through tnum">{formatEUR(comparePrice)}</p>
            )}
            <p className="text-title-lg font-bold text-navy-900 tnum">{formatEUR(price)}</p>
            <p className="text-caption text-neutral-500">pro Person, inkl. Steuern</p>
          </div>
          <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-navy-600 transition-transform duration-200 ease-out-expo group-hover:translate-x-1">
            Ansehen
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
