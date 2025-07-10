"use client";

import "@/styles/globals.scss";
import "@/styles/prism-theme.css";
import IconFacebook from "@/components/icons/socials/IconFacebook";
import IconGithub from "@/components/icons/socials/IconGithub";
import IconInstagram from "@/components/icons/socials/IconInstagram";
import IconLinkedin from "@/components/icons/socials/IconLinkedin";
import IconTwitter from "@/components/icons/socials/IconTwitter";
import { useState } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import PageFooter from "@/components/page-footer/PageFooter";
import PageHeader from "@/components/page-header/PageHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "" ? "theme-01" : ""));
  };

  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className={theme}>
        <figure className="dark-light" onClick={toggleTheme}>
              <IconGithub></IconGithub>
        </figure>
        <div className="page-wrapper">
          <PageHeader />
          <main className="content-wrapper">{children}</main>
          <PageFooter />
        </div>
      </body>
    </html>
  );
}
