import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { registerUser } from '@/lib/booking';
import { Button, Input } from '@/components/ui';
import { AuthAside } from '@/pages/Login';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useDocumentHead({
    title: 'Konto erstellen',
    description: 'SkyAHS-Konto erstellen: Buchungen verwalten, schneller buchen, Angebote erhalten.',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = 'Bitte geben Sie Ihren Namen ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    if (password.length < 8) errs.password = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
    if (password2 !== password) errs.password2 = 'Die Passwörter stimmen nicht überein.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const result = registerUser(name.trim(), email, password);
    setLoading(false);
    if (!result.ok) {
      setErrors({ email: result.error || 'Registrierung fehlgeschlagen.' });
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
          <h1 className="mt-8 text-display-sm lg:mt-0">Konto erstellen</h1>
          <p className="mt-2 text-body text-neutral-500">Buchungen verwalten und schneller zur nächsten Reise.</p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <Input
              label="Vollständiger Name"
              required
              autoComplete="name"
              placeholder="z. B. Erika Mustermann"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <Input
              label="E-Mail-Adresse"
              type="email"
              required
              autoComplete="email"
              placeholder="z. B. max@example.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              label="Passwort"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              label="Passwort wiederholen"
              type="password"
              required
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              error={errors.password2}
            />
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              Registrieren
            </Button>
          </form>

          <p className="mt-4 text-caption text-neutral-400">
            Mit der Registrierung akzeptieren Sie unsere{' '}
            <Link to="/agb" className="underline">AGB</Link> und die{' '}
            <Link to="/datenschutz" className="underline">Datenschutzerklärung</Link>.
          </p>
          <p className="mt-6 text-body-sm text-neutral-500">
            Bereits registriert?{' '}
            <Link to="/login" className="font-semibold text-navy-600 underline underline-offset-4">
              Anmelden
            </Link>
          </p>
        </div>
      </div>
      <AuthAside
        quote="Gebucht. Geprüft. Abgehoben."
        author="SkyAHS — die Flugbuchung aus Hamburg"
      />
    </div>
  );
}
