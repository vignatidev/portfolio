import './about-me.scss';

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
  return (
    <main className='about_page'>
      <aside className='about_aside'>
        <span><Arrow /> personal-info</span>
        <ul>
          <li><Chevron /><div><Folder1 /><Link href={'/about-me/bio'}>bio</Link></div></li>
          <li><Chevron /><div><Folder2 /><Link href={'/about-me/interests'}>interests</Link></div></li>
          <li><Chevron /><div><Folder3 /><Link href={'/about-me/education'}>education</Link></div></li>
        </ul>
      </aside>
      <p className="text-wrapper">
        {children}
      </p>
    </main>
  )
}