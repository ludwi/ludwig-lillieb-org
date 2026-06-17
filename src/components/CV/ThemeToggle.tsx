import { useEffect, useRef, useState } from 'react';
import s from './CV.module.scss';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const ANIMATION_MS = 1300;
const SWITCH_AT_MS = 470;
const COLOR_PANEL_DARK = 'linear-gradient(to right, #000000, #0f0f0f)';
const COLOR_PANEL_LIGHT = 'linear-gradient(to right, #ffffff, #f2f2f2)';

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const [animating, setAnimating] = useState(false);
  const panelColorRef = useRef<string>(COLOR_PANEL_DARK);

  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

  const toggle = () => {
    if (animating) return;
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    panelColorRef.current = next === 'light' ? COLOR_PANEL_LIGHT : COLOR_PANEL_DARK;
    setAnimating(true);
    window.setTimeout(() => {
      applyTheme(next);
      setTheme(next);
    }, SWITCH_AT_MS);
    window.setTimeout(() => setAnimating(false), ANIMATION_MS);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={s.themeToggle}
        aria-label={theme === 'dark' ? 'Byt till ljust läge' : 'Byt till mörkt läge'}
        disabled={animating}
      >
        <span className={s.themeIconDark} aria-hidden="true"><SunIcon /></span>
        <span className={s.themeIconLight} aria-hidden="true"><MoonIcon /></span>
      </button>
      {animating && (
        <div
          className={s.themePanel}
          style={{ background: panelColorRef.current }}
          aria-hidden="true"
        />
      )}
    </>
  );
}

function applyTheme(theme: Theme) {
  if (theme === 'light') {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
