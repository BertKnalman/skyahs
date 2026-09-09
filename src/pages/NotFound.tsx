import { Link } from 'react-router-dom';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function NotFound() {
  useDocumentHead({
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
  });

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-mono text-mono-code font-semibold uppercase tracking-[0.3em] text-gold-600">Fehler 404</p>
      <h1 className="mt-4 text-display-md">Diese Seite ist nicht am Gate.</h1>
      <p className="mt-3 max-w-md text-body-lg text-neutral-500">
        Die gesuchte Seite existiert nicht oder wurde verschoben. Über die Flugsuche kommen Sie garantiert ans Ziel.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-navy-900 px-5 font-semibold text-white transition-colors hover:bg-navy-800"
        >
          Zur Startseite
        </Link>
        <Link
          to="/flights"
          className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 font-semibold text-navy-900 transition-colors hover:border-navy-600"
        >
          Flüge suchen
        </Link>
      </div>
    </div>
  );
}
