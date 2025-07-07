'use client'

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx'
import { useEffect } from 'react';

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof window !== 'undefined') {
        Prism.highlightAll();
      }
    }, 10)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='code_block'>
      <pre>
        <code className={language}>{children}</code>
      </pre>
    </div>
  )
}