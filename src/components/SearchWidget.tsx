import { useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAirports, type Airport } from '@/data/airports';
import { CLASS_LABELS, type TravelClass } from '@/config/company';
import { todayISO } from '@/lib/format';
import { Button } from '@/components/ui';

/* ── Airport-Autocomplete ───────────────────────────────────────── */

interface AirportAutocompleteProps {
  label: string;
  value: Airport | null;
  onChange: (a: Airport | null) => void;
  placeholder?: string;
  excludeCode?: string;
  error?: string;
}

export function AirportAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  excludeCode,
  error,
}: AirportAutocompleteProps) {
  const id = useId();
  const listId = `${id}-listbox`;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchAirports(query).filter((a) => a.code !== excludeCode);
  const displayValue = open ? query : value ? `${value.city} (${value.code})` : query;

  const select = (a: Airport) => {
    onChange(a);
    setQuery('');
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActive((p) => Math.min(p + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((p) => Math.max(p - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && active >= 0 && results[active]) {
        e.preventDefault();
        select(results[active]);
      } else if (open && results.length > 0) {
        e.preventDefault();
        select(results[0]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor={id} className="text-body-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={active >= 0 ? `${id}-option-${active}` : undefined}
        aria-autocomplete="list"
        aria-invalid={error ? true : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        className={`h-12 w-full rounded-md border bg-white px-4 text-body text-neutral-800 placeholder:text-neutral-400 transition-colors duration-200 focus:border-sky-500 focus:shadow-focus focus:outline-none ${
          error ? 'border-error-500' : 'border-neutral-300'
        }`}
      />
      {error && (
        <p role="alert" className="text-body-sm text-error-500">
          {error}
        </p>
      )}
      <span aria-live="polite" className="sr-only">
        {open ? `${results.length} Flughäfen gefunden` : ''}
      </span>
      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} – Vorschläge`}
          className="absolute top-full z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {results.map((a, i) => (
            <li
              key={a.code}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                select(a);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-body-sm ${
                i === active ? 'bg-navy-50' : 'bg-white'
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate font-medium text-navy-900">
                  {a.city} <span className="font-normal text-neutral-500">· {a.name}</span>
                </span>
                <span className="text-caption text-neutral-400">{a.country}</span>
              </span>
              <span className="font-mono text-mono-code font-semibold text-navy-600">{a.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Search Widget ──────────────────────────────────────────────── */

interface SearchWidgetProps {
  compact?: boolean;
  initial?: {
    from?: Airport | null;
    to?: Airport | null;
    depart?: string;
    ret?: string;
    passengers?: number;
    travelClass?: TravelClass;
    roundtrip?: boolean;
  };
}

export default function SearchWidget({ compact = false, initial }: SearchWidgetProps) {
  const navigate = useNavigate();
  const [roundtrip, setRoundtrip] = useState(initial?.roundtrip ?? true);
  const [from, setFrom] = useState<Airport | null>(initial?.from ?? null);
  const [to, setTo] = useState<Airport | null>(initial?.to ?? null);
  const [depart, setDepart] = useState(initial?.depart ?? todayISO());
  const [ret, setRet] = useState(initial?.ret ?? '');
  const [passengers, setPassengers] = useState(initial?.passengers ?? 1);
  const [travelClass, setTravelClass] = useState<TravelClass>(initial?.travelClass ?? 'economy');
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { from?: string; to?: string } = {};
    if (!from) errs.from = 'Bitte wählen Sie einen Abflughafen.';
    if (!to) errs.to = 'Bitte wählen Sie einen Zielflughafen.';
    if (from && to && from.code === to.code) errs.to = 'Abflug- und Zielflughafen müssen verschieden sein.';
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !from || !to) return;

    setLoading(true);
    const params = new URLSearchParams({
      from: from.code,
      to: to.code,
      depart,
      passengers: String(passengers),
      class: travelClass,
    });
    if (roundtrip && ret) params.set('return', ret);
    navigate(`/flights?${params.toString()}`);
    setLoading(false);
  };

  const tabs = (
    <div role="tablist" aria-label="Flugart" className="flex gap-1 overflow-x-auto">
      {(
        [
          { id: true, label: 'Hin- und Rückflug' },
          { id: false, label: 'Einfach' },
        ] as const
      ).map((t) => (
        <button
          key={String(t.id)}
          role="tab"
          aria-selected={roundtrip === t.id}
          onClick={() => setRoundtrip(t.id)}
          type="button"
          className={`h-9 whitespace-nowrap rounded-md px-4 text-body-sm font-semibold transition-colors duration-200 ${
            roundtrip === t.id ? 'bg-navy-900 text-white' : 'text-neutral-500 hover:bg-neutral-100'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={submit}
      className={
        compact
          ? 'flex flex-col gap-3'
          : 'rounded-2xl bg-white p-5 shadow-xl sm:p-6'
      }
      aria-label="Flugsuche"
    >
      {!compact && <div className="mb-5">{tabs}</div>}
      {compact && tabs}
      <div className={`grid gap-4 ${compact ? 'md:grid-cols-[1fr_1fr_auto]' : 'md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]'}`}>
        <AirportAutocomplete
          label="Von"
          value={from}
          onChange={setFrom}
          placeholder="z. B. Hamburg (HAM)"
          excludeCode={to?.code}
          error={errors.from}
        />
        <AirportAutocomplete
          label="Nach"
          value={to}
          onChange={setTo}
          placeholder="z. B. Palma de Mallorca (PMI)"
          excludeCode={from?.code}
          error={errors.to}
        />
        <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-1 lg:grid-cols-none lg:grid-rows-1 lg:auto-cols-max lg:grid-flow-col">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={compact ? 'c-depart' : 'depart'} className="text-body-sm font-medium text-neutral-700">
              Abflug
            </label>
            <input
              id={compact ? 'c-depart' : 'depart'}
              type="date"
              required
              min={todayISO()}
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              className="h-12 rounded-md border border-neutral-300 bg-white px-4 text-body text-neutral-800 focus:border-sky-500 focus:shadow-focus focus:outline-none"
            />
          </div>
          {roundtrip && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor={compact ? 'c-return' : 'return'} className="text-body-sm font-medium text-neutral-700">
                Rückflug
              </label>
              <input
                id={compact ? 'c-return' : 'return'}
                type="date"
                min={depart || todayISO()}
                value={ret}
                onChange={(e) => setRet(e.target.value)}
                className="h-12 rounded-md border border-neutral-300 bg-white px-4 text-body text-neutral-800 focus:border-sky-500 focus:shadow-focus focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>
      <div className={`grid gap-4 ${compact ? 'md:grid-cols-[auto_auto_1fr] md:items-end' : 'md:grid-cols-[1fr_1fr_auto] md:items-end'}`}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={compact ? 'c-pax' : 'pax'} className="text-body-sm font-medium text-neutral-700">
            Passagiere
          </label>
          <select
            id={compact ? 'c-pax' : 'pax'}
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
            className="h-12 rounded-md border border-neutral-300 bg-white px-4 text-body text-neutral-800 focus:border-sky-500 focus:shadow-focus focus:outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Passagier' : 'Passagiere'}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={compact ? 'c-class' : 'class'} className="text-body-sm font-medium text-neutral-700">
            Reiseklasse
          </label>
          <select
            id={compact ? 'c-class' : 'class'}
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value as TravelClass)}
            className="h-12 rounded-md border border-neutral-300 bg-white px-4 text-body text-neutral-800 focus:border-sky-500 focus:shadow-focus focus:outline-none"
          >
            {(Object.keys(CLASS_LABELS) as TravelClass[]).map((c) => (
              <option key={c} value={c}>
                {CLASS_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full md:w-auto md:min-w-44">
          {loading ? 'Wird gesucht…' : 'Flüge suchen'}
        </Button>
      </div>
    </form>
  );
}
