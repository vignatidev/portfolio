'use client';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import CodeBlock from "@/components/codeblock/CodeBlocks";

export default function AboutMe() {

  const { language } = useLanguage(); 

  return (
    <>
      <CodeBlock code={translations[language].sobre_mim_bio} />
    </>
  )
}