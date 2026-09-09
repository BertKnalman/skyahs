import { useEffect } from 'react';

interface HeadOptions {
  title: string;
  description?: string;
}

/**
 * Setzt <title> und meta[name=description] pro Seite.
 * Muster: „{Seite} | SkyAHS" (design-direction §7).
 */
export function useDocumentHead({ title, description }: HeadOptions) {
  useEffect(() => {
    document.title = title.includes('SkyAHS') ? title : `${title} | SkyAHS`;
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
