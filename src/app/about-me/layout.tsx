'use client';
import './about-me.scss';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import Chevron from '@/components/icons/folders/Chevron';
import Arrow from '@/components/icons/folders/Arrow';
import Folder1 from '@/components/icons/folders/Folder';
import Folder2 from '@/components/icons/folders/Folder2';
import Folder3 from '@/components/icons/folders/Folder3';
import Link from 'next/link';

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { language } = useLanguage(); 

  return (
    <main className='about_page'>
      <aside className='about_aside'>
        <span><Arrow /> {translations[language].informacao_pessoal}</span>
        <ul>
          <li><Chevron /><div><Folder1 /><Link href={'/about-me/bio'}>{translations[language].bio}</Link></div></li>
          <li><Chevron /><div><Folder2 /><Link href={'/about-me/interests'}>{translations[language].interesses}</Link></div></li>
          <li><Chevron /><div><Folder3 /><Link href={'/about-me/education'}>{translations[language].educacao}</Link></div></li>
        </ul>
      </aside>
      <p className="text-wrapper">
        {children}
      </p>
    </main>
  )
}