'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import PageHeader from '@/components/page-header/PageHeader';
import PageFooter from '@/components/page-footer/PageFooter';
import ThemeToggle from '@/components/theme-toggle/ThemeToggle';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeToggle />
      <div className="page-wrapper">
        <PageHeader />
        <main className="content-wrapper">
          {children}
        </main>
        <PageFooter />
      </div>
    </LanguageProvider>
  );
}
