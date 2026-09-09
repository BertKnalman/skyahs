import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { company } from '@/config/company';
import { getSession, logoutUser } from '@/lib/booking';

const NAV_LINKS = [
  { to: '/flights', label: 'Flüge' },
  { to: '/#angebote', label: 'Angebote' },
  { to: '/blog', label: 'Blog' },
  { to: '/hilfe', label: 'Hilfe' },
  { to: '/ueber-uns', label: 'Über uns' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(getSession());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSession(getSession());
    // Anker-Support für /#angebote
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const onHero = location.pathname === '/' && !scrolled;
  const textCls = onHero ? 'text-white' : 'text-navy-900';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ease-out-expo ${
        onHero
          ? 'bg-transparent'
          : 'border-b border-neutral-200 bg-neutral-0/95 shadow-xs backdrop-blur-sm'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Zum Hauptinhalt
      </a>
      <nav className="container-page flex h-16 items-center justify-between md:h-[72px]" aria-label="Hauptnavigation">
        <span className={onHero ? '[&_.text-navy-900]:text-white' : ''}>
          <Logo variant="header" />
        </span>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              {l.to.includes('#') ? (
                <Link
                  to={l.to}
                  className={`text-body-sm font-semibold transition-colors duration-200 hover:text-gold-500 ${
                    onHero ? 'text-navy-100' : 'text-neutral-600'
                  }`}
                >
                  {l.label}
                </Link>
              ) : (
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-body-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? `${textCls} after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-gold-500`
                        : onHero
                          ? 'text-navy-100 hover:text-white'
                          : 'text-neutral-600 hover:text-navy-900'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <span
            className={`mr-1 rounded-md border px-2 py-1 text-caption font-semibold ${
              onHero ? 'border-white/40 text-white' : 'border-neutral-300 text-neutral-500'
            }`}
            aria-label="Sprache: Deutsch"
          >
            DE
          </span>
          {session ? (
            <>
              <Link
                to="/meine-buchungen"
                className={`rounded-md px-3 py-2 text-body-sm font-semibold transition-colors ${
                  onHero ? 'text-white hover:bg-white/10' : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                Meine Buchungen
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  setSession(null);
                  navigate('/');
                }}
                className="h-9 rounded-md bg-gold-500 px-4 text-body-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Abmelden
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`rounded-md px-3 py-2 text-body-sm font-semibold transition-colors ${
                  onHero ? 'text-white hover:bg-white/10' : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                Anmelden
              </Link>
              <Link
                to="/register"
                className="inline-flex h-9 items-center rounded-md bg-navy-900 px-4 text-body-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Registrieren
              </Link>
            </>
          )}
        </div>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden ${
            onHero ? 'text-white' : 'text-navy-900'
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 top-16 z-40 bg-navy-950 px-6 py-8 lg:hidden">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((l, i) => (
              <li key={l.to} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <Link to={l.to} className="block rounded-md px-2 py-3 text-title-md font-semibold text-white hover:bg-navy-900">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-4 border-t border-navy-800 pt-4">
              {session ? (
                <>
                  <Link to="/meine-buchungen" className="block rounded-md px-2 py-3 text-title-md font-semibold text-gold-500">
                    Meine Buchungen
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      setSession(null);
                      setMenuOpen(false);
                      navigate('/');
                    }}
                    className="mt-2 w-full rounded-md bg-gold-500 px-4 py-3 text-body font-semibold text-navy-950"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="flex-1 rounded-md border border-neutral-300 px-4 py-3 text-center text-body font-semibold text-white">
                    Anmelden
                  </Link>
                  <Link to="/register" className="flex-1 rounded-md bg-gold-500 px-4 py-3 text-center text-body font-semibold text-navy-950">
                    Registrieren
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    {
      title: 'Flüge',
      links: [
        { to: '/flights', label: 'Flugsuche' },
        { to: '/flights?from=HAM&to=PMI', label: 'Hamburg – Mallorca' },
        { to: '/flights?from=HAM&to=DXB', label: 'Hamburg – Dubai' },
        { to: '/flights?from=HAM&to=JFK', label: 'Hamburg – New York' },
        { to: '/meine-buchungen', label: 'Meine Buchungen' },
      ],
    },
    {
      title: 'Unternehmen',
      links: [
        { to: '/ueber-uns', label: 'Über uns' },
        { to: '/karriere', label: 'Karriere' },
        { to: '/blog', label: 'Blog' },
        { to: '/kontakt', label: 'Kontakt' },
        { to: '/hilfe', label: 'Hilfe & FAQ' },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { to: '/agb', label: 'AGB' },
        { to: '/datenschutz', label: 'Datenschutz' },
        { to: '/cookie-richtlinie', label: 'Cookie-Richtlinie' },
        { to: '/stornierung', label: 'Stornierung' },
        { to: '/erstattung', label: 'Erstattung' },
        { to: '/barrierefreiheit', label: 'Barrierefreiheit' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo variant="footer" />
          <p className="mt-4 max-w-xs text-body-sm text-navy-200">{company.tagline}</p>
          <p className="mt-4 text-body-sm text-navy-300">
            {company.legalName}
            <br />
            {company.address.street}
            <br />
            {company.address.zip} {company.address.city}, {company.address.country}
          </p>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={`Footer: ${col.title}`}>
            <h2 className="text-caption font-semibold uppercase tracking-wider text-gold-500">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-body-sm text-navy-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-caption font-semibold uppercase tracking-wider text-gold-500">Kontakt</h2>
          <ul className="mt-4 space-y-2.5 text-body-sm text-navy-200">
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
                {company.email}
              </a>
            </li>
            <li>Mo–So, 24/7 erreichbar</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-800">
        <div className="container-page flex flex-col gap-2 py-6 text-caption text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.legalName}. Alle Rechte vorbehalten.</p>
          <p>
            {company.commercialRegister} {company.registerCourt} · USt-ID {company.vatId} · Geschäftsführer: {company.managingDirector}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
