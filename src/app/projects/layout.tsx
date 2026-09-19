import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Projetos de Marco Vignati em Java, Spring, Angular e Next.js.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
