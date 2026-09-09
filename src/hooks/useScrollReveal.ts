import { useEffect, useRef } from 'react';

/**
 * Scroll-Reveal per IntersectionObserver.
 * Fade + translateY(12px→0), einmalig, threshold 0.15 (design-direction §5).
 * Bei prefers-reduced-motion werden Elemente sofort sichtbar.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');

    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.revealDelay || '0', 10);
            if (delay > 0) el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((t) => {
      t.classList.add('reveal');
      observer.observe(t);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
