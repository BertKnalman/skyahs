import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'header' | 'footer' | 'icon';
  className?: string;
  /** Nur bei Variante header/footer: als Link zur Startseite */
  linked?: boolean;
}

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#0B1F3F" />
      <path d="M14 38 L50 22 L42 30 L46 34 L38 40 L34 36 L22 44 L26 34 Z" fill="#D9A03D" />
      <path d="M14 46 H50" stroke="#7FB3F0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * SkyAHS-Logo: navy Rounded Square + Flugzeug + Wordmark „Sky/AHS".
 * header = dunkle Schrift (für helle Navbar), footer = helle Schrift, icon = nur Mark.
 */
export default function Logo({ variant = 'header', className = '', linked = true }: LogoProps) {
  const mark = <LogoMark className={variant === 'icon' ? 'h-8 w-8' : 'h-7 w-7'} />;

  if (variant === 'icon') {
    return <span className={className}>{mark}</span>;
  }

  const wordmark = (
    <span
      className={`font-display text-title-md font-semibold tracking-tight ${
        variant === 'footer' ? 'text-white' : 'text-navy-900'
      }`}
    >
      Sky<span className="text-gold-500">AHS</span>
    </span>
  );

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      {wordmark}
    </span>
  );

  if (!linked) return content;
  return (
    <Link to="/" aria-label="SkyAHS – Zur Startseite" className="inline-flex rounded-sm">
      {content}
    </Link>
  );
}

export { LogoMark };
