import type { Metadata } from 'next';
import AboutMeShell from './AboutMeShell';

export const metadata: Metadata = {
  title: 'Sobre mim',
  description: 'Quem é Marco Vignati: formação, interesses e trajetória em engenharia de software e automação.',
};

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return <AboutMeShell>{children}</AboutMeShell>;
}
