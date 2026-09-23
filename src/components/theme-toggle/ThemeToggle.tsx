'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const LIGHT_THEME_CLASS = 'theme-01';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const { language } = useLanguage();

  const toggleTheme = () => {
    document.body.classList.toggle(LIGHT_THEME_CLASS, !isLight);
    setIsLight(!isLight);
  };

  const label = isLight
    ? (language === 'pt' ? 'Ativar tema escuro' : 'Switch to dark theme')
    : (language === 'pt' ? 'Ativar tema claro' : 'Switch to light theme');

  return (
    <button
      type="button"
      className="dark-light"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
