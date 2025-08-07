'use client';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import CodeBlock from "@/components/codeblock/CodeBlocks";

export default function EducationPage() {

  const { language } = useLanguage(); 

  return (
    <>
      <CodeBlock code={translations[language].sobre_mim_educacao} />
    </>
  )
}