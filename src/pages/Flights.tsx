import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FlightCard from '@/components/FlightCard';
import SearchWidget from '@/components/SearchWidget';
import JsonLd from '@/components/JsonLd';
import { findFlights, durationToMinutes, timeToMinutes, type Flight } from '@/data/flights';
import { getAirport, airportByCode } from '@/data/airports';
import { CLASS_MULTIPLIERS, type TravelClass } from '@/config/company';
import { todayISO } from '@/lib/format';
import { useDocumentHead } from '@/hooks/useDocumentHead';

type SortKey = 'preis' | 'dauer' | 'abflug';

const TIME_SLOTS = [
  { id: 'morgens', label: 'Morgens (06–12 Uhr)', from: 360, to: 720 },
  { id: 'mittags', label: 'Mittags (12–18 Uhr)', from: 720, to: 1080 },
  { id: 'abends', label: 'Abends (18–24 Uhr)', from: 1080, to: 1440 },
] as const;

const POPULAR_ROUTES = [
  { from: 'HAM', to: 'PMI', label: 'Hamburg → Palma de Mallorca' },
  { from: 'HAM', to: 'DXB', label: 'Hamburg → Dubai' },
  { from: 'HAM', to: 'CDG', label: 'Hamburg → Paris' },
  { from: 'HAM', to: 'JFK', label: 'Hamburg → New York' },
  { from: 'HAM', to: 'MUC', label: 'Hamburg → München' },
  { from: 'FRA', to: 'BKK', label: 'Frankfurt → Bangkok' },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-neutral-200 bg-white p-5" aria-hidden="true">
      <div className="flex items-center gap-6">
        <div className="h-8 w-8 rounded-md bg-neutral-200" />
        <div className="h-4 w-24 rounded bg-neutral-200" />
        <div className="h-4 flex-1 rounded bg-neutral-100" />
        <div className="h-6 w-20 rounded bg-neutral-200" />
      </div>
    </div>
  );
}

export default function Flights() {
  const [params] = useSearchParams();
  const from = (params.get('from') || '').toUpperCase();
  const to = (params.get('to') || '').toUpperCase();
  const depart = params.get('depart') || todayISO();
  const ret = params.get('return') || '';
  const passengers = Math.max(1, parseInt(params.get('passengers') || '1', 10));
  const travelClass = (params.get('class') || 'economy') as TravelClass;

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>('preis');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [stopsFilter, setStopsFilter] = useState<'alle' | 'nonstop' | 'stop'>('alle');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const fromAirport = getAirport(from);
  const toAirport = getAirport(to);
  const mult = CLASS_MULTIPLIERS[travelClass] ?? 1;

  useDocumentHead({
    title:
      fromAirport && toAirport
        ? `Flüge ${fromAirport.city} → ${toAirport.city}`
        : 'Flugsuche',
    description: `Flüge ${fromAirport?.city ?? ''} nach ${toAirport?.city ?? ''} vergleichen und buchen. Transparente Preise inkl. Steuern und Gebühren.`,
  });

  // Kurzer Ladezustand → Skeletons
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [from, to, depart, travelClass]);

  const results = useMemo(() => {
    if (!from || !to || from === to) return [];
    let list: Flight[] = findFlights(from, to);

    if (maxPrice !== null) list = list.filter((f) => f.basePrice * mult <= maxPrice);
    if (airlines.length > 0) list = list.filter((f) => airlines.includes(f.airline));
    if (stopsFilter === 'nonstop') list = list.filter((f) => f.stops === 0);
    if (stopsFilter === 'stop') list = list.filter((f) => f.stops === 1);
    if (timeSlots.length > 0) {
      list = list.filter((f) => {
        const mins = timeToMinutes(f.depart);
        return timeSlots.some((id) => {
          const slot = TIME_SLOTS.find((s) => s.id === id)!;
          return mins >= slot.from && mins < slot.to;
        });
      });
    }

    const sorted = [...list];
    if (sort === 'preis') sorted.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'dauer') sorted.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
    if (sort === 'abflug') sorted.sort((a, b) => timeToMinutes(a.depart) - timeToMinutes(b.depart));
    return sorted;
  }, [from, to, mult, maxPrice, airlines, stopsFilter, timeSlots, sort]);

  const allOnRoute = useMemo(() => (from && to && from !== to ? findFlights(from, to) : []), [from, to]);
  const availableAirlines = useMemo(() => [...new Set(allOnRoute.map((f) => f.airline))].sort(), [allOnRoute]);
  const routeMaxPrice = useMemo(
    () => (allOnRoute.length ? Math.ceil(Math.max(...allOnRoute.map((f) => f.basePrice * mult)) / 10) * 10 : 1000),
    [allOnRoute, mult],
  );
  const routeMinPrice = useMemo(
    () => (allOnRoute.length ? Math.floor(Math.min(...allOnRoute.map((f) => f.basePrice * mult)) / 10) * 10 : 0),
    [allOnRoute, mult],
  );

  const toggle = (list: string[], v: string, set: (x: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const jsonLd =
    results.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Flüge ${fromAirport?.city ?? from} → ${toAirport?.city ?? to}`,
          numberOfItems: results.length,
          itemListElement: results.slice(0, 10).map((f, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Flight',
              flightNumber: f.flight,
              provider: { '@type': 'Airline', name: f.airline },
              departureAirport: { '@type': 'Airport', iataCode: f.from, name: airportByCode[f.from]?.name },
              arrivalAirport: { '@type': 'Airport', iataCode: f.to, name: airportByCode[f.to]?.name },
            },
          })),
        }
      : null;

  const sortLabel = sort === 'preis' ? 'Preis' : sort === 'dauer' ? 'Dauer' : 'Abflug';

  return (
    <div className="pt-16 md:pt-[72px]">
      {jsonLd && <JsonLd data={jsonLd} />}

      {/* Sticky kompakte Suche */}
      <div className="sticky top-16 z-20 border-b border-neutral-200 bg-white shadow-sm md:top-[72px]">
        <div className="container-page py-3">
          <SearchWidget
            compact
            initial={{
              from: fromAirport ?? null,
              to: toAirport ?? null,
              depart,
              ret,
              passengers,
              travelClass,
              roundtrip: Boolean(ret),
            }}
          />
        </div>
      </div>

      <div className="container-page py-10">
        <h1 className="text-display-sm md:text-display-md">
          {fromAirport && toAirport ? (
            <>
              {fromAirport.city} <span className="font-mono text-body-lg text-neutral-400">({from})</span> →{' '}
              {toAirport.city} <span className="font-mono text-body-lg text-neutral-400">({to})</span>
            </>
          ) : (
            'Flugsuche'
          )}
        </h1>
        <p className="mt-2 text-body text-neutral-500" aria-live="polite">
          {loading
            ? 'Flüge werden gesucht…'
            : `${results.length} ${results.length === 1 ? 'Flug' : 'Flüge'} gefunden — sortiert nach ${sortLabel}`}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filter-Seitenleiste */}
          <aside aria-label="Filter" className="lg:sticky lg:top-40 lg:self-start">
            <button
              className="mb-4 flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-body-sm font-semibold text-navy-900 lg:hidden"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
            >
              Filter {airlines.length + timeSlots.length > 0 || stopsFilter !== 'alle' || maxPrice !== null ? '(aktiv)' : ''}
              <svg className={`h-4 w-4 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`${filtersOpen ? 'block' : 'hidden'} space-y-6 lg:block`}>
              {/* Preis */}
              <section className="rounded-lg border border-neutral-200 bg-white p-4" aria-labelledby="f-preis">
                <h2 id="f-preis" className="text-title-md text-base">Preis</h2>
                <label htmlFor="maxPrice" className="mt-3 block text-body-sm text-neutral-500">
                  Bis <span className="font-semibold text-navy-900 tnum">{maxPrice ?? routeMaxPrice}&nbsp;€</span> pro Person
                </label>
                <input
                  id="maxPrice"
                  type="range"
                  min={routeMinPrice}
                  max={routeMaxPrice}
                  step={10}
                  value={maxPrice ?? routeMaxPrice}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setMaxPrice(v >= routeMaxPrice ? null : v);
                  }}
                  className="mt-2 w-full accent-gold-500"
                />
              </section>

              {/* Zwischenstopps */}
              <section className="rounded-lg border border-neutral-200 bg-white p-4" aria-labelledby="f-stops">
                <h2 id="f-stops" className="text-title-md text-base">Zwischenstopps</h2>
                <div className="mt-3 space-y-2" role="radiogroup" aria-label="Zwischenstopps">
                  {(
                    [
                      ['alle', 'Alle'],
                      ['nonstop', 'Nonstop'],
                      ['stop', '1 Zwischenstopp'],
                    ] as const
                  ).map(([v, l]) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2.5 text-body-sm text-neutral-700">
                      <input
                        type="radio"
                        name="stops"
                        checked={stopsFilter === v}
                        onChange={() => setStopsFilter(v)}
                        className="h-4 w-4 accent-navy-600"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </section>

              {/* Airline */}
              <section className="rounded-lg border border-neutral-200 bg-white p-4" aria-labelledby="f-airline">
                <h2 id="f-airline" className="text-title-md text-base">Airline</h2>
                {availableAirlines.length === 0 ? (
                  <p className="mt-3 text-body-sm text-neutral-400">Keine Airlines verfügbar.</p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {availableAirlines.map((a) => (
                      <label key={a} className="flex cursor-pointer items-center gap-2.5 text-body-sm text-neutral-700">
                        <input
                          type="checkbox"
                          checked={airlines.includes(a)}
                          onChange={() => toggle(airlines, a, setAirlines)}
                          className="h-4 w-4 rounded accent-navy-600"
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                )}
              </section>

              {/* Tageszeit */}
              <section className="rounded-lg border border-neutral-200 bg-white p-4" aria-labelledby="f-zeit">
                <h2 id="f-zeit" className="text-title-md text-base">Abflugzeit</h2>
                <div className="mt-3 space-y-2">
                  {TIME_SLOTS.map((s) => (
                    <label key={s.id} className="flex cursor-pointer items-center gap-2.5 text-body-sm text-neutral-700">
                      <input
                        type="checkbox"
                        checked={timeSlots.includes(s.id)}
                        onChange={() => toggle(timeSlots, s.id, setTimeSlots)}
                        className="h-4 w-4 rounded accent-navy-600"
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
              </section>

              {(maxPrice !== null || airlines.length > 0 || timeSlots.length > 0 || stopsFilter !== 'alle') && (
                <button
                  onClick={() => {
                    setMaxPrice(null);
                    setAirlines([]);
                    setTimeSlots([]);
                    setStopsFilter('alle');
                  }}
                  className="text-body-sm font-semibold text-navy-600 underline-offset-4 hover:underline"
                >
                  Alle Filter zurücksetzen
                </button>
              )}
            </div>
          </aside>

          {/* Ergebnisse */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-body-sm text-neutral-500">
                {passengers} {passengers === 1 ? 'Passagier' : 'Passagiere'}
                {ret ? ' · Hin- und Rückflug' : ' · Einfach'}
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-body-sm text-neutral-500">Sortieren:</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-body-sm focus:border-sky-500 focus:shadow-focus focus:outline-none"
                >
                  <option value="preis">Preis</option>
                  <option value="dauer">Dauer</option>
                  <option value="abflug">Abflug</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((f, i) => (
                  <FlightCard
                    key={f.flight}
                    flight={f}
                    departDate={depart}
                    returnDate={ret || undefined}
                    travelClass={travelClass}
                    passengers={passengers}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center">
                <svg className="mx-auto h-12 w-12 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className="mt-4 text-title-lg">Keine Flüge für diese Strecke</h2>
                <p className="mx-auto mt-2 max-w-md text-body text-neutral-500">
                  {from && to
                    ? 'Keine Flüge für diese Strecke. Passen Sie Datum oder Ziel an.'
                    : 'Bitte wählen Sie Abflug- und Zielflughafen aus.'}
                </p>
                <h3 className="mt-8 text-body-sm font-semibold uppercase tracking-wider text-neutral-400">
                  Beliebte Strecken
                </h3>
                <ul className="mx-auto mt-4 grid max-w-lg gap-2 sm:grid-cols-2">
                  {POPULAR_ROUTES.map((r) => (
                    <li key={r.label}>
                      <Link
                        to={`/flights?from=${r.from}&to=${r.to}&depart=${todayISO()}&passengers=1&class=economy`}
                        className="block rounded-md border border-neutral-200 px-4 py-2.5 text-body-sm font-medium text-navy-600 transition-colors hover:border-navy-600"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
