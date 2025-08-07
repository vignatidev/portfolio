'use client'

import './PageHeader.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";


export default function PageHeader() {

  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="header">
      <span>marco-vignati</span>
      <nav className="flex header-nav">
        <li><Link className={pathname == "/" ? "page-active" : ""} href="/">{translations[language].ola}</Link></li>
        <li><Link className={pathname == "/about-me" ? "page-active" : ""} href="/about-me">{translations[language].sobre_mim}</Link></li>
        <li><Link className={pathname == "/projects" ? "page-active" : ""} id="projects" href="/projects">{translations[language].projects}</Link></li>
        <li><Link className={pathname == "/contact-me" ? "page-active" : ""} id="contact" href="/contact-me">{translations[language].contact_me}</Link></li>
      </nav>
      <div>
        <button onClick={toggleLanguage}>Trocar idioma</button>
      </div>
    </header>
  )
}