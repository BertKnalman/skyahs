import { useEffect } from 'react';

let counter = 0;

/**
 * Bindet ein JSON-LD-Script in den <head> ein und entfernt es beim Unmount.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  useEffect(() => {
    const id = `jsonld-${++counter}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [data]);
  return null;
}
