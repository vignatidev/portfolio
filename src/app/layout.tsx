import "@/styles/globals.scss";
import "@/styles/prism-theme.css";
import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-blue-eight-xphc5i37qo.vercel.app";

const description =
  "Portfolio de Marco Vignati: engenharia de software e automação de processos. Java, Spring, Angular e Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marco Vignati | Engenheiro de Software e Automação",
    template: "%s | Marco Vignati",
  },
  description,
  openGraph: {
    title: "Marco Vignati | Engenheiro de Software e Automação",
    description,
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
