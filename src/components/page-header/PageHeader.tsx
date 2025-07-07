'use client'

import './PageHeader.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function PageHeader() {

  const pathname = usePathname();

  return (
    <header className="header">
      <span>marco-vignati</span>
      <nav className="flex header-nav">
        <li><Link className={pathname == "/" ? "page-active" : ""} href="/">_hello</Link></li>
        <li><Link className={pathname == "/about-me" ? "page-active" : ""} href="/about-me">_about-me</Link></li>
        <li><Link className={pathname == "/projects" ? "page-active" : ""} id="projects" href="/projects">_projects</Link></li>
        <li><Link className={pathname == "/contact-me" ? "page-active" : ""} id="contact" href="/contact-me">_contact-me</Link></li>
      </nav>
    </header>
  )
}