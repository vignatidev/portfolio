'use client'

import './PageHeader.scss';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";

const NAV = [
  { href: '/', label: 'ola' },
  { href: '/about-me', label: 'sobre_mim' },
  { href: '/projects', label: 'projects', id: 'projects' },
  { href: '/contact-me', label: 'contact_me', id: 'contact' },
] as const;

export default function PageHeader() {

  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const linkClass = (href: string) => (isActive(href) ? 'page-active' : '');

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes it and gives focus back to the button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const [projectsLinks, contactLink] = [NAV.slice(0, 3), NAV[3]];

  return (
    <header className="header">
      <span>marco-vignati</span>
      <nav className="flex header-nav">
        {projectsLinks.map((item) => (
          <li key={item.href}>
            <Link className={linkClass(item.href)} href={item.href} id={'id' in item ? item.id : undefined}>{t[item.label]}</Link>
          </li>
        ))}
        <li className="lang-item">
          <button
            type="button"
            className="lang-btn"
            onClick={toggleLanguage}
            aria-label={language === "pt" ? "Switch to English" : "Trocar para português"}
          >
            <span className={language === "pt" ? "lang-active" : ""}>PT</span>
            {" | "}
            <span className={language === "en" ? "lang-active" : ""}>EN</span>
          </button>
        </li>
        <li>
          <Link className={linkClass(contactLink.href)} href={contactLink.href} id={contactLink.id}>{t[contactLink.label]}</Link>
        </li>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? t.menu_close : t.menu_open}
      >
        <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
          {menuOpen
            ? <path d="M2 1 16 15M16 1 2 15" fill="none" stroke="currentColor" strokeWidth="2" />
            : <path d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z" fill="currentColor" />}
        </svg>
      </button>

      <nav id="mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'}>
        {NAV.map((item) => (
          <Link key={item.href} className={linkClass(item.href)} href={item.href} onClick={() => setMenuOpen(false)}>
            {t[item.label]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
