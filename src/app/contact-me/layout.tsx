import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com Marco Vignati sobre vagas, projetos e automação de processos.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
