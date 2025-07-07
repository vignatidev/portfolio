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
        <div className="page-wrapper">
          <header className="header">
            <span onClick={toggleTheme}>marco-vignati</span>
            <nav className="flex header-nav">
              <li>
                <Link className={pathname == "/" ? "page-active" : ""} href="/">
                  _hello
                </Link>
              </li>
              <li>
                <Link
                  className={pathname == "/about-me" ? "page-active" : ""}
                  href="/about-me"
                >
                  _about-me
                </Link>
              </li>
              <li>
                <Link
                  className={pathname == "/projects" ? "page-active" : ""}
                  id="projects"
                  href="/projects"
                >
                  _projects
                </Link>
              </li>
              <li>
                <Link
                  className={pathname == "/contact-me" ? "page-active" : ""}
                  id="contact"
                  href="/contact-me"
                >
                  _contact-me
                </Link>
              </li>
            </nav>
          </header>
          <main className="content-wrapper">{children}</main>
          <footer className="footer">
            <span>find me in:</span>
            <nav>
              <li>
                <a
                  href="https://www.linkedin.com/in/marcovignatidev/"
                  target="blank"
                >
                  <IconLinkedin />
                </a>
              </li>
              <li className="un">
                <a href="https://twitter.com/marcovignatidev" target="blank">
                  <IconTwitter />
                </a>
              </li>
              <li className="un">
                <a href="/">
                  <IconFacebook />
                </a>
              </li>
              <li className="un">
                <a
                  className="instagram"
                  href="https://www.instagram.com/vignati.dev/"
                  target="blank"
                >
                  <IconInstagram />
                </a>
              </li>
              <li>
                <a
                  className="github"
                  href="https://github.com/MarcoVignati"
                  target="blank"
                >
                  <IconGithub />
                  <p>@marcovignati</p>
                </a>
              </li>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
