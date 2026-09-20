'use client';
import './about-me.scss';

import { useMemo } from 'react';
import Prism from 'prismjs';
import { usePathname } from 'next/navigation';
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import Chevron from '@/components/icons/folders/Chevron';
import Arrow from '@/components/icons/folders/Arrow';
import Folder1 from '@/components/icons/folders/Folder';
import Folder2 from '@/components/icons/folders/Folder2';
import Folder3 from '@/components/icons/folders/Folder3';
import Folder4 from '@/components/icons/folders/Folder4';
import Link from 'next/link';

export default function AboutMeShell({
  children,
}: {
  children: React.ReactNode
}) {

  const { language } = useLanguage();
  const pathname = usePathname();
  const t = translations[language];

  const folders = [
    { href: '/about-me/bio', label: t.bio, icon: <Folder1 /> },
    { href: '/about-me/stack', label: t.stack, icon: <Folder4 /> },
    { href: '/about-me/education', label: t.educacao, icon: <Folder3 /> },
    { href: '/about-me/interests', label: t.interesses, icon: <Folder2 /> },
  ];

  // Highlighted once per language; the source is a constant from i18n.
  const codeHtml = useMemo(
    () => Prism.highlight(t.about_code, Prism.languages.javascript, 'javascript'),
    [t.about_code],
  );

  return (
    <main className='about_page'>
      <aside className='about_aside'>
        <span><Arrow /> {t.informacao_pessoal}</span>
        <ul>
          {folders.map((folder) => (
            <li key={folder.href} className={pathname === folder.href ? 'is-current' : undefined}>
              <Chevron />
              <div>{folder.icon}<Link href={folder.href}>{folder.label}</Link></div>
            </li>
          ))}
        </ul>
      </aside>
      <div className="text-wrapper">
        {children}
      </div>
      <aside className="about_code" aria-hidden="true">
        <pre><code dangerouslySetInnerHTML={{ __html: codeHtml }} /></pre>
      </aside>
    </main>
  )
}
