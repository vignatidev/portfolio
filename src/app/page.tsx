'use client';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import Link from 'next/link';
import './page.scss';

import Logo from '@/components/icons/logo';

export default function Home() {

  const { language } = useLanguage(); 

  return (
    <section className="page_home">
      <div>
        <div>
          <p>{translations[language].ola_p1}</p>
          <Logo />
          <h2 className='hero_role'>
            <span>&gt; {translations[language].hero_role_2}</span>
            <span className='hero_cursor'>&gt; {translations[language].hero_role_1}</span>
          </h2>
        </div>
        <div className="home_description">
          <p className='lable'>{translations[language].hero_tagline_1}</p>
          <p className='lable'>{translations[language].hero_tagline_2}</p>
          <p className='lable'>{translations[language].hero_tagline_3}</p>
        </div>
        <div className="hero_cta">
          <Link href="/contact-me">{translations[language].hero_cta_talk}</Link>
          <Link href="/projects">{translations[language].hero_cta_projects}</Link>
        </div>
      </div>
    </section>
  )
}
