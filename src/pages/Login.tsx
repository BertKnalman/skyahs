import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { loginUser } from '@/lib/booking';
import { Button, Input } from '@/components/ui';
import { useDocumentHead } from '@/hooks/useDocumentHead';

/** Split-Screen-Seitenleiste mit Markenversprechen + Routen-Pattern */
export function AuthAside({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-900 p-10 lg:flex" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 400 600" preserveAspectRatio="none">
        <g stroke="#D9A03D" strokeWidth="1" fill="none">
          <path d="M-20 500 C 100 400, 200 300, 420 250" strokeDasharray="6 6" />
          <path d="M-20 350 C 120 300, 250 200, 420 120" strokeDasharray="6 6" />
          <path d="M-20 180 C 100 200, 260 120, 420 30" strokeDasharray="6 6" />
        </g>
        <g fill="#D9A03D">
          <circle cx="60" cy="440" r="4" />
          <circle cx="200" cy="290" r="4" />
          <circle cx="330" cy="80" r="4" />
        </g>
      </svg>
      <Logo variant="footer" />
      <blockquote>
        <p className="max-w-md font-display text-title-lg font-semibold leading-snug text-white">„{quote}"</p>
        <footer className="mt-4 text-body-sm text-navy-200">{author}</footer>
      </blockquote>
      <p className="text-caption text-navy-300">AHS HAMBURG Aviation Handling Services GmbH · Hamburg Airport</p>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useDocumentHead({
    title: 'Anmelden',
    description: 'Bei SkyAHS anmelden und Buchungen verwalten.',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = loginUser(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Anmeldung fehlgeschlagen.');
      return;
    }
    navigate('/meine-buchungen');
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-24 sm:px-6">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden">
            <Logo variant="header" />
          </div>
          <h1 className="mt-8 text-display-sm lg:mt-0">Willkommen zurück.</h1>
          <p className="mt-2 text-body text-neutral-500">Melden Sie sich an, um Ihre Buchungen zu verwalten.</p>

          {error && (
            <p role="alert" className="mt-6 rounded-md bg-error-50 px-4 py-3 text-body-sm font-medium text-error-500">
              {error}
            </p>
          )}

          <form onSubmit={submit} className="mt-8 space-y-5">
            <Input
              label="E-Mail-Adresse"
              type="email"
              required
              autoComplete="email"
              placeholder="z. B. max@example.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Passwort"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Anmelden
            </Button>
          </form>

          <p className="mt-6 text-body-sm text-neutral-500">
            Noch kein Konto?{' '}
            <Link to="/register" className="font-semibold text-navy-600 underline underline-offset-4">
              Registrieren
            </Link>
          </p>
        </div>
      </div>
      <AuthAside
        quote="Ihr Flug. Präzise geplant."
        author="SkyAHS — die Flugbuchung aus Hamburg"
      />
    </div>
  );
}
